document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".hero__list");
  const input = document.querySelector(".header__input");
  const btnOpen = document.querySelector(".hero__open-letters svg");
  const mobBoxBtn = document.querySelector(".hero__mob-box");

  if (list && input) {
    list.addEventListener("click", (e) => {
      input.value += e.target.textContent;
    });
  }

  if (btnOpen && mobBoxBtn) {
    btnOpen.addEventListener("click", () => {
      if (mobBoxBtn.classList.contains("mob-box-hidden")) {
        mobBoxBtn.classList.remove("mob-box-hidden");
        btnOpen.style.transform = "rotate(180deg)";
      } else {
        mobBoxBtn.classList.add("mob-box-hidden");
        btnOpen.style.transform = "rotate(0)";
      }
    });
  }
});
