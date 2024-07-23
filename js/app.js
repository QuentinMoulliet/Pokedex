const app = {
    init: function () {
        api.init();
        main.init();
        search.init();
        theme.init();
        slider.init();
        filter.init();
    }
};

document.addEventListener('DOMContentLoaded', app.init);