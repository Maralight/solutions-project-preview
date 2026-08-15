document.addEventListener("DOMContentLoaded", () => {
  const host = document.querySelector("[data-slideshow]");

  if (!host || !window.SP_CONFIG?.slides?.length) {
    return;
  }

  const sources = window.SP_CONFIG.slides;
  const slides = [];

  sources.forEach((src, index) => {
    const image = new Image();

    image.src = src;
    image.alt = "Solutions Project industrial project environment";
    image.className = "hero-slide";

    if (index === 0) {
      image.classList.add("active");
    }

    host.appendChild(image);
    slides.push(image);
  });

  if (slides.length < 2) {
    return;
  }

  let currentIndex = 0;

  const changeSlide = () => {
    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    nextSlide.classList.add("active");
    currentSlide.classList.remove("active");

    currentIndex = nextIndex;
  };

  setInterval(changeSlide, 6500);
});
