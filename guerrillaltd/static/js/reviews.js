document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let scrollAmount = 0;
    const cardWidth = 320; // Adjust based on review card width

    nextBtn.addEventListener('click', function () {
        scrollAmount += cardWidth;
        if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = carousel.scrollWidth - carousel.clientWidth;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener('click', function () {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    // Enable touch swipe for mobile responsiveness
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    });
});
