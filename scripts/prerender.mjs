/**
 * SSG pre-render: generates static HTML for public/content routes so each URL
 * has a unique document for AdSense, indexing, and crawling. Same look and feel;
 * the SPA then loads and takes over. Run after `vite build`.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getHubContent, getTradeHubContent, getTradeYearContent, TRADES, VALID_TRADE_SLUGS } from '../src/pages/trades/tradesContent.js';
import { getSectionsForTradeYear } from '../src/lib/trade-config.js';

const TRADE_SLUG_TO_CODE = { electrician: 'E', millwright: 'M', welder: 'W', 'steamfitter-pipefitter': 'SF' };
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE_URL = 'https://www.tradebenchprep.org';

function escapeHtml(s) {
  if (s == null) return '';
  const str = String(s);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Optimized image tag for prerendered HTML: dimensions + loading/decoding. Use for any <img> you add. */
function optimizedImage(src, alt, width = 400, height = 300, priority = false) {
  const loading = priority ? 'eager' : 'lazy';
  const fetchpriority = priority ? 'high' : 'low';
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" loading="${loading}" decoding="async" fetchpriority="${fetchpriority}" />`;
}

/** Minimal critical above-the-fold CSS; additive only, does not replace main stylesheet. */
function criticalCSS() {
  return `
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    .min-h-screen { min-height: 100vh; }
    .pt-12 { padding-top: 3rem; }
    .pt-24 { padding-top: 6rem; }
    .max-w-4xl { max-width: 56rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .text-center { text-align: center; }
    .font-bold { font-weight: 700; }
    .text-slate-900 { color: rgb(15 23 42); }
    .bg-blue-600 { background-color: rgb(37 99 235); }
    .text-white { color: white; }
    .rounded-md { border-radius: 0.375rem; }
    .px-8 { padding-left: 2rem; padding-right: 2rem; }
    .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .hover\\:bg-blue-700:hover { background-color: rgb(29 78 216); }
  </style>`;
}

let cachedAssetTags = null;
/** Extract asset script/link tags from built index.html (hashed filenames). Call once at start before overwriting index.html. */
function getAssetTags() {
  if (cachedAssetTags != null) return cachedAssetTags;
  const indexPath = path.join(DIST, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  const scriptMatch = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
  const preloads = html.match(/<link rel="modulepreload"[^>]*href="([^"]+)"[^>]*>/g) || [];
  const cssMatch = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
  let out = '';
  if (cssMatch) out += `    <link rel="stylesheet" crossorigin href="${cssMatch[1]}">\n`;
  preloads.forEach((tag) => { out += '    ' + tag.trim() + '\n'; });
  if (scriptMatch) out += `    <script type="module" crossorigin src="${scriptMatch[1]}"><\/script>\n`;
  cachedAssetTags = out;
  return out;
}

/** Shared head fragment (no title/description/canonical — those are per-route). */
function baseHeadFragment() {
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
    <meta name="keywords" content="Red Seal practice test Canada, free trades practice test, Canadian trades exam prep, apprenticeship exam prep Canada, electrician practice test, millwright exam prep, welder practice test, steamfitter pipefitter exam prep, interprovincial certification" />
    <meta name="author" content="TradeBenchPrep" />
    <meta name="robots" content="index, follow" />
    <meta name="geo.region" content="CA" />
    <meta name="geo.placename" content="Canada" />
    <meta name="language" content="English" />
    <link rel="icon" type="image/png" sizes="32x32" href="${BASE_URL}/favicon.png" />
    <link rel="icon" type="image/png" sizes="48x48" href="${BASE_URL}/favicon.png" />
    <link rel="shortcut icon" type="image/png" href="${BASE_URL}/favicon.png" />
    <link rel="apple-touch-icon" href="${BASE_URL}/favicon.png" />
    <meta name="google-adsense-account" content="ca-pub-5932083189692902">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5932083189692902" crossorigin="anonymous"><\/script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y7SK2C9DZD"><\/script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y7SK2C9DZD');
    <\/script>`;
}

/** Organization JSON-LD for homepage only — helps logo appear in Google Search. */
function organizationSchemaScript() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TradeBenchPrep',
    url: BASE_URL,
    logo: BASE_URL + '/favicon.png',
  };
  return `    <script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
}

