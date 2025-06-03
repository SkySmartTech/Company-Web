const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdownBtn = document.getElementById('dropdownButton');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
    });

    window.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
      }
    });
  }

