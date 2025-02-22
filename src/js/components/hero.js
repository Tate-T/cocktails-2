const list = document.querySelector(".hero__list");
const input = document.querySelector(".header__input");

const btnOpen = document.querySelector('.hero__open-letters svg')
const mobBoxBtn = document.querySelector('.hero__mob-box')

list.addEventListener("click", (e) => {
  input.value += e.srcElement.textContent;
});

btnOpen.addEventListener('click', () => {
  if (mobBoxBtn.classList.value.includes('mob-box-hidden')) {
      mobBoxBtn.classList.remove('mob-box-hidden')
      btnOpen.style.transform = 'rotate(180deg)'
  } else if (mobBoxBtn.classList.value.includes('mob-box-hidden') === false) {
      mobBoxBtn.classList.add('mob-box-hidden')
      btnOpen.style.transform = 'rotate(0)'
  }
})