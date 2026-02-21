import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { getTradeLabel } from '@/lib/trade-config';
import { getHubContent, getTradeHubContent, getTradeYearContent } from '@/pages/trades/tradesContent';

const BASE_URL = 'https://www.tradebenchprep.org';

const ROUTES_WITH_DYNAMIC_META = ['/Dashboard', '/Study', '/Quiz', '/QuizSetup', '/Curriculum'];

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
    description: 'Create custom practice tests by trade, section, difficulty, and question count. Prepare for Canadian apprenticeship certification exams.',
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

function getStoredTrade() {
  if (typeof localStorage === 'undefined') return null;
  const t = localStorage.getItem('selected_trade');
  return t != null && t !== '' ? t : null;
}

function getStoredYear() {
  if (typeof localStorage === 'undefined') return null;
  const y = localStorage.getItem('selected_year');
  if (y == null || y === '') return null;
  const n = parseInt(y, 10);
  return Number.isNaN(n) ? null : n;
}

/**
 * Sets per-route title, meta description, canonical URL, and JSON-LD for SEO and indexing.
 * Injects trade + year into meta on content routes when available.
 */
export default function SEO() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const trade = user?.selected_trade || getStoredTrade() || 'SF';
  const year = user?.selected_year != null ? user.selected_year : getStoredYear();
  const hasTradeAndYear = trade && year != null && !Number.isNaN(Number(year));
  let title;
  let description;

  // Static /trades pages: derive meta from content
  if (pathname === '/trades') {
    const hub = getHubContent();
    title = hub.title;
    description = hub.metaDescription;
  } else if (pathname.match(/^\/trades\/[^/]+\/year-\d+$/)) {
    const match = pathname.match(/^\/trades\/([^/]+)\/year-(\d+)$/);
    if (match) {
      const [, tradeSlug, yearStr] = match;
      const yearContent = getTradeYearContent(tradeSlug, parseInt(yearStr, 10));
      if (yearContent) {
        title = yearContent.title;
        description = yearContent.metaDescription;
      }
    }
  } else if (pathname.startsWith('/trades/') && !pathname.includes('/year-')) {
    const tradeSlug = pathname.replace('/trades/', '').split('/')[0];
    const tradeMeta = getTradeHubContent(tradeSlug);
    if (tradeMeta) {
      title = tradeMeta.title;
      description = tradeMeta.metaDescription;
    }
  }

  const baseMeta = ROUTE_META[pathname] || (pathname.startsWith('/trades') ? { title, description } : ROUTE_META['/']);
  if (!title) title = baseMeta.title;
  if (!description) description = baseMeta.description;

  if (ROUTES_WITH_DYNAMIC_META.includes(pathname) && hasTradeAndYear) {
    const tradeLabel = getTradeLabel(trade);
    const yearNum = Number(year);
    if (pathname === '/Dashboard') {
      title = `TradeBenchPrep | ${tradeLabel} Year ${yearNum} Dashboard | Exam Prep & Progress`;
      description = `Your ${tradeLabel} Year ${yearNum} exam prep dashboard. Track progress, take practice tests, and study with targeted materials for Canadian apprenticeship certification.`;
    } else if (pathname === '/Study') {
      title = `TradeBenchPrep | ${tradeLabel} Year ${yearNum} Study Guides & Practice Questions`;
      description = `Study guides and practice questions for ${tradeLabel} Year ${yearNum}. Prepare for Canadian provincial and interprovincial apprenticeship exams with targeted materials.`;
    } else if (pathname === '/Quiz') {
      title = `TradeBenchPrep | ${tradeLabel} Year ${yearNum} Practice Quiz | Take an Exam`;
      description = `Take a ${tradeLabel} Year ${yearNum} practice exam. Timed or untimed quizzes with instant results for Canadian trade certification prep.`;
    } else if (pathname === '/QuizSetup') {
      title = `TradeBenchPrep | Customize Your ${tradeLabel} Year ${yearNum} Practice Test`;
      description = `Create a custom practice test for ${tradeLabel} Year ${yearNum}. Choose sections, difficulty, and question count for certification exam prep.`;
    } else if (pathname === '/Curriculum') {
      title = `TradeBenchPrep | ${tradeLabel} Year ${yearNum} Curriculum & Exam Breakdown`;
      description = `View the ${tradeLabel} Year ${yearNum} exam curriculum and section weighting. Plan your study for Canadian apprenticeship certification.`;
    }
  }

  // HashRouter: canonical uses hash so shares and crawlers get the correct URL
  const canonical = pathname === '/' || pathname === '' ? `${BASE_URL}/` : `${BASE_URL}/#${pathname}`;

  const jsonLd =
    ROUTES_WITH_DYNAMIC_META.includes(pathname) && hasTradeAndYear
      ? {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: title.split('|')[1]?.trim() || title,
          description,
          url: canonical,
          learningResourceType: pathname === '/Quiz' ? 'Quiz' : pathname === '/Study' ? 'Study Guide' : 'Course',
        }
      : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Helmet>
  );
}
