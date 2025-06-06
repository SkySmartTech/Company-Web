document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("hero");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroSection.classList.add("animate-fade-up", "opacity-100");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (heroSection) {
    observer.observe(heroSection);
  }
});

  const helpBtn = document.getElementById('helpButton');
  helpBtn.addEventListener('mouseover', () => {
    helpBtn.style.boxShadow = '0 0 12px 4px rgba(0, 255, 255, 0.7), 0 0 20px 6px rgba(0, 255, 255, 0.5)';
  });
  helpBtn.addEventListener('mouseout', () => {
    helpBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  });

  helpBtn.addEventListener('click', () => {
    window.location.href = '/help'; // Change to your help page
  });

class PhotoGallery {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showAlbumsOverview();
    }

    setupEventListeners() {
        // Album card clicks
        const albumCards = document.querySelectorAll('.album-card');
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const target = card.getAttribute('data-target');
                this.showGallerySection(target);
            });
        });
    }

    showAlbumsOverview() {
        const albumsOverview = document.querySelector('.albums-overview');
        albumsOverview.style.display = 'block';

        // Hide all gallery sections
        const gallerySections = document.querySelectorAll('.gallery-section');
        gallerySections.forEach(section => section.classList.remove('active'));

        this.scrollToTop();
        window.location.hash = '';
    }

    showGallerySection(sectionId) {
        const albumsOverview = document.querySelector('.albums-overview');
        albumsOverview.style.display = 'none';

        const gallerySections = document.querySelectorAll('.gallery-section');
        gallerySections.forEach(section => section.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            window.location.hash = sectionId;
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
});
