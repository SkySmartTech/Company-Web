document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("slider");
    const slides = document.querySelectorAll('#slider .slide');
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let current = 0;
    const total = slides.length;
    const scrollAmount = 420;

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

      // Scroll to the slide
      const targetSlide = slides[index];
      const offsetLeft = targetSlide.offsetLeft - carousel.offsetLeft;
      carousel.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }

    function nextSlide() {
      current = (current + 1) % total;
      showSlide(current);
    }

    function prevSlide() {
      current = (current - 1 + total) % total;
      showSlide(current);
    }

    function scaleSlides() {
      const center = carousel.scrollLeft + carousel.offsetWidth / 2;
      slides.forEach((item) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(center - itemCenter);
        const scale = distance < 100 ? 1.1 : 1;
        item.style.transform = `scale(${scale})`;
      });
    }

    // Auto slide every 5s
    showSlide(current);
    setInterval(nextSlide, 5000);

    // Arrows
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Center scaling on scroll
    carousel.addEventListener("scroll", scaleSlides);
    window.addEventListener("load", scaleSlides);
  });

