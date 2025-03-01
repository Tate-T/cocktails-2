(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const u={async fetchNonAlcoholicCocktails(){return(await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")).json()},async fetchCocktailById(e){return(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e}`)).json()},async fetchCocktailsByName(e){return(await(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e}`)).json()).drinks.filter(s=>s.strAlcoholic==="Non alcoholic")},async fetchIngredientByName(e){return(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${e}`)).json()}},a={COCKTAILS_STORAGE_KEY:"favoriteCocktails",INGREDIENTS_STORAGE_KEY:"favoriteIngredients",getFavorites(){return JSON.parse(localStorage.getItem(this.COCKTAILS_STORAGE_KEY))||[]},addFavorite(e){const t=this.getFavorites();t.includes(e)||(t.push(e),localStorage.setItem(this.COCKTAILS_STORAGE_KEY,JSON.stringify(t)))},removeFavorite(e){const t=this.getFavorites().filter(o=>o!==e);localStorage.setItem(this.COCKTAILS_STORAGE_KEY,JSON.stringify(t))},isFavorite(e){return this.getFavorites().includes(e)},getFavoriteIngredients(){return JSON.parse(localStorage.getItem(this.INGREDIENTS_STORAGE_KEY))||[]},addFavoriteIngredient(e){const t=this.getFavoriteIngredients(),o=e.trim();t.some(i=>i.toLowerCase()===o.toLowerCase())||(t.push(o),localStorage.setItem(this.INGREDIENTS_STORAGE_KEY,JSON.stringify(t)))},removeFavoriteIngredient(e){const t=this.getFavoriteIngredients(),o=e.trim().toLowerCase(),i=t.filter(s=>s.toLowerCase()!==o);localStorage.setItem(this.INGREDIENTS_STORAGE_KEY,JSON.stringify(i))},isIngredientFavorite(e){if(!e)return!1;const t=this.getFavoriteIngredients(),o=e.trim().toLowerCase();return t.some(i=>i.toLowerCase()===o)}},m={createCocktailItem(e){const t=a.isFavorite(e.idDrink);return`
      <li class="cocktails__item" data-aos="fade-up" data-aos-duration="1000" data-id="${e.idDrink}">
        <img src="${e.strDrinkThumb}" 
             alt="${e.strDrink}" 
             class="cocktails__image">
        <h3 class="cocktails__name">${e.strDrink}</h3>
        <div class="cocktails__box">
          <button type="button" class="cocktails__learn-more js-learn-more">
            Learn more
          </button>
          <button type="button" class="cocktails__favorite js-favorite ${t?"is-active":""}">
            <span class="cocktails__favorite-title">${t?"Remove":"Add to"}</span>
            <svg class="cocktails__favorite-icon">
              <use href="/cocktails-2/assets/symbol-defs-1fa6411f.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
      </li>
    `},renderCocktailsList(e,t){e.innerHTML=t.map(o=>this.createCocktailItem(o)).join("")},renderModal(e){const t=this.getIngredientsList(e),o=a.isFavorite(e.idDrink);return`
        <div class="cocktails-modal__backdrop">
          <div class="cocktails-modal">
            <div class="cocktails-modal__box">
              <img src="${e.strDrinkThumb}" 
                   alt="${e.strDrink}" 
                   class="cocktails-modal__img" />
              <div class="cocktails-modal__ingredients-box">
                <h3 class="cocktails-modal__name">${e.strDrink}</h3>
                <p class="cocktails-modal__text">INGREDIENTS</p>
                <p class="cocktails-modal__subtext">Per cocktail</p>
                <ul class="cocktails-modal__list">
                  ${t.map(i=>{const s=a.isIngredientFavorite(i.ingredient);return`
                          <li class="cocktails-modal__item">
                            <p class="cocktails-modal__ingredients">
                              <span class="cocktails-modal__ingredients-span">✶</span>
                              ${i.measure} <span class="js-ingredient-link" data-ingredient="${i.ingredient}">${i.ingredient}</span>
                              <button type="button" class="ingredient-favorite-btn js-ingredient-favorite ${s?"is-active":""}" data-ingredient="${i.ingredient}">
                                <svg class="ingredient-favorite-icon" width="16" height="16">
                                  <use href="./images/symbol-defs.svg#icon-heart"></use>
                                </svg>
                              </button>
                            </p>
                          </li>
                        `}).join("")}
                  <button type="button" 
                    class="cocktails-modal__favorite-button js-favorite ${o?"is-active":""}"
                    data-id="${e.idDrink}">
                    <span class="button-text">${o?"Remove fav":"Add to favorite"}</span>
                  </button>
                </ul>
              </div>
            </div>
            <div>
              <p class="cocktails-modal__instractions">INSTRUCTIONS:</p>
              <p class="cocktails-modal__instractions-text">
                ${e.strInstructions}
              </p>
              <button type="button" class="cocktails-modal__close js-modal-close">
                <svg class="cocktails-modal__close-icon">
                  <use href="./images/symbol-defs.svg#icon-cross-close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
    `},renderIngredientModal(e){const t=a.isIngredientFavorite(e.strIngredient);return`
      <div class="cocktails-modal__backdrop ingredient-modal-backdrop">
        <div class="cocktails-modal">
          <div class="cocktails-modal__box ingredient-modal-box">
            <img src="https://www.thecocktaildb.com/images/ingredients/${e.strIngredient}-Medium.png" 
                 alt="${e.strIngredient}" 
                 class="cocktails-modal__img" />
            <div class="cocktails-modal__ingredients-box">
              <h3 class="cocktails-modal__name">${e.strIngredient}</h3>
              <p class="cocktails-modal__text">DETAILS</p>
              ${e.strType?`<p class="cocktails-modal__subtext">Type: ${e.strType}</p>`:""}
              ${e.strAlcohol==="Yes"?'<p class="cocktails-modal__subtext ingredient-alcohol">Contains alcohol</p>':""}
              <button type="button" 
                class="cocktails-modal__favorite-button js-ingredient-favorite ${t?"is-active":""}"
                data-ingredient="${e.strIngredient}">
                <span class="button-text">${t?"Remove fav":"Add to fav"}</span>
              </button>
            </div>
          </div>
          <div>
            <p class="cocktails-modal__instractions">DESCRIPTION:</p>
            <p class="cocktails-modal__instractions-text">
              ${e.strDescription||"No description available for this ingredient."}
            </p>
            <button type="button" class="cocktails-modal__close js-ingredient-modal-close">
              <svg class="cocktails-modal__close-icon">
                <use href="./images/symbol-defs.svg#icon-cross-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `},renderFavoritesList(e,t){const o=t.filter(i=>i&&i.idDrink);if(o.length===0){e.innerHTML=`
        <h3 class="favorite-coctails__pretitle">You haven't added any favorite cocktails yet</h3>
      `;return}e.innerHTML=o.map(i=>this.createCocktailItem(i)).join("")},createIngredientItem(e){if(!(e!=null&&e.strIngredient))return"";const t=a.isIngredientFavorite(e.strIngredient),o=`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(e.strIngredient)}-Medium.png`;return`
      <li class="cocktails__item" 
          data-ingredient="${e.strIngredient}"
          data-aos="fade-up"
          data-aos-duration="1000">
        <img src="${o}" 
             alt="${e.strIngredient}" 
             class="cocktails__image"
             onerror="this.src='./images/placeholder.png'">
        <h3 class="cocktails__name">${e.strIngredient}</h3>
        <div class="cocktails__box">
          <button type="button" 
                  class="cocktails__learn-more js-ingredient-details">
            Learn more
          </button>
          <button type="button" 
                  class="cocktails__favorite js-ingredient-favorite ${t?"is-active":""}"
                  data-ingredient="${e.strIngredient}">
            <span class="cocktails__favorite-title">${t?"Remove":"Add to"}</span>
            <svg class="cocktails__favorite-icon">
              <use href="./images/symbol-defs.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
      </li>
    `},renderFavoriteIngredients(e,t){if(!e){console.error("Container not found for ingredients");return}if(t.length===0){e.innerHTML=`
        <h3 class="favorite-coctails__pretitle">No ingredients found</h3>
      `;return}e.innerHTML=t.map(o=>this.createIngredientItem(o)).join("")},getIngredientsList(e){const t=[];for(let o=1;o<=15;o++){const i=e[`strIngredient${o}`],s=e[`strMeasure${o}`];i&&t.push({ingredient:i,measure:s||""})}return t}};document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".cocktails__list")&&(S(),L())});async function L(){const e=document.querySelector(".header__btn"),t=document.querySelector(".header__input"),o=document.querySelector(".cocktails__list");e&&t&&o&&e.addEventListener("click",async()=>{try{const s=t.value.trim();if(!s)return;const n=await u.fetchCocktailsByName(s);m.renderCocktailsList(o,n)}catch(s){f(o,s)}});const i=document.querySelector(".hero__mob-box");i&&o&&i.addEventListener("click",async s=>{if(s.target.textContent.trim())try{const n=await u.fetchCocktailsByName(s.target.textContent.trim());m.renderCocktailsList(o,n)}catch(n){f(o,n)}})}async function S(){var t;const e=document.querySelector(".cocktails__list");if(e){try{const o=await u.fetchNonAlcoholicCocktails();if(!((t=o==null?void 0:o.drinks)!=null&&t.length)){f(e,new Error("No drinks found"));return}m.renderCocktailsList(e,o.drinks)}catch(o){f(e,o)}e.addEventListener("click",C),document.body.addEventListener("click",E)}}function f(e,t){console.error("Error:",t),e&&(e.innerHTML=`
    <li class="error-item">
      <p class="error-message">Sorry, we didn't find any cocktail for you</p>
      <img class="error-image" src="./images/failed.png" alt="failed to load cocktails">
    </li>
  `)}async function C(e){var i;const t=e.target.closest(".js-learn-more"),o=e.target.closest(".js-favorite");if(t){const s=t.closest("[data-id]");if(!s)return;const n=s.dataset.id;try{const r=await u.fetchCocktailById(n);if(!((i=r==null?void 0:r.drinks)!=null&&i[0]))throw new Error("No cocktail data");const c=m.renderModal(r.drinks[0]);document.querySelectorAll(".cocktails-modal__backdrop").forEach(l=>l.remove()),document.body.insertAdjacentHTML("beforeend",c),w(n)}catch(r){console.error("Failed to fetch cocktail details:",r)}}if(o){const s=o.closest("[data-id]");if(!s)return;const n=s.dataset.id;y(n,o)}}async function E(e){var i;const t=e.target.closest(".js-ingredient-link");if(t){const s=t.dataset.ingredient;if(!s)return;try{const n=await u.fetchIngredientByName(s);if(!((i=n==null?void 0:n.ingredients)!=null&&i[0]))throw new Error("No ingredient data");document.querySelectorAll(".ingredient-modal-backdrop").forEach(c=>c.remove());const r=m.renderIngredientModal(n.ingredients[0]);document.body.insertAdjacentHTML("beforeend",r),F()}catch(n){console.error("Failed to fetch ingredient details:",n)}return}const o=e.target.closest(".js-ingredient-favorite");if(o){const s=o.dataset.ingredient;s&&p(s,o)}}function w(e){var s;const t=document.querySelector(".cocktails-modal__backdrop:not(.ingredient-modal-backdrop)");if(!t)return;setTimeout(()=>t.classList.add("is-visible"),10);const o=()=>{t.classList.remove("is-visible"),setTimeout(()=>t.remove(),300)};(s=t.querySelector(".js-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>n.target===t&&o());const i=t.querySelector(".js-favorite");i&&i.addEventListener("click",()=>{y(e,i)}),t.querySelectorAll(".js-ingredient-favorite").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.ingredient;r&&p(r,n)})})}function F(){var i;const e=document.querySelector(".ingredient-modal-backdrop");if(!e)return;setTimeout(()=>e.classList.add("is-visible"),10);const t=()=>{e.classList.remove("is-visible"),setTimeout(()=>e.remove(),300)};(i=e.querySelector(".js-ingredient-modal-close"))==null||i.addEventListener("click",t),e.addEventListener("click",s=>s.target===e&&t());const o=e.querySelector(".js-ingredient-favorite");o&&o.addEventListener("click",()=>{const s=o.dataset.ingredient;s&&p(s,o)})}function y(e,t){if(!e)return;const i=!a.isFavorite(e);i?a.addFavorite(e):a.removeFavorite(e),t.classList.toggle("is-active",i),_(t,i),document.querySelectorAll(`
    [data-id="${e}"] .js-favorite,
    .cocktails-modal__favorite-button[data-id="${e}"]
  `).forEach(n=>{n!==t&&(n.classList.toggle("is-active",i),_(n,i))})}function p(e,t){if(!e)return;const i=!a.isIngredientFavorite(e);i?a.addFavoriteIngredient(e):a.removeFavoriteIngredient(e),t.classList.toggle("is-active",i),k(t,i);const s=e.toLowerCase();document.querySelectorAll(".js-ingredient-favorite").forEach(n=>{n!==t&&n.dataset.ingredient&&n.dataset.ingredient.toLowerCase()===s&&(n.classList.toggle("is-active",i),k(n,i))})}function _(e,t){const o=e.querySelector(".cocktails__favorite-title")||e,i=e.classList.contains("cocktails-modal__favorite-button");o.textContent=t?i?"Remove fav":"Remove":i?"Add to favorite":"Add to"}function k(e,t){const o=e.querySelector(".cocktails__favorite-title")||e.querySelector(".button-text")||e,i=e.classList.contains("cocktails-modal__favorite-button");o&&(o.textContent=t?i?"Remove fav":"Remove":i?"Add fav":"Add to")}const d=document.querySelectorAll(".theme-checkbox"),h=document.querySelector("body"),N=document.querySelector(".header__menu-btn"),g=document.querySelector(".header__menu-list"),q=document.querySelector(".header-menu__menu-btn"),v=document.querySelector(".header-menu__menu-list"),T=document.querySelector(".header__mobile-menu-btn"),I=document.querySelector(".header-menu"),j=document.querySelector(".header-menu__close");Object.keys(localStorage).forEach(e=>{if(e.includes("theme")){const t=JSON.parse(localStorage.getItem(e));if(localStorage.getItem(e)===null||t.themeColor==="black"){document.documentElement.style.setProperty("--black","#FCFCFC"),document.documentElement.style.setProperty("--white","#212121"),h.style.backgroundColor="#202025",d[0].checked=t.inputValue,d[1].checked=t.inputValue;let o={themeColor:"black",inputValue:d[0].checked};localStorage.setItem(e,JSON.stringify(o))}else if(t.themeColor==="white"){document.documentElement.style.setProperty("--black","#212121"),document.documentElement.style.setProperty("--white","#FCFCFC"),h.style.backgroundColor="",d[0].checked=t.inputValue,d[1].checked=t.inputValue;let o={themeColor:"white",inputValue:d[0].checked};localStorage.setItem("theme",JSON.stringify(o))}else console.log("ddd")}});d.forEach(e=>{e.addEventListener("click",()=>{if(console.log("z"),localStorage.getItem("theme")===null||JSON.parse(localStorage.getItem("theme")).themeColor==="white"){document.documentElement.style.setProperty("--black","#FCFCFC"),document.documentElement.style.setProperty("--white","#212121"),h.style.backgroundColor="#202025";let t={themeColor:"black",inputValue:e.checked};localStorage.setItem("theme",JSON.stringify(t))}else if(JSON.parse(localStorage.getItem("theme")).themeColor==="black"){document.documentElement.style.setProperty("--black","#212121"),document.documentElement.style.setProperty("--white","#FCFCFC"),h.style.backgroundColor="";let t={themeColor:"white",inputValue:e.checked};localStorage.setItem("theme",JSON.stringify(t))}})});N.addEventListener("click",()=>{g.classList.value.includes("hidden-menu-list")?g.classList.remove("hidden-menu-list"):g.classList.value.includes("hidden-menu-list")===!1&&g.classList.add("hidden-menu-list")});q.addEventListener("click",()=>{v.classList.value.includes("hidden-menu-list")?(v.classList.remove("hidden-menu-list"),document.querySelector(".header-menu__menu-btn-svg").style.transform="rotate(180deg)"):v.classList.value.includes("hidden-menu-list")===!1&&(v.classList.add("hidden-menu-list"),document.querySelector(".header-menu__menu-btn-svg").style.transform="rotate(0)")});T.addEventListener("click",()=>{I.classList.remove("hidden-burger-menu")});j.addEventListener("click",()=>{I.classList.add("hidden-burger-menu")});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".hero__list"),t=document.querySelector(".header__input"),o=document.querySelector(".hero__open-letters svg"),i=document.querySelector(".hero__mob-box");e&&t&&e.addEventListener("click",s=>{t.value+=s.target.textContent}),o&&i&&o.addEventListener("click",()=>{i.classList.contains("mob-box-hidden")?(i.classList.remove("mob-box-hidden"),o.style.transform="rotate(180deg)"):(i.classList.add("mob-box-hidden"),o.style.transform="rotate(0)")})});class A{constructor(){if(console.log("IngredientManager initialized"),this.container=document.querySelector(".favorite-ingredients__list"),this.pretitle=document.querySelector(".favorite-ingredients__pretitle"),console.log("Container:",this.container),console.log("Pretitle:",this.pretitle),!this.container||!this.pretitle){console.error("DOM elements not found");return}this.init()}async init(){try{const t=a.getFavoriteIngredients();if(console.log("Favorite ingredients:",t),!t.length){console.log("No favorite ingredients found"),this.showMessage("You haven't added any favorite ingredients yet");return}const o=await this.loadIngredients(t);if(o.length===0){this.showMessage("No ingredients found");return}const i=Array.from(new Map(o.map(s=>[s.strIngredient.toLowerCase(),s])).values());m.renderFavoriteIngredients(this.container,i),this.pretitle.style.display="none",this.setupEventListeners()}catch(t){this.showMessage("Failed to load favorite ingredients"),console.error("Error loading ingredients:",t)}}async loadIngredients(t){const o=[...new Set(t.map(s=>s.toLowerCase()))];return(await Promise.all(o.map(s=>u.fetchIngredientByName(s)))).filter(s=>{var n;return(n=s.ingredients)==null?void 0:n[0]}).map(s=>s.ingredients[0])}setupEventListeners(){this.container.addEventListener("click",async t=>{var s;const o=t.target.closest(".js-ingredient-details");if(o){const n=o.closest("[data-ingredient]");if(n){const r=n.dataset.ingredient;try{const c=await u.fetchIngredientByName(r);if(!((s=c==null?void 0:c.ingredients)!=null&&s[0]))throw new Error("No ingredient data");document.querySelectorAll(".ingredient-modal-backdrop").forEach(b=>b.remove());const l=m.renderIngredientModal(c.ingredients[0]);document.body.insertAdjacentHTML("beforeend",l),this.setupIngredientModal()}catch(c){console.error("Failed to fetch ingredient details:",c)}}}const i=t.target.closest(".js-ingredient-favorite");if(i){const n=i.dataset.ingredient;n&&this.toggleFavoriteIngredient(n,i)}})}setupIngredientModal(){var s;const t=document.querySelector(".ingredient-modal-backdrop");if(!t)return;setTimeout(()=>t.classList.add("is-visible"),10);const o=()=>{t.classList.remove("is-visible"),setTimeout(()=>t.remove(),300)};(s=t.querySelector(".js-ingredient-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>n.target===t&&o());const i=t.querySelector(".js-ingredient-favorite");if(i){const n=i.dataset.ingredient;i.addEventListener("click",()=>{this.toggleFavoriteIngredient(n,i)})}}toggleFavoriteIngredient(t,o){if(!t)return;const s=!a.isIngredientFavorite(t);if(s?a.addFavoriteIngredient(t):a.removeFavoriteIngredient(t),o.classList.toggle("is-active",s),this.updateIngredientButtonUI(o,s),!s&&this.container.closest(".favorite-ingredients")){const n=t.toLowerCase();Array.from(this.container.querySelectorAll("[data-ingredient]")).filter(l=>l.dataset.ingredient.toLowerCase()===n).forEach(l=>l.remove());const c=!!this.container.querySelector("li");this.pretitle.style.display=c?"none":"block",c||this.showMessage("You haven't added any favorite ingredients yet")}document.querySelectorAll(".js-ingredient-favorite").forEach(n=>{n!==o&&n.dataset.ingredient&&n.dataset.ingredient.toLowerCase()===t.toLowerCase()&&(n.classList.toggle("is-active",s),this.updateIngredientButtonUI(n,s))})}updateIngredientButtonUI(t,o){const i=t.querySelector(".cocktails__favorite-title")||t.querySelector(".button-text")||t,s=t.classList.contains("cocktails-modal__favorite-button");i&&(i.textContent=o?s?"Remove fav":"Remove":s?"Add to favorite":"Add to")}showMessage(t){this.pretitle.textContent=t,this.pretitle.style.display="block",this.container.innerHTML=""}}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".favorite-ingredients__list")&&new A});export{m as C,a as F,u as a};
