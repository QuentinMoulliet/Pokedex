const theme = {
    init: function () {
        this.addThemeEvents();
        this.initLocalStorage();
    },

    addThemeEvents: function () {
        const colorButtonsElements = document.querySelectorAll('.theme-button');
        for (const colorButtonElement of colorButtonsElements) {
            colorButtonElement.addEventListener('click', this.handleThemeColorClick);
        }
    },

    handleThemeColorClick: function (event) {
        const themeColor = event.target.id;
        theme.changeColorThemeLinear(themeColor + '-linear');
        theme.changeColorThemeBackground(themeColor + '-bgc');
        localStorage.setItem('colorTheme', themeColor);
    },

    changeColorThemeLinear: function (themeColor) {
        const navbarElement = document.querySelector('.navbar');
        const searchInputElement = document.querySelector('#search-input');
        const filterElements = document.querySelectorAll('.filter');
        const pokemonCardElements = document.querySelectorAll('.pokemon-card');
        const footerElement = document.querySelector('.footer');

            navbarElement.classList.remove('theme-red-linear', 'theme-blue-linear', 'theme-green-linear');
            navbarElement.classList.add(themeColor);

            searchInputElement.classList.remove('theme-red-linear', 'theme-blue-linear', 'theme-green-linear');
            searchInputElement.classList.add(themeColor);

            footerElement.classList.remove('theme-red-linear', 'theme-blue-linear', 'theme-green-linear');
            footerElement.classList.add(themeColor);

        filterElements.forEach(filterElement => {
            if (filterElement) {
                filterElement.classList.remove('theme-red-linear', 'theme-blue-linear', 'theme-green-linear');
                filterElement.classList.add(themeColor);
            }
        });

        pokemonCardElements.forEach(pokemonCardElement => {
            if (pokemonCardElement) {
                pokemonCardElement.classList.remove('theme-red-linear', 'theme-blue-linear', 'theme-green-linear');
                pokemonCardElement.classList.add(themeColor);
            }
        });
    },

    changeColorThemeBackground: function (themeColor) {
        const infoRightElement = document.querySelector('.info-right');
        const optionElements = document.querySelectorAll('option');
        const aboutBubbleElement = document.querySelector('#about-bubble');

        if (infoRightElement) {
            infoRightElement.classList.remove('theme-red-bgc', 'theme-blue-bgc', 'theme-green-bgc');
            infoRightElement.classList.add(themeColor);
        }

        if (aboutBubbleElement) {
            aboutBubbleElement.classList.remove('theme-red-bgc', 'theme-blue-bgc', 'theme-green-bgc');
            aboutBubbleElement.classList.add(themeColor);
        }

        optionElements.forEach(optionElement => {
            if (optionElement) {
                optionElement.classList.remove('theme-red-bgc', 'theme-blue-bgc', 'theme-green-bgc');
                optionElement.classList.add(themeColor);
            }
        });
    },

    initLocalStorage: function () {
        const localColorSave = localStorage.getItem('colorTheme');
        if (localColorSave) {
            this.changeColorThemeLinear(localColorSave + '-linear');
            this.changeColorThemeBackground(localColorSave + '-bgc');
        }
    },

    saveToLocalStorage: function () {
        const isDark = document.body.classList.contains('theme-dark');
        const newLocalSave = JSON.stringify(isDark);
        localStorage.setItem('darkMode', newLocalSave);
    },
};

theme.init();
