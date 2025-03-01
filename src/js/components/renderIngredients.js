import { Favorites } from "../utils/favorites.js";
import { CocktailAPI } from "../API/api.js";
import { CocktailComponents } from "./renderCoctails.js";

class IngredientManager {
  constructor() {
    console.log("IngredientManager initialized");
    this.container = document.querySelector(".favorite-ingredients__list");
    this.pretitle = document.querySelector(".favorite-ingredients__pretitle");

    console.log("Container:", this.container);
    console.log("Pretitle:", this.pretitle);

    if (!this.container || !this.pretitle) {
      console.error("DOM elements not found");
      return;
    }

    this.init();
  }

  async init() {
    try {
      const names = Favorites.getFavoriteIngredients();
      console.log("Favorite ingredients:", names);

      if (!names.length) {
        console.log("No favorite ingredients found");
        this.showMessage("You haven't added any favorite ingredients yet");
        return;
      }

      const ingredients = await this.loadIngredients(names);
      if (ingredients.length === 0) {
        this.showMessage("No ingredients found");
        return;
      }

      const uniqueIngredients = Array.from(
        new Map(
          ingredients.map((i) => [i.strIngredient.toLowerCase(), i])
        ).values()
      );

      CocktailComponents.renderFavoriteIngredients(
        this.container,
        uniqueIngredients
      );
      this.pretitle.style.display = "none";

      this.setupEventListeners();
    } catch (error) {
      this.showMessage("Failed to load favorite ingredients");
      console.error("Error loading ingredients:", error);
    }
  }

  async loadIngredients(names) {
    const uniqueNames = [...new Set(names.map((name) => name.toLowerCase()))];

    const responses = await Promise.all(
      uniqueNames.map((name) => CocktailAPI.fetchIngredientByName(name))
    );

    return responses
      .filter((res) => res.ingredients?.[0])
      .map((res) => res.ingredients[0]);
  }

  setupEventListeners() {
    this.container.addEventListener("click", async (event) => {
      const detailsBtn = event.target.closest(".js-ingredient-details");
      if (detailsBtn) {
        const ingredientItem = detailsBtn.closest("[data-ingredient]");
        if (ingredientItem) {
          const ingredientName = ingredientItem.dataset.ingredient;
          try {
            const data = await CocktailAPI.fetchIngredientByName(
              ingredientName
            );
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
            this.setupIngredientModal();
          } catch (error) {
            console.error("Failed to fetch ingredient details:", error);
          }
        }
      }

      const favoriteBtn = event.target.closest(".js-ingredient-favorite");
      if (favoriteBtn) {
        const ingredientName = favoriteBtn.dataset.ingredient;
        if (ingredientName) {
          this.toggleFavoriteIngredient(ingredientName, favoriteBtn);
        }
      }
    });
  }

  setupIngredientModal() {
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
        this.toggleFavoriteIngredient(ingredientName, favoriteBtn);
      });
    }
  }

  toggleFavoriteIngredient(ingredientName, button) {
    if (!ingredientName) return;

    const isFavorite = Favorites.isIngredientFavorite(ingredientName);
    const newState = !isFavorite;

    newState
      ? Favorites.addFavoriteIngredient(ingredientName)
      : Favorites.removeFavoriteIngredient(ingredientName);

    button.classList.toggle("is-active", newState);
    this.updateIngredientButtonUI(button, newState);

    if (!newState && this.container.closest(".favorite-ingredients")) {
      const normalizedName = ingredientName.toLowerCase();
      const itemsToRemove = Array.from(
        this.container.querySelectorAll("[data-ingredient]")
      ).filter((el) => el.dataset.ingredient.toLowerCase() === normalizedName);

      itemsToRemove.forEach((item) => item.remove());

      const hasItems = !!this.container.querySelector("li");
      this.pretitle.style.display = hasItems ? "none" : "block";
      if (!hasItems) {
        this.showMessage("You haven't added any favorite ingredients yet");
      }
    }

    document.querySelectorAll(".js-ingredient-favorite").forEach((btn) => {
      if (
        btn !== button &&
        btn.dataset.ingredient &&
        btn.dataset.ingredient.toLowerCase() === ingredientName.toLowerCase()
      ) {
        btn.classList.toggle("is-active", newState);
        this.updateIngredientButtonUI(btn, newState);
      }
    });
  }

  updateIngredientButtonUI(button, isActive) {
    const textElement =
      button.querySelector(".cocktails__favorite-title") ||
      button.querySelector(".button-text") ||
      button;
    const isModal = button.classList.contains(
      "cocktails-modal__favorite-button"
    );

    if (textElement) {
      textElement.textContent = isActive
        ? isModal
          ? "Remove fav"
          : "Remove"
        : isModal
        ? "Add to favorite"
        : "Add to";
    }
  }

  showMessage(text) {
    this.pretitle.textContent = text;
    this.pretitle.style.display = "block";
    this.container.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".favorite-ingredients__list")) {
    new IngredientManager();
  }
});
