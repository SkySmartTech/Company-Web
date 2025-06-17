document.addEventListener("DOMContentLoaded", () => {
  // Counter animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  const animateCount = (counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace("+", "") || 0;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + "+";
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + "+";
      } 
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Show IT department by default
  showTeam('IT_Department');
});


// Function to switch team tabs
function showTeam(deptId) {
  ['IT_Department', 'HW_Electronic_Tech', 'Finance_HR_Department'].forEach(id => {
    const section = document.getElementById(id);
    if (section) section.classList.add('hidden');
  });

  const selected = document.getElementById(deptId);
  if (selected) selected.classList.remove('hidden');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-blue-500', 'text-white', 'shadow-lg');
    btn.classList.add('text-gray-700', 'hover:text-white-500', 'shadow-md', 'hover:shadow-xl');

    if (btn.getAttribute('onclick')?.includes(deptId)) {
      btn.classList.add('bg-blue-500', 'text-white', 'shadow-lg');
      btn.classList.remove('text-gray-700');
    }
  });


  if (typeof AOS !== 'undefined') {
    AOS.refreshHard();
  }
}