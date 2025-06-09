// Header Parallax Effect Module with smooth performance
const HeaderParallaxModule = {
    init() {
        this.header = document.querySelector('header');
        if (!this.header) return;
        
        this.headerBg = this.header.querySelector(':before');
        this.headerContent = document.querySelector('.header-content');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.scrollSpeed = 0.4;
        this.maxScroll = window.innerHeight * 0.5;

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
        }, { passive: true });

        // Resize event for responsive adjustments
        window.addEventListener('resize', () => {
            this.checkMobileDevice();
            this.maxScroll = window.innerHeight * 0.5;
        }, { passive: true });

        // Initial check
        this.checkMobileDevice();
        this.updateParallax();
    },

    updateParallax() {
        if (this.isMobile) return;

        const scrolled = Math.min(this.lastScrollY, this.maxScroll);
        
        // Smooth parallax effect for background using transform
        const translateY = scrolled * this.scrollSpeed;
        const clampedTranslate = Math.min(translateY, this.maxScroll);
        this.header.style.setProperty('--parallax-offset', `${clampedTranslate}px`);

        // Apply transform to pseudo-element for better performance
        this.header.style.setProperty('--header-transform', `translateY(${clampedTranslate}px)`);

        // Fade out effect for header content with hardware acceleration
        if (scrolled > 0) {
            const opacity = Math.max(0, 1 - scrolled / (this.maxScroll * 1.2));
            const contentTransform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
            this.headerContent.style.opacity = opacity;
            this.headerContent.style.transform = contentTransform;
        } else {
            // Reset styles when at top
            this.headerContent.style.opacity = '';
            this.headerContent.style.transform = '';
        }
    },

    checkMobileDevice() {
        // Disable parallax on mobile devices or small screens
        this.isMobile = window.innerWidth <= 768;
        if (this.isMobile) {
            this.header.style.setProperty('--parallax-offset', '0px');
            this.header.style.setProperty('--header-transform', 'none');
            this.headerContent.style.opacity = '';
            this.headerContent.style.transform = '';
        }
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    HeaderParallaxModule.init();
});