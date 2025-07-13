// Scroll Module
const ScrollModule = {
    init() {
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this._onScroll = this.debounce(() => {
            this.highlightCurrentSection();
        }, 50);
        window.addEventListener('scroll', this._onScroll, { passive: true });
        this.highlightCurrentSection();
    },

    debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    highlightCurrentSection() {
        const scrollPosition = window.scrollY + 100;
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ScrollModule.init();
});
document.addEventListener('timeline-loaded', () => {
    ScrollModule.init();
});
document.addEventListener('project-loaded', () => {
    ScrollModule.init();
});
document.addEventListener('lineup-loaded', () => {
    ScrollModule.init();
});
document.addEventListener('footer-loaded', () => {
    ScrollModule.init();
});