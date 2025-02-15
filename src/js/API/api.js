export const CocktailAPI = {
    async fetchNonAlcoholicCocktails() {
      try {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
        );
        return await response.json();
      } catch (error) {
        throw new Error('Failed to fetch');
      }
    }
  };