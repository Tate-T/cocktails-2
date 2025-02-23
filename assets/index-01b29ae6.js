(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}})();const m={async fetchNonAlcoholicCocktails(){return(await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")).json()},async fetchCocktailById(e){return(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e}`)).json()},async fetchCocktailsByName(e){return(await(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e}`)).json()).drinks.filter(s=>s.strAlcoholic==="Non alcoholic")}},a={STORAGE_KEY:"favoriteCocktails",getFavorites(){return JSON.parse(localStorage.getItem(this.STORAGE_KEY))||[]},addFavorite(e){const t=this.getFavorites();t.includes(e)||(t.push(e),localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t)))},removeFavorite(e){const t=this.getFavorites().filter(o=>o!==e);localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t))},isFavorite(e){return this.getFavorites().includes(e)}},h={createCocktailItem(e){const t=a.isFavorite(e.idDrink);return`
      <li class="cocktails__item" data-id="${e.idDrink}">
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
              <use href="./images/symbol-defs.svg#icon-heart"></use>
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
                  ${t.map(c=>`
                    <li class="cocktails-modal__item">
                      <p class="cocktails-modal__ingredients">
                        <span class="cocktails-modal__ingredients-span">✶</span>
                        ${c.measure} ${c.ingredient}
                      </p>
                    </li>
                  `).join("")}
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
    `},renderFavoritesList(e,t){const o=t.filter(c=>c&&c.idDrink);if(o.length===0){e.innerHTML=`
        <h3 class="favorite-coctails__pretitle">You haven't added any favorite cocktails yet</h3>
      `;return}e.innerHTML=o.map(c=>this.createCocktailItem(c)).join("")},getIngredientsList(e){const t=[];for(let o=1;o<=15;o++){const c=e[`strIngredient${o}`],s=e[`strMeasure${o}`];c&&t.push({ingredient:c,measure:s||""})}return t}};document.addEventListener("DOMContentLoaded",L);async function S(){const e=document.querySelector(".header__btn"),t=document.querySelector(".header__input"),o=document.querySelector(".cocktails__list");e.addEventListener("click",async s=>{try{const i=await m.fetchCocktailsByName(t.value);h.renderCocktailsList(o,i)}catch{k(o)}}),document.querySelector(".hero__mob-box").addEventListener("click",async s=>{try{const i=await m.fetchCocktailsByName(s.srcElement.textContent);h.renderCocktailsList(o,i)}catch{k(o)}})}S();async function L(){const e=document.querySelector(".cocktails__list");try{const t=await m.fetchNonAlcoholicCocktails();h.renderCocktailsList(e,t.drinks)}catch(t){k(e,t)}e.addEventListener("click",C)}function k(e,t){console.error("Error:",t),e.innerHTML=`
    <li class="error-item">
      <p class="error-message">Sorry, we didn't find any cocktail for you</p>
		<img class="error-image" src="./images/failed.png" alt="failed to load cocktails">
    </li>
  `}async function C(e){var c;const t=e.target.closest(".js-learn-more"),o=e.target.closest(".js-favorite");if(t){const s=t.closest("[data-id]");if(!s)return;const i=s.dataset.id;try{const r=await m.fetchCocktailById(i);if(!((c=r==null?void 0:r.drinks)!=null&&c[0]))throw new Error("No cocktail data");const g=h.renderModal(r.drinks[0]);document.querySelectorAll(".cocktails-modal__backdrop").forEach(b=>b.remove()),document.body.insertAdjacentHTML("beforeend",g),E(i)}catch(r){console.error("Failed to fetch cocktail details:",r)}}if(o){const s=o.closest("[data-id]");if(!s)return;const i=s.dataset.id;_(i,o)}}function E(e){var s;const t=document.querySelector(".cocktails-modal__backdrop");if(!t)return;setTimeout(()=>t.classList.add("is-visible"),10);const o=()=>{t.classList.remove("is-visible"),setTimeout(()=>t.remove(),300)};(s=t.querySelector(".js-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",i=>i.target===t&&o());const c=t.querySelector(".js-favorite");c&&c.addEventListener("click",()=>{_(e,c)})}function _(e,t){const c=!a.isFavorite(e);c?a.addFavorite(e):a.removeFavorite(e),t.classList.toggle("is-active",c),p(t,c),document.querySelectorAll(`
    [data-id="${e}"] .js-favorite,
    .cocktails-modal__favorite-button[data-id="${e}"]
  `).forEach(i=>{i!==t&&(i.classList.toggle("is-active",c),p(i,c))})}function p(e,t){const o=e.querySelector(".cocktails__favorite-title")||e,c=e.classList.contains("cocktails-modal__favorite-button");o.textContent=t?c?"Remove fav":"Remove":c?"Add to favorite":"Add to"}const n=document.querySelectorAll(".theme-checkbox"),f=document.querySelector("body"),F=document.querySelector(".header__menu-btn"),l=document.querySelector(".header__menu-list"),I=document.querySelector(".header-menu__menu-btn"),d=document.querySelector(".header-menu__menu-list"),w=document.querySelector(".header__mobile-menu-btn"),y=document.querySelector(".header-menu"),q=document.querySelector(".header-menu__close");Object.keys(localStorage).forEach(e=>{if(e.includes("theme")){const t=JSON.parse(localStorage.getItem(e));if(localStorage.getItem(e)===null||t.themeColor==="black"){document.documentElement.style.setProperty("--black","#FCFCFC"),document.documentElement.style.setProperty("--white","#212121"),f.style.backgroundColor="#202025",n[0].checked=t.inputValue,n[1].checked=t.inputValue;let o={themeColor:"black",inputValue:n[0].checked};localStorage.setItem(e,JSON.stringify(o))}else if(t.themeColor==="white"){document.documentElement.style.setProperty("--black","#212121"),document.documentElement.style.setProperty("--white","#FCFCFC"),f.style.backgroundColor="",n[0].checked=t.inputValue,n[1].checked=t.inputValue;let o={themeColor:"white",inputValue:n[0].checked};localStorage.setItem("theme",JSON.stringify(o))}else console.log("ddd")}});n.forEach(e=>{e.addEventListener("click",()=>{if(console.log("z"),localStorage.getItem("theme")===null||JSON.parse(localStorage.getItem("theme")).themeColor==="white"){document.documentElement.style.setProperty("--black","#FCFCFC"),document.documentElement.style.setProperty("--white","#212121"),f.style.backgroundColor="#202025";let t={themeColor:"black",inputValue:e.checked};localStorage.setItem("theme",JSON.stringify(t))}else if(JSON.parse(localStorage.getItem("theme")).themeColor==="black"){document.documentElement.style.setProperty("--black","#212121"),document.documentElement.style.setProperty("--white","#FCFCFC"),f.style.backgroundColor="";let t={themeColor:"white",inputValue:e.checked};localStorage.setItem("theme",JSON.stringify(t))}})});F.addEventListener("click",()=>{l.classList.value.includes("hidden-menu-list")?l.classList.remove("hidden-menu-list"):l.classList.value.includes("hidden-menu-list")===!1&&l.classList.add("hidden-menu-list")});I.addEventListener("click",()=>{d.classList.value.includes("hidden-menu-list")?(d.classList.remove("hidden-menu-list"),document.querySelector(".header-menu__menu-btn-svg").style.transform="rotate(180deg)"):d.classList.value.includes("hidden-menu-list")===!1&&(d.classList.add("hidden-menu-list"),document.querySelector(".header-menu__menu-btn-svg").style.transform="rotate(0)")});w.addEventListener("click",()=>{y.classList.remove("hidden-burger-menu")});q.addEventListener("click",()=>{y.classList.add("hidden-burger-menu")});const j=document.querySelector(".hero__list"),N=document.querySelector(".header__input"),v=document.querySelector(".hero__open-letters svg"),u=document.querySelector(".hero__mob-box");j.addEventListener("click",e=>{N.value+=e.srcElement.textContent});v.addEventListener("click",()=>{u.classList.value.includes("mob-box-hidden")?(u.classList.remove("mob-box-hidden"),v.style.transform="rotate(180deg)"):u.classList.value.includes("mob-box-hidden")===!1&&(u.classList.add("mob-box-hidden"),v.style.transform="rotate(0)")});export{h as C,a as F,m as a};
