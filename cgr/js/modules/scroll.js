// Scroll Module
const ScrollModule = {
    init() {
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-links a');
        
        // Aggiungi listener per lo scroll
        window.addEventListener('scroll', () => {
            this.highlightCurrentSection();
        });

        // Highlight iniziale
        this.highlightCurrentSection();
    },

    highlightCurrentSection() {
        const scrollPosition = window.scrollY + 100; // Offset per migliorare la detection

        // Rimuovi la classe active da tutti i link
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Trova la sezione corrente e attiva il link corrispondente
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

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    ScrollModule.init();
});

// Reinizializza quando il contenuto dinamico è caricato
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