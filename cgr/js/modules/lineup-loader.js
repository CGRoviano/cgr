// Lineup Loader Module
const LineupLoader = {
    async init() {
        try {
            console.log('LineupLoader: Inizio caricamento');
            const response = await fetch('sections/lineup.html');
            
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            
            const htmlContent = await response.text();
            console.log('LineupLoader: Contenuto caricato', htmlContent.length);
            
            const lineupContainer = document.getElementById('lineup-container');
            if (lineupContainer) {
                console.log('LineupLoader: Contenitore trovato');
                lineupContainer.innerHTML = htmlContent;
                
                // Lancia un evento personalizzato dopo il caricamento
                const event = new Event('lineup-loaded');
                document.dispatchEvent(event);
            } else {
                console.error('LineupLoader: Contenitore lineup-container non trovato');
            }
        } catch (error) {
            console.error('Errore nel caricamento della lineup:', error);
            
            const lineupContainer = document.getElementById('lineup-container');
            if (lineupContainer) {
                lineupContainer.innerHTML = `
                    <div class="lineup-error">
                        <h3>Impossibile caricare la Line Up</h3>
                        <p>Si è verificato un errore durante il caricamento del contenuto.</p>
                    </div>
                `;
            }
        }
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('LineupLoader: DOM caricato');
    LineupLoader.init();
});