/*
  Minimal enhancements only:
  - Set current year in footer
  - Soft reveal-on-scroll for sections (respects prefers-reduced-motion)
*/

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (revealEls.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
