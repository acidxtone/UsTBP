# Deployment and static /trades pages

## Clean URLs (BrowserRouter)

The app uses **BrowserRouter**. Every page has a clean URL (e.g. `https://www.tradebenchprep.org/trades/electrician/year-1`) so Google can crawl and index each page and AdSense can read the content.

## Vercel

`vercel.json` in the repo configures rewrites so that:

- `/sitemap.xml` and `/robots.txt` are served as static files.
- Every other path `(.*)` is rewritten to `/`, so the SPA loads and React Router shows the correct page.

Redeploy to Vercel after pulling. No other host config is required.

## Deploy steps

1. Build: `npm run build`
2. Publish the `dist/` directory (or let Vercel build from the repo).
3. Ensure the host rewrites all paths to `/` (or `/index.html`) so the same app is served; `vercel.json` does this on Vercel.
