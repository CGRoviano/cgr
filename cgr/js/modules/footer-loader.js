// Footer Loader Module
const FooterLoader = {
    async init() {
        try {
            console.log('FooterLoader: Inizio caricamento');
            const response = await fetch('sections/footer.html');
            
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            
            const htmlContent = await response.text();
            console.log('FooterLoader: Contenuto caricato', htmlContent.length);
            
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                console.log('FooterLoader: Contenitore trovato');
                footerContainer.innerHTML = htmlContent;
                
                // Lancia un evento personalizzato dopo il caricamento
                const event = new Event('footer-loaded');
                document.dispatchEvent(event);
            } else {
                console.error('FooterLoader: Contenitore footer-container non trovato');
            }
        } catch (error) {
            console.error('Errore nel caricamento del footer:', error);
            
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = `
                    <div class="footer-error">
                        <h3>Impossibile caricare il Footer</h3>
                        <p>Si è verificato un errore durante il caricamento del contenuto.</p>
                    </div>
                `;
            }
        }
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('FooterLoader: DOM caricato');
    FooterLoader.init();
});