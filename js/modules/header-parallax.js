// Header Parallax Effect Module
const HeaderParallaxModule = {
    init() {
        this.header = document.querySelector('header');
        this.headerContent = document.querySelector('.header-content');
        this.lastScrollY = window.scrollY;
        this.ticking = false;

        this.bindEvents();
    },

    bindEvents() {
        // Scroll event with RAF for performance
        window.addEventListener('scroll', () => {
            this.lastScrollY = window.scrollY;
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        // Resize event for responsive adjustments
        window.addEventListener('resize', () => {
            this.checkMobileDevice();
        });

        // Initial check for mobile
        this.checkMobileDevice();
    },

    updateParallax() {
        if (this.isMobile) return;

        const scrolled = this.lastScrollY;
        
        // Parallax effect for background
        const translateY = scrolled * 0.5;
        this.header.style.backgroundPositionY = `${translateY}px`;

        // Fade out effect for header content
        if (scrolled > 0) {
            const opacity = Math.max(0, 1 - scrolled / 500);
            const transform = `translateY(${scrolled * 0.2}px)`;
            this.headerContent.style.opacity = opacity;
            this.headerContent.style.transform = transform;
        } else {
            // Reset styles when at top
            this.headerContent.style.opacity = 1;
            this.headerContent.style.transform = 'translateY(0)';
        }
    },

    checkMobileDevice() {
        // Disable parallax on mobile devices or small screens
        this.isMobile = window.innerWidth <= 768;
        if (this.isMobile) {
            this.header.style.backgroundPositionY = '';
            this.headerContent.style.opacity = '';
            this.headerContent.style.transform = '';
        }
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    HeaderParallaxModule.init();
});