# generationsconstruction.org

Static website for Generations Construction Corp, a 501(c)(3) nonprofit serving Northern Colorado.

- No build step. Vercel serves these files as-is (Framework preset: Other).
- `vercel.json` sets security headers, caching and the www → apex redirect.
- Repair form: paste the Web3Forms access key into `WEB3FORMS_KEY` in `js/site.js`.
- Photos: Unsplash (free license). Replace with real job photos in `images/` (keep the same file names, or update `index.html`).
- Font: Archivo (SIL Open Font License, see `fonts/OFL-LICENSE.txt`).

## Search engine indexing (ON)
To hide the site from search engines again: add `<meta name="robots" content="noindex, nofollow">` to the `<head>` of `index.html`, and add an `X-Robots-Tag: noindex, nofollow` header in `vercel.json`. Keep `robots.txt` allowing crawling so the noindex can be seen.
