document.addEventListener('DOMContentLoaded', function () {
    const sliderTrack = document.getElementById('sliderTrack')
    const cards = document.querySelectorAll('.service-card')
    const dots = document.querySelectorAll('.slider-dot')
    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')

    let currentIndex = 0
    const cardCount = cards.length
    const cardWidth = 100 / cardCount

    function updateSlider() {
        // Update track position
        sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`

        // Update active card
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex)
        })

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex)
        })
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount
        updateSlider()
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount
        updateSlider()
    }

    // Button events
    nextBtn.addEventListener('click', nextSlide)
    prevBtn.addEventListener('click', prevSlide)

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index
            updateSlider()
        })
    })

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'ArrowLeft') prevSlide()
    })

    // Responsive card width adjustment
    function adjustCardWidth() {
        if (window.innerWidth >= 1024) {
            cards.forEach((card) => {
                card.style.minWidth = `${100 / 3}%`
            })
        } else if (window.innerWidth >= 768) {
            cards.forEach((card) => {
                card.style.minWidth = '50%'
            })
        } else {
            cards.forEach((card) => {
                card.style.minWidth = '100%'
            })
        }
        updateSlider()
    }

    window.addEventListener('resize', adjustCardWidth)
    adjustCardWidth()
})