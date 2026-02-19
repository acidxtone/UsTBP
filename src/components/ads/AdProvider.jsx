import React, { createContext, useContext, useState, useEffect } from 'react';
import AdSenseAd from './AdSenseAd';

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [headerAdClosed, setHeaderAdClosed] = useState(false);
  const [footerAdClosed, setFooterAdClosed] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedHeaderAdClosed = localStorage.getItem('headerAdClosed');
    const savedFooterAdClosed = localStorage.getItem('footerAdClosed');
    const savedAdsEnabled = localStorage.getItem('adsEnabled');

    if (savedHeaderAdClosed === 'true') setHeaderAdClosed(true);
    if (savedFooterAdClosed === 'true') setFooterAdClosed(true);
    if (savedAdsEnabled === 'false') setAdsEnabled(false);
  }, []);

  const closeHeaderAd = () => {
    setHeaderAdClosed(true);
    localStorage.setItem('headerAdClosed', 'true');
  };

  const closeFooterAd = () => {
    setFooterAdClosed(true);
    localStorage.setItem('footerAdClosed', 'true');
  };

  const toggleAds = () => {
    const newState = !adsEnabled;
    setAdsEnabled(newState);
    localStorage.setItem('adsEnabled', newState.toString());
  };

  const setQuizMode = (enabled) => {
    setIsQuizMode(enabled);
  };

  const value = {
    adsEnabled,
    headerAdClosed,
    footerAdClosed,
    isQuizMode,
    closeHeaderAd,
    closeFooterAd,
    toggleAds,
    setQuizMode,
  };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};

// Side Ad Component (Left and Right)
export const SideAd = ({ position = 'left' }) => {
  const { adsEnabled, isQuizMode } = useAds();

  if (!adsEnabled || isQuizMode) {
    return null;
  }

  const positionClasses = position === 'left' 
    ? 'fixed left-0 top-0 h-full w-32' 
    : 'fixed right-0 top-0 h-full w-32';

  const slot = import.meta.env.VITE_ADSENSE_SLOT_SIDE || '0000000000';
  if (slot === '0000000000') return null;
  return (
    <div className={`${positionClasses} bg-gray-50 border-r border-gray-200 z-30 hidden lg:block`}>
      <div className="h-full flex items-center justify-center p-4">
        <AdSenseAd
          slot={slot}
          format="vertical"
          width={120}
          height={600}
          className="w-full"
          style={{ minHeight: '600px' }}
        />
      </div>
    </div>
  );
};

// Fixed Top Ad – fixed to viewport top (does not follow scroll)
export const StickyHeaderAd = () => {
  const { adsEnabled, headerAdClosed, closeHeaderAd, isQuizMode } = useAds();
  const isMobile = useIsMobile();

  const headerSlot = import.meta.env.VITE_ADSENSE_SLOT_HEADER || '0000000000';
  if (!adsEnabled || headerAdClosed || isQuizMode || headerSlot === '0000000000') return null;

  const height = isMobile ? 40 : 60;
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="relative">
        <button
          onClick={closeHeaderAd}
          className="absolute top-1 right-1 md:top-2 md:right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close ad"
        >
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <AdSenseAd
          slot={headerSlot}
          format="horizontal"
          height={height}
          className="w-full"
          style={{ maxHeight: `${height}px` }}
        />
      </div>
    </div>
  );
};

// Fixed Bottom Ad – fixed to viewport bottom (does not follow scroll)
export const StickyFooterAd = () => {
  const { adsEnabled, footerAdClosed, closeFooterAd, isQuizMode } = useAds();
  const isMobile = useIsMobile();

  const footerSlot = import.meta.env.VITE_ADSENSE_SLOT_FOOTER || '0000000000';
  if (!adsEnabled || footerAdClosed || isQuizMode || footerSlot === '0000000000') return null;

  const height = isMobile ? 50 : 90;
  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="relative">
        <button
          onClick={closeFooterAd}
          className="absolute top-1 right-1 md:top-2 md:right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close ad"
        >
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <AdSenseAd
          slot={footerSlot}
          format="horizontal"
          height={height}
          className="w-full"
          style={{ maxHeight: `${height}px` }}
        />
      </div>
    </div>
    {/* Spacer so content isn't hidden behind sticky footer – smaller on mobile */}
    <div className="h-12 md:h-20" />
    </>
  );
};

// In-content Ad for between sections
export const InContentAd = ({ slot, className = "" }) => {
  const { adsEnabled, isQuizMode } = useAds();
  const adSlot = slot || import.meta.env.VITE_ADSENSE_SLOT_INCONTENT || '0000000000';

  if (!adsEnabled || isQuizMode || adSlot === '0000000000') return null;

  return (
    <div className={`my-6 ${className}`}>
      <AdSenseAd
        slot={adSlot}
        format="rectangle"
        width={300}
        height={250}
        className="mx-auto"
      />
    </div>
  );
};