function buildHead(title, description, canonical) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanon = escapeHtml(canonical);
  const isHomepage = canonical === BASE_URL + '/';
  return `  <head>
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />
    <link rel="canonical" href="${safeCanon}" />
    ${criticalCSS()}
    ${isHomepage ? organizationSchemaScript() + '\n' : ''}
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${safeCanon}" />
    <meta property="og:image" content="${BASE_URL}/favicon.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${BASE_URL}/favicon.png" />
${baseHeadFragment()}
${getAssetTags()}  </head>`;
}

// --- TradesLayout shell (nav + main wrapper + footer). Use same classes as TradesLayout.jsx ---
function tradesLayoutShell(breadcrumbHtml, mainContent) {
  const year = new Date().getFullYear();
  return `<div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <a href="/" class="flex items-center gap-2 hover:opacity-90">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span class="text-white text-lg">📖</span></div>
        <span class="text-xl font-bold text-slate-900">TradeBenchPrep</span>
      </a>
      ${breadcrumbHtml ? '<span class="text-slate-400">/</span>' + breadcrumbHtml : ''}
    </div>
    <div class="flex items-center gap-3">
      <a href="/" class="text-sm text-slate-600 hover:text-blue-600 transition-colors">Home</a>
      <a href="/trades" class="text-sm text-slate-600 hover:text-blue-600 transition-colors">Trades</a>
      <a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2">Get Started <span class="ml-2">→</span></a>
    </div>
  </div>
</nav>
<main class="pt-24 pb-12 px-6">
${mainContent}
</main>
<footer class="border-t border-slate-100 py-8 px-6">
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center"><span class="text-white text-xs">📖</span></div>
      <span class="text-sm font-semibold text-slate-700">TradeBenchPrep</span>
    </div>
    <div class="flex items-center gap-6 text-sm text-slate-500">
      <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
      <a href="/privacy-policy" class="hover:text-blue-600 transition-colors">Privacy Policy</a>
      <a href="/terms-of-service" class="hover:text-blue-600 transition-colors">Terms of Service</a>
      <span>© ${year} TradeBenchPrep. All rights reserved.</span>
    </div>
  </div>
</footer>
</div>`;
}

