# mickeyFarmer

Personal splash site for Mickey Farmer — Acting, Technical Writing, Prompt Engineering, and Game & Story Development, with Dancing waiting in the wings.

## How the site is put together

Every page is the same shell: a persistent left-hand nav (like a docs site) beside the content.

```html
<body data-page="writing" data-theme="writing">
  <div class="site-shell">
    <aside class="site-sidebar" id="siteNav"></aside>  <!-- filled in by js/nav.js -->
    <div class="site-body">
      <header class="site-header">...</header>
      <main class="site-content" id="main">...</main>
      <footer class="site-footer">...</footer>
    </div>
  </div>
```

Two attributes on `<body>` do all the work:

- **`data-page`** tells `js/nav.js` which nav item to highlight.
- **`data-theme`** picks the accent color, which every stylesheet reads as `var(--accent)`.

### Adding or changing nav items

Edit the `SITE` array at the top of **`js/nav.js`** — that's the only place the nav is defined, so
there's no sidebar markup to keep in sync across files. Each entry supports `label`, `href`, `page`,
`theme`, `children`, plus `external` and `soon` flags. Sub-items only appear for the section you're
currently in.

To add a whole new page: copy an existing page's shell, set `data-page`/`data-theme`, add a `SITE`
entry with a matching `page`, and add a `body[data-theme="..."]` line in `css/styles.css`.

## Structure

```
index.html            home — hero plus the top-level category cards
writing.html          Technical Writing samples (links out to published docs)
certifications.html   all certifications, grouped by area — rendered from js/certs-data.js
prompting.html        Prompt Engineering — Certification and Portfolio sections
gamedev.html          Game & Story Development hub — Games, Short Stories & Scripts
stories.html          list of standalone stories/scripts (hosted only here)
story.html            reader template — renders stories/<slug>.md for a given ?slug=
stories/              story content as plain Markdown files, see stories/README.md
css/styles.css        palette, theming, app shell, sidebar, cards, .tag-pill (shared everywhere)
css/writing.css       shared list/entry styling for writing.html and stories.html
css/stories.css       story-specific bits (reader typography)
css/certificates.css  the certificate component — shared by certifications.html + prompting.html
css/prompting.css     prompt portfolio cards
js/nav.js             THE SITE MAP — renders the sidebar on every page from one array
js/script.js          small hook (currently just sets the footer year)
js/writing.js         builds the tag filter on writing.html
js/certs-data.js      manifest of certifications, grouped by area — edit this to add one
js/certifications.js  renders certifications.html from the manifest
js/prompting.js       hash-driven section switching, lazy PDF embed, copy buttons
js/stories-data.js    manifest of stories (title, tag, teaser, date) — edit this to add one
js/stories.js         renders the story list + tag filter on stories.html from the manifest
js/story.js           fetches and renders a single story's Markdown on story.html
assets/icons/         line-art SVGs used as CSS mask icons on each card
assets/certificates/  certificate PDFs shown on prompting.html
media/                drop real photos/screenshots here, one folder per category
```

## Colors

Blue-gray chrome throughout, with one accent per section so you can tell where you are:

| Section | Variable | Color |
| --- | --- | --- |
| Home | `--accent-home` | slate blue |
| Technical Writing | `--accent-writing` | teal |
| Certifications | `--accent-certifications` | indigo |
| Prompt Engineering | `--accent-prompting` | green |
| Game & Story Development | `--accent-gamedev` | violet |
| Short Stories & Scripts | `--accent-stories` | blue |
| Acting | `--accent-acting` | amber |

Section stylesheets reference `var(--accent)`, never a specific color — that's why `writing.css`
serves both the teal Technical Writing page and the blue Stories page without a change.

## Sections

- **Acting** lives on its own site (mickeyonstage.com), so the nav and home page can only link out to it.
- **Technical Writing** — `writing.html`, a list of samples that link out to published docs.
- **Certifications** — `certifications.html`. Every certificate, grouped by area, each one a
  collapsed row that expands to the PDF. The page, the category headings, and the nav's sub-items
  are all built from `js/certs-data.js`:
  - Drop the PDF in `assets/certificates/`, add an entry to the right group, done. No markup to edit.
  - A group with no certificates yet renders nothing, and `js/certifications.js` also removes that
    category from the sidebar so the nav never points at a missing anchor.
  - PDFs are only fetched when a row is expanded, so the page stays light as this list grows.
  - Set `landscape: false` for a portrait PDF (e.g. a print-to-PDF web certificate) so the
    embedded viewer uses the right aspect ratio.
- **Prompt Engineering** — `prompting.html`. The nav's sub-items switch sections
  (hash-routed, so `prompting.html#portfolio` is linkable):
  - **Certification** — one `<details class="cert">` block per credential. The PDF only downloads
    when someone expands it. Copy the block and swap the filename to add another.
  - **Portfolio** — one `<article class="prompt-card">` per prompt, each showing v1 → what was wrong
    with it → final version → how to evaluate it. Copy buttons wire themselves up automatically to
    any `.prompt-block`, so no JS changes are needed when adding a card.
- **Game & Story Development** — `gamedev.html`, which splits into **Games** (still "coming soon") and **Short Stories & Scripts** (`stories.html`), where stories are hosted directly on this site — see `stories/README.md` for how to add one.
- **Dancing** is commented out in `index.html`. Once there are photos in `media/dancing/`, uncomment that block and add a `SITE` entry in `js/nav.js`.

## A note on JavaScript

The sidebar is injected by `js/nav.js`, so it needs JS to appear. Everything else degrades: pages
keep their own header, content, and footer, `prompting.html` shows both sections stacked instead of
one at a time, and every page remains fully readable and navigable through in-page links.

## Publishing with GitHub Pages

Quick checklist since it's been a while:

1. Push this repo to GitHub (main branch, or whatever branch you want to publish from).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch," pick the branch (e.g. `main`) and folder (`/root`), then **Save**.
4. Wait a minute for the first deploy — GitHub will show the `https://<username>.github.io/<repo>` URL once it's live.
5. For a custom domain: under **Custom domain**, enter it and save — this creates a `CNAME` file in the repo root. Add the matching DNS records at your registrar (an `A`/`ALIAS` record to GitHub's IPs for an apex domain, or a `CNAME` record to `<username>.github.io` for a subdomain).
6. Once DNS resolves, check **Enforce HTTPS** back in the Pages settings.

No CNAME file has been added here yet since the domain for this site wasn't specified — add one once you know it (or let the Pages UI create it for you in step 5).
