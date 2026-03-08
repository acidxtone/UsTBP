import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import TradesLayout, { GetStartedButton, TradesAdTop, TradesAdMiddle, TradesAdBottom } from './TradesLayout';
import { TRADES, VALID_TRADE_SLUGS, getTradeHubContent } from './tradesContent';

/** Optional trade prop when rendered by pathname (bypasses Route params). */
export default function TradeHubPage({ trade: tradeProp }) {
  const params = useParams();
  const trade = tradeProp ?? params.trade;
  if (!trade || !VALID_TRADE_SLUGS.includes(trade)) {
    return <Navigate to="/trades" replace />;
  }
  const content = getTradeHubContent(trade);
  if (!content) return <Navigate to="/trades" replace />;

  const config = TRADES[trade];
  const breadcrumb = (
    <span className="text-slate-900 font-medium text-sm">{config.name}</span>
  );

  return (
    <TradesLayout breadcrumb={breadcrumb}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
          {content.h1}
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          {content.intro}
        </p>
        <div className="my-8">
          <GetStartedButton />
        </div>
      </div>

      <TradesAdTop />

      <section className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Choose Your Year
          </h2>
          {content.chooseYearIntro && (
            <p className="text-slate-600 mb-6 leading-relaxed">
              {content.chooseYearIntro}
            </p>
          )}
          <ul className="space-y-3">
            {config.years.map((y) => (
              <li key={y}>
                <Link
                  to={`/trades/${trade}/year-${y}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {config.name} Year {y}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TradesAdMiddle />

      <TradesAdBottom />
    </TradesLayout>
  );
}
