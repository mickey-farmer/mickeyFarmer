// Renders certifications.html from window.CERT_GROUPS (js/certs-data.js).
// Nothing here needs editing to add a certificate — see certs-data.js.
//
// Each certificate is a collapsed <details> row; the PDF iframe is only given
// its src the first time someone expands it, so a page with a dozen
// certificates doesn't fetch a dozen PDFs up front.

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("certGroups");
  if (!root) {
    return;
  }

  const groups = window.CERT_GROUPS || [];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const buildCert = (cert) => {
    const details = el("details", "cert");

    const summary = el("summary", "cert-summary");
    const heading = el("span", "cert-heading");
    heading.appendChild(el("span", "cert-name", cert.title));
    heading.appendChild(
      el("span", "cert-meta", [cert.date, cert.issuer].filter(Boolean).join(" · "))
    );
    summary.appendChild(heading);

    const toggle = el("span", "cert-toggle");
    toggle.setAttribute("aria-hidden", "true");
    toggle.appendChild(el("span", "cert-toggle-text", "View certificate"));
    const chevron = el("span", "cert-chevron", "▾");
    toggle.appendChild(chevron);
    summary.appendChild(toggle);
    details.appendChild(summary);

    const body = el("div", "cert-body");

    const facts = el("div", "cert-facts");
    const addFact = (label, value, href) => {
      if (!value) return;
      const fact = el("div", "cert-fact");
      fact.appendChild(el("span", "cert-fact-label", label));
      const val = el("span", "cert-fact-value");
      if (href) {
        const a = el("a", null, value);
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener";
        val.appendChild(a);
      } else {
        val.textContent = value;
      }
      fact.appendChild(val);
      facts.appendChild(fact);
    };
    addFact("Issued", cert.date);
    addFact("Instructor", cert.instructor);
    if (cert.verifyUrl) {
      addFact("Credential", "Verify ↗", cert.verifyUrl);
    }
    if (facts.children.length > 0) {
      body.appendChild(facts);
    }

    const path = "assets/certificates/" + cert.file;

    const pdf = el("div", "cert-pdf");
    const frame = el("iframe", "cert-pdf-frame");
    frame.title = cert.title + " certificate (PDF)";
    frame.loading = "lazy";
    frame.dataset.src = path + "#view=FitH";
    if (cert.landscape === false) {
      frame.classList.add("cert-pdf-frame--portrait");
    }
    pdf.appendChild(frame);

    const fallback = el("p", "cert-pdf-fallback");
    fallback.appendChild(document.createTextNode("PDF not displaying? "));
    const openLink = el("a", null, "Open it in a new tab ↗");
    openLink.href = path;
    openLink.target = "_blank";
    openLink.rel = "noopener";
    fallback.appendChild(openLink);
    pdf.appendChild(fallback);
    body.appendChild(pdf);

    const download = el("a", "cert-download", "Download PDF");
    download.href = path;
    download.setAttribute("download", "");
    body.appendChild(download);

    details.appendChild(body);

    // Swap the label and pull the PDF in on first open.
    const label = toggle.querySelector(".cert-toggle-text");
    details.addEventListener("toggle", () => {
      label.textContent = details.open ? "Hide certificate" : "View certificate";
      if (details.open && frame.dataset.src) {
        frame.src = frame.dataset.src;
        delete frame.dataset.src;
      }
    });

    return details;
  };

  let total = 0;
  const rendered = new Set();

  groups.forEach((group) => {
    const certs = (group.certs || [])
      .slice()
      .sort((a, b) => (b.sort || "").localeCompare(a.sort || ""));

    // A group with nothing in it yet just doesn't render.
    if (certs.length === 0) {
      return;
    }

    const section = el("section", "cert-group");
    section.id = group.id;

    const header = el("div", "cert-group-header");
    header.appendChild(el("h2", "cert-group-title", group.label));
    const count = certs.length === 1 ? "1 certificate" : certs.length + " certificates";
    header.appendChild(el("span", "cert-group-count", count));
    section.appendChild(header);

    if (group.blurb) {
      section.appendChild(el("p", "cert-group-blurb", group.blurb));
    }

    const list = el("div", "cert-list");
    certs.forEach((cert) => list.appendChild(buildCert(cert)));
    section.appendChild(list);

    root.appendChild(section);
    rendered.add(group.id);
    total += certs.length;
  });

  // The sidebar lists every category from certs-data.js, but a group with no
  // certificates yet renders no section — which would leave the nav pointing at
  // an anchor that doesn't exist. Drop those links so the nav can't lie.
  // They come back on their own once the group has an entry.
  document.querySelectorAll(".nav-link[data-hash]").forEach((link) => {
    if (link.dataset.page === "certifications" && !rendered.has(link.dataset.hash)) {
      const item = link.closest(".nav-item") || link;
      item.remove();
    }
  });

  const totalEl = document.getElementById("certTotal");
  if (totalEl) {
    totalEl.textContent =
      total === 0
        ? "No certificates listed yet."
        : total + (total === 1 ? " certificate" : " certificates") +
          " across " +
          root.children.length +
          (root.children.length === 1 ? " area" : " areas") +
          ".";
  }

  const emptyEl = document.getElementById("certEmpty");
  if (emptyEl) {
    emptyEl.hidden = total > 0;
  }
});
