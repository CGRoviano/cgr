// Gallery Module - CGR Timeline Gallery System (Versione Corretta per Cloudinary)
const GalleryModule = {
    galleries: null,
    currentSwiper: null,
    currentYear: null,
    
    async init() {
        console.log('Gallery Module: Initializing...');
        await this.loadGalleries();
        this.createModal();
        // Se siamo in una pagina gallery dedicata, apri la galleria giusta
        const galleryMatch = window.location.pathname.match(/gallery\/(\d{4})gallery\.html$/);
        if (galleryMatch && this.galleries) {
            const year = galleryMatch[1];
            // Attendi che il DOM sia pronto e apri la galleria
            setTimeout(() => this.openGallery(year), 200);
        } else {
            // Cerca i trigger della galleria dopo un breve ritardo per assicurarsi che la timeline sia renderizzata
            setTimeout(() => this.bindTimelineEvents(), 500);
        }
    },
    
    async loadGalleries() {
        try {
            // Percorso dinamico: cerca gallery.json sia da /sections che da /gallery
            let jsonPath = 'assets/json/gallery.json';
            if (window.location.pathname.includes('/gallery/')) {
                jsonPath = '../assets/json/gallery.json';
            }
            // Forza il refresh del JSON ad ogni caricamento
            jsonPath += '?v=' + Date.now();
            console.log('Gallery Module: Loading galleries data from', jsonPath);
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.galleries = await response.json();
            console.log('Gallery Module: Galleries loaded successfully', this.galleries);
        } catch (error) {
            console.error('Gallery Module: Error loading galleries:', error);
            this.galleries = {};
        }
    },
    
    createModal() {
        if (document.getElementById('gallery-modal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'gallery-modal';
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-header-modal">
                <div>
                    <h2 class="gallery-title-modal" id="gallery-title">Galleria Foto</h2>
                    <div class="gallery-counter" id="gallery-counter"></div>
                </div>
                <button class="gallery-close" id="gallery-close" aria-label="Chiudi galleria">×</button>
            </div>
            <div class="gallery-main">
                <div class="gallery-loading" id="gallery-loading"><div class="gallery-spinner"></div></div>
                <div class="gallery-swiper swiper" id="gallery-swiper" style="display: none;">
                    <div class="swiper-wrapper" id="gallery-slides"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="gallery-thumbnails-container" id="gallery-thumbnails-container" style="display: none;">
                <div class="gallery-thumbnails" id="gallery-thumbnails"></div>
            </div>
        `;
        document.body.appendChild(modal);
        this.bindModalEvents();
    },
    
    bindModalEvents() {
        const modal = document.getElementById('gallery-modal');
        document.getElementById('gallery-close').addEventListener('click', () => this.closeModal());
        // ESC disabilitato: nessun event listener per Escape
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
    },
    
    bindTimelineEvents() {
        console.log('Gallery Module: Binding timeline events...');
        const galleryButtons = document.querySelectorAll('.gallery-trigger');
        
        galleryButtons.forEach(button => {
            const year = button.getAttribute('data-year');
            const fallbackUrl = button.getAttribute('data-fallback-url');
            
            const hasInternalGallery = year && this.galleries[year] && this.galleries[year].images.length > 0;

            if (hasInternalGallery) {
                // C'è una galleria interna: il pulsante apre il modal.
                button.disabled = false;
                button.style.opacity = '1';
                button.addEventListener('click', () => this.openGallery(year));
                console.log(`Gallery Module: Internal gallery enabled for year ${year}`);

            } else if (fallbackUrl) {
                // Non c'è galleria interna, ma c'è un link esterno.
                button.disabled = false;
                button.style.opacity = '1';
                button.addEventListener('click', () => {
                    window.open(fallbackUrl, '_blank');
                });
                console.log(`Gallery Module: Fallback URL enabled for year ${year}`);
            
            } else {
                // Non c'è niente: il pulsante è disabilitato.
                button.disabled = true;
                button.style.opacity = '0.5';
                console.log(`Gallery Module: No gallery or fallback for year ${year}, button disabled.`);
            }
        });
    },
    
    openGallery(year) {
        if (!this.galleries[year] || !this.galleries[year].images.length) return;

        // Salva l'anno corrente in localStorage per il redirect dopo la chiusura
        try {
            localStorage.setItem('lastGalleryYear', year);
        } catch (e) {}

        // AUDIO AUTOPLAY LOGIC FOR 2000
        // Remove any previous gallery audio
        if (this._galleryAudio) {
            this._galleryAudio.pause();
            this._galleryAudio.currentTime = 0;
            this._galleryAudio.remove();
            this._galleryAudio = null;
        }

        // Funzione per forzare l'autoplay con interazione utente se necessario
        const playAudioWithFallback = (audio) => {
            let started = false;
            function startAudio() {
                if (!started) {
                    started = true;
                    audio.play();
                    const overlay = document.getElementById('gallery-audio-capture');
                    if (overlay) overlay.remove();
                    document.removeEventListener('click', startAudio);
                    document.removeEventListener('keydown', startAudio);
                    document.removeEventListener('touchstart', startAudio);
                }
            }
            // Overlay invisibile SEMPRE per la pagina galleria dedicata
            if (window.location.pathname.includes('/gallery/')) {
                if (!document.getElementById('gallery-audio-capture')) {
                    const overlay = document.createElement('div');
                    overlay.id = 'gallery-audio-capture';
                    overlay.style.position = 'fixed';
                    overlay.style.top = 0;
                    overlay.style.left = 0;
                    overlay.style.width = '100vw';
                    overlay.style.height = '100vh';
                    overlay.style.background = 'transparent';
                    overlay.style.zIndex = 9999;
                    overlay.style.cursor = 'pointer';
                    overlay.addEventListener('click', startAudio);
                    overlay.addEventListener('keydown', startAudio);
                    overlay.addEventListener('touchstart', startAudio);
                    document.body.appendChild(overlay);
                }
                // Aggancia anche agli eventi globali
                document.addEventListener('click', startAudio);
                document.addEventListener('keydown', startAudio);
                document.addEventListener('touchstart', startAudio);
            }
            audio.play().catch(() => {
                // Se l'autoplay fallisce, la funzione startAudio è già agganciata
            });
        };

        const audioFiles = {
            '2000': 'rinoamanoamano.mp3',
            '2001': 'thebeatleshelp.mp3',
            '2002': 'faberhotelsupramonte.mp3',
            '2003': 'pinkfloyheyyou.mp3',
            '2004': 'bobmarleyjamming.mp3',
            '2005': 'ivangrazianiluganoaddio.mp3',
            '2006': 'thequeenfat.mp3',
            '2007': 'theddorsstrange.mp3',
            '2008': 'nomadidioemorto.mp3',
            '2009': 'battistiemozioni.mp3',
            '2010': 'rinoeiocisto.mp3',
            '2011': 'bruscoaabronz.mp3',
            '2012': 'nirvanarapeme.mp3',
            '2013': 'mjsmoothcriminal.mp3',
            '2014': 'elvis.mp3',
            '2015': 'inncantinasulegambe.mp3'
        };
        if (audioFiles[year]) {
            const audio = document.createElement('audio');
            let audioPath = 'assets/audio/' + audioFiles[year];
            if (window.location.pathname.includes('/gallery/')) {
                audioPath = '../assets/audio/' + audioFiles[year];
            }
            audio.src = audioPath;
            audio.loop = true;
            audio.volume = 0.05;
            audio.autoplay = true;
            audio.style.display = 'none';
            document.body.appendChild(audio);
            playAudioWithFallback(audio);
            this._galleryAudio = audio;
        }

        this.currentYear = year;
        const galleryData = this.galleries[year];

        const modal = document.getElementById('gallery-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        document.getElementById('gallery-title').textContent = `${year} - ${galleryData.title}`;
        document.getElementById('gallery-loading').style.display = 'flex';
        document.getElementById('gallery-swiper').style.display = 'none';
        document.getElementById('gallery-thumbnails-container').style.display = 'none';

        // Caricamento asincrono per non bloccare l'UI
        setTimeout(() => {
            this.createSlides(galleryData.images);
            this.createThumbnails(galleryData.images);
            this.initSwiper();

            document.getElementById('gallery-loading').style.display = 'none';
            document.getElementById('gallery-swiper').style.display = 'block';
            document.getElementById('gallery-thumbnails-container').style.display = 'flex';
        }, 50); // Piccolo delay per permettere al CSS di applicare le animazioni
    },
    
    createSlides(images) {
        console.log(`Gallery Module: Creating ${images.length} optimized slides.`);
        const slidesContainer = document.getElementById('gallery-slides');
        slidesContainer.innerHTML = '';
        
        images.forEach((imageUrl, i) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            
            // Chiediamo a Cloudinary una versione ottimizzata dell'immagine:
            // w_1280 = larga al massimo 1280px
            // h_1280 = alta al massimo 1280px
            // c_limit = ridimensiona solo se è più grande, non ingrandisce le immagini piccole
            // q_auto = qualità automatica per il miglior compromesso peso/qualità
            const optimizedUrl = imageUrl.replace('/upload/', '/upload/w_1280,h_1280,c_limit,q_auto/');
            
            slide.innerHTML = `
                <div class="swiper-zoom-container">
                    <img src="${optimizedUrl}" alt="Foto ${i + 1} per l'anno ${this.currentYear}" loading="lazy" />
                </div>
            `;
            slidesContainer.appendChild(slide);
        });
    },

    createThumbnails(images) {
        console.log(`Gallery Module: Creating ${images.length} thumbnails.`);
        const thumbnailsContainer = document.getElementById('gallery-thumbnails');
        thumbnailsContainer.innerHTML = '';

        images.forEach((imageUrl, index) => {
            const thumb = document.createElement('img');
            thumb.className = 'gallery-thumb';
            if (index === 0) thumb.classList.add('active');
            
            // MODIFICATO: Usa l'URL di Cloudinary, ma con trasformazioni per renderlo più piccolo e veloce!
            const thumbUrl = imageUrl.replace('/upload/', '/upload/w_200,h_150,c_fill,q_auto/');
            thumb.src = thumbUrl;
            thumb.alt = `Thumbnail ${index + 1}`;
            
            thumb.addEventListener('click', () => {
                if (this.currentSwiper) this.currentSwiper.slideTo(index);
            });
            thumbnailsContainer.appendChild(thumb);
        });
    },
    
    initSwiper() {
        if (this.currentSwiper) this.currentSwiper.destroy(true, true);
        
        this.currentSwiper = new Swiper('#gallery-swiper', {
            loop: false,
            grabCursor: true,
            keyboard: { enabled: true },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction', // Mostra "1 / 27" che è più chiaro
            },
            zoom: { maxRatio: 3, },
            on: {
                slideChange: () => this.updateActiveThumbnail(),
            }
        });
        this.updateCounter();
        this.updateActiveThumbnail();
    },

    updateCounter() {
        if (!this.currentSwiper) return;
        const counter = document.getElementById('gallery-counter');
        const current = this.currentSwiper.realIndex + 1;
        const total = this.currentSwiper.slides.length;
        counter.textContent = `${current} / ${total}`;
    },

    updateActiveThumbnail() {
        if (!this.currentSwiper) return;
        this.updateCounter(); // Aggiorna anche il contatore
        
        const activeIndex = this.currentSwiper.realIndex;
        const thumbnails = document.querySelectorAll('.gallery-thumb');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
        });
        
        const activeThumb = document.querySelector('.gallery-thumb.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    },
    
    closeModal() {
        // Permetti sempre la chiusura, resetta _redirecting subito dopo
        if (this._redirecting) return;
        this._redirecting = true;
        const modal = document.getElementById('gallery-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Stop and remove gallery audio if present
        if (this._galleryAudio) {
            this._galleryAudio.pause();
            this._galleryAudio.currentTime = 0;
            this._galleryAudio.remove();
            this._galleryAudio = null;
        }

        if (this.currentSwiper) {
            this.currentSwiper.destroy(true, true);
            this.currentSwiper = null;
        }
        // Salva l'anno della galleria appena chiusa
        let lastYear = null;
        try {
            lastYear = localStorage.getItem('lastGalleryYear');
        } catch (e) {}
        this.currentYear = null;

        // Se siamo in una pagina gallery dedicata, torna a index.html alla sezione timeline-ANNO
        if (window.location.pathname.includes('/gallery/')) {
            let hash = '#timeline';
            if (lastYear) {
                hash = `#timeline-${lastYear}`;
            }
            window.location.href = '../index.html' + hash;
        }

        // Reset _redirecting dopo breve delay per permettere nuove aperture/chiusure
        setTimeout(() => { this._redirecting = false; }, 500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GalleryModule.init();
});

window.GalleryModule = GalleryModule;