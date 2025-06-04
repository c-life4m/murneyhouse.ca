document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAnimations();
    setupEventListeners();
    loadImages();
    initializeDataLoaders();

    // Handle theme preferences from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

function loadImages() {
    // Simulate loading of hero image
    setTimeout(() => {
        const heroImage = document.querySelector('.hero-image');
        const heroText = document.querySelector('.hero-text');

        if (heroImage) {
            heroImage.classList.add('loaded');
        }

        if (heroText) {
            heroText.style.opacity = 1;
            heroText.style.transform = 'translateY(0)';
        }
    }, 500);
}

function initializeAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.room-card, .common-area-image, .common-area-content, .amenity-item, .feature-card, .book-now-card, .local-area-content, .local-area-map');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Setup parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroImage = document.querySelector('.hero-image');

        if (heroImage) {
            heroImage.style.transform = `scale(1) translateY(${scrollPosition * 0.2}px)`;
        }

        // Change header background opacity on scroll
        const header = document.querySelector('header');
        if (header) {
            if (scrollPosition > 50) {
                header.style.padding = '0.5rem 0';
                document.body.classList.contains('dark-mode')
                    ? header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)'
                    : header.style.backgroundColor = 'rgba(254, 254, 254, 0.95)';
            } else {
                header.style.padding = '1rem 0';
                document.body.classList.contains('dark-mode')
                    ? header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)'
                    : header.style.backgroundColor = 'rgba(254, 254, 254, 0.9)';
            }
        }
    });
}

function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');

    if (mobileNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
    } else {
    document.body.style.overflow = 'auto';
    }

      // Animate hamburger to X
    const spans = mobileNavToggle.querySelectorAll('span');
    if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

        // Close mobile nav when clicking on links
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');

                const spans = mobileNavToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Animate buttons on hover
    const buttons = document.querySelectorAll('.button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'buttonWobble 0.5s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });

        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Guest form submission
    const guestForm = document.getElementById('guest-form');
    if (guestForm) {
        guestForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(guestForm);
            const reviewData = {
                name: formData.get('name'),
                review: formData.get('review'),
                date: new Date().toLocaleDateString()
            };

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your review! It will be reviewed before publishing.';
            successMessage.style.cssText = `
                background: var(--cta);
                color: white;
                padding: 1rem;
                border-radius: 6px;
                margin-top: 1rem;
                text-align: center;
            `;

            guestForm.appendChild(successMessage);
            guestForm.reset();

            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    localStorage.setItem('theme', theme);

    // Update header background color
    const header = document.querySelector('header');
    if (header) {
        theme === 'dark'
            ? header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)'
            : header.style.backgroundColor = 'rgba(254, 254, 254, 0.9)';
    }
}

// Data Loader
class DataLoader {
    static async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading JSON:', error);
            return null;
        }
    }

    static async loadUpdates() {
        const updates = await this.loadJSON('data/Updates.json');
        if (updates && updates.length) {
            this.displayUpdates(updates);
        }
    }

    static displayUpdates(updates) {
        const container = document.getElementById('updates-content');
        if (container) {
            container.innerHTML = updates.map(update =>
                `<div class="update-item">
                    <strong>${update.date}:</strong> ${update.message}
                </div>`
            ).join('');
        }
    }
}

// Updates Card Manager
class UpdatesCard {
    constructor() {
        this.card = document.getElementById('updates-card');
        this.closeBtn = document.getElementById('close-updates');
        this.init();
    }

    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }
    }

    hide() {
        if (this.card) {
            this.card.style.opacity = '0';
            this.card.style.transform = 'translateY(50px)';
            setTimeout(() => {
                this.card.style.display = 'none';
            }, 300);
        }
    }
}

// Data Loading Functions
function initializeDataLoaders() {
    // Load guest book if on main page
    if (document.getElementById('guest-book-content')) {
        loadGuestBook();
    }
}

async function loadGuestBook() {
    try {
        const response = await fetch('data/GuestBook.json');
        const reviews = await response.json();
        displayGuestBook(reviews);
    } catch (error) {
        console.error('Error loading guest book:', error);
        // Fallback content
        const fallbackReviews = [
            {
                name: "Sarah Johnson",
                review: "Absolutely wonderful stay! The house is beautifully maintained and the location is perfect for exploring the area. We'll definitely be back!",
                date: "2024-01-12"
            },
            {
                name: "Michael Chen",
                review: "Perfect getaway spot. The kitchen was well-equipped and the living spaces were so comfortable. Great value for a peaceful retreat.",
                date: "2024-01-08"
            },
            {
                name: "Emma Rodriguez",
                review: "Murney House exceeded our expectations. Clean, cozy, and the hosts were incredibly helpful with local recommendations.",
                date: "2024-01-05"
            }
        ];
        displayGuestBook(fallbackReviews);
    }
}

function displayGuestBook(reviews) {
    const container = document.getElementById('guest-book-content');
    if (container) {
        container.innerHTML = reviews.map(review =>
            `<div class="guest-review">
                <div class="review-author">${review.name}</div>
                <div class="review-text">${review.review}</div>
            </div>`
        ).join('');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
