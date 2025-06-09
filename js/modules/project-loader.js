// Project Loader Module
const ProjectLoader = {
    async init() {
        try {
            console.log('ProjectLoader: Starting load');
            const response = await fetch('sections/project.html');
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const htmlContent = await response.text();
            console.log('ProjectLoader: Content loaded');
            
            const projectContainer = document.getElementById('project-container');
            if (projectContainer) {
                projectContainer.innerHTML = htmlContent;
                console.log('ProjectLoader: Content inserted');
                
                // Dispatch event for project loaded
                document.dispatchEvent(new Event('project-loaded'));
            } else {
                console.error('ProjectLoader: project-container not found');
            }
        } catch (error) {
            console.error('Error loading project section:', error);
            
            const projectContainer = document.getElementById('project-container');
            if (projectContainer) {
                projectContainer.innerHTML = `
                    <div class="project-error">
                        <h3>Errore nel caricamento</h3>
                        <p>Si è verificato un errore durante il caricamento della sezione progetto.</p>
                    </div>
                `;
            }
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ProjectLoader.init();
});