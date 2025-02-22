(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const k={async fetchNonAlcoholicCocktails(){return(await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")).json()},async fetchCocktailById(e){return(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e}`)).json()},async fetchCocktailsByName(e){return(await(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e}`)).json()).drinks.filter(o=>o.strAlcoholic==="Non alcoholic")}},u={STORAGE_KEY:"favoriteCocktails",getFavorites(){return JSON.parse(localStorage.getItem(this.STORAGE_KEY))||[]},addFavorite(e){const t=this.getFavorites();t.includes(e)||(t.push(e),localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t)))},removeFavorite(e){const t=this.getFavorites().filter(s=>s!==e);localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t))},isFavorite(e){return this.getFavorites().includes(e)}},y={createCocktailItem(e){const t=u.isFavorite(e.idDrink);return`
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
    `},renderCocktailsList(e,t){e.innerHTML=t.map(s=>this.createCocktailItem(s)).join("")},renderModal(e){const t=this.getIngredientsList(e),s=u.isFavorite(e.idDrink);return`
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
                  ${t.map(n=>`
                    <li class="cocktails-modal__item">
                      <p class="cocktails-modal__ingredients">
                        <span class="cocktails-modal__ingredients-span">✶</span>
                        ${n.measure} ${n.ingredient}
                      </p>
                    </li>
                  `).join("")}
										            <button type="button" class="cocktails-modal__favorite-button">
              Add to favorite
            </button>
                </ul>
              </div>
            </div>
						<div>
          <p class="cocktails-modal__instractions">INSTRUCTIONS:</p>
          <p class="cocktails-modal__instractions-text">
            ${e.strInstructions}
          </p>
          <button type="button" 
                  class="cocktails-modal__favorite-button js-favorite ${s?"is-active":""}"
                  data-id="${e.idDrink}">
            <span class="button-text">${s?"Remove fav":"Add to favorite"}</span>
          </button>
          <button type="button" class="cocktails-modal__close js-modal-close">
            <svg class="cocktails-modal__close-icon">
              <use href="./images/symbol-defs.svg#icon-cross-close"></use>
            </svg>
          </button>
          </div>
        </div>
      </div>
    `},renderFavoritesList(e,t){const s=t.filter(n=>n&&n.idDrink);if(s.length===0){e.innerHTML=`
        <h3 class="favorite-coctails__pretitle">You haven't added any favorite cocktails yet</h3>
      `;return}e.innerHTML=s.map(n=>this.createCocktailItem(n)).join("")},getIngredientsList(e){const t=[];for(let s=1;s<=15;s++){const n=e[`strIngredient${s}`],o=e[`strMeasure${s}`];n&&t.push({ingredient:n,measure:o||""})}return t}},c=document.querySelectorAll(".theme-checkbox"),a=document.querySelector("body"),h=document.querySelector(".header__menu-btn"),r=document.querySelector(".header__menu-list"),p=document.querySelector(".header-menu__menu-btn"),l=document.querySelector(".header-menu__menu-list"),f=document.querySelector(".header__mobile-menu-btn"),m=document.querySelector(".header-menu"),_=document.querySelector(".header-menu__close");Object.keys(localStorage).forEach(e=>{if(e.includes("theme")){const t=JSON.parse(localStorage.getItem(e));if(localStorage.getItem(e)===null||t.themeColor==="black"){document.documentElement.style.setProperty("--black","#FCFCFC"),document.documentElement.style.setProperty("--white","#212121"),a.style.backgroundColor="#202025",c[0].checked=t.inputValue,c[1].checked=t.inputValue;let s={themeColor:"black",inputValue:c[0].checked};localStorage.setItem(e,JSON.stringify(s))}else if(t.themeColor==="white"){document.documentElement.style.setProperty("--black","#212121"),document.documentElement.style.setProperty("--white","#FCFCFC"),a.style.backgroundColor="",c[0].checked=t.inputValue,c[1].checked=t.inputValue;let s={themeColor:"white",inputValue:c[0].checked};localStorage.setItem("theme",JSON.stringify(s))}else console.log("ddd")}});c.forEach(e=>{e.addEventListener("click",()=>{if(console.log("z"),localStorage.getItem("theme")===null||JSON.parse(localStorage.getItem("theme")).themeColor==="white"){document.documentElement.style.setProperty("--black","#FCFCFC"),document.documentElement.style.setProperty("--white","#212121"),a.style.backgroundColor="#202025";let t={themeColor:"black",inputValue:e.checked};localStorage.setItem("theme",JSON.stringify(t))}else if(JSON.parse(localStorage.getItem("theme")).themeColor==="black"){document.documentElement.style.setProperty("--black","#212121"),document.documentElement.style.setProperty("--white","#FCFCFC"),a.style.backgroundColor="";let t={themeColor:"white",inputValue:e.checked};localStorage.setItem("theme",JSON.stringify(t))}})});h.addEventListener("click",()=>{r.classList.value.includes("hidden-menu-list")?r.classList.remove("hidden-menu-list"):r.classList.value.includes("hidden-menu-list")===!1&&r.classList.add("hidden-menu-list")});p.addEventListener("click",()=>{l.classList.value.includes("hidden-menu-list")?(l.classList.remove("hidden-menu-list"),document.querySelector(".header-menu__menu-btn-svg").style.transform="rotate(180deg)"):l.classList.value.includes("hidden-menu-list")===!1&&(l.classList.add("hidden-menu-list"),document.querySelector(".header-menu__menu-btn-svg").style.transform="rotate(0)")});f.addEventListener("click",()=>{m.classList.remove("hidden-burger-menu")});_.addEventListener("click",()=>{m.classList.add("hidden-burger-menu")});const g=document.querySelector(".hero__list"),v=document.querySelector(".header__input");g.addEventListener("click",e=>{v.value+=e.srcElement.textContent});export{k as C,u as F,y as a};
//# sourceMappingURL=hero-ffd518d8.js.map
