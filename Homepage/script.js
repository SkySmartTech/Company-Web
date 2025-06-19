document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Toggle mobile menu
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Hide mobile menu when any link inside is clicked
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Keep scroll effect intact...
  const header = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const companyName = document.querySelector(".company-name");

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
