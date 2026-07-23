# Adding a story or script

Stories on this site are plain Markdown files rendered in the browser — there's no build step. To publish a new one:

1. **Write it.** Create `stories/your-slug.md` (e.g. `stories/the-long-walk.md`). Use a slug: lowercase, hyphens instead of spaces, no spaces or special characters. Write the story as normal Markdown — headings, italics, blockquotes, etc. are all fine.

2. **List it.** Open `js/stories-data.js` and add an entry to the `STORIES` array:

   ```js
   {
     slug: "the-long-walk",       // must match the filename above, without .md
     title: "The Long Walk",
     tag: "Short Story",          // or "Script", "Flash Fiction", whatever fits
     teaser: "One or two sentences that hook the reader.",
     date: "2026-08-01",          // YYYY-MM-DD — newest date shows first
   },
   ```

3. **Push.** Once it's live, `stories.html` lists it automatically (with a filter button for its tag), and `story.html?slug=the-long-walk` renders the full text.

## Previewing locally

Because the page fetches the `.md` file with JavaScript, double-clicking `index.html` to open it directly (`file://...`) won't load the story text in most browsers. Instead, run a quick local server from the repo root and open the printed URL:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/stories.html`. (Or just push to GitHub Pages and check it there — same result.)

## Formatting tips

Anything [marked.js](https://marked.js.org/) supports will render, so: `**bold**`, `*italics*`, `> blockquotes`, `# Headings`, `- bullet lists`, and blank-line-separated paragraphs all work as expected. No need to write raw HTML.
