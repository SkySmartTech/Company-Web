// Gallery Carousel Class
class GalleryCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.gallery-item');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        // Initialize the first slide
        this.updateSlides();
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Arrow button navigation
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Auto-play functionality
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            galleryContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Keyboard navigation (optional)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
    
    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.className = 'gallery-item';
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                slide.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                slide.classList.add('next');
            } else if (index === this.getHiddenLeftIndex()) {
                slide.classList.add('hidden-left');
            } else if (index === this.getHiddenRightIndex()) {
                slide.classList.add('hidden-right');
            } else {
                slide.classList.add('far-hidden');
            }
        });
        
        this.updateDots();
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    getPrevIndex() {
        return this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    }
    
    getNextIndex() {
        return this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    }
    
    getHiddenLeftIndex() {
        return this.currentSlide <= 1 ? this.totalSlides - 2 + this.currentSlide : this.currentSlide - 2;
    }
    
    getHiddenRightIndex() {
        return this.currentSlide >= this.totalSlides - 2 ? this.currentSlide - this.totalSlides + 2 : this.currentSlide + 2;
    }
    
    nextSlide() {
        this.currentSlide = this.getNextIndex();
        this.updateSlides();
    }
    
    prevSlide() {
        this.currentSlide = this.getPrevIndex();
        this.updateSlides();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlides();
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    // Public method to destroy the carousel
    destroy() {
        this.stopAutoPlay();
        
        // Remove event listeners
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', () => this.nextSlide());
        }
        
        this.dots.forEach((dot, index) => {
            dot.removeEventListener('click', () => this.goToSlide(index));
        });
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if gallery elements exist before initializing
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        new GalleryCarousel();
    }
});