document.addEventListener("DOMContentLoaded", function () {
  // Header and Menu variables
  const header = document.getElementById("site-header");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const companyName = document.querySelector(".company-name");



  // Toggle mobile menu (if elements exist)
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Scroll effect for header (if elements exist)
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scroll-bg");
        header.classList.remove("text-white");
        navLinks.forEach(link => {
          link.classList.remove("text-white");
          link.classList.add("text-black");
        });
        if (companyName) companyName.classList.add("text-black");
      } else {
        header.classList.remove("scroll-bg");
        header.classList.add("text-white");
        navLinks.forEach(link => {
          link.classList.add("text-white");
          link.classList.remove("text-black");
        });
        if (companyName) companyName.classList.remove("text-black");
      }
    });
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