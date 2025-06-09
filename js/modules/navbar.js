// Navbar Module
const NavbarModule = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        
        // Gestione menu mobile
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
            });
        }

        // Gestione trasparenza navbar
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Chiamata iniziale per impostare lo stato corretto
        this.handleScroll();
    },

    handleScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
};

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    NavbarModule.init();
});