document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.querySelector("[data-slideshow]");

  if (!slideshow || !window.SP_CONFIG?.slides?.length) {
    return;
  }

  const slideSources = window.SP_CONFIG.slides;
  const slides = [];
  let currentIndex = 0;

  slideSources.forEach((src, index) => {
    const image = new Image();

    image.src = src;
    image.alt = "Solutions Project industrial project environment";
    image.className = "hero-slide";

    image.style.opacity = index === 0 ? "1" : "0";
    image.style.transform = index === 0 ? "scale(1.035)" : "scale(1)";
    image.style.zIndex = index === 0 ? "2" : "1";

    slideshow.appendChild(image);
    slides.push(image);
  });

  if (slides.length === 1) {
    return;
  }

  const showNextSlide = () => {
    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    nextSlide.style.zIndex = "2";
    currentSlide.style.zIndex = "1";

    nextSlide.style.opacity = "1";
    nextSlide.style.transform = "scale(1.035)";

    currentSlide.style.opacity = "0";
    currentSlide.style.transform = "scale(1)";

    currentIndex = nextIndex;
  };

  setInterval(showNextSlide, 6500);
});