// --- Landing page (same structure/classes as LandingPage.jsx) ---
function renderLandingBody() {
  const year = new Date().getFullYear();
  return `<div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span class="text-white text-lg">📖</span></div>
      <span class="text-xl font-bold text-slate-900">TradeBenchPrep</span>
    </div>
    <a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2">Get Started →</a>
  </div>
</nav>
<section class="pt-32 pb-20 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">Master Your Trade,<br /><span class="text-blue-600">Ace Your Exams</span></h1>
    <p class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">The ultimate quiz and study platform for apprenticeship training. Practice questions, track your progress, and prepare with confidence.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 w-full sm:w-auto">Get Started Free →</a>
    </div>
    <div class="flex items-center justify-center gap-6 text-sm text-slate-500">
      <span class="flex items-center gap-1.5">✓ Free forever</span>
      <span class="flex items-center gap-1.5">✓ No credit card required</span>
    </div>
  </div>
</section>
<section class="pt-4 pb-4 px-6" aria-label="Advertisement"><div class="max-w-6xl mx-auto"><!-- Ad slot --></div></section>
<section class="py-16 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 text-center mb-2">How It Works</h2>
    <p class="text-slate-600 text-center mb-10 max-w-xl mx-auto">TradeBenchPrep supports Steamfitter/Pipefitter, Electrician, Millwright, and Welder apprentices preparing for provincial and interprovincial certification exams.</p>
    <div class="text-center mb-10">
      <a href="/trades" class="inline-flex items-center gap-2 rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Explore exam prep by trade and year →</a>
    </div>
    <div class="grid md:grid-cols-3 gap-8 text-center">
      <div><div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">1</div><h3 class="font-semibold text-slate-900 mb-1">Pick your trade &amp; year</h3><p class="text-sm text-slate-600">Select your trade and apprenticeship year to see the right materials.</p></div>
      <div><div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">2</div><h3 class="font-semibold text-slate-900 mb-1">Study &amp; take quizzes</h3><p class="text-sm text-slate-600">Use study guides and practice exams by section and difficulty.</p></div>
      <div><div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">3</div><h3 class="font-semibold text-slate-900 mb-1">Track your progress</h3><p class="text-sm text-slate-600">Monitor accuracy and focus on weak areas before exam day.</p></div>
    </div>
  </div>
</section>
<section class="pb-24 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-serif font-bold text-slate-900 text-center mb-4">Everything You Need to Succeed</h2>
    <p class="text-slate-600 text-center mb-12 max-w-xl mx-auto">Built specifically for apprentices preparing for their trade qualifications.</p>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="border border-slate-200 rounded-lg p-6 text-center"><div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">🎯</div><h3 class="text-lg font-semibold text-slate-900 mb-2">Practice Quizzes</h3><p class="text-slate-600 text-sm leading-relaxed">Hundreds of questions organized by year and topic. Test your knowledge with realistic exam-style questions.</p></div>
      <div class="border border-slate-200 rounded-lg p-6 text-center"><div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5">📚</div><h3 class="text-lg font-semibold text-slate-900 mb-2">Study Guides</h3><p class="text-slate-600 text-sm leading-relaxed">Comprehensive study materials covering all key topics in your apprenticeship curriculum.</p></div>
      <div class="border border-slate-200 rounded-lg p-6 text-center"><div class="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">⚡</div><h3 class="text-lg font-semibold text-slate-900 mb-2">Track Progress</h3><p class="text-slate-600 text-sm leading-relaxed">Monitor your improvement over time with detailed stats and performance insights.</p></div>
    </div>
  </div>
</section>
<section class="py-6 px-6" aria-label="Advertisement"><div class="max-w-5xl mx-auto"><!-- Ad slot --></div></section>
<section class="py-20 px-6 bg-slate-50">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-serif font-bold text-slate-900 text-center mb-12">Why Choose TradeBenchPrep for Canadian Trade Exam Prep?</h2>
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div><h3 class="text-xl font-semibold text-slate-900 mb-4">Comprehensive Trade Exam Preparation</h3><p class="text-slate-600 mb-4 leading-relaxed">TradeBenchPrep helps Steamfitter/Pipefitter, Electrician, Millwright, and Welder apprentices prepare for provincial and interprovincial certification exams.</p><p class="text-slate-600 leading-relaxed">With hundreds of practice questions organized by year and topic, you can focus on specific areas where you need improvement.</p></div>
      <div><h3 class="text-xl font-semibold text-slate-900 mb-4">Industry-Standard Study Materials</h3><p class="text-slate-600 mb-4 leading-relaxed">Study guides and practice materials are aligned with Canadian apprenticeship curriculum.</p><p class="text-slate-600 leading-relaxed">Whether you're in Year 1 or preparing for journeyman certification, TradeBenchPrep adapts to your trade and skill level.</p></div>
    </div>
  </div>
</section>
<section class="py-8 px-6" aria-label="Advertisement"><div class="max-w-6xl mx-auto"><!-- Ad slot --></div></section>
<footer class="border-t border-slate-100 py-8 px-6">
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-2"><div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center"><span class="text-white text-xs">📖</span></div><span class="text-sm font-semibold text-slate-700">TradeBenchPrep</span></div>
    <div class="flex items-center gap-6 text-sm text-slate-500"><a href="/privacy-policy" class="hover:text-blue-600 transition-colors">Privacy Policy</a><a href="/terms-of-service" class="hover:text-blue-600 transition-colors">Terms of Service</a><span>© ${year} TradeBenchPrep. All rights reserved.</span></div>
  </div>
</footer>
</div>`;
}

