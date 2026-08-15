document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  /*
    Accessibility:
    If the user prefers reduced motion, show everything immediately.
  */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  /*
    Fallback for older browsers without IntersectionObserver.
  */
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  /*
    Reveal elements shortly after they enter the viewport.

    threshold:
    About 12% of the element should be visible.

    rootMargin:
    The negative bottom margin prevents elements from
    triggering too early before the user reaches them.
  */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -7% 0px"
  };

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        /*
          Reveal only once.
          Once an element has entered, it remains visible.
        */
        observer.unobserve(entry.target);
      });
    },
    observerOptions
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});
