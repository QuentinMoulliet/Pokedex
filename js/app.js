const app = {
    init: function () {
        api.init();
        main.init();
        search.init();
    }
};

document.addEventListener('DOMContentLoaded', app.init);