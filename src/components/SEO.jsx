import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://www.tradebenchprep.org';

const ROUTE_META = {
  '/': {
    title: 'TradeBenchPrep | Canadian Skilled Trades Exam Prep | Electrician, Welder, Millwright & Steamfitter Practice Tests',
    description: 'Free Canadian skilled trades exam prep for Electrician, Welder, Millwright & Steamfitter apprentices. Practice quizzes, study guides, and exam simulation.',
  },
  '/Dashboard': {
    title: 'TradeBenchPrep | Trade Exam Prep Dashboard | Apprenticeship Knowledge Practice Progress Study & Tracking',
    description: 'Access your trade exam prep dashboard. Track progress, take apprenticeship practice tests, and study for Electrician, Welder, Millwright & Steamfitter exams.',
  },
  '/Study': {
    title: 'TradeBenchPrep | Trade Study Guides & Practice Questions | Apprenticeship Exam Prep',
    description: 'Study guides and practice questions for Canadian skilled trades exams. Prepare for Electrician, Welder, Millwright & Steamfitter certification.',
  },
  '/QuizSetup': {
    title: 'TradeBenchPrep | Customize Your Trade Practice Test | Apprenticeship Exam Prep',
    description: 'Create custom Red Seal practice tests by trade, section, difficulty, and question count. Prepare for Canadian apprenticeship certification exams.',
  },
  '/Quiz': {
    title: 'TradeBenchPrep | Take a Apprenticeship Practice Exam | Skilled Trades Quiz',
    description: 'Take timed or untimed Apprenticeship practice exams for Electrician, Welder, Millwright & Steamfitter trades. Get instant results and improve your score.',
  },
  '/Settings': {
    title: 'TradeBenchPrep | Account Settings | Trade Exam Prep Preferences',
    description: 'Manage your trade selection, exam year, and practice preferences for Apprenticeship certification exam preparation.',
  },
  '/Curriculum': {
    title: 'TradeBenchPrep | Trade Exam Curriculum & Breakdown | Apprenticeship Exam Knowledge Guide',
    description: 'View the Apprenticeship exam structure and curriculum breakdown for Canadian skilled trades. Prepare smarter with weighted exam sections.',
  },
  '/TradeSelection': {
    title: 'TradeBenchPrep | Choose Your Trade | Electrician, Welder, Millwright, Steamfitter Exam Prep',
    description: 'Select your skilled trade to begin Apprenticeship exam preparation. Practice tests and study guides for Canadian apprentices.',
  },
  '/YearSelection': {
    title: 'TradeBenchPrep | Select Your Apprenticeship Year | Trade Exam Practice',
    description: 'Choose your apprenticeship year to access targeted Apprenticeship practice exams and study materials for your trade.',
  },
  '/Privacy': {
    title: 'TradeBenchPrep | Privacy Policy',
    description: 'Learn how TradeBenchPrep collects, stores, and protects your information while you prepare for Canadian skilled trades exams.',
  },
  '/Terms': {
    title: 'TradeBenchPrep | Terms of Use',
    description: "Read the terms and conditions for using TradeBenchPrep's Apprenticeship exam practice platform.",
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
