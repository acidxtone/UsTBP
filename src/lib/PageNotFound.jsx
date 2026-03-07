import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const TITLE_404 = 'Page Not Found | TradeBenchPrep';
const DESCRIPTION_404 = 'The page you requested could not be found. Return to TradeBenchPrep to browse trades and practice exams.';

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>{TITLE_404}</title>
        <meta name="description" content={DESCRIPTION_404} />
        <meta property="og:title" content={TITLE_404} />
        <meta property="og:description" content={DESCRIPTION_404} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md flex-1 flex flex-col justify-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-amber-100 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-amber-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <p className="text-xl font-semibold text-slate-800 mb-4">Page Not Found</p>
        <p className="text-slate-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button asChild className="bg-slate-900 hover:bg-slate-800">
          <Link to="/trades">
            Return to Trades
          </Link>
        </Button>
      </div>
    </div>
    </>
  );
}
