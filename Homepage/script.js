document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("site-header");
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");
    const navLinks = document.querySelectorAll(".nav-links a");
    const companyName = document.querySelector(".company-name");

    // Mobile Menu Toggle
    if (menuBtn && mobileMenu && overlay) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full", "hidden");
        overlay.classList.remove("hidden");
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          mobileMenu.classList.add("translate-x-full");
          overlay.classList.add("hidden");
        });
      }

      overlay.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
        overlay.classList.add("hidden");
      });
    }

    // Submenu Toggle Function
    window.toggleSubmenu = function (id) {
      const submenu = document.getElementById(id);
      if (submenu) submenu.classList.toggle("hidden");
    };

    // Scroll Effect for Header
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

