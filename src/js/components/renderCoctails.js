import { Favorites } from "../utils/favorites.js";

export const CocktailComponents = {
  createCocktailItem(cocktail) {
    const isFavorite = Favorites.isFavorite(cocktail.idDrink);
    return `
      <li class="cocktails__item" data-aos="fade-up" data-aos-duration="1000" data-id="${cocktail.idDrink}">
        <img src="${cocktail.strDrinkThumb}" 
             alt="${cocktail.strDrink}" 
             class="cocktails__image">
        <h3 class="cocktails__name">${cocktail.strDrink}</h3>
        <div class="cocktails__box">
          <button type="button" class="cocktails__learn-more js-learn-more">
            Learn more
          </button>
          <button type="button" class="cocktails__favorite js-favorite ${isFavorite ? 'is-active' : ''}">
            <span class="cocktails__favorite-title">${isFavorite ? "Remove" : "Add to"}</span>
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
      .map(drink => this.createCocktailItem(drink))
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
                    .map(
                      (item) => `
                    <li class="cocktails-modal__item">
                      <p class="cocktails-modal__ingredients">
                        <span class="cocktails-modal__ingredients-span">✶</span>
                        ${item.measure} ${item.ingredient}
                      </p>
                    </li>
                  `
                    )
                    .join("")}
							          <button type="button" 
                  class="cocktails-modal__favorite-button js-favorite ${isFavorite ? 'is-active' : ''}"
                  data-id="${cocktail.idDrink}">
            <span class="button-text">${isFavorite ? "Remove fav" : "Add to favorite"}</span>
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

  renderFavoritesList(container, drinks) {
    const validDrinks = drinks.filter(drink => drink && drink.idDrink);
    
    if (validDrinks.length === 0) {
      container.innerHTML = `
        <h3 class="favorite-coctails__pretitle">You haven't added any favorite cocktails yet</h3>
      `;
      return;
    }
  
    container.innerHTML = validDrinks
      .map(drink => this.createCocktailItem(drink))
      .join('');
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
  }
};