// Prompt Engineering page: left-nav section switching (hash-routed), lazy PDF
// embed, and copy-to-clipboard on the prompt blocks.
//
// Adding a new section = add a .docs-nav-link with data-section="foo" and a
// matching <section class="docs-section" data-section="foo" id="foo">.
// Adding a new prompt card = copy an <article class="prompt-card"> block; the
// copy buttons below wire themselves up to any .prompt-block on the page.

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Section switching ---------- */

  const links = Array.from(document.querySelectorAll(".docs-nav-link"));
  const sections = Array.from(document.querySelectorAll(".docs-section"));

  // Hand the one-section-at-a-time behavior over to CSS. Without this class the
  // page renders every section stacked, so a JS failure degrades gracefully.
  if (links.length > 0 && sections.length > 0) {
    document.body.classList.add("js-docs");
  }

  const showSection = (name, { focus = false } = {}) => {
    const match = sections.some((s) => s.dataset.section === name);
    const target = match ? name : sections[0] && sections[0].dataset.section;
    if (!target) {
      return;
    }

    sections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.section === target);
    });
    links.forEach((link) => {
      const isActive = link.dataset.section === target;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (focus) {
      const active = sections.find((s) => s.dataset.section === target);
      if (active) {
        active.focus({ preventScroll: true });
      }
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const name = link.dataset.section;
      // Keep the hash in sync so the section is linkable/bookmarkable, but
      // don't let the browser jump-scroll to the anchor.
      if (window.location.hash.slice(1) !== name) {
        history.pushState(null, "", "#" + name);
      }
      showSection(name, { focus: true });
    });
  });

  window.addEventListener("hashchange", () => {
    showSection(window.location.hash.slice(1));
  });

  showSection(window.location.hash.slice(1));

  /* ---------- Lazy-load the certificate PDF ---------- */
  // The PDF is ~2MB, so it only gets fetched the first time someone actually
  // expands the certificate.

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
