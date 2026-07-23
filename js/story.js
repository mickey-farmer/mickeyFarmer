// Reader template for a single story. Looks up ?slug= in js/stories-data.js
// for the title/tag/date, then fetches stories/<slug>.md and renders it
// with marked.js (loaded from CDN in story.html).

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const metaEl = document.getElementById("storyMeta");
  const contentEl = document.getElementById("storyContent");
  const titleEl = document.getElementById("pageTitle");

  const showMessage = (message) => {
    if (!contentEl) return;
    contentEl.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = message;
    const back = document.createElement("a");
    back.href = "stories.html";
    back.textContent = "← Back to all stories";
    contentEl.append(p, back);
  };

  if (!slug) {
    showMessage("No story specified.");
    return;
  }

  const meta = (window.STORIES || []).find((s) => s.slug === slug);

  if (!meta) {
    showMessage("That story couldn't be found.");
    return;
  }

  if (titleEl) {
    titleEl.textContent = `${meta.title} — Mickey Farmer`;
  }

  if (metaEl) {
    metaEl.innerHTML = "";
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.textContent = meta.tag || "Story";

    const h1 = document.createElement("h1");
    h1.className = "story-title";
    h1.textContent = meta.title;

    metaEl.append(pill, h1);

    if (meta.date) {
      const dateP = document.createElement("p");
      dateP.className = "story-date";
      dateP.textContent = meta.date;
      metaEl.appendChild(dateP);
    }
  }

  try {
    const response = await fetch(`stories/${encodeURIComponent(slug)}.md`);
    if (!response.ok) {
      throw new Error("not found");
    }
    const markdown = await response.text();
    if (contentEl) {
      contentEl.innerHTML = window.marked
        ? window.marked.parse(markdown)
        : `<pre>${markdown.replace(/</g, "&lt;")}</pre>`;
    }
  } catch (err) {
    showMessage("Couldn't load that story right now.");
  }
});
