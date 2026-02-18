import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parseTradeYearFromSlug } from '@/lib/trade-config';
import { getSEOTitleForTrade, getSEODescriptionForTrade, getSEOTitleForTradeYear, getSEODescriptionForTradeYear } from '@/lib/seo-content';
import { useAuth } from '@/lib/AuthContext';
import SEOHead from '@/components/SEOHead';
import Dashboard from '@/pages/Dashboard';

/**
 * Wrapper for SEO routes /:trade and /:trade/year-:year.
 * Validates params, syncs trade/year to app state (localStorage + user), sets SEO meta, renders Dashboard.
 */
export default function DashboardSEOWrapper() {
  const { trade: tradeSlug, year: yearNum } = useParams();
  const yearSlug = yearNum != null && yearNum !== '' ? `year-${yearNum}` : undefined;
  const navigate = useNavigate();
  const { updateMe } = useAuth();
  const [synced, setSynced] = useState(false);

  const parsed = parseTradeYearFromSlug(tradeSlug, yearSlug);

  useEffect(() => {
    if (!parsed) {
      navigate('/', { replace: true });
      return;
    }
    const { tradeCode, year } = parsed;
    try {
      localStorage.setItem('selected_trade', tradeCode);
      if (year != null) localStorage.setItem('selected_year', String(year));
      else localStorage.removeItem('selected_year');
    } catch (_) {}
    setSynced(true);
    updateMe?.({ selected_trade: tradeCode, selected_year: year ?? undefined });
  }, [tradeSlug, yearSlug, navigate, updateMe, parsed]);

  if (!parsed) return null;
  if (!synced) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  const canonicalPath = yearSlug ? `/${tradeSlug}/${yearSlug}` : `/${tradeSlug}`;
  const title = yearSlug
    ? getSEOTitleForTradeYear(tradeSlug, parsed.year)
    : getSEOTitleForTrade(tradeSlug);
  const description = yearSlug
    ? getSEODescriptionForTradeYear(tradeSlug, parsed.year)
    : getSEODescriptionForTrade(tradeSlug);

  return (
    <>
      <SEOHead title={title} description={description} canonicalPath={canonicalPath} />
      <Dashboard />
    </>
  );
}
