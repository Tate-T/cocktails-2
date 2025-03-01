import { Favorites } from "../utils/favorites.js";

export const CocktailComponents = {
  createCocktailItem(cocktail) {
    const isFavorite = Favorites.isFavorite(cocktail.idDrink);
    return `
      <li class="cocktails__item" data-aos="fade-up" data-aos-duration="1000" data-id="${
        cocktail.idDrink
      }">
        <img src="${cocktail.strDrinkThumb}" 
             alt="${cocktail.strDrink}" 
             class="cocktails__image">
        <h3 class="cocktails__name">${cocktail.strDrink}</h3>
        <div class="cocktails__box">
          <button type="button" class="cocktails__learn-more js-learn-more">
            Learn more
          </button>
          <button type="button" class="cocktails__favorite js-favorite ${
            isFavorite ? "is-active" : ""
          }">
            <span class="cocktails__favorite-title">${
              isFavorite ? "Remove" : "Add to"
            }</span>
            <svg class="cocktails__favorite-icon">
              <use href="./images/symbol-defs.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
      </li>
    `;
  },

  renderCocktailsList(container, drinks) {
    container.innerHTML = drinks
      .map((drink) => this.createCocktailItem(drink))
      .join("");
  },

  renderModal(cocktail) {
    const ingredients = this.getIngredientsList(cocktail);
    const isFavorite = Favorites.isFavorite(cocktail.idDrink);

    return `
        <div class="cocktails-modal__backdrop">
          <div class="cocktails-modal">
            <div class="cocktails-modal__box">
              <img src="${cocktail.strDrinkThumb}" 
                   alt="${cocktail.strDrink}" 
                   class="cocktails-modal__img" />
              <div class="cocktails-modal__ingredients-box">
                <h3 class="cocktails-modal__name">${cocktail.strDrink}</h3>
                <p class="cocktails-modal__text">INGREDIENTS</p>
                <p class="cocktails-modal__subtext">Per cocktail</p>
                <ul class="cocktails-modal__list">
                  ${ingredients
                    .map((item) => {
                      const isIngredientFavorite =
                        Favorites.isIngredientFavorite(item.ingredient);
                      return `
                          <li class="cocktails-modal__item">
                            <p class="cocktails-modal__ingredients">
                              <span class="cocktails-modal__ingredients-span">✶</span>
                              ${
                                item.measure
                              } <span class="js-ingredient-link" data-ingredient="${
                        item.ingredient
                      }">${item.ingredient}</span>
                              <button type="button" class="ingredient-favorite-btn js-ingredient-favorite ${
                                isIngredientFavorite ? "is-active" : ""
                              }" data-ingredient="${item.ingredient}">
                                <svg class="ingredient-favorite-icon" width="16" height="16">
                                  <use href="./images/symbol-defs.svg#icon-heart"></use>
                                </svg>
                              </button>
                            </p>
                          </li>
                        `;
                    })
                    .join("")}
                  <button type="button" 
                    class="cocktails-modal__favorite-button js-favorite ${
                      isFavorite ? "is-active" : ""
                    }"
                    data-id="${cocktail.idDrink}">
                    <span class="button-text">${
                      isFavorite ? "Remove fav" : "Add to favorite"
                    }</span>
                  </button>
                </ul>
              </div>
            </div>
            <div>
              <p class="cocktails-modal__instractions">INSTRUCTIONS:</p>
              <p class="cocktails-modal__instractions-text">
                ${cocktail.strInstructions}
              </p>
              <button type="button" class="cocktails-modal__close js-modal-close">
                <svg class="cocktails-modal__close-icon">
                  <use href="./images/symbol-defs.svg#icon-cross-close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
    `;
  },

  renderIngredientModal(ingredient) {
    const isIngredientFavorite = Favorites.isIngredientFavorite(
      ingredient.strIngredient
    );

    return `
      <div class="cocktails-modal__backdrop ingredient-modal-backdrop">
        <div class="cocktails-modal">
          <div class="cocktails-modal__box ingredient-modal-box">
            <img src="https://www.thecocktaildb.com/images/ingredients/${
              ingredient.strIngredient
            }-Medium.png" 
                 alt="${ingredient.strIngredient}" 
                 class="cocktails-modal__img" />
            <div class="cocktails-modal__ingredients-box">
              <h3 class="cocktails-modal__name">${ingredient.strIngredient}</h3>
              <p class="cocktails-modal__text">DETAILS</p>
              ${
                ingredient.strType
                  ? `<p class="cocktails-modal__subtext">Type: ${ingredient.strType}</p>`
                  : ""
              }
              ${
                ingredient.strAlcohol === "Yes"
                  ? `<p class="cocktails-modal__subtext ingredient-alcohol">Contains alcohol</p>`
                  : ""
              }
              <button type="button" 
                class="cocktails-modal__favorite-button js-favorite ${
                  isIngredientFavorite ? "is-active" : ""
                }"
                data-ingredient="${ingredient.strIngredient}">
                <span class="button-text">${
                  isIngredientFavorite ? "Remove fav" : "Add to fav"
                }</span>
              </button>
            </div>
          </div>
          <div>
            <p class="cocktails-modal__instractions">DESCRIPTION:</p>
            <p class="cocktails-modal__instractions-text">
              ${
                ingredient.strDescription ||
                "No description available for this ingredient."
              }
            </p>
            <button type="button" class="cocktails-modal__close js-ingredient-modal-close">
              <svg class="cocktails-modal__close-icon">
                <use href="./images/symbol-defs.svg#icon-cross-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderFavoritesList(container, drinks) {
    const validDrinks = drinks.filter((drink) => drink && drink.idDrink);

    if (validDrinks.length === 0) {
      container.innerHTML = `
        <h3 class="favorite-coctails__pretitle">You haven't added any favorite cocktails yet</h3>
      `;
      return;
    }

    container.innerHTML = validDrinks
      .map((drink) => this.createCocktailItem(drink))
      .join("");
  },

  createIngredientItem(ingredient) {
    if (!ingredient?.strIngredient) return "";

    const isFavorite = Favorites.isIngredientFavorite(ingredient.strIngredient);
    const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
      ingredient.strIngredient
    )}-Medium.png`;

    return `
      <li class="cocktails__item" 
          data-ingredient="${ingredient.strIngredient}"
          data-aos="fade-up"
          data-aos-duration="1000">
        <img src="${imageUrl}" 
             alt="${ingredient.strIngredient}" 
             class="cocktails__image"
             onerror="this.src='./images/placeholder.png'">
        <h3 class="cocktails__name">${ingredient.strIngredient}</h3>
        <div class="cocktails__box">
          <button type="button" 
                  class="cocktails__learn-more js-ingredient-details">
            Learn more
          </button>
          <button type="button" 
                  class="cocktails__favorite js-favorite ${
                    isFavorite ? "is-active" : ""
                  }"
                  data-ingredient="${ingredient.strIngredient}">
            <span class="cocktails__favorite-title">${
              isFavorite ? "Remove" : "Add to"
            }</span>
            <svg class="cocktails__favorite-icon">
              <use href="./images/symbol-defs.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
      </li>
    `;
  },

  renderFavoriteIngredients(container, ingredients) {
    if (!container) {
      console.error("Container not found for ingredients");
      return;
    }

    if (ingredients.length === 0) {
      container.innerHTML = `
        <h3 class="favorite-coctails__pretitle">No ingredients found</h3>
      `;
      return;
    }

    container.innerHTML = ingredients
      .map((ingredient) => this.createIngredientItem(ingredient))
      .join("");
  },

  getIngredientsList(cocktail) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  },
};
