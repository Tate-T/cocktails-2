import { CocktailAPI } from "./API/api.js";
import { CocktailComponents } from "./components/renderCoctails.js";
import { Favorites } from "./utils/favorites.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".favorite-coctails__list");
  const pretitle = document.querySelector(".favorite-coctails__pretitle");

  if (!container || !pretitle) {
    return;
  }

  const favoriteIds = Favorites.getFavorites();

  if (favoriteIds.length === 0) {
    pretitle.textContent = "You haven't added any favorite cocktails yet";
    pretitle.style.display = "block";
    container.innerHTML = "";
    return;
  }

  try {
    const drinks = await loadFavoriteDrinks(favoriteIds);
    if (!drinks.length) {
      pretitle.textContent = "No favorite cocktails found";
      pretitle.style.display = "block";
      return;
    }

    CocktailComponents.renderFavoritesList(container, drinks);
    pretitle.style.display = "none";
    setupGlobalListeners();
  } catch (error) {
    handleFavoriteError(error);
  }
});

async function loadFavoriteDrinks(ids) {
  const requests = ids.map((id) => CocktailAPI.fetchCocktailById(id));
  const responses = await Promise.all(requests);
  return responses
    .filter((response) => response?.drinks?.[0])
    .map((response) => response.drinks[0]);
}

function setupGlobalListeners() {
  document.addEventListener("click", (event) => {
    handleLearnMoreClick(event);
    handleFavoriteClick(event);
    handleIngredientClick(event);
  });
}

async function handleLearnMoreClick(event) {
  const learnMoreBtn = event.target.closest(".js-learn-more");
  if (!learnMoreBtn) return;

  const cocktailItem = learnMoreBtn.closest("[data-id]");
  if (!cocktailItem) return;

  const cocktailId = cocktailItem.dataset.id;

  try {
    const data = await CocktailAPI.fetchCocktailById(cocktailId);
    if (!data?.drinks?.[0]) throw new Error("No cocktail data");

    const modalHtml = CocktailComponents.renderModal(data.drinks[0]);

    document
      .querySelectorAll(
        ".cocktails-modal__backdrop:not(.ingredient-modal-backdrop)"
      )
      .forEach((m) => m.remove());
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    setupModal(cocktailId);
  } catch (error) {
    console.error("Failed to fetch cocktail details:", error);
  }
}

async function handleIngredientClick(event) {
  const ingredientLink = event.target.closest(".js-ingredient-link");
  if (!ingredientLink) return;

  const ingredientName = ingredientLink.dataset.ingredient;

  try {
    const data = await CocktailAPI.fetchIngredientByName(ingredientName);
    if (!data?.ingredients?.[0]) {
      throw new Error("No ingredient data");
    }

    document
      .querySelectorAll(".ingredient-modal-backdrop")
      .forEach((m) => m.remove());

    const modalHtml = CocktailComponents.renderIngredientModal(
      data.ingredients[0]
    );
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    setupIngredientModal();
  } catch (error) {
    console.error("Failed to fetch ingredient details:", error);
  }
}

function handleFavoriteClick(event) {
  const favoriteBtn = event.target.closest(".js-favorite");
  if (!favoriteBtn) return;

  const cocktailItem = favoriteBtn.closest("[data-id]");
  if (!cocktailItem) return;

  const cocktailId = cocktailItem.dataset.id;

  toggleFavorite(cocktailId, favoriteBtn);

  if (!Favorites.isFavorite(cocktailId)) {
    const itemToRemove = document.querySelector(`
      .favorite-coctails__list [data-id="${cocktailId}"]
    `);
    if (itemToRemove) {
      itemToRemove.remove();

      const hasItems = !!document.querySelector(".favorite-coctails__list li");
      const pretitle = document.querySelector(".favorite-coctails__pretitle");
      if (pretitle) {
        pretitle.textContent = "You haven't added any favorite cocktails yet";
        pretitle.style.display = hasItems ? "none" : "block";
      }
    }
  }
}

