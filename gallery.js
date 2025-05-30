// Gallery Carousel Class
class GalleryCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.gallery-item');
        this.dots = document.querySelectorAll('.dot');
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play functionality
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        galleryContainer.addEventListener('mouseleave', () => this.startAutoPlay());
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
        this.currentSlide = index;
        this.updateSlides();
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
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GalleryCarousel();
});