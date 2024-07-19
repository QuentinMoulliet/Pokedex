const slider = {
    init: function () {

        slider.handleChangeBodyBackground();
        
    },

    handleChangeBodyBackground: function () {
        const images = [
            'image/fb1.jpg',
            'image/fb2.jpg',
            'image/fb3.jpg',
            'image/fb4.jpg',
            'image/fb5.jpg',
        ];

        const interval = 100000;

        function changeBackgroundImage() {
            const randomIndex = Math.floor(Math.random() * images.length);
            document.body.style.backgroundImage = `url('${images[randomIndex]}')`;
        }

        changeBackgroundImage();
        
        setInterval(changeBackgroundImage, interval);
    },

    
};

document.addEventListener('DOMContentLoaded', function () {
    slider.init();
});
