export const Favorites = {
  COCKTAILS_STORAGE_KEY: "favoriteCocktails",
  INGREDIENTS_STORAGE_KEY: "favoriteIngredients",

  getFavorites() {
    return JSON.parse(localStorage.getItem(this.COCKTAILS_STORAGE_KEY)) || [];
  },

  addFavorite(id) {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(
        this.COCKTAILS_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    }
  },

  removeFavorite(id) {
    const favorites = this.getFavorites().filter((item) => item !== id);
    localStorage.setItem(this.COCKTAILS_STORAGE_KEY, JSON.stringify(favorites));
  },

  isFavorite(id) {
    return this.getFavorites().includes(id);
  },

  getFavoriteIngredients() {
    return JSON.parse(localStorage.getItem(this.INGREDIENTS_STORAGE_KEY)) || [];
  },

  addFavoriteIngredient(ingredient) {
    const favorites = this.getFavoriteIngredients();
    const normalizedName = ingredient.trim();

    if (
      !favorites.some(
        (item) => item.toLowerCase() === normalizedName.toLowerCase()
      )
    ) {
      favorites.push(normalizedName);
      localStorage.setItem(
        this.INGREDIENTS_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    }
  },

  removeFavoriteIngredient(ingredient) {
    const favorites = this.getFavoriteIngredients();
    const normalizedName = ingredient.trim().toLowerCase();
    const filteredFavorites = favorites.filter(
      (item) => item.toLowerCase() !== normalizedName
    );

    localStorage.setItem(
      this.INGREDIENTS_STORAGE_KEY,
      JSON.stringify(filteredFavorites)
    );
  },

  isIngredientFavorite(ingredient) {
    if (!ingredient) return false;

    const favorites = this.getFavoriteIngredients();
    const normalizedName = ingredient.trim().toLowerCase();

    return favorites.some((item) => item.toLowerCase() === normalizedName);
  },
};
