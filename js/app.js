const app = {
    init: function () {
        api.init();
        main.init();
        search.init();
        theme.init();
        slider.init();
        filter.init();
        sliderBubble.init();
    }
};

document.addEventListener('DOMContentLoaded', app.init);