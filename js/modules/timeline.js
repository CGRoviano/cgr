// Timeline Module
const TimelineModule = {
    init() {
        console.log('TimelineModule: Inizializzazione');
        this.fetchElements();
        if (this.timelinePoints && this.timelineGroups && this.groups) {
            this.bindEvents();
            this.resetAllStates();
        }
    },

    fetchElements() {
        console.log('TimelineModule: Recupero elementi');
        this.timelinePoints = document.querySelectorAll('.timeline-point');
        this.timelineGroups = document.querySelector('.timeline-groups');
        this.groups = document.querySelectorAll('.timeline-group');
        this.activePoint = null;
        
        console.log('TimelineModule: Elementi trovati', {
            points: this.timelinePoints?.length,
            groups: this.groups?.length,
            container: !!this.timelineGroups
        });
    },

    resetAllStates() {
        this.timelinePoints.forEach(p => p.classList.remove('active'));
        this.groups.forEach(group => {
            group.classList.remove('visible');
            const events = group.querySelectorAll('.timeline-item');
            events.forEach(event => {
                event.style.opacity = '0';
                event.style.transform = 'translateY(20px)';
            });
        });
        this.timelineGroups.classList.remove('active');
        this.activePoint = null;
    },

    bindEvents() {
        console.log('TimelineModule: Binding eventi');
        this.timelinePoints.forEach(point => {
            point.addEventListener('click', () => {
                console.log('TimelineModule: Click su punto', point.getAttribute('data-years'));
                this.handlePointClick(point);
            });
        });
    },

    handlePointClick(point) {
        const years = point.getAttribute('data-years');
        console.log('TimelineModule: Gestione click', years);
        
        // Se clicchiamo sullo stesso punto attivo
        if (this.activePoint === point) {
            this.closeCurrentGroup();
        } 
        // Se clicchiamo su un nuovo punto
        else {
            // Se c'è già un punto attivo, chiudiamo prima quello
            if (this.activePoint) {
                this.closeCurrentGroup(() => {
                    this.openNewGroup(point, years);
                });
            } else {
                this.openNewGroup(point, years);
            }
        }
    },

    closeCurrentGroup(callback) {
        console.log('TimelineModule: Chiusura gruppo corrente');
        // Rimuovi la classe active dal punto corrente
        if (this.activePoint) {
            this.activePoint.classList.remove('active');
        }

        // Nascondi gli eventi del gruppo corrente
        const currentGroup = Array.from(this.groups).find(group => 
            group.classList.contains('visible')
        );

        if (currentGroup) {
            const events = currentGroup.querySelectorAll('.timeline-item');
            events.forEach(event => {
                event.style.opacity = '0';
                event.style.transform = 'translateY(20px)';
            });

            setTimeout(() => {
                currentGroup.classList.remove('visible');
                this.timelineGroups.classList.remove('active');
                this.activePoint = null;
                
                if (callback) callback();
            }, 300);
        } else {
            this.activePoint = null;
            if (callback) callback();
        }
    },

    openNewGroup(point, years) {
        console.log('TimelineModule: Apertura nuovo gruppo', years);
        // Attiva il nuovo punto
        point.classList.add('active');
        this.activePoint = point;
        
        // Mostra il contenitore dei gruppi
        this.timelineGroups.classList.add('active');
        
        // Trova e mostra il nuovo gruppo
        const targetGroup = Array.from(this.groups).find(group => 
            group.getAttribute('data-years') === years
        );
        
        if (targetGroup) {
            targetGroup.classList.add('visible');
            
            // Anima gli eventi del gruppo
            const events = targetGroup.querySelectorAll('.timeline-item');
            events.forEach((event, index) => {
                setTimeout(() => {
                    event.style.opacity = '1';
                    event.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
};

// Inizializza quando il modulo viene caricato dinamicamente
document.addEventListener('timeline-loaded', () => {
    console.log('TimelineModule: Contenuto timeline caricato');
    TimelineModule.init();
    
    // Aggiungi istruzioni sotto il titolo
    const title = document.querySelector('#timeline h2');
    if (title) {
        const instruction = document.createElement('div');
        instruction.className = 'timeline-instruction';
        instruction.innerHTML = `Clicca sui <span>●</span> per esplorare gli eventi<br>poi sulle schede con <span>▶</span> per le foto storiche`;
        title.insertAdjacentElement('afterend', instruction);
    }
});

// Esponi il modulo globalmente
window.TimelineModule = TimelineModule;