/*
  Minimal enhancements only:
  - Set current year in footer
  - Soft reveal-on-scroll for sections (respects prefers-reduced-motion)
  - Lazy-load decorative collage videos when they approach the viewport
*/

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const lazyVideos = Array.from(document.querySelectorAll("[data-lazy-video]"));
  if (lazyVideos.length === 0) return;

  if (prefersReducedMotion) {
    lazyVideos.forEach((video) => video.removeAttribute("autoplay"));
    return;
  }

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") return;

    const sources = Array.from(video.querySelectorAll("source[data-src]"));
    sources.forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });

    video.dataset.loaded = "true";
    video.load();

    const maybePlay = video.play();
    if (maybePlay && typeof maybePlay.catch === "function") {
      maybePlay.catch(() => {});
    }
  };

  if (!("IntersectionObserver" in window)) {
    lazyVideos.forEach(loadVideo);
    return;
  }

  const videoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          videoObserver.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "220px 0px", threshold: 0.01 }
  );

  lazyVideos.forEach((video) => videoObserver.observe(video));
})();