// --- Trades hub ---
function renderTradesHubBody() {
  const hub = getHubContent();
  let introHtml = hub.intro.map((p) => `<p class="text-lg text-slate-600 mb-4 leading-relaxed">${escapeHtml(p)}</p>`).join('');
  let cardsHtml = hub.chooseYourTrade.map((t) => `
    <div class="border border-slate-200 rounded-lg hover:border-blue-200 transition-colors duration-300 hover:shadow-lg pt-6 pb-6 px-6">
      <h3 class="text-xl font-semibold text-slate-900 mb-2">${escapeHtml(t.title)}</h3>
      <p class="text-slate-600 text-sm leading-relaxed mb-4">${escapeHtml(t.description)}</p>
      <a href="${escapeHtml(t.link)}" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-10 px-4">Learn more</a>
    </div>`).join('');
  const main = `
<div class="max-w-4xl mx-auto">
  <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">${escapeHtml(hub.h1)}</h1>
  ${introHtml}
  <div class="my-8"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 w-full sm:w-auto">Get Started Free →</a></div>
</div>
<section class="py-4 px-6" aria-label="Advertisement"><div class="max-w-6xl mx-auto"><!-- Ad --></div></section>
<section class="py-12 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 text-center mb-8">Choose Your Trade</h2>
    <div class="grid md:grid-cols-2 gap-6">${cardsHtml}</div>
  </div>
</section>
<section class="py-12 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 text-center mb-6">How It Works</h2>
    <p class="text-slate-600 leading-relaxed mb-8">${escapeHtml(hub.howItWorks)}</p>
    <div class="flex justify-center"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Get Started Free →</a></div>
  </div>
</section>
<section class="py-8 px-6" aria-label="Advertisement"><div class="max-w-6xl mx-auto"><!-- Ad --></div></section>`;
  return tradesLayoutShell('', main);
}

// --- Trade hub (e.g. /trades/electrician) ---
function renderTradeHubBody(tradeSlug) {
  const content = getTradeHubContent(tradeSlug);
  if (!content) return null;
  const config = TRADES[tradeSlug];
  const yearsList = config.years.map((y) => `<li class=""><a href="/trades/${tradeSlug}/year-${y}" class="text-blue-600 hover:underline font-medium">${escapeHtml(config.name)} Year ${y}</a></li>`).join('');
  const chooseYearIntro = content.chooseYearIntro ? `<p class="text-slate-600 mb-6 leading-relaxed">${escapeHtml(content.chooseYearIntro)}</p>` : '';
  const main = `
<div class="max-w-4xl mx-auto">
  <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">${escapeHtml(content.h1)}</h1>
  <p class="text-lg text-slate-600 mb-8 leading-relaxed">${escapeHtml(content.intro)}</p>
  <div class="my-8"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 w-full sm:w-auto">Get Started Free →</a></div>
</div>
<section class="py-12 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-4">Choose Your Year</h2>
    ${chooseYearIntro}
    <ul class="space-y-3">${yearsList}</ul>
  </div>
</section>
<section class="py-12 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto flex justify-center"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Get Started Free →</a></div>
</section>`;
  const breadcrumb = `<span class="text-slate-900 font-medium text-sm">${escapeHtml(config.name)}</span>`;
  return tradesLayoutShell(breadcrumb, main);
}

