# Deployment and static /trades pages

## Hybrid SSG + SPA

The app uses **pre-rendered static HTML** for public/content routes so each URL has a **unique document** for AdSense, indexing, and crawling. Same look and feel; the SPA then loads and takes over.

- **Pre-rendered (SSG):** `/`, `/trades`, `/trades/:trade`, `/trades/:trade/year-N` — 21 static HTML files generated at build time from `tradesContent` / `tradesYearContentNew`.
- **SPA (client-only):** Dashboard, Study, Quiz, Auth, Settings, etc. — same `index.html` fallback and Supabase as before.

Build: `npm run build` runs Vite then `node scripts/prerender.mjs`. Prerender reads the built `dist/index.html` for asset hashes, then writes one HTML file per route under `dist/` (e.g. `dist/trades/electrician/year-1/index.html`).

## Clean URLs (BrowserRouter)

The app uses **BrowserRouter**. Every page has a clean URL (e.g. `https://www.tradebenchprep.org/trades/electrician/year-1`) so Google can crawl and index each page and AdSense can read the content.

## Vercel

`vercel.json` configures rewrites:

- `/sitemap.xml` and `/robots.txt` are served as static files.
- `/trades`, `/trades/:trade`, `/trades/:trade/year-:num` are rewritten to the corresponding static `index.html` (prerendered).
- Every other path is rewritten to `/index.html` so the SPA loads.

Redeploy to Vercel after pulling.

## Deploy steps

1. Build: `npm run build` (Vite + prerender).
2. Publish the `dist/` directory (or let Vercel build from the repo).
3. Vercel will serve prerendered pages for `/trades/*` and the SPA for all other routes.
