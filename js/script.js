// Everything on this page (the gray -> color hover effect, the card layout)
// is handled in CSS on purpose — no JS needed for that.
//
// This file is just a hook for whatever comes next (e.g. wiring up real
// subpages for Writing / Game Dev, or a lightbox for the media folders).

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
