const themeBtn = document.querySelectorAll('.theme-checkbox')
const body = document.querySelector('body')

const menuBtn = document.querySelector('.header__menu-btn')
const menuList = document.querySelector('.header__menu-list')

const menuBtnMob = document.querySelector('.header-menu__menu-btn')
const menuListMob = document.querySelector('.header-menu__menu-list')

const openBurgerBtn = document.querySelector('.header__mobile-menu-btn')
const headerMenu = document.querySelector('.header-menu')
const closeBurgerBtn = document.querySelector('.header-menu__close')

Object.keys(localStorage).forEach(key => {
    if (key.includes('theme')) {
        const parsedObj = (JSON.parse(localStorage.getItem(key)))

        if (localStorage.getItem(key) === null || parsedObj.themeColor === 'black') {

            document.documentElement.style.setProperty('--black', '#FCFCFC');
            document.documentElement.style.setProperty('--white', '#212121');
            body.style.backgroundColor = '#202025';
            themeBtn[0].checked = parsedObj.inputValue
            themeBtn[1].checked = parsedObj.inputValue


            let jsonValuesTheme = {
                themeColor: "black",
                inputValue: themeBtn[0].checked
            }
            localStorage.setItem(key, JSON.stringify(jsonValuesTheme))
        } else if (parsedObj.themeColor === 'white') {
            document.documentElement.style.setProperty('--black', '#212121');
            document.documentElement.style.setProperty('--white', '#FCFCFC');
            body.style.backgroundColor = '';
            themeBtn[0].checked = parsedObj.inputValue
            themeBtn[1].checked = parsedObj.inputValue

            let jsonValuesTheme = {
                themeColor: "white",
                inputValue: themeBtn[0].checked
            }

            localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
        } else {
            console.log('ddd')
        }
    }
})

themeBtn.forEach(button =>{
    button.addEventListener("click", () => {
        console.log('z')
        if (localStorage.getItem('theme') === null || JSON.parse(localStorage.getItem('theme')).themeColor === 'white') {
            document.documentElement.style.setProperty('--black', '#FCFCFC');
            document.documentElement.style.setProperty('--white', '#212121');
            body.style.backgroundColor = '#202025';
    
            let jsonValuesTheme = {
                themeColor: "black",
                inputValue: button.checked
            }
            localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
        } else if (JSON.parse(localStorage.getItem('theme')).themeColor === 'black') {
            document.documentElement.style.setProperty('--black', '#212121');
            document.documentElement.style.setProperty('--white', '#FCFCFC');
            body.style.backgroundColor = '';
    
            let jsonValuesTheme = {
                themeColor: "white",
                inputValue: button.checked
            }
    
            localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
        }
    });
})
// themeBtn.addEventListener("click", () => {
//     console.log('z')
//     if (localStorage.getItem('theme') === null || JSON.parse(localStorage.getItem('theme')).themeColor === 'white') {
//         document.documentElement.style.setProperty('--black', '#FCFCFC');
//         document.documentElement.style.setProperty('--white', '#212121');
//         body.style.backgroundColor = '#202025';

//         let jsonValuesTheme = {
//             themeColor: "black",
//             inputValue: themeBtn.checked
//         }
//         localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
//     } else if (JSON.parse(localStorage.getItem('theme')).themeColor === 'black') {
//         document.documentElement.style.setProperty('--black', '#212121');
//         document.documentElement.style.setProperty('--white', '#FCFCFC');
//         body.style.backgroundColor = '';

//         let jsonValuesTheme = {
//             themeColor: "white",
//             inputValue: themeBtn.checked
//         }

//         localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
//     }
// });


menuBtn.addEventListener('click', () => {
    if (menuList.classList.value.includes('hidden-menu-list')) {
        menuList.classList.remove('hidden-menu-list')
    } else if (menuList.classList.value.includes('hidden-menu-list') === false) {
        menuList.classList.add('hidden-menu-list')
    }
})

menuBtnMob.addEventListener('click', () => {
    if (menuListMob.classList.value.includes('hidden-menu-list')) {
        menuListMob.classList.remove('hidden-menu-list')
        document.querySelector('.header-menu__menu-btn-svg').style.transform = 'rotate(180deg)'
    } else if (menuListMob.classList.value.includes('hidden-menu-list') === false) {
        menuListMob.classList.add('hidden-menu-list')
        document.querySelector('.header-menu__menu-btn-svg').style.transform = 'rotate(0)'
    }
})

openBurgerBtn.addEventListener('click',() =>{
    headerMenu.classList.remove('hidden-burger-menu')
})
closeBurgerBtn.addEventListener('click', () => {
    headerMenu.classList.add('hidden-burger-menu')
})