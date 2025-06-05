document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("hero");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroSection.classList.add("animate-fade-up", "opacity-100");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (heroSection) {
    observer.observe(heroSection);
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