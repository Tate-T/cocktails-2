const themeBtn = document.querySelector('#theme-checkbox')
const body = document.querySelector('body')

const menuBtn = document.querySelector('.header__menu-btn')
const menuList = document.querySelector('.header__menu-list')


let theme = 0 
themeBtn.addEventListener("click", () => {
    if (theme == 0) {
        document.documentElement.style.setProperty('--black', '#FCFCFC');
        document.documentElement.style.setProperty('--white', '#212121');
        body.style.backgroundColor = '#202025'; 
        theme = 1;
    } else {
        document.documentElement.style.setProperty('--black', '#212121');
        document.documentElement.style.setProperty('--white', '#FCFCFC');
        body.style.backgroundColor = ''; 
        theme = 0;
    }
});

menuBtn.addEventListener('click',() => {
    menuList.classList.remove('hidden-menu-list')

})
