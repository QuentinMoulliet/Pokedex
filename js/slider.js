const slider = {
    init: function () {
        this.handleChangeBodyBackground();
        // this.handleChangeBubbleBackground();
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

    // handleChangeBubbleBackground: function () { 
    //     const images = [
    //         'image/bb1.jpg',
    //         'image/bb2.jpg',
    //         'image/bb3.jpg',
    //         'image/bb4.jpg',
    //     ];

    //     const interval = 5;

    //     function changeBackgroundImage() {
    //         const randomIndex = Math.floor(Math.random() * images.length);
    //         const infoElement = document.querySelector('.info');
    //         infoElement.style.backgroundImage = `url('${images[randomIndex]}')`;

    //     }

    //     changeBackgroundImage();
        
    //     setInterval(changeBackgroundImage, interval);
    // }

};

document.addEventListener('DOMContentLoaded', function () {
    slider.init();
});
