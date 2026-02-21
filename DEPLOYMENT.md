# Deployment and static /trades pages

## HashRouter: no path rewrites required

The app uses **HashRouter** (URLs like `https://www.tradebenchprep.org/#/trades/millwright/year-2`). The server only ever receives requests to `/`, so **no SPA fallback or path rewrites are required**. Any host that can serve static files from the `dist/` directory will work.

- **Static pages (e.g. trades):** Use hash URLs: `/#/trades`, `/#/trades/electrician`, `/#/trades/millwright/year-2`. The sitemap and internal links use these.
- **Direct visit to path URL:** If someone visits `https://www.tradebenchprep.org/trades/millwright/year-2` (no hash) and the server serves `index.html` at that path, the app will redirect to `/#/trades/millwright/year-2` and show the correct page. If the server redirects that path to `/`, the user will see the landing page (no way to recover the path).

## Deploy steps

1. Build: `npm run build`
2. Publish the `dist/` directory.
3. Ensure the host serves `index.html` for the root path `/` (standard for static sites).