function setupModal(cocktailId) {
  const backdrop = document.querySelector(
    ".cocktails-modal__backdrop:not(.ingredient-modal-backdrop)"
  );
  if (!backdrop) return;

  setTimeout(() => backdrop.classList.add("is-visible"), 10);

  const closeModal = () => {
    backdrop.classList.remove("is-visible");
    setTimeout(() => backdrop.remove(), 300);
  };

  backdrop
    .querySelector(".js-modal-close")
    ?.addEventListener("click", closeModal);
  backdrop.addEventListener(
    "click",
    (e) => e.target === backdrop && closeModal()
  );

  const modalFavoriteBtn = backdrop.querySelector(".js-favorite");
  if (modalFavoriteBtn) {
    modalFavoriteBtn.addEventListener("click", () =>
      toggleFavorite(cocktailId, modalFavoriteBtn)
    );
  }

  backdrop.querySelectorAll(".js-ingredient-favorite").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ingredientName = btn.dataset.ingredient;
      if (ingredientName) {
        toggleFavoriteIngredient(ingredientName, btn);
      }
    });
  });
}

function setupIngredientModal() {
  const backdrop = document.querySelector(".ingredient-modal-backdrop");
  if (!backdrop) return;

  setTimeout(() => backdrop.classList.add("is-visible"), 10);

  const closeModal = () => {
    backdrop.classList.remove("is-visible");
    setTimeout(() => backdrop.remove(), 300);
  };

  backdrop
    .querySelector(".js-ingredient-modal-close")
    ?.addEventListener("click", closeModal);
  backdrop.addEventListener(
    "click",
    (e) => e.target === backdrop && closeModal()
  );

  const favoriteBtn = backdrop.querySelector(".js-ingredient-favorite");
  if (favoriteBtn) {
    const ingredientName = favoriteBtn.dataset.ingredient;
    favoriteBtn.addEventListener("click", () => {
      toggleFavoriteIngredient(ingredientName, favoriteBtn);
    });
  }
}

function toggleFavorite(id, button) {
  const isFavorite = Favorites.isFavorite(id);
  const newState = !isFavorite;

  newState ? Favorites.addFavorite(id) : Favorites.removeFavorite(id);

  button.classList.toggle("is-active", newState);
  updateButtonUI(button, newState);

  document
    .querySelectorAll(
      `[data-id="${id}"] .js-favorite, .cocktails-modal__favorite-button[data-id="${id}"]`
    )
    .forEach((btn) => {
      if (btn !== button) {
        btn.classList.toggle("is-active", newState);
        updateButtonUI(btn, newState);
      }
    });
}

function toggleFavoriteIngredient(ingredientName, button) {
  const isFavorite = Favorites.isIngredientFavorite(ingredientName);
  const newState = !isFavorite;

  newState
    ? Favorites.addFavoriteIngredient(ingredientName)
    : Favorites.removeFavoriteIngredient(ingredientName);

  button.classList.toggle("is-active", newState);
  updateIngredientButtonUI(button, newState);

  document
    .querySelectorAll(
      `.js-ingredient-favorite[data-ingredient="${ingredientName}"]`
    )
    .forEach((btn) => {
      if (btn !== button) {
        btn.classList.toggle("is-active", newState);
        updateIngredientButtonUI(btn, newState);
      }
    });
}

function updateButtonUI(button, isActive) {
  const textElement =
    button.querySelector(".cocktails__favorite-title") ||
    button.querySelector(".button-text") ||
    button;
  const isModal = button.classList.contains("cocktails-modal__favorite-button");

  if (textElement) {
    textElement.textContent = isActive
      ? isModal
        ? "Remove from favorite"
        : "Remove"
      : isModal
      ? "Add to favorite"
      : "Add to";
  }
}

function updateIngredientButtonUI(button, isActive) {
  const textElement =
    button.querySelector(".cocktails__favorite-title") ||
    button.querySelector(".button-text") ||
    button;
  const isModal = button.classList.contains("cocktails-modal__favorite-button");

  if (textElement) {
    textElement.textContent = isActive
      ? isModal
        ? "Remove from favorite"
        : "Remove"
      : isModal
      ? "Add to favorite"
      : "Add to";
  }
}

function handleFavoriteError(error) {
  console.error("Error loading favorites:", error);
  const pretitle = document.querySelector(".favorite-coctails__pretitle");
  if (pretitle) {
    pretitle.textContent = "Failed to load favorite cocktails";
    pretitle.style.display = "block";
  }
}
