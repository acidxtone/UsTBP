/**
 * Reports Core Web Vitals (LCP, CLS, INP/FID) to gtag for analytics.
 * Renders nothing; mount once at app root.
 */
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    const send = (name, value) => {
      try {
        window.gtag('event', name, {
          event_category: 'Web Vitals',
          value: Math.round(value),
        });
      } catch (_) {}
    };

    const onLCP = (list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) send('LCP', last.startTime);
    };

    let clsValue = 0;
    const onCLS = (list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) clsValue += entry.value;
      }
      send('CLS', clsValue * 1000);
    };

    const onFID = (list) => {
      const entry = list.getEntries()[0];
      if (entry) send('FID', entry.processingStart - entry.startTime);
    };

    const lcpObserver = new PerformanceObserver(onLCP);
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    const clsObserver = new PerformanceObserver(onCLS);
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    const fidObserver = new PerformanceObserver(onFID);
    fidObserver.observe({ entryTypes: ['first-input'] });

    return () => {
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  return null;
}
