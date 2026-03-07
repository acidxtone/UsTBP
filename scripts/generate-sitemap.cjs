/**
 * Generates public/sitemap.xml from static routes.
 * Run: node scripts/generate-sitemap.cjs
 * Keeps sitemap in sync with App routes: /, /trades, trade hubs, year pages, quiz URLs, legal.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.tradebenchprep.org';
const LASTMOD = '2026-03-06';

const TRADES = {
  electrician: [1, 2, 3, 4],
  millwright: [1, 2, 3, 4],
  'steamfitter-pipefitter': [1, 2, 3, 4],
  welder: [1, 2, 3],
};

// Section count per (tradeCode, year) - from trade-config SECTION_MAPPINGS
const SECTIONS = {
  E: { 1: 4, 2: 3, 3: 3, 4: 4 },
  M: { 1: 5, 2: 4, 3: 4, 4: 6 },
  SF: { 1: 5, 2: 6, 3: 5, 4: 4 },
  W: { 1: 4, 2: 4, 3: 4 },
};

const SLUG_TO_CODE = {
  electrician: 'E',
  millwright: 'M',
  welder: 'W',
  'steamfitter-pipefitter': 'SF',
};

function urlEntry(loc, changefreq = 'monthly', priority = '0.8') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const urls = [];

urls.push(urlEntry(`${BASE}/`, 'weekly', '1.0'));
urls.push(urlEntry(`${BASE}/trades`, 'monthly', '0.9'));

for (const [slug, years] of Object.entries(TRADES)) {
  urls.push(urlEntry(`${BASE}/trades/${slug}`, 'monthly', '0.9'));
  const code = SLUG_TO_CODE[slug];
  const yearSections = SECTIONS[code] || {};
  for (const y of years) {
    urls.push(urlEntry(`${BASE}/trades/${slug}/year-${y}`, 'monthly', '0.9'));
    urls.push(urlEntry(`${BASE}/trades/${slug}/year-${y}/full-exam`, 'monthly', '0.85'));
    const numSections = yearSections[y] || 1;
    for (let s = 1; s <= numSections; s++) {
      urls.push(urlEntry(`${BASE}/trades/${slug}/year-${y}/section-${s}`, 'monthly', '0.8'));
    }
  }
}

urls.push(urlEntry(`${BASE}/privacy-policy`, 'yearly', '0.5'));
urls.push(urlEntry(`${BASE}/terms-of-service`, 'yearly', '0.5'));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Wrote', outPath, '(' + urls.length, 'URLs)');
