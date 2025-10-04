
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-link')
    const tabPanes = document.querySelectorAll('.tab-pane')
    const navTabs = document.getElementById('navTabs')
    const prevButton = document.querySelector('.prev-button')
    const nextButton = document.querySelector('.next-button')

    // Tab click functionality
    tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs and panes
            tabs.forEach((t) => t.classList.remove('active'))
            tabPanes.forEach((pane) => pane.classList.remove('active'))

            // Add active class to clicked tab and corresponding pane
            this.classList.add('active')
            const tabId = this.getAttribute('data-tab')
            document.getElementById(tabId).classList.add('active')

            // Update navigation buttons
            updateNavButtons()
            scrollToActiveTab()
        })
    })

    // Navigation buttons functionality
    prevButton.addEventListener('click', scrollToPrevTab)
    nextButton.addEventListener('click', scrollToNextTab)

    // Update navigation buttons state
    function updateNavButtons() {
        const activeTab = document.querySelector('.tab-link.active')
        const activeIndex = Array.from(tabs).indexOf(activeTab)

        prevButton.classList.toggle('disabled', activeIndex === 0)
        nextButton.classList.toggle('disabled', activeIndex === tabs.length - 1)
    }

    // Scroll to previous tab
    function scrollToPrevTab() {
        const activeTab = document.querySelector('.tab-link.active')
        const activeIndex = Array.from(tabs).indexOf(activeTab)

        if (activeIndex > 0) {
            tabs[activeIndex - 1].click()
        }
    }

    // Scroll to next tab
    function scrollToNextTab() {
        const activeTab = document.querySelector('.tab-link.active')
        const activeIndex = Array.from(tabs).indexOf(activeTab)

        if (activeIndex < tabs.length - 1) {
            tabs[activeIndex + 1].click()
        }
    }

    // Scroll to make active tab visible
    function scrollToActiveTab() {
        const activeTab = document.querySelector('.tab-link.active')
        activeTab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }

    // Initialize
    updateNavButtons()

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            scrollToPrevTab()
        } else if (e.key === 'ArrowRight') {
            scrollToNextTab()
        }
    })
})
