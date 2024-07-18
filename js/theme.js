const theme = {
    init: function () {
        theme.addThemeEvents();
        theme.initLocalStorage();
    },

    addThemeEvents: function () {
        const colorButtonsElements = document.querySelectorAll('.theme-button');
        for (const colorButtonElement of colorButtonsElements) {
            colorButtonElement.addEventListener('click', theme.handleThemeColorClick);
        }
    },

    handleThemeColorClick: function (event) {
        const themeColor = event.target.id;
        theme.changeColorTheme(themeColor);
        theme.changeColorTheme2(themeColor);
        localStorage.setItem('colorTheme', themeColor);
    },

    changeColorTheme: function (themeColor) {
        const navbarElement = document.querySelector('.navbar');
        const searchInputElement = document.querySelector('#search-input');
        const filterElements = document.querySelectorAll('.filter');
        const pokemonCardElements = document.querySelectorAll('.pokemon-card');
        const footerElement = document.querySelector('.footer');
        const optionElements = document.querySelectorAll('option');
        const aboutElement = document.querySelector('#about-bubble');

        navbarElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
        searchInputElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
        footerElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
        aboutElement.classList.remove('theme-red', 'theme-blue', 'theme-green');

        navbarElement.classList.add(themeColor);
        searchInputElement.classList.add(themeColor);
        footerElement.classList.add(themeColor);
        aboutElement.classList.add(themeColor);

        filterElements.forEach(filterElement => {
            filterElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
            filterElement.classList.add(themeColor);
        });

        pokemonCardElements.forEach(pokemonCardElement => {
            pokemonCardElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
            pokemonCardElement.classList.add(themeColor);
        });

        optionElements.forEach(optionElement => {
            optionElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
            optionElement.classList.add(themeColor);
        });

    },

    changeColorTheme2: function (themeColor) {
        const infoRightElement = document.querySelector('.info-right');

        infoRightElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
        infoRightElement.classList.add(themeColor);
    },

    initLocalStorage: function () {
        const localColorSave = localStorage.getItem('colorTheme');
        if (localColorSave) {
            theme.changeColorTheme(localColorSave);
        }
    },

    saveToLocalStorage: function () {
        const isDark = document.body.classList.contains('theme-dark');
        const newLocalSave = JSON.stringify(isDark);
        localStorage.setItem('darkMode', newLocalSave);
    },
};

theme.init();
