export const CocktailComponents = {
    createCocktailItem(cocktail) {
      return `
        <li class="cocktails__item">
          <img src="${cocktail.strDrinkThumb}" 
               alt="${cocktail.strDrink}" 
               class="cocktails__image">
          <h3 class="cocktails__name">${cocktail.strDrink}</h3>
          <div class="cocktails__box">
            <button type="button" class="cocktails__learn-more">
              Learn more
            </button>
            <button type="button" class="cocktails__favorite">
              <span class="cocktails__favorite-title">Add to</span>
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
        .join('');
    }
  };