// --- Trade year page (e.g. /trades/electrician/year-1) ---
function renderTradeYearBody(tradeSlug, yearNum) {
  const content = getTradeYearContent(tradeSlug, yearNum);
  if (!content) return null;
  const config = TRADES[tradeSlug];
  const breadcrumb = `<span class="flex items-center gap-2 text-sm"><a href="/trades" class="text-slate-600 hover:text-blue-600">Trades</a><span class="text-slate-400">/</span><a href="/trades/${tradeSlug}" class="text-slate-600 hover:text-blue-600">${escapeHtml(config.name)}</a><span class="text-slate-400">/</span><span class="text-slate-900 font-medium">Year ${yearNum}</span></span>`;

  const isNewFormat = Array.isArray(content.needsToKnow);
  let sections = '';

  const tradeCode = TRADE_SLUG_TO_CODE[tradeSlug];
  const sectionInfo = tradeCode ? getSectionsForTradeYear(tradeCode, yearNum) : {};
  const sectionEntries = Object.entries(sectionInfo).map(([numStr, info]) => ({ num: parseInt(numStr, 10), name: info?.name || `Section ${numStr}` }));
  const practiceQuizzesHtml = `
<section class="py-8 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-4">Practice Quizzes</h2>
    <p class="text-slate-600 mb-6 leading-relaxed">Take a full practice exam or focus on a specific section. Each quiz runs in your browser with no sign-in required.</p>
    <div class="space-y-3">
      <a href="/trades/${tradeSlug}/year-${yearNum}/full-exam" class="block p-4 rounded-xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors">
        <span class="font-semibold text-slate-900">Full practice exam</span>
        <span class="text-slate-500 text-sm block mt-1">100 questions, all sections</span>
      </a>
      ${sectionEntries.map(({ num, name }) => `<a href="/trades/${tradeSlug}/year-${yearNum}/section-${num}" class="block p-4 rounded-xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors"><span class="font-semibold text-slate-900">Section ${num}: ${escapeHtml(name)}</span></a>`).join('')}
    </div>
  </div>
</section>`;

  sections += `
<div class="max-w-4xl mx-auto">
  <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">${escapeHtml(content.h1)}</h1>
  <p class="text-lg text-slate-600 mb-6 leading-relaxed">${escapeHtml(content.intro)}</p>
  <div class="my-8"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 w-full sm:w-auto">Get Started Free →</a></div>
</div>
${practiceQuizzesHtml}
<section class="py-4 px-6" aria-label="Advertisement"><div class="max-w-6xl mx-auto"><!-- Ad --></div></section>`;

  if (isNewFormat) {
    sections += `
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">${escapeHtml(content.needsToKnowHeading)}</h2>
    <div class="space-y-6">${(content.needsToKnow || []).map((item) => `<div><h3 class="font-semibold text-slate-900 mb-2">${escapeHtml(item.title)}</h3><p class="text-slate-600 leading-relaxed">${escapeHtml(item.body)}</p></div>`).join('')}</div>
  </div>
</section>`;
    if (content.catchOffGuardHeading && (Array.isArray(content.catchOffGuard) ? content.catchOffGuard.length > 0 : !!content.catchOffGuard)) {
      const catchArr = Array.isArray(content.catchOffGuard) ? content.catchOffGuard : [content.catchOffGuard];
      const catchHtml = catchArr.map((p) => `<p class="text-slate-600 mb-4 leading-relaxed">${escapeHtml(p)}</p>`).join('');
      sections += `
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">${escapeHtml(content.catchOffGuardHeading)}</h2>${catchHtml}
    <div class="mt-8"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Get Started Free →</a></div>
  </div>
</section>`;
    }
    sections += `
<section class="py-6 px-6" aria-label="Advertisement"><div class="max-w-5xl mx-auto"><!-- Ad --></div></section>
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">${escapeHtml(content.howToUseHeading)}</h2>
    ${(Array.isArray(content.howToUse) ? content.howToUse : [content.howToUse]).map((p) => `<p class="text-slate-600 mb-4 leading-relaxed">${escapeHtml(p)}</p>`).join('')}
    <div class="mt-8"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Get Started Free →</a></div>
  </div>
</section>`;
  } else {
    sections += `
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">What's Covered in ${escapeHtml(config.name)} Year ${yearNum}</h2>
    <div class="space-y-6">${(content.whatsCovered || []).map((item) => `<div><h3 class="font-semibold text-slate-900 mb-2">${escapeHtml(item.name)}</h3><p class="text-slate-600 leading-relaxed">${escapeHtml(item.text)}</p></div>`).join('')}</div>
  </div>
</section>
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">How TradeBenchPrep Helps You Pass</h2>
    ${(content.howHelps || []).map((p) => `<p class="text-slate-600 mb-4 leading-relaxed">${escapeHtml(p)}</p>`).join('')}
    <div class="mt-8"><a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Get Started Free →</a></div>
  </div>
</section>
<section class="py-6 px-6" aria-label="Advertisement"><div class="max-w-5xl mx-auto"><!-- Ad --></div></section>
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">What to Expect on Your Year ${yearNum} ${escapeHtml(config.name)} Exam</h2>
    ${(content.whatToExpect || []).map((p) => `<p class="text-slate-600 mb-4 leading-relaxed">${escapeHtml(p)}</p>`).join('')}
  </div>
</section>
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">Tips for Studying ${escapeHtml(config.name)} Year ${yearNum}</h2>
    ${(content.tips || []).map((p) => `<p class="text-slate-600 mb-4 leading-relaxed">${escapeHtml(p)}</p>`).join('')}
  </div>
</section>
<section class="py-10 px-6 border-t border-slate-100">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-serif font-bold text-slate-900 mb-6">${escapeHtml(content.readyHeading || 'Ready to Start Practicing?')}</h2>
    <p class="text-slate-600 mb-8 leading-relaxed">${escapeHtml(content.readyToStart)}</p>
    <a href="/TradeSelection" class="inline-flex items-center justify-center rounded-md text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">Get Started Free →</a>
  </div>
</section>`;
  }

  sections += `
<section class="py-8 px-6" aria-label="Advertisement"><div class="max-w-6xl mx-auto"><!-- Ad --></div></section>`;

  return tradesLayoutShell(breadcrumb, sections);
}

