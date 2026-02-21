# Deployment and static /trades pages

## SPA fallback (required for `/trades/*` URLs)

For URLs like `/trades`, `/trades/electrician`, `/trades/millwright/year-2` to show the correct pages (not the landing page), the host must serve the **same** `index.html` for those paths so the React app loads and React Router can match the route.

### Per-host setup

- **Vercel**  
  `vercel.json` in the repo has rewrites: `/(.*)` → `/index.html`. Ensure the project is deployed from this repo so Vercel uses it. No extra config in the dashboard needed.

- **Netlify**  
  `netlify.toml` has redirects: `/*` → `/index.html` (200). The build also outputs `public/_redirects` into `dist/`. Ensure **Publish directory** is `dist` and the latest commit is deployed.

- **GitHub Pages**  
  The build copies `index.html` to `404.html`. When a visitor opens `/trades/millwright/year-2`, GitHub Pages serves `404.html` (the SPA), and the app reads the URL and shows the right page. **Redeploy** after pulling the commit that adds the 404.html build step.

- **Other static hosts**  
  Configure “rewrite all routes to `index.html`” or “SPA fallback” (or equivalent) so that paths like `/trades/*` return the same HTML as `/`. If the host serves a custom 404 file, set it to the same content as `index.html`.

## After changing config

1. Deploy from the **latest commit** (so the build includes the trades routes and 404.html if applicable).
2. Hard refresh or open the URL in an incognito window to avoid cached HTML/JS.
