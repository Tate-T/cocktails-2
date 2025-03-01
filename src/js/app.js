import { CocktailAPI } from "./API/api.js";
import { CocktailComponents } from "./components/renderCoctails.js";
import { Favorites } from "./utils/favorites.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".cocktails__list")) {
    initApp();
    searchHeader();
  }
});

async function searchHeader() {
  const search = document.querySelector(".header__btn");
  const searchInput = document.querySelector(".header__input");
  const cocktailsList = document.querySelector(".cocktails__list");

  if (search && searchInput && cocktailsList) {
    search.addEventListener("click", async () => {
      try {
        const value = searchInput.value.trim();
        if (!value) return;

        const data = await CocktailAPI.fetchCocktailsByName(value);
        CocktailComponents.renderCocktailsList(cocktailsList, data);
      } catch (error) {
        handleError(cocktailsList, error);
      }
    });
  }

  const mobMenu = document.querySelector(".hero__mob-box");
  if (mobMenu && cocktailsList) {
    mobMenu.addEventListener("click", async (e) => {
      if (!e.target.textContent.trim()) return;

      try {
        const data = await CocktailAPI.fetchCocktailsByName(
          e.target.textContent.trim()
        );
        CocktailComponents.renderCocktailsList(cocktailsList, data);
      } catch (error) {
        handleError(cocktailsList, error);
      }
    });
  }
}

async function initApp() {
  const cocktailsList = document.querySelector(".cocktails__list");
  if (!cocktailsList) return;

  try {
    const data = await CocktailAPI.fetchNonAlcoholicCocktails();
    if (!data?.drinks?.length) {
      handleError(cocktailsList, new Error("No drinks found"));
      return;
    }
    CocktailComponents.renderCocktailsList(cocktailsList, data.drinks);
  } catch (error) {
    handleError(cocktailsList, error);
  }

  cocktailsList.addEventListener("click", handleCocktailClick);
  document.body.addEventListener("click", handleIngredientClick);
}

function handleError(container, error) {
  console.error("Error:", error);
  if (!container) return;

  container.innerHTML = `
    <li class="error-item">
      <p class="error-message">Sorry, we didn't find any cocktail for you</p>
      <img class="error-image" src="./images/failed.png" alt="failed to load cocktails">
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

      document
        .querySelectorAll(".cocktails-modal__backdrop")
        .forEach((m) => m.remove());

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

async function handleIngredientClick(event) {
  const ingredientLink = event.target.closest(".js-ingredient-link");
  if (ingredientLink) {
    const ingredientName = ingredientLink.dataset.ingredient;
    if (!ingredientName) return;

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
    return;
  }

  const ingredientFavoriteBtn = event.target.closest(".js-ingredient-favorite");
  if (ingredientFavoriteBtn) {
    const ingredientName = ingredientFavoriteBtn.dataset.ingredient;
    if (ingredientName) {
      toggleFavoriteIngredient(ingredientName, ingredientFavoriteBtn);
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
    modalFavoriteBtn.addEventListener("click", () => {
      toggleFavorite(cocktailId, modalFavoriteBtn);
    });
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
    favoriteBtn.addEventListener("click", () => {
      const ingredientName = favoriteBtn.dataset.ingredient;
      if (ingredientName) {
        toggleFavoriteIngredient(ingredientName, favoriteBtn);
      }
    });
  }
}

function toggleFavorite(id, button) {
  if (!id) return;

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

function toggleFavoriteIngredient(ingredientName, button) {
  if (!ingredientName) return;

  const isFavorite = Favorites.isIngredientFavorite(ingredientName);
  const newState = !isFavorite;

  newState
    ? Favorites.addFavoriteIngredient(ingredientName)
    : Favorites.removeFavoriteIngredient(ingredientName);

  button.classList.toggle("is-active", newState);
  updateIngredientButtonUI(button, newState);

  const normalizedName = ingredientName.toLowerCase();
  document.querySelectorAll(".js-ingredient-favorite").forEach((btn) => {
    if (
      btn !== button &&
      btn.dataset.ingredient &&
      btn.dataset.ingredient.toLowerCase() === normalizedName
    ) {
      btn.classList.toggle("is-active", newState);
      updateIngredientButtonUI(btn, newState);
    }
  });
}

function updateButtonUI(button, isActive) {
  const textElement =
    button.querySelector(".cocktails__favorite-title") || button;
  const isModal = button.classList.contains("cocktails-modal__favorite-button");

  textElement.textContent = isActive
    ? isModal
      ? "Remove fav"
      : "Remove"
    : isModal
    ? "Add to favorite"
    : "Add to";
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
        ? "Remove fav"
        : "Remove"
      : isModal
      ? "Add fav"
      : "Add to";
  }
}
