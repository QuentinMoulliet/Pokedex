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
        const elementsToChange = [
            document.querySelector('.navbar'),
            document.querySelector('#search-input'),
            document.querySelectorAll('.filter'),
            document.querySelectorAll('.pokemon-card'),
            document.querySelector('.info'),
            document.querySelector('.footer')
        ];
    
        const removeClasses = ['theme-red-linear', 'theme-blue-linear', 'theme-green-linear'];
    
        function updateElementClasses(element, themeColor) {
            if (element) {
                element.classList.remove(...removeClasses);
                element.classList.add(themeColor);
            }
        }
    
        elementsToChange.forEach(element => {
            if (NodeList.prototype.isPrototypeOf(element)) {
                element.forEach(childElement => updateElementClasses(childElement, themeColor));
            } else {
                updateElementClasses(element, themeColor);
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
