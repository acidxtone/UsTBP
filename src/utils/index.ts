import { CODE_TO_TRADE_SLUG, TRADE_SLUG_TO_CODE } from '@/lib/trade-config';

export function createPageUrl(pageName: string) {
    if (!pageName) return '/';
    // Ensure case consistency; / is landing, Dashboard lives at /Dashboard
    const path = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return '/' + path;
}

/**
 * Returns SEO-friendly Dashboard URL when trade (and optionally year) are known;
 * otherwise '/Dashboard' for backward compatibility.
 */
export function getDashboardUrl(tradeCode?: string | null, year?: number | null): string {
    if (!tradeCode) return '/Dashboard';
    const slug = (CODE_TO_TRADE_SLUG as Record<string, string>)[tradeCode];
    if (!slug) return '/Dashboard';
    return year != null ? `/${slug}/year-${year}` : `/${slug}`;
}

/**
 * Dashboard URL with URL params as source of truth first (for use in links/navigate).
 * Use when component may be rendered on /:trade or /:trade/year-:year so the link keeps that URL.
 */
export function getDashboardUrlWithUrlFirst(
    urlTradeSlug?: string | null,
    urlYear?: string | null,
    tradeCodeFromState?: string | null,
    yearFromState?: number | null
): string {
    const codeFromUrl = urlTradeSlug
        ? (TRADE_SLUG_TO_CODE as Record<string, string>)[urlTradeSlug.toLowerCase()]
        : null;
    const tradeCode = codeFromUrl || tradeCodeFromState;
    const yearFromUrl = urlYear != null && urlYear !== '' ? parseInt(urlYear, 10) : null;
    const year = yearFromUrl != null && !Number.isNaN(yearFromUrl) ? yearFromUrl : yearFromState;
    return getDashboardUrl(tradeCode, year);
}
