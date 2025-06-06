document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('show');
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('show');
    }
  });
});


// Gallery JavaScript
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
            card.addEventListener('click', (e) => {
                const target = card.getAttribute('data-target');
                this.showGallerySection(target);
            });
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.showGallerySection(target);
            });
        });

        // Back buttons
        const backBtns = document.querySelectorAll('.back-btn');
        backBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showAlbumsOverview();
            });
        });

        // Photo item clicks (for future modal functionality)
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach(item => {
            item.addEventListener('click', () => {
                this.handlePhotoClick(item);
            });
        });

        // Smooth scroll for navigation
        this.setupSmoothScroll();
    }

    showAlbumsOverview() {
        // Hide all gallery sections
        const gallerySections = document.querySelectorAll('.gallery-section');
        gallerySections.forEach(section => {
            section.classList.remove('active');
        });

        // Show albums overview
        const albumsOverview = document.querySelector('.albums-overview');
        albumsOverview.style.display = 'block';

        // Scroll to top
        this.scrollToTop();

        // Update URL hash
        window.location.hash = '';
    }

    showGallerySection(sectionId) {
        // Hide albums overview
        const albumsOverview = document.querySelector('.albums-overview');
        albumsOverview.style.display = 'none';

        // Hide all gallery sections
        const gallerySections = document.querySelectorAll('.gallery-section');
        gallerySections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll to section
            setTimeout(() => {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            // Update URL hash
            window.location.hash = sectionId;
        }
    }

    handlePhotoClick(photoItem) {
        // Add a subtle animation effect
        photoItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
            photoItem.style.transform = '';
        }, 150);

        // You can extend this to open a modal or lightbox
        console.log('Photo clicked:', photoItem);
    }

    setupSmoothScroll() {
        // Handle browser back/forward buttons
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && ['Album1', 'Album2', 'Album3'].includes(hash)) {
                this.showGallerySection(hash);
            } else {
                this.showAlbumsOverview();
            }
        });

        // Handle initial load with hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash && ['Album1', 'Album2', 'Album3'].includes(initialHash)) {
            setTimeout(() => {
                this.showGallerySection(initialHash);
            }, 100);
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Method to add new photos dynamically
    addPhoto(sectionId, imageUrl, altText) {
        const section = document.getElementById(sectionId);
        if (section) {
            const photoGrid = section.querySelector('.photo-grid');
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `<img src="${imageUrl}" alt="${altText}" />`;
            
            // Add click event listener
            photoItem.addEventListener('click', () => {
                this.handlePhotoClick(photoItem);
            });
            
            photoGrid.appendChild(photoItem);
        }
    }

    // Method to update album photo count
    updateAlbumCount(albumName, count) {
        const albumCards = document.querySelectorAll('.album-card');
        albumCards.forEach(card => {
            const title = card.querySelector('.album-title');
            if (title && title.textContent.toLowerCase() === albumName.toLowerCase()) {
                const countElement = card.querySelector('.album-count');
                if (countElement) {
                    countElement.textContent = `${count} Photos`;
                }
            }
        });
    }

    // Method to create a new album dynamically
    createAlbum(albumData) {
        const { name, target, imageUrl, photoCount } = albumData;
        const albumsGrid = document.querySelector('.albums-grid');
        
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.setAttribute('data-target', target);
        
        albumCard.innerHTML = `
            <div class="album-image">
                <img src="${imageUrl}" alt="${name} Album" />
                <div class="album-overlay">
                    <h3 class="album-title">${name}</h3>
                    <p class="album-count">${photoCount} Photos</p>
                    <button class="view-album-btn">View Album</button>
                </div>
            </div>
        `;
        
        // Add click event listener
        albumCard.addEventListener('click', () => {
            this.showGallerySection(target);
        });
        
        albumsGrid.appendChild(albumCard);
    }

    // Method to remove an album
    removeAlbum(albumName) {
        const albumCards = document.querySelectorAll('.album-card');
        albumCards.forEach(card => {
            const title = card.querySelector('.album-title');
            if (title && title.textContent.toLowerCase() === albumName.toLowerCase()) {
                card.remove();
            }
        });
    }

    // Method to get album statistics
    getAlbumStats() {
        const stats = {};
        const gallerySections = document.querySelectorAll('.gallery-section');
        
        gallerySections.forEach(section => {
            const sectionId = section.id;
            const photoCount = section.querySelectorAll('.photo-item').length;
            const albumTitle = section.querySelector('.section-title').textContent.replace(' Gallery', '');
            
            stats[sectionId] = {
                name: albumTitle,
                photoCount: photoCount
            };
        });
        
        return stats;
    }

    // Method to search photos by alt text
    searchPhotos(searchTerm) {
        const results = [];
        const photoItems = document.querySelectorAll('.photo-item img');
        
        photoItems.forEach(img => {
            const altText = img.alt.toLowerCase();
            if (altText.includes(searchTerm.toLowerCase())) {
                const section = img.closest('.gallery-section');
                results.push({
                    sectionId: section.id,
                    altText: img.alt,
                    imageUrl: img.src,
                    element: img.closest('.photo-item')
                });
            }
        });
        
        return results;
    }
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new PhotoGallery();
    
    // Make gallery instance globally accessible for external usage
    window.photoGallery = gallery;
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any running animations when tab is not visible
        document.querySelectorAll('.photo-item img').forEach(img => {
            img.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.photo-item img').forEach(img => {
            img.style.animationPlayState = 'running';
        });
    }
});

// Utility functions for external usage
window.galleryUtils = {
    // Add a new photo to any section
    addPhoto: (sectionId, imageUrl, altText) => {
        if (window.photoGallery) {
            window.photoGallery.addPhoto(sectionId, imageUrl, altText);
        }
    },
    
    // Update album photo count
    updateCount: (albumName, count) => {
        if (window.photoGallery) {
            window.photoGallery.updateAlbumCount(albumName, count);
        }
    },
    
    // Get all album statistics
    getStats: () => {
        if (window.photoGallery) {
            return window.photoGallery.getAlbumStats();
        }
        return {};
    },
    
    // Search for photos
    search: (term) => {
        if (window.photoGallery) {
            return window.photoGallery.searchPhotos(term);
        }
        return [];
    }
};