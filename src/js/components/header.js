const themeBtn = document.querySelector('#theme-checkbox')
const body = document.querySelector('body')

const menuBtn = document.querySelector('.header__menu-btn')
const menuList = document.querySelector('.header__menu-list')

Object.keys(localStorage).forEach(key => {
    if (key.includes('theme')) {
        const parsedObj = (JSON.parse(localStorage.getItem(key)))
        console.log(parsedObj)

        if (localStorage.getItem(key) === null || parsedObj.themeColor === 'black') {

            document.documentElement.style.setProperty('--black', '#FCFCFC');
            document.documentElement.style.setProperty('--white', '#212121');
            body.style.backgroundColor = '#202025';
            themeBtn.checked = parsedObj.inputValue

            let jsonValuesTheme = {
                themeColor: "black",
                inputValue: themeBtn.checked
            }
            localStorage.setItem(key, JSON.stringify(jsonValuesTheme))
        } else if (parsedObj.themeColor === 'white') {
            document.documentElement.style.setProperty('--black', '#212121');
            document.documentElement.style.setProperty('--white', '#FCFCFC');
            body.style.backgroundColor = '';
            themeBtn.checked = parsedObj.inputValue

            let jsonValuesTheme = {
                themeColor: "white",
                inputValue: themeBtn.checked
            }

            localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
        } else {
            console.log('ddd')
        }
    }
})

themeBtn.addEventListener("click", () => {
    if (localStorage.getItem('theme') === null || JSON.parse(localStorage.getItem('theme')).themeColor === 'white') {
        document.documentElement.style.setProperty('--black', '#FCFCFC');
        document.documentElement.style.setProperty('--white', '#212121');
        body.style.backgroundColor = '#202025';

        let jsonValuesTheme = {
            themeColor: "black",
            inputValue: themeBtn.checked
        }
        localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
    } else if (JSON.parse(localStorage.getItem('theme')).themeColor === 'black') {
        document.documentElement.style.setProperty('--black', '#212121');
        document.documentElement.style.setProperty('--white', '#FCFCFC');
        body.style.backgroundColor = '';

        let jsonValuesTheme = {
            themeColor: "white",
            inputValue: themeBtn.checked
        }

        localStorage.setItem('theme', JSON.stringify(jsonValuesTheme))
    }
});

menuBtn.addEventListener('click', () => {
    if (menuList.classList.value.includes('hidden-menu-list')) {
        menuList.classList.remove('hidden-menu-list')
    } else if (menuList.classList.value.includes('hidden-menu-list') === false) {
        menuList.classList.add('hidden-menu-list')
    }
})