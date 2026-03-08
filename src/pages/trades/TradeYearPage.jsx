import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import TradesLayout, { TradesAdTop, TradesAdMiddle, TradesAdBottom } from './TradesLayout';
import { TRADES, VALID_TRADE_SLUGS, getTradeYearContent } from './tradesContent';
import { getSectionsForTradeYear } from '@/lib/trade-config';

const TRADE_SLUG_TO_CODE = {
  electrician: 'E',
  millwright: 'M',
  welder: 'W',
  'steamfitter-pipefitter': 'SF',
};

/** Renders paragraph array or single string as paragraphs */
function Paragraphs({ content }) {
  const items = Array.isArray(content) ? content : [content];
  return (
    <>
      {items.map((p, i) => (
        <p key={i} className="text-slate-600 mb-4 leading-relaxed">
          {p}
        </p>
      ))}
    </>
  );
}

/** Optional props when rendered by pathname (bypasses Route params). */
export default function TradeYearPage({ trade: tradeProp, year: yearProp }) {
  const params = useParams();
  const trade = tradeProp ?? params.trade;
  const year = yearProp ?? params.year;
  const yearNum = year ? parseInt(String(year).replace(/^year-/, ''), 10) : null;
  if (!trade || !VALID_TRADE_SLUGS.includes(trade) || !yearNum) {
    return <Navigate to="/trades" replace />;
  }
  const config = TRADES[trade];
  if (!config || !config.years.includes(yearNum)) {
    return <Navigate to={`/trades/${trade}`} replace />;
  }
  const content = getTradeYearContent(trade, yearNum);
  if (!content) return <Navigate to={`/trades/${trade}`} replace />;

  const breadcrumb = (
    <span className="flex items-center gap-2 text-sm">
      <Link to="/trades" className="text-slate-600 hover:text-blue-600">Trades</Link>
      <span className="text-slate-400">/</span>
      <Link to={`/trades/${trade}`} className="text-slate-600 hover:text-blue-600">{config.name}</Link>
      <span className="text-slate-400">/</span>
      <span className="text-slate-900 font-medium">Year {yearNum}</span>
    </span>
  );

  const isNewFormat = Array.isArray(content.needsToKnow);
  const tradeCode = TRADE_SLUG_TO_CODE[trade];
  const sectionInfo = tradeCode ? getSectionsForTradeYear(tradeCode, yearNum) : {};
  const sections = Object.entries(sectionInfo).map(([numStr, info]) => ({
    num: parseInt(numStr, 10),
    name: info?.name || `Section ${numStr}`,
  }));

  return (
    <TradesLayout breadcrumb={breadcrumb}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
          {content.h1}
        </h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          {content.intro}
        </p>

        <section className="py-8 border-t border-slate-100 mt-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Practice Quizzes
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Take a full practice exam or focus on a specific section. Each quiz runs in your browser with no sign-in required.
          </p>
          <div className="space-y-3">
            <Link
              to={`/trades/${trade}/year-${yearNum}/full-exam`}
              className="block p-4 rounded-xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900">Full practice exam</span>
              <span className="text-slate-500 text-sm block mt-1">100 questions, all sections</span>
            </Link>
            {sections.map(({ num, name }) => (
              <Link
                key={num}
                to={`/trades/${trade}/year-${yearNum}/section-${num}`}
                className="block p-4 rounded-xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900">Section {num}: {name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <TradesAdTop />

      {isNewFormat ? (
        <>
          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                {content.needsToKnowHeading}
              </h2>
              <div className="space-y-6">
                {content.needsToKnow.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {content.catchOffGuardHeading && (Array.isArray(content.catchOffGuard) ? content.catchOffGuard.length > 0 : !!content.catchOffGuard) ? (
            <section className="py-8 px-6 border-t border-slate-100">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                  {content.catchOffGuardHeading}
                </h2>
                <Paragraphs content={content.catchOffGuard} />
              </div>
            </section>
          ) : null}

          <TradesAdMiddle />

          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                {content.howToUseHeading}
              </h2>
              <Paragraphs content={content.howToUse} />
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                What&apos;s Covered in {config.name} Year {yearNum}
              </h2>
              <div className="space-y-6">
                {content.whatsCovered.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                How TradeBenchPrep Helps You Pass
              </h2>
              {content.howHelps.map((p, i) => (
                <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          <TradesAdMiddle />

          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                What to Expect on Your Year {yearNum} {config.name} Exam
              </h2>
              {content.whatToExpect.map((p, i) => (
                <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                Tips for Studying {config.name} Year {yearNum}
              </h2>
              {content.tips.map((p, i) => (
                <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          <section className="py-8 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                {content.readyHeading || 'Ready to Start Practicing?'}
              </h2>
              <p className="text-slate-600 leading-relaxed">{content.readyToStart}</p>
            </div>
          </section>
        </>
      )}

      <TradesAdBottom />
    </TradesLayout>
  );
}
