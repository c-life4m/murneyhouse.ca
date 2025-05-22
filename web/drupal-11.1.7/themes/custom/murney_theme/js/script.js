document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactivity
    initializeAnimations();
    setupEventListeners();
    loadImages();

    // Handle language and theme preferences from localStorage
    const savedLang = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';

    setLanguage(savedLang);
    setTheme(savedTheme);
});

function loadImages() {
    // Simulate loading of hero image
    setTimeout(() => {
        const heroImage = document.querySelector('.hero-image');
        const heroText = document.querySelector('.hero-text');

        if (heroImage) {
            heroImage.style.opacity = 1;
            heroImage.style.transform = 'scale(1)';
        }

        if (heroText) {
            heroText.style.opacity = 1;
            heroText.style.transform = 'translateY(0)';
        }
    }, 500);
}

function initializeAnimations() {
    // AOS is simulated here, implementation would use actual AOS library
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let el = entry.target;
                let delay = el.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    el.style.opacity = 1;

                    switch(el.getAttribute('data-aos')) {
                        case 'fade-up':
                            el.style.transform = 'translateY(0)';
                            break;
                        case 'fade-right':
                            el.style.transform = 'translateX(0)';
                            break;
                        case 'fade-left':
                            el.style.transform = 'translateX(0)';
                            break;
                        case 'zoom-in':
                            el.style.transform = 'scale(1)';
                            break;
                    }
                }, delay);

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        switch(el.getAttribute('data-aos')) {
            case 'fade-up':
                el.style.transform = 'translateY(50px)';
                break;
            case 'fade-right':
                el.style.transform = 'translateX(-50px)';
                break;
            case 'fade-left':
                el.style.transform = 'translateX(50px)';
                break;
            case 'zoom-in':
                el.style.transform = 'scale(0.9)';
                break;
        }

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
                document.body.classList.contains('light-mode')
                    ? header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                    : header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            } else {
                header.style.padding = '1rem 0';
                document.body.classList.contains('light-mode')
                    ? header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                    : header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            }
        }
    });
}

function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Language toggle
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = document.body.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'fr' : 'en';
            setLanguage(newLang);
        });
    }

    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');

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
                document.body.classList.remove('no-scroll');

                const spans = mobileNavToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Animate buttons on hover
    const buttons = document.querySelectorAll('.button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s ease';
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

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (emailInput.value) {
                // Simulate success message
                const successMessage = document.createElement('p');
                successMessage.textContent = document.body.getAttribute('data-lang') === 'en'
                    ? 'Thank you for subscribing!'
                    : 'Merci de vous être abonné!';
                successMessage.style.color = '#4CAF50';

                newsletterForm.innerHTML = '';
                newsletterForm.appendChild(successMessage);
            }
        });
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }

    localStorage.setItem('theme', theme);

    // Update header background color
    const header = document.querySelector('header');
    if (header) {
        theme === 'dark'
            ? header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)'
            : header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
}

function setLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem('language', lang);

    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes buttonWobble {
        0% { transform: translateY(-2px) rotate(0); }
        25% { transform: translateY(-2px) rotate(2deg); }
        50% { transform: translateY(-2px) rotate(0); }
        75% { transform: translateY(-2px) rotate(-2deg); }
        100% { transform: translateY(-2px) rotate(0); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .button, .cta-button, .text-button {
        position: relative;
        overflow: hidden;
    }

    /* Animation for AOS elements (when using custom implementation) */
    [data-aos] {
        opacity: 0;
    }
`;

document.head.appendChild(styleSheet);
