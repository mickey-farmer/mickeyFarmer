// Prompt Engineering page: shows one section at a time based on the URL hash,
// lazy-loads the certificate PDF, and wires up the copy buttons.
//
// The nav itself is the global sidebar — see js/nav.js, where Certification and
// Portfolio are declared as children of Prompt Engineering. This file only
// reacts to the hash, so adding a section means adding it to SITE in nav.js
// plus a matching <section class="docs-section" data-section="..."> here.

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Section switching ---------- */

  const sections = Array.from(document.querySelectorAll(".docs-section"));

  if (sections.length > 0) {
    // Hand the one-at-a-time behavior to CSS. Without this class every section
    // renders stacked, so a JS failure degrades to a readable page.
    document.body.classList.add("js-docs");
  }

  const showSection = (name, { focus = false } = {}) => {
    if (sections.length === 0) {
      return;
    }
    const known = sections.some((s) => s.dataset.section === name);
    const target = known ? name : sections[0].dataset.section;

    sections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.section === target);
    });

    // On a deliberate section change, move focus to the new section so screen
    // reader and keyboard users land in the content that just appeared. (That's
    // what the tabindex="-1" on each section is for.) Skipped on first paint so
    // we don't steal focus from the top of the page.
    if (focus) {
      const active = sections.find((s) => s.dataset.section === target);
      if (active) {
        active.focus({ preventScroll: true });
      }
    }
  };

  window.addEventListener("hashchange", () => {
    showSection(window.location.hash.slice(1), { focus: true });
  });

  showSection(window.location.hash.slice(1));

  /* ---------- Lazy-load the certificate PDF ---------- */
  // The PDF is ~2MB, so it's only fetched the first time someone expands it.

  document.querySelectorAll(".cert").forEach((cert) => {
    const label = cert.querySelector(".cert-toggle-text");

    cert.addEventListener("toggle", () => {
      if (label) {
        label.textContent = cert.open ? "Hide certificate" : "View certificate";
      }
      if (!cert.open) {
        return;
      }
      const frame = cert.querySelector(".cert-pdf-frame[data-src]");
      if (frame) {
        frame.src = frame.dataset.src;
        delete frame.dataset.src;
      }
    });
  });

  /* ---------- Copy to clipboard ---------- */

  document.querySelectorAll(".prompt-block").forEach((block) => {
    const button = block.querySelector(".prompt-copy");
    const code = block.querySelector("code");
    if (!button || !code) {
      return;
    }

    button.addEventListener("click", async () => {
      const text = code.innerText;
      let ok = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          ok = true;
        } else {
          // file:// and other non-secure contexts don't get the async API.
          const scratch = document.createElement("textarea");
          scratch.value = text;
          scratch.setAttribute("readonly", "");
          scratch.style.position = "fixed";
          scratch.style.opacity = "0";
          document.body.appendChild(scratch);
          scratch.select();
          ok = document.execCommand("copy");
          document.body.removeChild(scratch);
        }
      } catch (err) {
        ok = false;
      }

      button.textContent = ok ? "Copied" : "Press ⌘C";
      button.classList.toggle("is-copied", ok);

      window.setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("is-copied");
      }, 1800);
    });
  });
});
