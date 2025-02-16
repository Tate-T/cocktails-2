export const Favorites = {
  STORAGE_KEY: 'favoriteCocktails',

  getFavorites() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  },

  addFavorite(id) {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite(id) {
    const favorites = this.getFavorites().filter(item => item !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  },

  isFavorite(id) {
    return this.getFavorites().includes(id);
  }
};