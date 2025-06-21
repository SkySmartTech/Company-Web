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

  function showProductCategory(categoryId) {
    ['andon', 'software', 'innovation'].forEach(id => {
      const section = document.getElementById(id);
      if (section) section.classList.add('hidden');
    });

    const selected = document.getElementById(categoryId);
    if (selected) selected.classList.remove('hidden');
  }

  // Show default category
  document.addEventListener("DOMContentLoaded", () => {
    showProductCategory('andon');
  });


    function openProductModal(card) {
    const modal = document.getElementById('productModal');
    modal.querySelector('#modalTitle').textContent = card.dataset.title;
    modal.querySelector('#modalImg').src = card.dataset.img;
    modal.querySelector('#modalImg').alt = card.dataset.title;
    modal.querySelector('#modalDesc').textContent = card.dataset.desc;
    modal.querySelector('#modalLink').href = card.dataset.link;
    modal.classList.remove('hidden');
  }

  function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
  }


  // Close when clicking outside the modal content
  document.getElementById('productModal').addEventListener('click', e => {
    if (e.target.id === 'productModal') closeProductModal();
  });


  const helpButton = document.getElementById('helpButton');
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const docSelect = document.getElementById('docSelect');
  const pdfViewer = document.getElementById('pdfViewer');
  const videoViewer = document.getElementById('videoViewer');
  const downloadLink = document.getElementById('downloadLink');

  helpButton.addEventListener('click', () => {
    pdfModal.classList.remove('hidden');
  });

  closeModal.addEventListener('click', () => {
    pdfModal.classList.add('hidden');
    videoViewer.pause(); // Stop video if modal is closed
  });

  docSelect.addEventListener('change', () => {
    const selected = docSelect.value;

    if (selected.endsWith('.pdf')) {
      // Show PDF
      pdfViewer.classList.remove('hidden');
      videoViewer.classList.add('hidden');
      pdfViewer.src = selected;
      downloadLink.href = selected;
      downloadLink.classList.remove('hidden');
    } else if (selected.endsWith('.mp4')) {
      // Show Video
      videoViewer.classList.remove('hidden');
      pdfViewer.classList.add('hidden');
      videoViewer.querySelector('source').src = selected;
      videoViewer.load();
      videoViewer.play();
      downloadLink.classList.add('hidden'); // No download for videos
    }
  });


  document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  });