let index = 0;
    const slides = document.querySelectorAll('.slide');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    
    function showSlides() {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
        const activeSlide = slides[index];
        heroTitle.textContent = activeSlide.getAttribute('data-title');
        heroDesc.textContent = activeSlide.getAttribute('data-text');
        index = (index + 1) % slides.length;
    }

    setInterval(showSlides, 3000);

