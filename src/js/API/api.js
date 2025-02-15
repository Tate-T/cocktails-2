export const CocktailAPI = {
    async fetchNonAlcoholicCocktails() {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
      );
      return response.json();
    },
  
    async fetchCocktailById(id) {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return response.json();
    }
  };