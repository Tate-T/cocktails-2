import{F as r,a as l,C as n}from"./hero-fa80a534.js";document.addEventListener("DOMContentLoaded",async()=>{const o=document.querySelector(".favorite-coctails__list"),e=document.querySelector(".favorite-coctails__pretitle"),a=r.getFavorites();if(a.length===0){e.style.display="block";return}try{const t=await u(a);l.renderFavoritesList(o,t),e.style.display="none",f()}catch(t){_(t)}});async function u(o){const e=o.map(t=>n.fetchCocktailById(t));return(await Promise.all(e)).filter(t=>{var c;return(c=t==null?void 0:t.drinks)==null?void 0:c[0]}).map(t=>t.drinks[0])}function f(){document.addEventListener("click",o=>{m(o),k(o)})}async function m(o){const e=o.target.closest(".js-learn-more");if(!e)return;const t=e.closest("[data-id]").dataset.id;try{const c=await n.fetchCocktailById(t),i=l.renderModal(c.drinks[0]);document.querySelectorAll(".cocktails-modal__backdrop").forEach(v=>v.remove()),document.body.insertAdjacentHTML("beforeend",i),y(t)}catch(c){console.error("Failed to fetch cocktail details:",c)}}function k(o){const e=o.target.closest(".js-favorite");if(!e)return;const t=e.closest("[data-id]").dataset.id;if(d(t,e),!r.isFavorite(t)){const c=document.querySelector(`
      .favorite-coctails__list [data-id="${t}"]
    `);c==null||c.remove();const i=!!document.querySelector(".favorite-coctails__list li");document.querySelector(".favorite-coctails__pretitle").style.display=i?"none":"block"}}function y(o){var c;const e=document.querySelector(".cocktails-modal__backdrop");if(!e)return;setTimeout(()=>e.classList.add("is-visible"),10);const a=()=>{e.classList.remove("is-visible"),setTimeout(()=>e.remove(),300)};(c=e.querySelector(".js-modal-close"))==null||c.addEventListener("click",a),e.addEventListener("click",i=>i.target===e&&a());const t=e.querySelector(".js-favorite");t==null||t.addEventListener("click",()=>d(o,t))}function d(o,e){const t=!r.isFavorite(o);t?r.addFavorite(o):r.removeFavorite(o),e.classList.toggle("is-active",t),s(e,t),document.querySelectorAll(`[data-id="${o}"] .js-favorite`).forEach(c=>{c!==e&&(c.classList.toggle("is-active",t),s(c,t))})}function s(o,e){const a=o.querySelector(".cocktails__favorite-title")||o,t=o.classList.contains("cocktails-modal__favorite-button");a.textContent=e?t?"Remove from favorite":"Remove":t?"Add to favorite":"Add to"}function _(o){console.error("Error loading favorites:",o),document.querySelector(".favorite-coctails__pretitle").textContent="Failed to load favorite cocktails",document.querySelector(".favorite-coctails__pretitle").style.display="block"}
