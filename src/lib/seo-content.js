/**
 * SEO title and description for trade and trade+year routes.
 * Used by DashboardSEOWrapper and sitemap.
 */

const TRADE_SLUG_LABEL = {
  electrician: 'Electrician',
  steamfitter: 'Steamfitter',
  millwright: 'Millwright',
  welder: 'Welder',
};

const SITE_SUFFIX = ' | TradeBenchPrep';

export function getSEOTitleForTrade(tradeSlug) {
  const label = TRADE_SLUG_LABEL[tradeSlug?.toLowerCase()] || 'Trade';
  return `${label} Apprenticeship Practice Exams & Study Questions${SITE_SUFFIX}`;
}

export function getSEODescriptionForTrade(tradeSlug) {
  const label = TRADE_SLUG_LABEL[tradeSlug?.toLowerCase()] || 'Trade';
  return `Free ${label.toLowerCase()} apprenticeship practice exams, study guides, and section-based quizzes. Track progress and prepare smarter.`;
}

export function getSEOTitleForTradeYear(tradeSlug, year) {
  const label = TRADE_SLUG_LABEL[tradeSlug?.toLowerCase()] || 'Trade';
  return `${label} Year ${year} Practice Exam Questions & Study Prep${SITE_SUFFIX}`;
}

export function getSEODescriptionForTradeYear(tradeSlug, year) {
  const label = TRADE_SLUG_LABEL[tradeSlug?.toLowerCase()] || 'Trade';
  return `Practice Year ${year} ${label.toLowerCase()} exam questions with full explanations. Free quizzes, full exams, and section-specific study tools.`;
}
