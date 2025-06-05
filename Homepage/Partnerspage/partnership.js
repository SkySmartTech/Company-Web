// Button action for "Become a partner"
function becomePartner() {
  alert("Thank you for your interest in becoming a partner!");
}

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Dropdown toggle
const dropdownBtn = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

if (dropdownBtn && dropdownMenu) {
  dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
  });

  // Hide dropdown if click outside
  window.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
    }
  });
}


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