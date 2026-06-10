// About section parallax effect
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.section-about');
    
    if (!aboutSection) return;

    // Controlla se il dispositivo è mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const sectionTop = aboutSection.offsetTop;
                const sectionBottom = sectionTop + aboutSection.offsetHeight;
                
                // Applica l'effetto solo quando la sezione è visibile
                if (scrolled + window.innerHeight > sectionTop && scrolled < sectionBottom) {
                    const yPos = (scrolled - sectionTop) * 0.5;
                    aboutSection.style.setProperty('--parallax-y', `${yPos}px`);
                }
            });
        });
    }
});
