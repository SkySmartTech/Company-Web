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
      header.classList.add("bg-white", "shadow-md"); // Optional scroll effect
      header.classList.remove("text-white");

      navLinks.forEach(link => {
        link.classList.remove("text-white");
        link.classList.add("text-black");
      });

      menuBtn?.classList.remove("text-white");
      menuBtn?.classList.add("text-black");

      companyName?.classList.remove("text-white");
      companyName?.classList.add("text-black");

    } else {
      header.classList.remove("bg-white", "shadow-md");
      header.classList.add("text-white");

      navLinks.forEach(link => {
        link.classList.add("text-white");
        link.classList.remove("text-black");
      });

      menuBtn?.classList.add("text-white");
      menuBtn?.classList.remove("text-black");

      companyName?.classList.add("text-white");
      companyName?.classList.remove("text-black");
    }
  });
}
});
