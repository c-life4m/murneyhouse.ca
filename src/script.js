// Mobile-optimized JavaScript preserving ALL original functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation - exact original functionality
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    let mobileNavOpen = false;

    function toggleMobileNav() {
        mobileNavOpen = !mobileNavOpen;
        mobileNav.classList.toggle('active', mobileNavOpen);

        // Prevent body scroll when mobile nav is open
        document.body.style.overflow = mobileNavOpen ? 'hidden' : '';

        // Animate hamburger - exact original animation
        const spans = mobileNavToggle.querySelectorAll('span');
        if (mobileNavOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }

    function closeMobileNav() {
        mobileNavOpen = false;
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';

        const spans = mobileNavToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when clicking on links
    if (mobileNav) {
        mobileNav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMobileNav();
            }
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNavOpen && !mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOpen) {
            closeMobileNav();
        }
    });

    // Close mobile nav on resize to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 768 && mobileNavOpen) {
                closeMobileNav();
            }
        }, 100);
    });

    // Dark Mode Toggle - exact original functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Load saved theme or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Add a subtle animation to the toggle - exact original
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-mode', e.matches);
        }
    });

    // Smooth Scrolling for anchor links - exact original functionality
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile nav if open
        if (mobileNavOpen) {
            closeMobileNav();
        }
    });

    // Hero Image Loading - exact original animation
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        function loadHeroImage() {
            if (heroImage.complete) {
                heroImage.classList.add('loaded');
                animateHeroText();
            } else {
                heroImage.addEventListener('load', function() {
                    heroImage.classList.add('loaded');
                    animateHeroText();
                });
            }
        }

        function animateHeroText() {
            setTimeout(() => {
                const heroText = document.querySelector('.hero-text');
                if (heroText) {
                    heroText.style.opacity = '1';
                    heroText.style.transform = 'translateY(0)';
                }
            }, 500);
        }

        loadHeroImage();
    }

    // Intersection Observer for animations - exact original behavior
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation - exact original elements
    const animatedElements = document.querySelectorAll(`
        .room-card,
        .amenity-item,
        .feature-card,
        .common-area-image,
        .common-area-content,
        .local-area-content,
        .local-area-map,
        .book-now-card,
        .room-text h3,
        .room-text p,
        .room-price,
        .hero-image,
        .hero-text,
        .hero-text h1,
        .hero-text p
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

// Update the loadGuestBook function
async function loadGuestBook() {
    try {
        const response = await fetch('data/GuestBook.json');
        const reviews = await response.json();
        const container = document.getElementById('guest-book-content');

        if (container && reviews.length > 0) {
            // Display all reviews at once
            container.innerHTML = reviews.map(review => `
                <div class="guest-review">
                    <div class="review-author">${review.name}${review.location ? `, ${review.location}` : ''}</div>
                    <div class="review-text">"${review.review}"</div>
                    <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                </div>
            `).join('');
        }
    } catch (error) {
    }
}

function displayGuestBook(entries) {
    const guestBookContent = document.getElementById('guest-book-content');

    if (!guestBookContent || entries.length === 0) {
        return;
    }

    let currentIndex = 0;
    let rotationInterval; // Store interval reference
    let isPaused = false;

    function showReview(index) {
        const entry = entries[index];

        guestBookContent.innerHTML = `
            <div class="guest-review">
                <div class="review-author">${entry.name}${entry.location ? `, ${entry.location}` : ''}</div>
                <div class="review-text">"${entry.review}"</div>
            </div>
        `;
    }

    function startRotation() {
        if (entries.length > 1 && !isPaused) {
            rotationInterval = setInterval(() => {
                if (!isPaused) {
                    currentIndex = (currentIndex + 1) % entries.length;
                    showReview(currentIndex);
                }
            }, 5000);
        }
    }

    function stopRotation() {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
    }

    // Show first review
    showReview(currentIndex);

    // Add hover event listeners
    guestBookContent.addEventListener('mouseenter', () => {
        isPaused = true;
        stopRotation();
    });

    guestBookContent.addEventListener('mouseleave', () => {
        isPaused = false;
        startRotation();
    });

    // Start rotation initially
    startRotation();
}

// Load Updates - exact original functionality
async function loadUpdates() {
    try {
        const response = await fetch('data/Updates.json');
        if (!response.ok) throw new Error('Failed to load updates');

        const data = await response.json();
        processUpdates(data);
    } catch (error) {
    }
}

    function processUpdates(data) {
        // Process any site updates or notifications - exact original
        if (data.notifications) {
            data.notifications.forEach(notification => {
                if (notification.active) {
                    // Handle notifications as needed
                }
            });
        }
    }

    // Touch and mobile-specific optimizations

    // Prevent zoom on double tap for buttons - mobile optimization
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add touch feedback for interactive elements - mobile enhancement
    const interactiveElements = document.querySelectorAll('button, .button, .cta-button, a');

    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        }, { passive: true });
    });

    // Optimize scroll performance - mobile optimization
    let ticking = false;

    function updateScrollElements() {
        // Add scroll-based effects here if needed
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }, { passive: true });

    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
            }, 0);
        });
    }

class UpdatesCard {
    constructor() {
        this.card = document.getElementById('updatesCard');
        this.closeBtn = document.getElementById('closeUpdates');
        this.content = document.getElementById('updatesContent');
        this.init();
    }

    init() {
        if (!this.card) return;

        // Show the card with animation
        setTimeout(() => {
            this.card.classList.add('show');
        }, 1000); // Delay to let hero load first

        // Close button functionality
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Load updates content
        this.loadUpdates();
    }

    async loadUpdates() {
        try {
            const response = await fetch('data/Updates.json');

            if (!response.ok) throw new Error('Failed to load updates');

            const data = await response.json();
            this.displayUpdates(data);

        } catch (error) {
            this.showFallbackContent();
        }
    }

    displayUpdates(data) {
        if (!this.content || !data) return;

        const updatesHTML = data.map(update =>
            `<div class="updates-text">${update.message}</div>`
        ).join('');

        this.content.innerHTML = `<div class="updates-scroll">${updatesHTML}</div>`;
    }

    showFallbackContent() {
        if (!this.content) return;

        this.content.innerHTML = `
            <div class="updates-scroll">
                <div class="updates-text">Welcome to Murney House! Check back for updates and news.</div>
            </div>
        `;
    }

    close() {
        this.card.classList.remove('show');
        setTimeout(() => {
            this.card.style.display = 'none';
        }, 500);
    }
}
    loadUpdates();
    new UpdatesCard();
    loadGuestBook();

});


/* ========================================
   ROOMS PAGE SPECIFIC FUNCTIONALITY
   ======================================== */

// Set responsive background image for rooms hero
function setRoomsHeroBackground() {
    const heroBackground = document.querySelector('.rooms-hero-background');
    if (!heroBackground) return; // Only run on rooms page

    const width = window.innerWidth;

    let imagePath;
    if (width >= 1200) {
        imagePath = '../public/images/assets/PX/Brm-3A-1920.webp';
    } else if (width >= 768) {
        imagePath = '../public/images/assets/PX/Brm-3A-1200.webp';
    } else {
        imagePath = '../public/images/assets/PX/Brm-3A-800.webp';
    }

    heroBackground.style.backgroundImage = `url('${imagePath}')`;
}

// Set background on load and resize
        window.addEventListener('load', setRoomsHeroBackground);
        window.addEventListener('resize', setRoomsHeroBackground);

// Smooth scroll to specific room sections from main page
function handleRoomNavigation() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
}

// Initialize rooms page functionality
function initializeRoomsPage() {
    // Only run rooms-specific code if we're on the rooms page
    if (document.querySelector('.rooms-hero')) {
        setRoomsHeroBackground();
        handleRoomNavigation();

        // Handle window resize for hero background
        window.addEventListener('resize', setRoomsHeroBackground);
    }
}

// Hero animation on page load for rooms page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the rooms page
    if (window.location.pathname.includes('rooms.html')) {
        setTimeout(() => {
            const heroImage = document.querySelector('.rooms-hero .hero-image');
            const heroText = document.querySelector('.rooms-hero .hero-text');
            const heroTitle = document.querySelector('.rooms-hero .hero-text h1');
            const heroSubtitle = document.querySelector('.rooms-hero .hero-text p');

            if (heroImage) heroImage.classList.add('in-view');
            if (heroText) heroText.classList.add('in-view');
            if (heroTitle) heroTitle.classList.add('in-view');
            if (heroSubtitle) heroSubtitle.classList.add('in-view');
        }, 100); // Small delay to ensure DOM is ready
    }
});
