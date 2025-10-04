
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const modal = document.getElementById('enrollModal');
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const closeModal = document.querySelector('.close-modal');
    const courseNameElement = document.getElementById('course-name');
    const coursePriceElement = document.getElementById('modal-course-price');
    const confirmedCourseElement = document.getElementById('confirmed-course');
    const enrollmentForm = document.getElementById('enroll-form');
    const enrollmentSection = document.getElementById('enrollment-form');
    const confirmationSection = document.getElementById('confirmation-message');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    const payButton = document.getElementById('pay-button');

    // Current selected payment method
    let selectedPaymentMethod = null;

    // Add event listeners to all enroll buttons
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const courseName = this.getAttribute('data-course');
            const coursePrice = this.getAttribute('data-price');
            courseNameElement.textContent = courseName;
            coursePriceElement.textContent = `Price: $${coursePrice}`;
            confirmedCourseElement.textContent = courseName;

            // Reset form and show modal
            enrollmentForm.reset();
            resetPaymentMethods();
            enrollmentSection.style.display = 'block';
            confirmationSection.style.display = 'none';

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });

    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            // Remove selected class from all methods
            paymentMethods.forEach(m => m.classList.remove('selected'));

            // Add selected class to clicked method
            this.classList.add('selected');

            // Get the method type
            selectedPaymentMethod = this.getAttribute('data-method');

            // Hide all payment forms
            paymentForms.forEach(form => form.classList.remove('active'));

            // Show the selected payment form
            document.getElementById(`${selectedPaymentMethod}-form`).classList.add('active');

            // Update pay button text
            payButton.textContent = `Pay with ${getPaymentMethodName(selectedPaymentMethod)}`;
        });
    });

    // Handle form submission
    enrollmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate payment method selection
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        // Validate payment form based on selected method
        if (!validatePaymentForm(selectedPaymentMethod)) {
            return;
        }

        // In a real application, you would send this data to a server
        // For this example, we'll simulate a payment processing delay

        payButton.disabled = true;
        payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';

        // Simulate API call to process payment
        setTimeout(function () {
            enrollmentSection.style.display = 'none';
            confirmationSection.style.display = 'block';

            // After 3 seconds, close the modal
            setTimeout(function () {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
                payButton.disabled = false;
                payButton.textContent = 'Pay Now';
            }, 3000);
        }, 2000);
    });

    // Simple search functionality
    const searchInput = document.querySelector('.search-box');
    const searchButton = document.querySelector('.search-btn');
    const courseCards = document.querySelectorAll('.course-card');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        courseCards.forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const description = card.querySelector('.course-description').textContent.toLowerCase();
            const category = card.querySelector('.course-category').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Helper functions
    function resetPaymentMethods() {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        paymentForms.forEach(form => form.classList.remove('active'));
        selectedPaymentMethod = null;
        payButton.textContent = 'Pay Now';
    }

    function getPaymentMethodName(method) {
        switch (method) {
            case 'card': return 'Card';
            case 'bkash': return 'bKash';
            case 'rocket': return 'Rocket';
            default: return '';
        }
    }

    function validatePaymentForm(method) {
        switch (method) {
            case 'card':
                const cardNumber = document.getElementById('card-number').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvc = document.getElementById('card-cvc').value;
                const cardName = document.getElementById('card-name').value;

                if (!cardNumber || !cardExpiry || !cardCvc || !cardName) {
                    alert('Please fill all card details');
                    return false;
                }

                // Simple card validation
                if (cardNumber.replace(/\s/g, '').length !== 16) {
                    alert('Please enter a valid card number');
                    return false;
                }

                if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
                    alert('Please enter a valid expiry date (MM/YY)');
                    return false;
                }

                if (cardCvc.length !== 3) {
                    alert('Please enter a valid CVC');
                    return false;
                }

                return true;

            case 'bkash':
                const bkashNumber = document.getElementById('bkash-number').value;
                const bkashTransaction = document.getElementById('bkash-transaction').value;

                if (!bkashNumber || !bkashTransaction) {
                    alert('Please fill all bKash details');
                    return false;
                }

                // Simple phone number validation
                if (bkashNumber.length !== 11) {
                    alert('Please enter a valid bKash number');
                    return false;
                }

                if (bkashTransaction.length < 8) {
                    alert('Please enter a valid transaction ID');
                    return false;
                }

                return true;

            case 'rocket':
                const rocketNumber = document.getElementById('rocket-number').value;
                const rocketTransaction = document.getElementById('rocket-transaction').value;

                if (!rocketNumber || !rocketTransaction) {
                    alert('Please fill all Rocket details');
                    return false;
                }

                // Simple phone number validation
                if (rocketNumber.length !== 11) {
                    alert('Please enter a valid Rocket number');
                    return false;
                }

                if (rocketTransaction.length < 8) {
                    alert('Please enter a valid transaction ID');
                    return false;
                }

                return true;

            default:
                return false;
        }
    }

    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 16) value = value.substr(0, 16);

            // Add spaces after every 4 digits
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formattedValue += ' ';
                formattedValue += value[i];
            }

            this.value = formattedValue;
        });
    }

    // Format expiry date input
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 4) value = value.substr(0, 4);

            if (value.length > 2) {
                this.value = value.substr(0, 2) + '/' + value.substr(2);
            } else {
                this.value = value;
            }
        });
    }
});
