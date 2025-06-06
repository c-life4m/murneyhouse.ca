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
        .book-now-card
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Guest Book - Load and display reviews from JSON - exact original functionality
    async function loadGuestBook() {
        try {
            const response = await fetch('data/GuestBook.json');
            if (!response.ok) throw new Error('Failed to load guest book');

            const data = await response.json();
            displayGuestBook(data.entries || []);
        } catch (error) {
            console.warn('Guest book not available:', error);
            // Show fallback content - exact original fallback
            const guestBookContent = document.getElementById('guest-book-content');
            if (guestBookContent) {
                guestBookContent.innerHTML = `
                    <div class="guest-review">
                        <div class="review-author">Sarah & Mike, Toronto</div>
                        <div class="review-text">"A wonderful stay! The personal touch and attention to detail made our visit truly memorable. We'll definitely be back!"</div>
                    </div>
                `;
            }
        }
    }

    function displayGuestBook(entries) {
        const guestBookContent = document.getElementById('guest-book-content');
        if (!guestBookContent || entries.length === 0) return;

        let currentIndex = 0;

        function showReview(index) {
            const entry = entries[index];
            guestBookContent.innerHTML = `
                <div class="guest-review">
                    <div class="review-author">${entry.name}${entry.location ? `, ${entry.location}` : ''}</div>
                    <div class="review-text">"${entry.message}"</div>
                </div>
            `;
        }

        // Show first review
        showReview(currentIndex);

        // Rotate reviews if there are multiple - exact original timing
        if (entries.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % entries.length;
                showReview(currentIndex);
            }, 5000);
        }
    }

    loadGuestBook();

    // Load Updates - exact original functionality
    async function loadUpdates() {
        try {
            const response = await fetch('data/Updates.json');
            if (!response.ok) throw new Error('Failed to load updates');

            const data = await response.json();
            processUpdates(data);
        } catch (error) {
            console.warn('Updates not available:', error);
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

    loadUpdates();

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
            console.warn('Updates not available:', error);
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

    new UpdatesCard();

});
