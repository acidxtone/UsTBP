import React, { useEffect, useState } from 'react';

const PUBLISHER_ID = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-5932083189692902';
const ADSENSE_ENABLED = import.meta.env.VITE_ADSENSE_ENABLED !== 'false';

/**
 * Google AdSense Component
 * Displays Google AdSense ads with proper configuration
 */
const AdSense = ({ 
  slot, 
  className = "", 
  style = {},
  format = "auto",
  fullWidthResponsive = true 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ADSENSE_ENABLED || !PUBLISHER_ID) return;
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!ADSENSE_ENABLED || !PUBLISHER_ID) return null;
  if (!isLoaded) {
    return (
      <div 
        className={`bg-gray-100 border border-gray-200 rounded-lg p-4 animate-pulse ${className}`}
        style={{ minHeight: '250px', ...style }}
      >
        <div className="text-center text-gray-500 text-sm">Loading advertisement...</div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

/**
 * Banner Ad Component
 * For header, footer, and sidebar placements.
 * Create display ad units in AdSense and set slot IDs in AdSense.jsx or via env.
 */
export const BannerAd = ({ position = 'top' }) => {
  const adSlots = {
    top: import.meta.env.VITE_ADSENSE_SLOT_TOP || '0000000000',
    bottom: import.meta.env.VITE_ADSENSE_SLOT_BOTTOM || '0000000000',
    sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '0000000000'
  };
  const slot = adSlots[position] || adSlots.top;

  return (
    <div className={`w-full flex justify-center my-4 ${position === 'sidebar' ? 'my-6' : ''}`}>
      <AdSense 
        slot={slot}
        className="w-full max-w-7xl mx-auto"
        style={{ minHeight: position === 'sidebar' ? '600px' : '90px' }}
      />
    </div>
  );
};

/**
 * In-Content Ad Component
 * For placement within study materials and quiz pages. Pass slot or use position for default slot.
 */
export const InContentAd = ({ slot, position }) => {
  const defaultSlots = { middle: import.meta.env.VITE_ADSENSE_SLOT_INCONTENT || '0000000000' };
  const adSlot = slot || (position && defaultSlots[position]) || defaultSlots.middle;

  return (
    <div className="my-6 flex justify-center">
      <AdSense 
        slot={adSlot}
        className="w-full max-w-2xl"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
};

/**
 * Responsive Ad Component
 * Adapts to different screen sizes
 */
export const ResponsiveAd = ({ slot }) => {
  const adSlot = slot || import.meta.env.VITE_ADSENSE_SLOT_RESPONSIVE || '0000000000';
  return (
    <div className="w-full flex justify-center my-4">
      <AdSense 
        slot={adSlot}
        className="w-full max-w-4xl"
        format="rectangle"
        fullWidthResponsive={true}
      />
    </div>
  );
};

export default AdSense;
