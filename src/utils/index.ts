import { CODE_TO_TRADE_SLUG } from '@/lib/trade-config';

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
