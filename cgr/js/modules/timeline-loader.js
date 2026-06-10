// Timeline Loader Module
const TimelineLoader = {
    async init() {
        try {
            console.log('TimelineLoader: Inizio caricamento');
            const response = await fetch('sections/timeline.html');
            
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            
            const htmlContent = await response.text();
            console.log('TimelineLoader: Contenuto caricato', htmlContent.length);
            
            const timelineContainer = document.getElementById('timeline-container');
            if (timelineContainer) {
                console.log('TimelineLoader: Contenitore trovato');
                timelineContainer.innerHTML = htmlContent;
                
                // Lancia un evento personalizzato dopo il caricamento
                const event = new Event('timeline-loaded');
                document.dispatchEvent(event);
            } else {
                console.error('TimelineLoader: Contenitore timeline-container non trovato');
            }
        } catch (error) {
            console.error('Errore nel caricamento della timeline:', error);
            
            const timelineContainer = document.getElementById('timeline-container');
            if (timelineContainer) {
                timelineContainer.innerHTML = `
                    <div class="timeline-error">
                        <h3>Impossibile caricare la Timeline</h3>
                        <p>Si è verificato un errore durante il caricamento del contenuto.</p>
                    </div>
                `;
            }
        }
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('TimelineLoader: DOM caricato');
    TimelineLoader.init();
});