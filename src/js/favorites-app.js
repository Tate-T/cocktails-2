import { CocktailAPI } from './API/api.js';
import { CocktailComponents } from './components/renderCoctails.js';
import { Favorites } from './utils/favorites.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.favorite-coctails__list');
  const pretitle = document.querySelector('.favorite-coctails__pretitle');

  const favoriteIds = Favorites.getFavorites();
  
  if (favoriteIds.length === 0) {
    pretitle.style.display = 'block';
    return;
  }

  try {
    const drinks = await loadFavoriteDrinks(favoriteIds);
    CocktailComponents.renderFavoritesList(container, drinks);
    pretitle.style.display = 'none';
    setupGlobalListeners();
  } catch (error) {
    handleFavoriteError(error);
  }
});

async function loadFavoriteDrinks(ids) {
  const requests = ids.map(id => CocktailAPI.fetchCocktailById(id));
  const responses = await Promise.all(requests);
  return responses
    .filter(response => response?.drinks?.[0])
    .map(response => response.drinks[0]);
}

function setupGlobalListeners() {
  document.addEventListener('click', event => {
    handleLearnMoreClick(event);
    handleFavoriteClick(event);
  });
}

async function handleLearnMoreClick(event) {
  const learnMoreBtn = event.target.closest('.js-learn-more');
  if (!learnMoreBtn) return;

  const cocktailItem = learnMoreBtn.closest('[data-id]');
  const cocktailId = cocktailItem.dataset.id;

  try {
    const data = await CocktailAPI.fetchCocktailById(cocktailId);
    const modalHtml = CocktailComponents.renderModal(data.drinks[0]);
    
    document.querySelectorAll(".cocktails-modal__backdrop").forEach(m => m.remove());
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    setupModal(cocktailId);
  } catch (error) {
    console.error("Failed to fetch cocktail details:", error);
  }
}

function handleFavoriteClick(event) {
  const favoriteBtn = event.target.closest('.js-favorite');
  if (!favoriteBtn) return;

  const cocktailItem = favoriteBtn.closest('[data-id]');
  const cocktailId = cocktailItem.dataset.id;
  
  toggleFavorite(cocktailId, favoriteBtn);
  
  if (!Favorites.isFavorite(cocktailId)) {
    const itemToRemove = document.querySelector(`
      .favorite-coctails__list [data-id="${cocktailId}"]
    `);
    itemToRemove?.remove();
    
    const hasItems = !!document.querySelector('.favorite-coctails__list li');
    document.querySelector('.favorite-coctails__pretitle').style.display = 
      hasItems ? 'none' : 'block';
  }
}

function setupModal(cocktailId) { 
  const backdrop = document.querySelector(".cocktails-modal__backdrop");
  if (!backdrop) return;

  setTimeout(() => backdrop.classList.add("is-visible"), 10);

  const closeModal = () => {
    backdrop.classList.remove("is-visible");
    setTimeout(() => backdrop.remove(), 300);
  };

  backdrop.querySelector(".js-modal-close")?.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => e.target === backdrop && closeModal());

  const modalFavoriteBtn = backdrop.querySelector(".js-favorite");
  modalFavoriteBtn?.addEventListener("click", () => toggleFavorite(cocktailId, modalFavoriteBtn));
}

function toggleFavorite(id, button) {
  const isFavorite = Favorites.isFavorite(id);
  const newState = !isFavorite;

  newState ? Favorites.addFavorite(id) : Favorites.removeFavorite(id);

  button.classList.toggle("is-active", newState);
  updateButtonUI(button, newState);

  document.querySelectorAll(`[data-id="${id}"] .js-favorite`).forEach(btn => {
    if (btn !== button) {
      btn.classList.toggle("is-active", newState);
      updateButtonUI(btn, newState);
    }
  });
}

function updateButtonUI(button, isActive) {
  const textElement = button.querySelector(".cocktails__favorite-title") || button;
  const isModal = button.classList.contains("cocktails-modal__favorite-button");

  textElement.textContent = isActive
    ? (isModal ? "Remove from favorite" : "Remove")
    : (isModal ? "Add to favorite" : "Add to");
}

function handleFavoriteError(error) {
  console.error('Error loading favorites:', error);
  document.querySelector('.favorite-coctails__pretitle').textContent = 
    'Failed to load favorite cocktails';
  document.querySelector('.favorite-coctails__pretitle').style.display = 'block';
}