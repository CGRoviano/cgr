// Loader per la sezione "Come Raggiungere l'Evento"
const HowToGetThereLoader = {
    async init() {
        try {
            const response = await fetch('sections/how-to-get-there.html');
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const htmlContent = await response.text();
            const container = document.getElementById('how-to-get-there-container');
            if (container) {
                container.innerHTML = htmlContent;
                document.dispatchEvent(new Event('how-to-get-there-loaded'));
            }
        } catch (error) {
            const container = document.getElementById('how-to-get-there-container');
            if (container) {
                container.innerHTML = `<div class="how-to-get-there-error"><h3>Errore nel caricamento</h3><p>Impossibile caricare la sezione Come Raggiungere l'Evento.</p></div>`;
            }
        }
    }
};

// Caricamento automatico all'avvio
HowToGetThereLoader.init();
