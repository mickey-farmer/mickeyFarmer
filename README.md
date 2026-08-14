# mickeyFarmer

Personal splash site for Mickey Farmer — Acting, Technical Writing, Prompt Engineering, and Game & Story Development, with Dancing waiting in the wings.

## Structure

```
index.html           splash page with the top-level category cards
writing.html          Technical Writing samples (links out to published docs)
prompting.html        Prompt Engineering — docs-style left nav: Certification, Portfolio
gamedev.html          Game & Story Development hub — two sub-cards: Games, Short Stories & Scripts
stories.html          list of standalone stories/scripts (hosted only here)
story.html            reader template — renders stories/<slug>.md for a given ?slug=
stories/              story content as plain Markdown files, see stories/README.md
css/styles.css        gray theme + per-card colorful hover effect + .tag-pill (shared everywhere)
css/writing.css       shared list/entry styling for writing.html and stories.html
css/stories.css       story-specific bits (list accent color, reader typography)
css/prompting.css     docs-style sidebar layout, certificate card, prompt cards
js/script.js          small hook (currently just sets the footer year)
js/writing.js         builds the tag filter on writing.html
js/prompting.js       left-nav section switching, lazy PDF embed, copy buttons
js/stories-data.js    manifest of stories (title, tag, teaser, date) — edit this to add one
js/stories.js         renders the story list + tag filter on stories.html from the manifest
js/story.js           fetches and renders a single story's Markdown on story.html
assets/icons/         line-art SVGs used as CSS mask icons on each card
assets/certificates/  certificate PDFs shown on prompting.html
media/                drop real photos/screenshots here, one folder per category
```

- The **Acting** card links out to mickeyonstage.com.
- **Technical Writing** links to `writing.html`, a list of samples that link out to published docs.
- **Prompt Engineering** links to `prompting.html`. The left nav switches between two sections
  (hash-routed, so `prompting.html#portfolio` is linkable):
  - **Certification** — one `<details class="cert">` block per credential. The PDF only downloads
    when someone expands it. Copy the block and swap the filename to add another.
  - **Portfolio** — one `<article class="prompt-card">` per prompt, each showing v1 → what was wrong
    with it → final version → how to evaluate it. Copy buttons wire themselves up automatically to
    any `.prompt-block`, so no JS changes are needed when adding a card.
- **Game & Story Development** links to `gamedev.html`, which splits into **Games** (still "coming soon") and **Short Stories & Scripts** (`stories.html`), where stories are hosted directly on this site — see `stories/README.md` for how to add one.
- **Dancing** is commented out in `index.html`. Once there are photos in `media/dancing/`, uncomment that block.

## Publishing with GitHub Pages

Quick checklist since it's been a while:

1. Push this repo to GitHub (main branch, or whatever branch you want to publish from).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch," pick the branch (e.g. `main`) and folder (`/root`), then **Save**.
4. Wait a minute for the first deploy — GitHub will show the `https://<username>.github.io/<repo>` URL once it's live.
5. For a custom domain: under **Custom domain**, enter it and save — this creates a `CNAME` file in the repo root. Add the matching DNS records at your registrar (an `A`/`ALIAS` record to GitHub's IPs for an apex domain, or a `CNAME` record to `<username>.github.io` for a subdomain).
6. Once DNS resolves, check **Enforce HTTPS** back in the Pages settings.

No CNAME file has been added here yet since the domain for this site wasn't specified — add one once you know it (or let the Pages UI create it for you in step 5).
