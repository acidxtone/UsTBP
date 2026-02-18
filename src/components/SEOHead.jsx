import React, { useEffect } from 'react';

const BASE_URL = 'https://www.tradebenchprep.org';

/**
 * Sets document title, meta description, and canonical link for SEO.
 * Call from pages that need unique meta (e.g. trade/year dashboard routes).
 */
export default function SEOHead({ title, description, canonicalPath }) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
    if (canonicalPath) {
      const url = canonicalPath.startsWith('http') ? canonicalPath : `${BASE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }

    return () => {
      if (prevTitle) document.title = prevTitle;
      if (prevDesc) {
        const m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute('content', prevDesc);
      }
      if (prevCanonical) {
        const l = document.querySelector('link[rel="canonical"]');
        if (l) l.setAttribute('href', prevCanonical);
      }
    };
  }, [title, description, canonicalPath]);

  return null;
}
