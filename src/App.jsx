import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from '@/lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { AdProvider, SideAd, StickyHeaderAd, StickyFooterAd } from '@/components/ads/AdProvider';
import React from 'react';
import { Navigate } from 'react-router-dom';
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
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import DebugQuestions from '@/components/DebugQuestions';
import SimpleDebug from '@/components/SimpleDebug';
import ConnectionTest from '@/components/ConnectionTest';

const PAGES_WITHOUT_YEAR_HEADER = ['YearSelection', 'debug', 'test', 'connection'];

const LayoutWrapper = ({ children, currentPageName }) => {
  const showYearHeader = !PAGES_WITHOUT_YEAR_HEADER.includes(currentPageName);
  return (
    <>
      {showYearHeader && <YearHeader />}
      {children}
    </>
  );
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isAuthenticated } = useAuth();

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
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/" element={
        <LayoutWrapper currentPageName="Dashboard">
          <Dashboard />
        </LayoutWrapper>
      } />
      {/* Add explicit Dashboard route for /Dashboard path */}
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
          <Quiz />
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
          <Route path="/connection" element{
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


function App() {

  return (
    <AdProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <NavigationTracker />
            <SideAd position="left" />
            <SideAd position="right" />
            <StickyHeaderAd />
            <div className="lg:mx-32"> {/* Add margin for side ads */}
              <AuthenticatedApp />
            </div>
            <StickyFooterAd />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </AdProvider>
  )
}

export default App
