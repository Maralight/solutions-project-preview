document.addEventListener("DOMContentLoaded", async () => {
  const host = document.querySelector("[data-video-host]");

  // Homepage video is desktop/tablet only.
  // Mobile uses the image slideshow.
  if (!host || window.matchMedia("(max-width: 680px)").matches) {
    return;
  }

  const videoSources = [
    "assets/video/home-hero/hero-01.mp4",
    "assets/video/home-hero/hero-02.mp4"
  ];

  const availableSources = [];

  /*
    Check which video files actually exist.
    This allows the site to work with either one or two videos.
  */
  for (const src of videoSources) {
    try {
      const response = await fetch(src, { method: "HEAD" });

      if (response.ok) {
        availableSources.push(src);
      }
    } catch {
      // Ignore unavailable files.
    }
  }

  // No video available:
  // leave the video host empty and allow the slideshow to show.
  if (!availableSources.length) {
    return;
  }

  /*
    Two video layers are always used.

    If only one video exists, the same source is loaded into both layers.
    Crossfading between the layers hides the hard restart point.
  */
  const sources =
    availableSources.length >= 2
      ? availableSources.slice(0, 2)
      : [availableSources[0], availableSources[0]];

  const videos = sources.map((src, index) => {
    const video = document.createElement("video");

    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.loop = false;

    video.className = "hero-video-layer";

    video.style.opacity = index === 0 ? "1" : "0";
    video.style.zIndex = index === 0 ? "2" : "1";

    host.appendChild(video);

    return video;
  });

  let activeIndex = 0;
  let transitionStarted = false;

  const FADE_DURATION = 1000;
  const CROSSFADE_BEFORE_END = 0.9;

  /*
    Prepare and play a video from its beginning.
  */
  const playFromStart = async (video) => {
    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      // If autoplay is blocked, the image slideshow remains underneath.
    }
  };

  /*
    Crossfade from the active video layer to the other layer.
  */
  const crossfade = async () => {
    if (transitionStarted) {
      return;
    }

    transitionStarted = true;

    const currentVideo = videos[activeIndex];
    const nextIndex = (activeIndex + 1) % videos.length;
    const nextVideo = videos[nextIndex];

    nextVideo.style.zIndex = "3";
    currentVideo.style.zIndex = "2";

    await playFromStart(nextVideo);

    nextVideo.style.opacity = "1";
    currentVideo.style.opacity = "0";

    window.setTimeout(() => {
      currentVideo.pause();
      currentVideo.currentTime = 0;
      currentVideo.style.zIndex = "1";

      activeIndex = nextIndex;
      transitionStarted = false;
    }, FADE_DURATION);
  };

  /*
    Watch the active video.

    The next layer begins shortly before the current video ends,
    producing a continuous visual transition instead of waiting
    for the hard end of the MP4 file.
  */
  videos.forEach((video, index) => {
    video.addEventListener("timeupdate", () => {
      if (
        index !== activeIndex ||
        transitionStarted ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) {
        return;
      }

      const remaining = video.duration - video.currentTime;

      if (remaining <= CROSSFADE_BEFORE_END) {
        crossfade();
      }
    });

    /*
      Safety fallback in case the browser reaches the end
      before timeupdate triggers the transition.
    */
    video.addEventListener("ended", () => {
      if (index === activeIndex && !transitionStarted) {
        crossfade();
      }
    });
  });

  /*
    Start the first layer only after its metadata is available.
  */
  const firstVideo = videos[0];

  if (firstVideo.readyState >= 1) {
    await playFromStart(firstVideo);
  } else {
    firstVideo.addEventListener(
      "loadedmetadata",
      () => {
        playFromStart(firstVideo);
      },
      { once: true }
    );
  }
});
