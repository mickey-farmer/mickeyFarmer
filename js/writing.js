// Builds the tag filter bar from whatever tag-pills exist in the writing
// list, so adding a new writing-entry with a new tag is enough — no need
// to touch this file when new samples get added.

document.addEventListener("DOMContentLoaded", () => {
  const filterBar = document.getElementById("tagFilter");
  const entries = Array.from(document.querySelectorAll(".writing-entry"));

  if (!filterBar || entries.length === 0) {
    return;
  }

  const tagMap = new Map(); // slug -> display label

  entries.forEach((entry) => {
    entry.querySelectorAll(".tag-pill").forEach((pill) => {
      const slug = pill.dataset.tag;
      if (slug) {
        tagMap.set(slug, pill.textContent.trim());
      }
    });
  });

  const makeButton = (slug, label, isActive) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag-filter-btn" + (isActive ? " is-active" : "");
    // aria-pressed carries the state for assistive tech; .is-active is only
    // the visual half of it.
    btn.setAttribute("aria-pressed", String(isActive));
    btn.textContent = label;
    btn.dataset.tag = slug;
    return btn;
  };

  filterBar.appendChild(makeButton("all", "All", true));
  tagMap.forEach((label, slug) => {
    filterBar.appendChild(makeButton(slug, label, false));
  });

  filterBar.addEventListener("click", (event) => {
    const btn = event.target.closest(".tag-filter-btn");
    if (!btn) {
      return;
    }

    filterBar.querySelectorAll(".tag-filter-btn").forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");

    const selected = btn.dataset.tag;
    entries.forEach((entry) => {
      const tags = (entry.dataset.tags || "").split(",");
      entry.style.display = selected === "all" || tags.includes(selected) ? "" : "none";
    });
  });
});
