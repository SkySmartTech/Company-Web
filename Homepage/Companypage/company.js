document.addEventListener("DOMContentLoaded", () => {
  // Counter animation (unchanged)
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

  // Mobile menu & dropdown
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

  // Show IT Department by default
  showTeam('IT_Department');
});

function showTeam(deptId) {
  // Hide all departments
  ['IT_Department', 'HW_Electronic_Tech', 'Finance_HR_Department'].forEach(id => {
    const section = document.getElementById(id);
    if (section) section.classList.add('hidden');
  });

  // Show the selected department
  const selected = document.getElementById(deptId);
  if (selected) selected.classList.remove('hidden');

  // Style buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-blue-500', 'text-white', 'shadow-lg');
    btn.classList.add('text-gray-700', 'hover:text-white-500', 'shadow-md', 'hover:shadow-xl');

    if (btn.getAttribute('onclick')?.includes(deptId)) {
      btn.classList.add('bg-blue-500', 'text-white', 'shadow-lg');
      btn.classList.remove('text-gray-700');
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

  