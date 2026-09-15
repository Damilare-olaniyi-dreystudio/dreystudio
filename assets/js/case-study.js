(function () {
  const lightbox = document.querySelector("[data-case-lightbox]");
  if (!lightbox) return;
  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector("[data-case-lightbox-close]");
  let lastTrigger = null;
  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastTrigger) lastTrigger.focus();
  }
  document
    .querySelectorAll("[data-case-gallery-button]")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        lastTrigger = button;
        image.src = button.dataset.src;
        image.alt = button.dataset.alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        closeButton.focus();
      });
    });
  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "Tab") {
      const focusable = [closeButton];
      if (document.activeElement === closeButton && !event.shiftKey) {
        event.preventDefault();
        closeButton.focus();
      }
      if (document.activeElement === closeButton && event.shiftKey) {
        event.preventDefault();
        closeButton.focus();
      }
    }
  });
})();