function writeHtml(filePath, title, description, canonical, bodyHtml) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  // Same structure as App.jsx: #root > div.pt-12... > page content. Crawlers see content; SPA replaces #root on load.
  const fullHtml = `<!doctype html>
<html lang="en">
${buildHead(title, description, canonical)}
  <body>
    <div id="root"><div class="pt-12 md:pt-16 lg:mx-32 min-h-screen">${bodyHtml}</div></div>
  </body>
</html>`;
  fs.writeFileSync(filePath, fullHtml, 'utf8');
}

// --- Main ---
function main() {
  if (!fs.existsSync(DIST) || !fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('Run prerender after vite build. dist/index.html not found.');
    process.exit(1);
  }
  // Read asset tags once from Vite-built index.html before we overwrite it
  getAssetTags();

  const routes = [];

  // Landing
  routes.push({
    path: '',
    file: path.join(DIST, 'index.html'),
    title: 'Free Red Seal Practice Test Canada | Canadian Trades Exam Prep | TradeBenchPrep',
    description: 'Free Canadian skilled trades exam prep. Red Seal and apprenticeship practice tests for Electrician, Welder, Millwright & Steamfitter. No signup required.',
    canonical: BASE_URL + '/',
    body: renderLandingBody(),
  });

  // /trades
  const hub = getHubContent();
  routes.push({
    path: 'trades',
    file: path.join(DIST, 'trades', 'index.html'),
    title: hub.title,
    description: hub.metaDescription,
    canonical: BASE_URL + '/trades',
    body: renderTradesHubBody(),
  });

  // /trades/:trade
  for (const slug of VALID_TRADE_SLUGS) {
    const content = getTradeHubContent(slug);
    if (!content) continue;
    routes.push({
      path: `trades/${slug}`,
      file: path.join(DIST, 'trades', slug, 'index.html'),
      title: content.title,
      description: content.metaDescription,
      canonical: BASE_URL + '/trades/' + slug,
      body: renderTradeHubBody(slug),
    });
  }

  // /trades/:trade/year-N
  for (const slug of VALID_TRADE_SLUGS) {
    const config = TRADES[slug];
    for (const y of config.years) {
      const content = getTradeYearContent(slug, y);
      if (!content) continue;
      routes.push({
        path: `trades/${slug}/year-${y}`,
        file: path.join(DIST, 'trades', slug, `year-${y}`, 'index.html'),
        title: content.title,
        description: content.metaDescription,
        canonical: BASE_URL + '/trades/' + slug + '/year-' + y,
        body: renderTradeYearBody(slug, y),
      });
    }
  }

  for (const r of routes) {
    if (!r.body) continue;
    writeHtml(r.file, r.title, r.description, r.canonical, r.body);
    console.log('Prerendered:', r.path || '/');
  }

  console.log('Prerender done. Total routes:', routes.filter((r) => r.body).length);
}

main();
