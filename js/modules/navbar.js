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
                // Previeni lo scroll del body quando il menu è aperto
                document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Chiusura menu al clic di un link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Chiusura menu cliccando fuori
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.menuToggle.contains(e.target)) {
                this.navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Gestione trasparenza navbar
        this._onScroll = this.debounce(() => {
            this.handleScroll();
            this.updateActiveLink();
        }, 50);
        window.addEventListener('scroll', this._onScroll, { passive: true });

        // Chiamata iniziale per impostare lo stato corretto
        this.handleScroll();
    },

    debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    handleScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
};

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    NavbarModule.init();
});