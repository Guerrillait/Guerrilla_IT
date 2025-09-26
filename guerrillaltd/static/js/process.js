
document.addEventListener('DOMContentLoaded', function () {
    // Toggle functionality
    const toggles = document.querySelectorAll('.toggle .h3');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const parentToggle = this.parentElement;

            // Close all other toggles
            document.querySelectorAll('.toggle').forEach(t => {
                if (t !== parentToggle) {
                    t.classList.remove('active');
                }
            });

            // Toggle current
            parentToggle.classList.toggle('active');
        });
    });

    // Optional: Open first toggle by default
    if (toggles.length > 0) {
        toggles[0].parentElement.classList.add('active');
    }
});
