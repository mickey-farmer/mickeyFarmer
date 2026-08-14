// Renders the story list on stories.html purely from window.STORIES
// (see js/stories-data.js). Also builds the tag filter bar the same way
// writing.js does, so new tags just show up as new filter buttons.

document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("storyList");
  const filterBar = document.getElementById("tagFilter");
  const emptyState = document.getElementById("emptyState");

  if (!listEl) {
    return;
  }

  const stories = (window.STORIES || [])
    .slice()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  if (stories.length === 0) {
    if (emptyState) {
      emptyState.hidden = false;
    }
    return;
  }

  const slugifyTag = (tag) =>
    (tag || "story")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const tagMap = new Map(); // tag slug -> display label

  stories.forEach((story) => {
    const tagLabel = story.tag || "Story";
    const tagSlug = slugifyTag(tagLabel);
    tagMap.set(tagSlug, tagLabel);

    const article = document.createElement("article");
    article.className = "writing-entry story-entry";
    article.dataset.tags = tagSlug;

    const tagsDiv = document.createElement("div");
    tagsDiv.className = "writing-entry-tags";
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.dataset.tag = tagSlug;
    pill.textContent = tagLabel;
    tagsDiv.appendChild(pill);

    const h2 = document.createElement("h2");
    h2.className = "writing-entry-title";
    const titleLink = document.createElement("a");
    titleLink.href = `story.html?slug=${encodeURIComponent(story.slug)}`;
    titleLink.textContent = story.title;
    h2.appendChild(titleLink);

    const desc = document.createElement("p");
    desc.className = "writing-entry-desc";
    desc.textContent = story.teaser || "";

    const readLink = document.createElement("a");
    readLink.className = "writing-entry-link";
    readLink.href = `story.html?slug=${encodeURIComponent(story.slug)}`;
    readLink.textContent = "Read the story ↗";

    article.append(tagsDiv, h2, desc, readLink);
    listEl.appendChild(article);
  });

  if (!filterBar) {
    return;
  }

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
    let shown = 0;
    listEl.querySelectorAll(".story-entry").forEach((entry) => {
      const tags = (entry.dataset.tags || "").split(",");
      const match = selected === "all" || tags.includes(selected);
      entry.style.display = match ? "" : "none";
      if (match) {
        shown += 1;
      }
    });

    // Otherwise a filter that matches nothing just leaves a blank page.
    if (emptyState) {
      emptyState.hidden = shown > 0;
      emptyState.textContent =
        shown > 0 ? "" : "Nothing in that category yet — try another filter.";
    }
  });
});
