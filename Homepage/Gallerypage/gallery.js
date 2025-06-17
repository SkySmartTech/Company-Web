document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
  });

  const gallery = new PhotoGallery();
  window.photoGallery = gallery;

  // Modal close on background click
  document.getElementById('imageModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
      gallery.closeModal();
    }
  });

  // Modal close on button click
  document.getElementById('closeModalBtn')?.addEventListener('click', function () {
    gallery.closeModal();
  });

  // Modal next/prev buttons
  document.getElementById('modalPrevBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    gallery.showPrevPhoto();
  });
  document.getElementById('modalNextBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    gallery.showNextPhoto();
  });
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
    this.currentModalIndex = -1;   // Track current image index in modal
    this.currentPhotos = [];       // Current visible photos list for modal navigation
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

    const offset = 100;
    const elementTop = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });

    window.location.hash = sectionId;
  }

  handlePhotoClick(photoItem) {
    // Get the current gallery section photos (img elements) for navigation
    const gallerySection = photoItem.closest('.gallery-section');
    if (!gallerySection) return;

    this.currentPhotos = Array.from(gallerySection.querySelectorAll('.photo-item img'));
    const clickedImg = photoItem.querySelector('img');
    this.currentModalIndex = this.currentPhotos.findIndex(img => img === clickedImg);
    if (this.currentModalIndex === -1) this.currentModalIndex = 0;

    this.openModal(this.currentPhotos[this.currentModalIndex].src);

    // Optional click effect
    photoItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
      photoItem.style.transform = '';
    }, 150);
  }

  openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (!modal || !modalImage) return;

    modalImage.src = src;
    modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.classList.add('hidden');
    this.currentModalIndex = -1;
    this.currentPhotos = [];
  }

  showNextPhoto() {
    if (this.currentPhotos.length === 0) return;
    this.currentModalIndex = (this.currentModalIndex + 1) % this.currentPhotos.length;
    this.openModal(this.currentPhotos[this.currentModalIndex].src);
  }

  showPrevPhoto() {
    if (this.currentPhotos.length === 0) return;
    this.currentModalIndex = (this.currentModalIndex - 1 + this.currentPhotos.length) % this.currentPhotos.length;
    this.openModal(this.currentPhotos[this.currentModalIndex].src);
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
