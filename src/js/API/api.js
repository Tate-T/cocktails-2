export const CocktailAPI = {
  async fetchNonAlcoholicCocktails() {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
    );
    return response.json();
  },

  async fetchCocktailById(id) {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return response.json();
  },

  async fetchCocktailsByName(name) {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    const nonAlcoholicDrinks = data.drinks.filter(
      (drink) => drink.strAlcoholic === "Non alcoholic"
    );
    return nonAlcoholicDrinks;
  },
  
  async fetchIngredientByName(name) {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
    );
    return response.json();
  }
};