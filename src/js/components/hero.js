const list = document.querySelector(".hero__list");
const input = document.querySelector(".header__input");

list.addEventListener("click", (e) => {
  input.value += e.srcElement.textContent;
});
