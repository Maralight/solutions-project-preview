document.addEventListener("DOMContentLoaded", () => {
  const marquees = document.querySelectorAll("[data-marquee]");

  marquees.forEach((track) => {
    const originalCycle = track.querySelector(".marquee-cycle");

    if (!originalCycle) {
      return;
    }

    /*
      Prevent duplicate cloning if this script is ever
      initialized more than once.
    */
    if (track.dataset.marqueeReady === "true") {
      return;
    }

    /*
      Clone the complete cycle once.

      Structure becomes:

      [Original Cycle + End Gap]
      [Cloned Cycle + End Gap]

      CSS then translates the complete track by 50%,
      producing a continuous loop.
    */
    const clonedCycle = originalCycle.cloneNode(true);

    clonedCycle.setAttribute("aria-hidden", "true");

    track.appendChild(clonedCycle);

    track.dataset.marqueeReady = "true";
  });
});
