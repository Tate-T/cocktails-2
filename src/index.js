<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import './js/components/header'
=======
>>>>>>> Stashed changes
import { CocktailAPI } from './js/API/api.js';
import { CocktailComponents } from './/js/components/renderCoctails.js';

document.addEventListener('DOMContentLoaded', async () => {
  const cocktailsList = document.querySelector('.cocktails__list');
  
  try {
    const data = await CocktailAPI.fetchNonAlcoholicCocktails();
    CocktailComponents.renderCocktailsList(cocktailsList, data.drinks);
  } catch (error) {
    console.error(error);
    cocktailsList.innerHTML = `
      <li class="error-message">
        Failed to load cocktails. Please try again later.
      </li>
    `;
  }
<<<<<<< Updated upstream
});
=======
});
>>>>>>> 6695daee9d6754ce71791bc059e1ece3658e3b22
>>>>>>> Stashed changes
