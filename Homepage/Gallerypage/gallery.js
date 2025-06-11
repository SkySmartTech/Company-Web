document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
    });

    const gallery = new PhotoGallery();
    window.photoGallery = gallery;
});

// Handle tab visibility for performance
document.addEventListener('visibilitychange', () => {
    const images = document.querySelectorAll('.photo-item img');
    images.forEach(img => {
        img.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
});

// External utilities
window.galleryUtils = {
    addPhoto: (sectionId, imageUrl, altText) => window.photoGallery?.addPhoto(sectionId, imageUrl, altText),
    updateCount: (albumName, count) => window.photoGallery?.updateAlbumCount(albumName, count),
    getStats: () => window.photoGallery?.getAlbumStats() || {},
    search: (term) => window.photoGallery?.searchPhotos(term) || []
};

class PhotoGallery {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleHashOnLoad();
    }

    setupEventListeners() {
        document.querySelectorAll('.album-card').forEach(card =>
            card.addEventListener('click', () => this.showGallerySection(card.dataset.target))
        );

        document.querySelectorAll('.nav-link').forEach(link =>
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.showGallerySection(target);
            })
        );

        document.querySelectorAll('.back-btn').forEach(btn =>
            btn.addEventListener('click', () => this.showAlbumsOverview())
        );

        document.querySelectorAll('.photo-item').forEach(item =>
            item.addEventListener('click', () => this.handlePhotoClick(item))
        );

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (this.isValidSection(hash)) {
                this.showGallerySection(hash);
            } else {
                this.showAlbumsOverview();
            }
        });
    }

    handleHashOnLoad() {
        const hash = window.location.hash.substring(1);
        if (this.isValidSection(hash)) {
            setTimeout(() => this.showGallerySection(hash), 100);
        } else {
            this.showAlbumsOverview();
        }
    }

    isValidSection(id) {
        return document.getElementById(id)?.classList.contains('gallery-section');
    }

    showAlbumsOverview() {
        document.querySelectorAll('.gallery-section').forEach(s => s.classList.remove('active'));
        document.querySelector('.albums-overview').style.display = 'block';
        window.location.hash = '';
        this.scrollToTop();
    }

    showGallerySection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        document.querySelector('.albums-overview').style.display = 'none';
        document.querySelectorAll('.gallery-section').forEach(s => s.classList.remove('active'));

        section.classList.add('active');
        setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        window.location.hash = sectionId;
    }

    handlePhotoClick(photoItem) {
        photoItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
            photoItem.style.transform = '';
        }, 150);

        console.log('Photo clicked:', photoItem);
        // You can extend this to open a modal or lightbox.
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    addPhoto(sectionId, imageUrl, altText) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const photoGrid = section.querySelector('.photo-grid');
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `<img src="${imageUrl}" alt="${altText}" />`;

        photoItem.addEventListener('click', () => this.handlePhotoClick(photoItem));
        photoGrid.appendChild(photoItem);
    }

    updateAlbumCount(albumName, count) {
        document.querySelectorAll('.album-card').forEach(card => {
            const title = card.querySelector('.album-title');
            if (title?.textContent.toLowerCase() === albumName.toLowerCase()) {
                const countElement = card.querySelector('.album-count');
                if (countElement) countElement.textContent = `${count} Photos`;
            }
        });
    }

    createAlbum({ name, target, imageUrl, photoCount }) {
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

        albumCard.addEventListener('click', () => this.showGallerySection(target));
        albumsGrid.appendChild(albumCard);
    }

    removeAlbum(albumName) {
        document.querySelectorAll('.album-card').forEach(card => {
            const title = card.querySelector('.album-title');
            if (title?.textContent.toLowerCase() === albumName.toLowerCase()) {
                card.remove();
            }
        });
    }

    getAlbumStats() {
        const stats = {};
        document.querySelectorAll('.gallery-section').forEach(section => {
            const id = section.id;
            const title = section.querySelector('.section-title')?.textContent.replace(' Gallery', '') || id;
            const photoCount = section.querySelectorAll('.photo-item').length;

            stats[id] = { name: title, photoCount };
        });
        return stats;
    }

    searchPhotos(searchTerm) {
        const results = [];
        const term = searchTerm.toLowerCase();

        document.querySelectorAll('.photo-item img').forEach(img => {
            if (img.alt.toLowerCase().includes(term)) {
                const section = img.closest('.gallery-section');
                results.push({
                    sectionId: section?.id || '',
                    altText: img.alt,
                    imageUrl: img.src,
                    element: img.closest('.photo-item')
                });
            }
        });

        return results;
    }
}
