document.addEventListener("DOMContentLoaded", function() {
      const slides = document.querySelectorAll('#slider .slide');
      let current = 0;
      const total = slides.length;

      function showSlide(index) {
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.remove('opacity-0', 'pointer-events-none');
            slide.classList.add('opacity-100', 'pointer-events-auto');
          } else {
            slide.classList.add('opacity-0', 'pointer-events-none');
            slide.classList.remove('opacity-100', 'pointer-events-auto');
          }
        });
      }

      function nextSlide() {
        current = (current + 1) % total;
        showSlide(current);
      }

      showSlide(current);
      setInterval(nextSlide, 5000);
    });