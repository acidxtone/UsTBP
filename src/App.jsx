import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import SEO from '@/components/SEO'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from '@/lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { AdProvider, SideAd, StickyHeaderAd, StickyFooterAd } from '@/components/ads/AdProvider';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { initPeriodicCleanup } from '@/lib/SessionCleanup';
import Dashboard from '@/pages/Dashboard';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import YearHeader from '@/components/YearHeader';
// Import all pages directly
import Study from '@/pages/Study';
import Quiz from '@/pages/Quiz';
import QuizSetup from '@/pages/QuizSetup';
import Settings from '@/pages/Settings';
import Curriculum from '@/pages/Curriculum';
import YearSelection from '@/pages/YearSelection';
import TradeSelection from '@/pages/TradeSelection';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import DebugQuestions from '@/components/DebugQuestions';
import SimpleDebug from '@/components/SimpleDebug';
import ConnectionTest from '@/components/ConnectionTest';
import TradesHub from '@/pages/trades/TradesHub';
import TradeHubPage from '@/pages/trades/TradeHubPage';
import TradeYearPage from '@/pages/trades/TradeYearPage';
import { VALID_TRADE_SLUGS } from '@/pages/trades/tradesContent';

const PAGES_WITHOUT_YEAR_HEADER = ['YearSelection', 'TradeSelection', 'Privacy', 'Terms', 'debug', 'test', 'connection'];

/** Routes where global ads are allowed (content-rich pages per AdSense policy).
 * Excluded: /Dashboard, /Study, /Quiz — they have loading/redirect states that trigger
 * "ads without publisher-content"; they use in-page ads when content is present. */
const ROUTES_WITH_ADS = ['/', '/QuizSetup', '/Curriculum', '/Settings', '/Privacy', '/Terms'];
const TRADES_ROUTE_PREFIX = '/trades';

const LayoutWrapper = ({ children, currentPageName }) => {
  const showYearHeader = !PAGES_WITHOUT_YEAR_HEADER.includes(currentPageName);
  return (
    <>
      {showYearHeader && <YearHeader />}
      {children}
    </>
  );
};

/**
 * Renders /trades/* by reading pathname directly so we never depend on Route
 * matching (which can fail on direct load/refresh). Everything else goes to
 * AuthenticatedApp via Routes.
 */
function TradesOrRest() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/'; // normalize trailing slash

  if (path === '/trades') {
    return <TradesHub />;
  }
  const yearMatch = path.match(/^\/trades\/([^/]+)\/year-(\d+)$/);
  if (yearMatch) {
    const [, trade, yearStr] = yearMatch;
    if (VALID_TRADE_SLUGS.includes(trade)) {
      return <TradeYearPage trade={trade} year={yearStr} />;
    }
  }
  const tradeMatch = path.match(/^\/trades\/([^/]+)$/);
  if (tradeMatch) {
    const [, trade] = tradeMatch;
    if (VALID_TRADE_SLUGS.includes(trade)) {
      return <TradeHubPage trade={trade} />;
    }
  }

  return (
    <Routes>
      <Route path="*" element={<AuthenticatedApp />} />
    </Routes>
  );
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/" replace />} />
      {/* Root always shows landing; Get Started sends users to TradeSelection */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/Dashboard" element={
        <LayoutWrapper currentPageName="Dashboard">
          <Dashboard />
        </LayoutWrapper>
      } />
      {/* Add explicit routes for all pages */}
      <Route path="/Study" element={
        <LayoutWrapper currentPageName="Study">
          <Study />
        </LayoutWrapper>
      } />
      <Route path="/Quiz" element={
        <LayoutWrapper currentPageName="Quiz">
          <Quiz key={location.search || 'default'} />
        </LayoutWrapper>
      } />
      <Route path="/QuizSetup" element={
        <LayoutWrapper currentPageName="QuizSetup">
          <QuizSetup />
        </LayoutWrapper>
      } />
      <Route path="/Settings" element={
        <LayoutWrapper currentPageName="Settings">
          <Settings />
        </LayoutWrapper>
      } />
      <Route path="/Curriculum" element={
        <LayoutWrapper currentPageName="Curriculum">
          <Curriculum />
        </LayoutWrapper>
      } />
      <Route path="/Privacy" element={
        <LayoutWrapper currentPageName="Privacy">
          <Privacy />
        </LayoutWrapper>
      } />
      <Route path="/Terms" element={
        <LayoutWrapper currentPageName="Terms">
          <Terms />
        </LayoutWrapper>
      } />
      <Route path="/privacy-policy" element={
        <LayoutWrapper currentPageName="Privacy">
          <Privacy />
        </LayoutWrapper>
      } />
      <Route path="/terms-of-service" element={
        <LayoutWrapper currentPageName="Terms">
          <Terms />
        </LayoutWrapper>
      } />
      <Route path="/TradeSelection" element={
        <LayoutWrapper currentPageName="TradeSelection">
          <TradeSelection />
        </LayoutWrapper>
      } />
      <Route path="/YearSelection" element={
        <LayoutWrapper currentPageName="YearSelection">
          <YearSelection />
        </LayoutWrapper>
      } />
      {import.meta.env.DEV && (
        <>
          <Route path="/debug" element={
            <LayoutWrapper currentPageName="debug">
              <DebugQuestions />
            </LayoutWrapper>
          } />
          <Route path="/test" element={
            <LayoutWrapper currentPageName="test">
              <SimpleDebug />
            </LayoutWrapper>
          } />
          <Route path="/connection" element={
            <LayoutWrapper currentPageName="connection">
              <ConnectionTest />
            </LayoutWrapper>
          } />
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

/** Renders global ads only on content-rich routes. Never show during auth loading
 * (spinner-only screen) to avoid AdSense "ads without publisher-content". */
const GlobalAdsWrapper = () => {
  const location = useLocation();
  const { isLoadingAuth } = useAuth();
  const isTrades = location.pathname.startsWith(TRADES_ROUTE_PREFIX);
  const showAds =
    (ROUTES_WITH_ADS.includes(location.pathname) || isTrades) &&
    (isTrades || !isLoadingAuth);
  if (!showAds) return null;
  return (
    <>
      <SideAd position="left" />
      <SideAd position="right" />
      <StickyHeaderAd />
    </>
  );
};

const StickyFooterAdWrapper = () => {
  const location = useLocation();
  const { isLoadingAuth } = useAuth();
  const isTrades = location.pathname.startsWith(TRADES_ROUTE_PREFIX);
  const showAds =
    (ROUTES_WITH_ADS.includes(location.pathname) || isTrades) &&
    (isTrades || !isLoadingAuth);
  if (!showAds) return null;
  return <StickyFooterAd />;
};

function App() {
  useEffect(() => {
    initPeriodicCleanup();
  }, []);

  return (
    <HelmetProvider>
      <AdProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <SEO />
              <NavigationTracker />
              <GlobalAdsWrapper />
            <div className="pt-12 md:pt-16 lg:mx-32 min-h-screen">
              <TradesOrRest />
            </div>
            <StickyFooterAdWrapper />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </AdProvider>
    </HelmetProvider>
  )
}

export default App
