import { CocktailAPI } from "./API/api.js";
import { CocktailComponents } from "./components/renderCoctails.js";
import { Favorites } from "./utils/favorites.js";

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  const cocktailsList = document.querySelector(".cocktails__list");

  try {
    const data = await CocktailAPI.fetchNonAlcoholicCocktails();
    CocktailComponents.renderCocktailsList(cocktailsList, data.drinks);
  } catch (error) {
    handleError(cocktailsList, error);
  }

  cocktailsList.addEventListener("click", handleCocktailClick);
}

function handleError(container, error) {
  console.error("Error:", error);
  container.innerHTML = `
    <li class="error-message">
      Failed to load cocktails. Please try again later.
    </li>
  `;
}

async function handleCocktailClick(event) {
  const learnMoreBtn = event.target.closest(".js-learn-more");
  const favoriteBtn = event.target.closest(".js-favorite");

  if (learnMoreBtn) {
    const cocktailItem = learnMoreBtn.closest("[data-id]");
    if (!cocktailItem) return;
    
    const cocktailId = cocktailItem.dataset.id;

    try {
      const data = await CocktailAPI.fetchCocktailById(cocktailId);
      if (!data?.drinks?.[0]) throw new Error("No cocktail data");
      
      const modalHtml = CocktailComponents.renderModal(data.drinks[0]);
      
      document.querySelectorAll(".cocktails-modal__backdrop").forEach(m => m.remove());
      
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      setupModal(cocktailId);
    } catch (error) {
      console.error("Failed to fetch cocktail details:", error);
    }
  }

  if (favoriteBtn) {
    const cocktailItem = favoriteBtn.closest("[data-id]");
    if (!cocktailItem) return;
    
    const cocktailId = cocktailItem.dataset.id;
    toggleFavorite(cocktailId, favoriteBtn);
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
  if (modalFavoriteBtn) {
    modalFavoriteBtn.addEventListener("click", () => {
      toggleFavorite(cocktailId, modalFavoriteBtn);
    });
  }
}

function toggleFavorite(id, button) {
  const isFavorite = Favorites.isFavorite(id);
  const newState = !isFavorite;

  newState ? Favorites.addFavorite(id) : Favorites.removeFavorite(id);

  button.classList.toggle("is-active", newState);
  updateButtonUI(button, newState);

  const allButtons = document.querySelectorAll(`
    [data-id="${id}"] .js-favorite,
    .cocktails-modal__favorite-button[data-id="${id}"]
  `);

  allButtons.forEach((btn) => {
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
    ? (isModal ? "Remove fav" : "Remove")
    : (isModal ? "Add to favorite" : "Add to");
}