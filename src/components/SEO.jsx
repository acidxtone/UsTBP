import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://www.tradebenchprep.org';

const ROUTE_META = {
  '/': {
    title: 'Canadian Skilled Trades Exam Prep | Red Seal & Apprenticeship Practice Tests | TradeBenchPrep',
    description: 'Online exam prep platform for Canadian skilled trades. Practice quizzes and mock exams for Red Seal and provincial apprenticeship certification. Built for trades across Canada and expanding internationally.',
  },
  '/Dashboard': {
    title: 'Dashboard | TradeBenchPrep',
    description: 'Your trade exam prep dashboard. Track progress, bookmarks, and weak areas for Red Seal and apprenticeship exams.',
  },
  '/Study': {
    title: 'Study Guides & Practice Questions | TradeBenchPrep',
    description: 'Study guides and practice questions for Canadian skilled trades. Prepare for Red Seal and provincial certification exams.',
  },
  '/QuizSetup': {
    title: 'Quiz Setup | TradeBenchPrep',
    description: 'Choose quiz mode, number of questions, and sections. Practice full exams or focus on weak areas.',
  },
  '/Quiz': {
    title: 'Practice Quiz | TradeBenchPrep',
    description: 'Take a practice quiz for your trade. Timed or untimed, full exam or by section.',
  },
  '/Settings': {
    title: 'Settings | TradeBenchPrep',
    description: 'Manage your TradeBenchPrep account and preferences.',
  },
  '/Curriculum': {
    title: 'Curriculum | TradeBenchPrep',
    description: 'View the trade curriculum and exam breakdown for Canadian skilled trades certification.',
  },
  '/TradeSelection': {
    title: 'Choose Your Trade | TradeBenchPrep',
    description: 'Select your trade to start preparing for Red Seal or provincial apprenticeship exams.',
  },
  '/YearSelection': {
    title: 'Select Exam Year | TradeBenchPrep',
    description: 'Choose the exam year for your trade practice materials.',
  },
  '/Privacy': {
    title: 'Privacy Policy | TradeBenchPrep',
    description: 'TradeBenchPrep privacy policy. How we collect, use, and protect your information.',
  },
  '/Terms': {
    title: 'Terms of Use | TradeBenchPrep',
    description: 'TradeBenchPrep terms of use and service agreement.',
  },
  '/auth': {
    title: 'Sign In | TradeBenchPrep',
    description: 'Sign in to TradeBenchPrep to access your study progress and practice quizzes.',
  },
};

/**
 * Sets per-route title, meta description, and canonical URL for SEO and indexing.
 * Renders inside Router so useLocation() is available.
 */
export default function SEO() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] || ROUTE_META['/'];
  const canonical = `${BASE_URL}${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
}
