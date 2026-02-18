/**
 * Dynamic section configuration derived from study guides data.
 * Used so each trade/year shows the correct sections from the CSV/DB instead of hardcoded Steamfitter Year 1.
 */

import { getTradeDbValue } from './trade-config.js';

const SECTION_COLORS = ['blue', 'purple', 'orange', 'teal', 'pink', 'green', 'indigo', 'red'];

function getSectionColor(sectionIndex) {
  const idx = typeof sectionIndex === 'number' ? sectionIndex - 1 : 0;
  return SECTION_COLORS[Math.max(0, idx) % SECTION_COLORS.length];
}

/**
 * Get sections for a specific trade and year from study guides array.
 * Returns array of { section, name, target, color } for display and filtering.
 */
export function getSectionsForTradeYear(studyGuides, trade, year) {
  if (!Array.isArray(studyGuides) || studyGuides.length === 0) return [];
  const tradeDb = getTradeDbValue(trade);
  const yearNum = year != null ? Number(year) : null;
  if (yearNum == null || Number.isNaN(yearNum)) return [];

  const filtered = studyGuides.filter(
    (guide) => guide.trade === tradeDb && guide.year === yearNum
  );

  // Sort by section (numeric or string)
  filtered.sort((a, b) => {
    const sa = a.section;
    const sb = b.section;
    const na = typeof sa === 'number' ? sa : parseInt(sa, 10);
    const nb = typeof sb === 'number' ? sb : parseInt(sb, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return String(sa).localeCompare(String(sb));
  });

  // Unique sections by section value, with display name
  const seen = new Set();
  return filtered
    .filter((guide) => {
      const key = guide.section;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((guide, index) => {
      const name =
        guide.section_name ||
        guide.section_text ||
        (guide.title && guide.title !== guide.section ? guide.title : null) ||
        `Section ${guide.section}`;
      return {
        section: guide.section,
        name: name,
        title: guide.title || name,
        target: 70,
        color: getSectionColor(index + 1),
        content: guide.content,
        reference: guide.reference,
        topics: guide.topics,
      };
    });
}

/**
 * Get list of section values for filter dropdown/buttons: ['all', section1, section2, ...]
 */
export function getAvailableSections(studyGuides, trade, year) {
  const sections = getSectionsForTradeYear(studyGuides, trade, year);
  return ['all', ...sections.map((s) => s.section)];
}

/**
 * Get section display name for a given section value (for filter button labels).
 */
export function getSectionDisplayName(studyGuides, trade, year, sectionValue) {
  if (sectionValue === 'all') return 'All Sections';
  const sections = getSectionsForTradeYear(studyGuides, trade, year);
  const found = sections.find((s) => s.section === sectionValue || String(s.section) === String(sectionValue));
  return found ? found.name : `Section ${sectionValue}`;
}
