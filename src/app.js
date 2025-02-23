import { CocktailAPI } from "./js/API/api.js";
import { CocktailComponents } from "./js/components/renderCoctails.js";

document.addEventListener("DOMContentLoaded", initApp);

async function searchHeader() {
  const search = document.querySelector(".header__btn");
  const searchInput = document.querySelector(".header__input");
  const cocktailsList = document.querySelector(".cocktails__list");

  search.addEventListener("click", async (e) => {
    try {
      const data = await CocktailAPI.fetchCocktailsByName(searchInput.value);
      CocktailComponents.renderCocktailsList(cocktailsList, data);
    } catch (error) {
      handleError(cocktailsList);
    }
  });

  const mobMenu = document.querySelector(".hero__mob-box");

  mobMenu.addEventListener("click", async (e) => {
    try {
			const data = await CocktailAPI.fetchCocktailsByName(e.srcElement.textContent);
      CocktailComponents.renderCocktailsList(cocktailsList, data);
		} catch (error) {
			handleError(cocktailsList);
		}
  });
}

searchHeader();

async function initApp() {
  const cocktailsList = document.querySelector(".cocktails__list");

  try {
    const data = await CocktailAPI.fetchNonAlcoholicCocktails();
    CocktailComponents.renderCocktailsList(cocktailsList, data.drinks);
  } catch (error) {
    handleError(cocktailsList);
  }

  cocktailsList.addEventListener("click", handleCocktailClick);
}

function handleError(container) {
  console.error("Error:");
  container.innerHTML = `
    <li class="error-item">
      <p class="error-message">Sorry, we didn't find any cocktail for you</p>
		<img class="error-image" src="./images/failed.png" alt="failed to load cocktails">
    </li>
  `;
}

async function handleCocktailClick(event) {
  const learnMoreBtn = event.target.closest(".cocktails__learn-more");
  if (!learnMoreBtn) return;

  const cocktailItem = learnMoreBtn.closest(".cocktails__item");
  const cocktailId = cocktailItem.dataset.id;

  try {
    const data = await CocktailAPI.fetchCocktailById(cocktailId);
    const modalHtml = CocktailComponents.renderModal(data.drinks[0]);
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    setupModal();
  } catch (error) {
    console.error("Failed to fetch cocktail details:", error);
  }
}

function setupModal() {
  const backdrop = document.querySelector(".cocktails-modal__backdrop");
  backdrop.classList.add("is-visible");

  const closeBtn = backdrop.querySelector(".cocktails-modal__close");
  closeBtn.addEventListener("click", () => {
    backdrop.remove();
  });

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      backdrop.remove();
    }
  });
}
