// Gallery Module - CGR Timeline Gallery System (Versione Corretta per Cloudinary)
const GalleryModule = {
    galleries: null,
    currentSwiper: null,
    currentYear: null,
    
    async init() {
        console.log('Gallery Module: Initializing...');
        await this.loadGalleries();
        this.createModal();
        
        // Cerca i trigger della galleria dopo un breve ritardo per assicurarsi che la timeline sia renderizzata
        setTimeout(() => this.bindTimelineEvents(), 500);
    },
    
    async loadGalleries() {
        try {
            console.log('Gallery Module: Loading galleries data from assets/json/gallery.json...');
            // ASSICURATI CHE QUESTO PERCORSO SIA CORRETTO!
            const response = await fetch('assets/json/gallery.json');
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
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) this.closeModal();
        });
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
        console.log(`Gallery Module: Creating ${images.length} slides.`);
        const slidesContainer = document.getElementById('gallery-slides');
        slidesContainer.innerHTML = '';
        
        images.forEach((imageUrl, i) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            
            // MODIFICATO: Usa l'URL diretto di Cloudinary, senza proxy!
            slide.innerHTML = `
                <div class="swiper-zoom-container">
                    <img src="${imageUrl}" alt="Foto ${i + 1} per l'anno ${this.currentYear}" loading="lazy" />
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
        const modal = document.getElementById('gallery-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        if (this.currentSwiper) {
            this.currentSwiper.destroy(true, true);
            this.currentSwiper = null;
        }
        this.currentYear = null;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GalleryModule.init();
});

window.GalleryModule = GalleryModule;