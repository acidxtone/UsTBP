import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TradesLayout, { TradesAdTop, TradesAdBottom } from './TradesLayout';
import { getHubContent } from './tradesContent';

export default function TradesHub() {
  const content = getHubContent();

  return (
    <TradesLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
          {content.h1}
        </h1>
        {content.intro.map((p, i) => (
          <p key={i} className="text-lg text-slate-600 mb-4 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <TradesAdTop />

      <section id="choose-trade" className="py-8 px-6 border-t border-slate-100 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-slate-900 text-center mb-6">
            Choose Your Trade
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {content.chooseYourTrade.map((trade) => (
              <Card key={trade.link} className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
                <CardContent className="pt-6 pb-6 px-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{trade.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {trade.description}
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-2">
                    <Link to={trade.link}>Learn more</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-slate-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {content.howItWorks}
          </p>
        </div>
      </section>

      <TradesAdBottom />
    </TradesLayout>
  );
}
