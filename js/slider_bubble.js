const sliderBubble = {  
    init: function() {
        sliderBubble.handleChangeBubbleBackground();
    },

    handleChangeBubbleBackground: function() {
        const bubbleImages = [
            'image/bb1.jpg',
            'image/bb2.jpg',
            'image/bb3.jpg',
            'image/bb4.jpg',
        ];

        const interval = 5000;

        function changeBubbleBackgroundImage() {
            const randomBubbleIndex = Math.floor(Math.random() * bubbleImages.length);
            const infoElement = document.querySelector('.info');
            const BubbleDataSet = infoElement.dataset.bubbleDataSet;
            console.log(BubbleDataSet);
        
            BubbleDataSet.style.backgroundImage = `url('${bubbleImages[randomBubbleIndex]}')`;
        }
        

        changeBubbleBackgroundImage();

        setInterval(changeBubbleBackgroundImage, interval);
    },

};
document.addEventListener('DOMContentLoaded', function() {
    sliderBubble.init();
});