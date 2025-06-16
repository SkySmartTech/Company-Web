  const logos = [
    "Homepage/img/clients_logo/client_logo1.png",
    "Homepage/img/clients_logo/client_logo2.png",
    "Homepage/img/clients_logo/client_logo3.png",
    "Homepage/img/clients_logo/client_logo4.png",
    "Homepage/img/clients_logo/client_logo5.png",
    "Homepage/img/clients_logo/client_logo6.png",
    "Homepage/img/clients_logo/client_logo7.png",
    "Homepage/img/clients_logo/client_logo8.png",
    "Homepage/img/clients_logo/client_logo9.png",
    "Homepage/img/clients_logo/client_logo10.png",
    "Homepage/img/clients_logo/client_logo11.png",
    "Homepage/img/clients_logo/client_logo12.png",
    "Homepage/img/clients_logo/client_logo13.png",
    "Homepage/img/clients_logo/client_logo14.png",
    "Homepage/img/clients_logo/client_logo15.png",
    "Homepage/img/clients_logo/client_logo16.png"
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