// Contact Modal Functionality - Shared across all pages
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactModal);
    } else {
        initContactModal();
    }

    async function initContactModal() {
        // Check if modal already exists, if not load it
        if (!document.getElementById('contact-modal')) {
            console.log('Contact modal not found. Attempting to load from HTML file...');
            await loadModalHTML();
        }

        // Check again after attempting to load
        if (!document.getElementById('contact-modal')) {
            console.error('Contact modal could not be loaded. Make sure contact-modal.html exists and is accessible.');
            return;
        }

        setupContactModal();
        checkUrlParameters();
    }

    async function loadModalHTML() {
        try {
            // Determine the correct path based on current page location
            let modalPath = 'shared/contact-modal.html';

            // If we're in a subdirectory, adjust the path
            const currentPath = window.location.pathname;
            if (currentPath.includes('/otherpages/')) {
                modalPath = '../shared/contact-modal.html';
            }

            console.log('Attempting to load modal from:', modalPath);

            const response = await fetch(modalPath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();
            console.log('Modal HTML loaded successfully');

            // Create a container and append to body
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = html;
            document.body.appendChild(modalContainer.firstElementChild);

            console.log('Modal added to DOM');
        } catch (error) {
            console.error('Error loading contact modal:', error);
            console.warn('Contact form temporarily unavailable');
        }
    }

    function setupContactModal() {
        // Get elements with null checks
        const contactMessage = document.getElementById('contact-message');
        const contactCharCount = document.getElementById('contact-char-count');
        const contactModal = document.getElementById('contact-modal');
        const closeModal = document.querySelector('.close-modal');
        const contactForm = document.getElementById('contact-form');
        const contactDate = document.getElementById('contact-date');

        // Character counter for contact form
        if (contactMessage && contactCharCount) {
            contactMessage.addEventListener('input', function() {
                const count = this.value.length;
                contactCharCount.textContent = count;
            });
        }

        // Set default date to today
        if (contactDate) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            contactDate.value = formattedDate;
        }

        // Updated contact links selector to work from any page
        const contactLinks = document.querySelectorAll('a[href*="contact=1"], a[href*="#contact"], a[href="otherpages/guest-hub.html?contact=1"]');

        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openContactModal();
            });
        });

        // Close modal functionality
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                closeContactModal();
            });
        }

        // Close on background click
        window.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal && contactModal.style.display === 'flex') {
                closeContactModal();
            }
        });

        // Form submission logic
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleContactFormSubmission(e);
            });
        }
    }

    function checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('contact') === '1') {
            openContactModal();
            // Clean up URL without reloading page
            if (history.replaceState) {
                const cleanUrl = window.location.pathname;
                history.replaceState({}, document.title, cleanUrl);
            }
        }
    }

    function openContactModal() {
        const contactModal = document.getElementById('contact-modal');
        if (contactModal) {
            contactModal.style.display = 'flex';
            // Focus on first input for accessibility
            setTimeout(() => {
                const firstInput = contactModal.querySelector('input[type="text"]');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    }

    function closeContactModal() {
        const contactModal = document.getElementById('contact-modal');
        if (contactModal) {
            contactModal.style.display = 'none';
        }
    }

    function handleContactFormSubmission(e) {
        const contactForm = e.target;
        const contactModal = document.getElementById('contact-modal');
        const contactCharCount = document.getElementById('contact-char-count');
        const contactDate = document.getElementById('contact-date');

        // Form validation
        const email = document.getElementById('contact-email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        const contactSuccess = document.getElementById('contact-success');
        if (contactSuccess) {
            contactSuccess.style.display = 'block';
        }

        // Reset form
        contactForm.reset();
        if (contactCharCount) {
            contactCharCount.textContent = '0';
        }

        // Reset date to today
        if (contactDate) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            contactDate.value = formattedDate;
        }

        // Hide success message and close modal after 3 seconds
        setTimeout(() => {
            if (contactSuccess) {
                contactSuccess.style.display = 'none';
            }
            closeContactModal();
        }, 3000);
    }

    // Make functions available globally if needed
    window.ContactModal = {
        open: openContactModal,
        close: closeContactModal
    };

})();
