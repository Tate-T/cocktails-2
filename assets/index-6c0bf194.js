import{C as i,a as n,F as l}from"./hero-fa80a534.js";document.addEventListener("DOMContentLoaded",y);async function v(){const e=document.querySelector(".header__btn"),t=document.querySelector(".header__input"),a=document.querySelector(".cocktails__list");e.addEventListener("click",async r=>{try{const c=await i.fetchCocktailsByName(t.value);n.renderCocktailsList(a,c)}catch{d(a)}}),document.querySelector(".hero__mob-box").addEventListener("click",async r=>{try{const c=await i.fetchCocktailsByName(r.srcElement.textContent);n.renderCocktailsList(a,c)}catch{d(a)}})}v();async function y(){const e=document.querySelector(".cocktails__list");try{const t=await i.fetchNonAlcoholicCocktails();n.renderCocktailsList(e,t.drinks)}catch(t){d(e,t)}e.addEventListener("click",h)}function d(e,t){console.error("Error:",t),e.innerHTML=`
    <li class="error-item">
      <p class="error-message">Sorry, we didn't find any cocktail for you</p>
		<img class="error-image" src="./images/failed.png" alt="failed to load cocktails">
    </li>
  `}async function h(e){var o;const t=e.target.closest(".js-learn-more"),a=e.target.closest(".js-favorite");if(t){const r=t.closest("[data-id]");if(!r)return;const c=r.dataset.id;try{const s=await i.fetchCocktailById(c);if(!((o=s==null?void 0:s.drinks)!=null&&o[0]))throw new Error("No cocktail data");const k=n.renderModal(s.drinks[0]);document.querySelectorAll(".cocktails-modal__backdrop").forEach(f=>f.remove()),document.body.insertAdjacentHTML("beforeend",k),L(c)}catch(s){console.error("Failed to fetch cocktail details:",s)}}if(a){const r=a.closest("[data-id]");if(!r)return;const c=r.dataset.id;u(c,a)}}function L(e){var r;const t=document.querySelector(".cocktails-modal__backdrop");if(!t)return;setTimeout(()=>t.classList.add("is-visible"),10);const a=()=>{t.classList.remove("is-visible"),setTimeout(()=>t.remove(),300)};(r=t.querySelector(".js-modal-close"))==null||r.addEventListener("click",a),t.addEventListener("click",c=>c.target===t&&a());const o=t.querySelector(".js-favorite");o&&o.addEventListener("click",()=>{u(e,o)})}function u(e,t){const o=!l.isFavorite(e);o?l.addFavorite(e):l.removeFavorite(e),t.classList.toggle("is-active",o),m(t,o),document.querySelectorAll(`
    [data-id="${e}"] .js-favorite,
    .cocktails-modal__favorite-button[data-id="${e}"]
  `).forEach(c=>{c!==t&&(c.classList.toggle("is-active",o),m(c,o))})}function m(e,t){const a=e.querySelector(".cocktails__favorite-title")||e,o=e.classList.contains("cocktails-modal__favorite-button");a.textContent=t?o?"Remove fav":"Remove":o?"Add to favorite":"Add to"}
