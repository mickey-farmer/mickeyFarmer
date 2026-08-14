// ============================================================================
// Site navigation — the single source of truth for the whole site.
//
// TO ADD A PAGE OR SECTION: edit the SITE array below. Nothing else. The
// sidebar on every page is rendered from this, so there's no nav markup to
// keep in sync across HTML files.
//
// Each entry:
//   label     text shown in the nav
//   href      link target
//   page      matches a page's <body data-page="..."> so the nav knows where
//             you are (omit for external links)
//   theme     accent color key; see body[data-theme] in css/styles.css
//   hash      for in-page sections — the nav marks it active when the URL hash
//             matches (see prompting.html)
//   external  true = opens in a new tab, gets an arrow, never marked active
//   soon      true = rendered as dimmed, non-clickable "coming soon"
//   children  nested entries, shown when the parent section is current
// ============================================================================

const SITE = [
  {
    label: "Home",
    href: "index.html",
    page: "home",
    theme: "home",
  },
  {
    label: "Technical Writing",
    href: "writing.html",
    page: "writing",
    theme: "writing",
  },
  {
    label: "Prompt Engineering",
    href: "prompting.html",
    page: "prompting",
    theme: "prompting",
    children: [
      { label: "Certification", href: "prompting.html#certification", page: "prompting", hash: "certification" },
      { label: "Portfolio", href: "prompting.html#portfolio", page: "prompting", hash: "portfolio" },
    ],
  },
  {
    label: "Game & Story Development",
    href: "gamedev.html",
    page: "gamedev",
    theme: "gamedev",
    children: [
      { label: "Games", soon: true },
      // story.html (a single story) counts as being inside this section too.
      { label: "Short Stories & Scripts", href: "stories.html", page: "stories", theme: "stories", alsoPages: ["story"] },
    ],
  },
  {
    // Acting lives on its own site, so the nav can only point at it.
    label: "Acting",
    href: "https://mickeyonstage.com",
    theme: "acting",
    external: true,
  },
];

(function () {
  const mount = document.getElementById("siteNav");
  if (!mount) {
    return;
  }

  const currentPage = document.body.dataset.page || "";
  const currentHash = () => window.location.hash.slice(1);

  // Does this entry (or one of its children) represent the page we're on?
  const ownsPage = (entry) => {
    const pages = [entry.page].concat(entry.alsoPages || []).filter(Boolean);
    if (pages.includes(currentPage)) {
      return true;
    }
    return (entry.children || []).some((child) => ownsPage(child));
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  // Build one <li>. `depth` 0 = top-level section, 1 = child.
  const buildItem = (entry, depth) => {
    const li = el("li", "nav-item nav-item--depth" + depth);

    if (entry.soon) {
      const span = el("span", "nav-link nav-link--soon");
      span.appendChild(el("span", "nav-link-text", entry.label));
      span.appendChild(el("span", "nav-soon-badge", "Soon"));
      li.appendChild(span);
      return li;
    }

    const link = el("a", "nav-link");
    // A section entry is allowed to have children but no href of its own.
    if (entry.href) {
      link.href = entry.href;
    }
    link.appendChild(el("span", "nav-link-text", entry.label));

    if (entry.external) {
      link.target = "_blank";
      link.rel = "noopener";
      link.classList.add("nav-link--external");
      const arrow = el("span", "nav-external-arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      link.appendChild(arrow);
    }

    if (entry.hash) {
      link.dataset.hash = entry.hash;
    }
    if (entry.page) {
      link.dataset.page = entry.page;
    }

    // Exactly one element in the nav may claim aria-current="page"; everything
    // else that's merely "on the way here" gets the softer aria-current="true".
    const isExactPage = !entry.external && entry.page === currentPage;
    // e.g. story.html is rendered by the "Short Stories & Scripts" entry, but
    // it isn't that page.
    const isNestedPage = !entry.external && (entry.alsoPages || []).includes(currentPage);
    // Prompt Engineering defers "page" to whichever hash child is active.
    const hasHashChildren = (entry.children || []).some((child) => child.hash);

    if (isExactPage && !entry.hash) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", hasHashChildren ? "true" : "page");
    } else if (isNestedPage) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "true");
    } else if (ownsPage(entry) && !entry.hash) {
      // A parent section containing the page we're on. Hash children are
      // excluded: syncHash() owns their state entirely, and without this guard
      // the *inactive* child would also be marked, since it technically lives
      // on the current page.
      link.classList.add("is-section");
      link.setAttribute("aria-current", "true");
    }

    li.appendChild(link);

    // Children only render for the section you're in — keeps the nav short
    // while still showing the hierarchy where it's useful.
    if (entry.children && ownsPage(entry)) {
      const sublist = el("ul", "nav-sublist");
      entry.children.forEach((child) => sublist.appendChild(buildItem(child, depth + 1)));
      li.appendChild(sublist);
    }

    return li;
  };

  /* ---------- Render ---------- */

  const brand = el("a", "nav-brand");
  brand.href = "index.html";
  brand.appendChild(el("span", "nav-brand-name", "Mickey Farmer"));

  const toggle = el("button", "nav-toggle");
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  // Points at the element the toggle actually shows/hides.
  toggle.setAttribute("aria-controls", "siteNavTree");
  toggle.appendChild(el("span", "nav-toggle-bars"));
  toggle.appendChild(el("span", "nav-toggle-text", "Menu"));

  const nav = el("nav", "nav-tree");
  nav.id = "siteNavTree";
  nav.setAttribute("aria-label", "Site sections");
  const list = el("ul", "nav-list");
  SITE.forEach((entry) => list.appendChild(buildItem(entry, 0)));
  nav.appendChild(list);

  mount.appendChild(brand);
  mount.appendChild(toggle);
  mount.appendChild(nav);

  /* ---------- Mobile drawer ---------- */

  const setDrawer = (open) => {
    mount.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    setDrawer(!mount.classList.contains("is-open"));
  });

  // Tapping a real link on mobile should close the drawer behind you. The
  // "Soon" items are also .nav-link but go nowhere, so they're excluded —
  // otherwise tapping one just dismisses the menu.
  list.addEventListener("click", (event) => {
    const link = event.target.closest(".nav-link");
    if (link && !link.classList.contains("nav-link--soon")) {
      setDrawer(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mount.classList.contains("is-open")) {
      setDrawer(false);
      toggle.focus();
    }
  });

  // Don't leave the drawer "open" behind a desktop layout that has no toggle.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && mount.classList.contains("is-open")) {
      setDrawer(false);
    }
  });

  /* ---------- Keep hash children in sync ---------- */

  const hashLinks = Array.from(list.querySelectorAll(".nav-link[data-hash]")).filter(
    (link) => link.dataset.page === currentPage
  );

  const syncHash = () => {
    if (hashLinks.length === 0) {
      return;
    }
    const hash = currentHash();
    // No hash yet? The first child is what the page shows by default.
    const active =
      hashLinks.find((link) => link.dataset.hash === hash) || hashLinks[0];

    hashLinks.forEach((link) => {
      const on = link === active;
      link.classList.toggle("is-current", on);
      if (on) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("hashchange", syncHash);
  syncHash();
})();
