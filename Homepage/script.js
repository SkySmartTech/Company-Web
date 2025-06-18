document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const companyName = document.querySelector(".company-name");

  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  const closeMenu = () => {
    mobileMenu.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});

  // ✅ Header Scroll Behavior
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("bg-white", "shadow-md");
      header.classList.remove("md:text-white");

      navLinks.forEach(link => {
        link.classList.remove("text-white");
        link.classList.add("text-black");
      });

      if (companyName) {
        companyName.classList.remove("text-white");
        companyName.classList.add("text-black");
      }
    } else {
      header.classList.remove("bg-white", "shadow-md");
      header.classList.add("md:text-white");

      navLinks.forEach(link => {
        link.classList.remove("text-black");
        link.classList.add("text-white");
      });

      if (companyName) {
        companyName.classList.remove("text-black");
        companyName.classList.add("text-white");
      }
    }
  });


  

