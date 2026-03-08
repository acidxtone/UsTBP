import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import PerformanceMonitor from '@/lib/PerformanceMonitor'
import SEO from '@/components/SEO'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from '@/lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { AdProvider, SideAd, StickyHeaderAd, StickyFooterAd } from '@/components/ads/AdProvider';
import React, { useEffect, lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { initPeriodicCleanup } from '@/lib/SessionCleanup';
import YearHeader from '@/components/YearHeader';
import { VALID_TRADE_SLUGS } from '@/pages/trades/tradesContent';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const Study = lazy(() => import('@/pages/Study'));
const Settings = lazy(() => import('@/pages/Settings'));
const Curriculum = lazy(() => import('@/pages/Curriculum'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const DebugQuestions = lazy(() => import('@/components/DebugQuestions'));
const SimpleDebug = lazy(() => import('@/components/SimpleDebug'));
const ConnectionTest = lazy(() => import('@/components/ConnectionTest'));
const TradesHub = lazy(() => import('@/pages/trades/TradesHub'));
const TradeHubPage = lazy(() => import('@/pages/trades/TradeHubPage'));
const TradeYearPage = lazy(() => import('@/pages/trades/TradeYearPage'));
import StaticQuizPage from '@/pages/trades/StaticQuizPage';

function RouteLoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

const PAGES_WITHOUT_YEAR_HEADER = ['YearSelection', 'TradeSelection', 'Privacy', 'Terms', 'debug', 'test', 'connection'];

/** Routes where global ads are allowed (content-rich pages per AdSense policy).
 * Excluded: /Dashboard, /Study, /Quiz (loading/redirect); /QuizSetup, /Curriculum, /Settings (low word count). */
const ROUTES_WITH_ADS = ['/'];
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
const OLD_APP_PATHS = ['/TradeSelection', '/YearSelection', '/Dashboard', '/Quiz', '/QuizSetup'];

function TradesOrRest() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/'; // normalize trailing slash

  // Old app URLs: always redirect to /trades so they never show the landing page
  if (OLD_APP_PATHS.includes(path)) {
    return <Navigate to="/trades" replace />;
  }

  if (path === '/trades') {
    return <TradesHub />;
  }
  const quizMatch = path.match(/^\/trades\/([^/]+)\/year-(\d+)\/(full-exam|section-\d+)$/);
  if (quizMatch) {
    const [, trade, yearStr, quizType] = quizMatch;
    if (VALID_TRADE_SLUGS.includes(trade)) {
      return <StaticQuizPage trade={trade} year={yearStr} quizType={quizType} />;
    }
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

  // Any other /trades/* (invalid slug, bad year, typo) → hub
  if (path.startsWith('/trades')) {
    return <Navigate to="/trades" replace />;
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
        {/* Old app routes: send to trades hub instead of showing landing page */}
        <Route path="/TradeSelection" element={<Navigate to="/trades" replace />} />
        <Route path="/YearSelection" element={<Navigate to="/trades" replace />} />
        <Route path="/Dashboard" element={<Navigate to="/trades" replace />} />
        <Route path="/Quiz" element={<Navigate to="/trades" replace />} />
        <Route path="/QuizSetup" element={<Navigate to="/trades" replace />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/" element={<LandingPage />} />
      {/* Static quiz is the only path: redirect old app routes to /trades */}
      <Route path="/Dashboard" element={<Navigate to="/trades" replace />} />
      <Route path="/Quiz" element={<Navigate to="/trades" replace />} />
      <Route path="/QuizSetup" element={<Navigate to="/trades" replace />} />
      <Route path="/TradeSelection" element={<Navigate to="/trades" replace />} />
      <Route path="/YearSelection" element={<Navigate to="/trades" replace />} />
      <Route path="/Study" element={
        <LayoutWrapper currentPageName="Study">
          <Study />
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

/** True for any content-rich /trades route: hub, trade hub, year page, or quiz (intro/results; quiz Q&A hides via setQuizMode). */
function isTradesRouteWithAds(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path !== '/trades' && !path.startsWith('/trades/')) return false;
  if (path === '/trades') return true;
  if (/^\/trades\/[^/]+$/.test(path)) return true; // trade hub
  if (/^\/trades\/[^/]+\/year-\d+$/.test(path)) return true; // year page
  if (/^\/trades\/[^/]+\/year-\d+\/(full-exam|section-\d+)$/.test(path)) return true; // quiz URL
  return false;
}

/** Renders global ads only on content-rich routes. Never show during auth loading
 * (spinner-only screen) to avoid AdSense "ads without publisher-content". */
const GlobalAdsWrapper = () => {
  const location = useLocation();
  const { isLoadingAuth } = useAuth();
  const tradesWithAds = isTradesRouteWithAds(location.pathname);
  const showAds =
    (ROUTES_WITH_ADS.includes(location.pathname) || tradesWithAds) &&
    (tradesWithAds || !isLoadingAuth);
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
  const tradesWithAds = isTradesRouteWithAds(location.pathname);
  const showAds =
    (ROUTES_WITH_ADS.includes(location.pathname) || tradesWithAds) &&
    (tradesWithAds || !isLoadingAuth);
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
              <Suspense fallback={<RouteLoadingFallback />}>
                <SEO />
                <NavigationTracker />
                <PerformanceMonitor />
                <GlobalAdsWrapper />
                <div className="pt-12 md:pt-16 lg:mx-32 min-h-screen">
                  <TradesOrRest />
                </div>
                <StickyFooterAdWrapper />
              </Suspense>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </AdProvider>
    </HelmetProvider>
  )
}

export default App
