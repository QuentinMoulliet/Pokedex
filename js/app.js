const app = {
    init: function () {
        api.init();
        main.init();
        search.init();
        theme.init();
        filter.init();
        slider.init();
    }
};

document.addEventListener('DOMContentLoaded', app.init);