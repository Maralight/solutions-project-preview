document.addEventListener("DOMContentLoaded", () => {
  const host = document.querySelector("[data-slideshow]");

  if (!host || !window.SP_CONFIG?.slides?.length) {
    return;
  }

  const FADE_TIME = 1800;
  const DISPLAY_TIME = 5500;

  const slides = [];
  let currentIndex = 0;
  let changing = false;

  window.SP_CONFIG.slides.forEach((src, index) => {
    const image = new Image();

    image.src = src;
    image.alt = "Solutions Project industrial project environment";
    image.className = "hero-slide";

    image.style.position = "absolute";
    image.style.inset = "0";
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";

    image.style.opacity = index === 0 ? "1" : "0";
    image.style.zIndex = index === 0 ? "2" : "1";

    image.style.transition = `opacity ${FADE_TIME}ms ease-in-out`;

    host.appendChild(image);
    slides.push(image);
  });

  if (slides.length < 2) {
    return;
  }

  function showNextSlide() {
    if (changing) {
      return;
    }

    changing = true;

    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    /*
      Put the incoming image above the current image.
      The outgoing image stays fully visible underneath.
    */
    nextSlide.style.zIndex = "3";

    /*
      Force the browser to register the starting opacity
      before beginning the transition.
    */
    nextSlide.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextSlide.style.opacity = "1";
      });
    });

    /*
      Only after the new image has completely faded in
      do we hide and reset the previous image.
    */
    window.setTimeout(() => {
      currentSlide.style.opacity = "0";
      currentSlide.style.zIndex = "1";

      nextSlide.style.zIndex = "2";

      currentIndex = nextIndex;
      changing = false;
    }, FADE_TIME + 100);
  }

  window.setInterval(showNextSlide, DISPLAY_TIME);
});
