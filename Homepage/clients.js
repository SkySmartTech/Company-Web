  const logos = [
    "img/clients_logo/client_logo3.png",
    "img/clients_logo/client_logo2.png",
    "img/clients_logo/client_logo1.png"
  ];

  let current = 0;
  const img = document.getElementById("client-logo");

  setInterval(() => {
    // Fade out
    img.classList.add("opacity-0");

    setTimeout(() => {
      // Change image
      current = (current + 1) % logos.length;
      img.src = logos[current];
      // Fade in
      img.classList.remove("opacity-0");
    }, 1000); // match transition duration
  }, 4000); // change every 4 seconds