/**
 * Trade configuration. Welder (W) has years 1–3; all others have 1–4.
 * Country is fixed to CA for now (no country selection in UI).
 */

export const TRADES = [
  { code: 'SF', label: 'Steamfitter / Pipefitter' },
  { code: 'E', label: 'Electrician' },
  { code: 'M', label: 'Millwright / Industrial Mechanic' },
  { code: 'W', label: 'Welder' },
];

export const DEFAULT_TRADE = 'SF';
export const DEFAULT_COUNTRY = 'CA';

export function getYearsForTrade(tradeCode) {
  return tradeCode === 'W' ? [1, 2, 3] : [1, 2, 3, 4];
}

export function getTradeLabel(code) {
  return TRADES.find((t) => t.code === code)?.label || code || 'Steamfitter / Pipefitter';
}

/** Value stored in the questions table (trade column). Matches your CSV/DB. */
export function getTradeDbValue(code) {
  const map = {
    SF: 'steamfitter_pipefitter',
    E: 'electrician',
    M: 'millwright',
    W: 'welder',
  };
  return map[code] || code || 'steamfitter_pipefitter';
}

/**
 * Section mappings for each trade and year
 * Format: section number -> { name, target_percentage, color }
 */
export const SECTION_MAPPINGS = {
  SF: {
    1: {
      1: { name: "WORKPLACE SAFETY AND RIGGING", target: 10, color: "blue" },
      2: { name: "TOOLS, EQUIPMENT AND MATERIALS", target: 38, color: "purple" },
      3: { name: "METAL FABRICATION", target: 19, color: "orange" },
      4: { name: "DRAWINGS AND SPECIFICATIONS", target: 13, color: "teal" },
      5: { name: "CALCULATIONS AND SCIENCE", target: 20, color: "pink" }
    },
    2: {
      1: { name: "HEATING SYSTEMS", target: 13, color: "blue" },
      2: { name: "HYDRONIC HEATING", target: 16, color: "purple" },
      3: { name: "RIGGING EQUIPMENT AND HOISTING COMMUNICATION", target: 23, color: "orange" },
      4: { name: "SPECIALITY PIPING", target: 10, color: "teal" },
      5: { name: "DRAWINGS, LAYOUT AND ELEVATION", target: 22, color: "pink" },
      6: { name: "GASFITTING FUNDAMENTALS", target: 16, color: "green" }
    },
    3: {
      1: { name: "LOW PRESSURE STEAM AND CONDENSATE SYSTEMS", target: 22, color: "blue" },
      2: { name: "INSTRUMENTATION & TRADE TECHNOLOGIES", target: 15, color: "purple" },
      3: { name: "WELDING PROCESSES", target: 25, color: "orange" },
      4: { name: "HOIST PLANNING AND CRANES", target: 12, color: "teal" },
      5: { name: "DIAGRAMS AND MITRE ELBOW", target: 26, color: "pink" }
    },
    4: {
      1: { name: "HIGH PRESSURE STEAM AND CONDENSATE SYSTEMS", target: 19, color: "blue" },
      2: { name: "PROCESS PIPING SYSTEMS", target: 15, color: "purple" },
      3: { name: "JOB PLANNING AND CRITICAL LIFTS", target: 28, color: "orange" },
      4: { name: "REVISED DRAWINGS AND PROJECTS", target: 38, color: "teal" }
    }
  },
  W: {
    1: {
      1: { name: "WORKPLACE SAFETY AND TOOLS", target: 19, color: "blue" },
      2: { name: "WELDING TECHNOLOGY AND PROPERTIES OF METALS", target: 20, color: "purple" },
      3: { name: "GMAW, FCAW, MCAW AND SAW", target: 49, color: "orange" },
      4: { name: "TRADE MATH", target: 12, color: "teal" }
    },
    2: {
      1: { name: "SMAW ONE", target: 37, color: "blue" },
      2: { name: "GTAW ONE", target: 18, color: "purple" },
      3: { name: "PATTERN DEVELOPMENT AND ESTIMATING", target: 18, color: "orange" },
      4: { name: "SMAW TWO", target: 27, color: "teal" }
    },
    3: {
      1: { name: "SMAW THREE", target: 30, color: "blue" },
      2: { name: "WELDS ON MILD STEEL PLATE AND PIPE", target: 43, color: "purple" },
      3: { name: "DRAWING INTERPRETATION", target: 17, color: "orange" },
      4: { name: "TRADE SCIENCE", target: 10, color: "teal" }
    }
  },
  E: {
    1: {
      1: { name: "SKILLS, RESP AND TOOLS, EQUIPMENTS", target: 13, color: "blue" },
      2: { name: "CODES AND STANDARDS", target: 19, color: "purple" },
      3: { name: "ELE THEORY, CIRC, ELECTRONICS", target: 31, color: "orange" },
      4: { name: "ELECTRICAL SYSTEMS", target: 37, color: "teal" }
    },
    2: {
      1: { name: "SKILLS, RESP & CODES, STANDARD", target: 19, color: "blue" },
      2: { name: "ELE THEORY, CIRC, ELECTRONICS", target: 45, color: "purple" },
      3: { name: "ELECTRICAL SYSTEMS", target: 36, color: "orange" }
    },
    3: {
      1: { name: "TOOLS, EQUIPMENT, CODES AND STANDARDS", target: 16, color: "blue" },
      2: { name: "ELECTICAL THEORY, CIRCUITS, ELECTRONICS", target: 27, color: "purple" },
      3: { name: "ELECTRICAL SYSTEMS", target: 57, color: "orange" }
    },
    4: {
      1: { name: "FOUNDATIONAL SKILLS, JOB RESPONSIBILITIES, AND PROCEDURES", target: 9, color: "blue" },
      2: { name: "CODES AND STANDARDS", target: 31, color: "purple" },
      3: { name: "ELECTRICAL THEORY, CIRCUIT FUNDAMENTALS, AND ELECTRONICS", target: 22, color: "orange" },
      4: { name: "ELECTRICAL SYSTEMS", target: 38, color: "teal" }
    }
  },
  M: {
    1: {
      1: { name: "LEGISLATION, COMMUNICATION", target: 13, color: "blue" },
      2: { name: "TOOLS AND FASTENERS", target: 17, color: "purple" },
      3: { name: "MEASUREMENTS, DRAWINGS & LAYOUT", target: 22, color: "orange" },
      4: { name: "MACHINING", target: 38, color: "teal" },
      5: { name: "MACHINE INSTALLATION & ALIGN", target: 10, color: "pink" }
    },
    2: {
      1: { name: "BEARINGS AND LUBRICATION", target: 18, color: "blue" },
      2: { name: "CUT, WELD, METALLURG, QUALITY ASS", target: 16, color: "purple" },
      3: { name: "PWR TRANSMISSION & CROSS DIAL", target: 36, color: "orange" },
      4: { name: "PROCESS PUMP, MECH SEALS, COMPRESSORS", target: 30, color: "teal" }
    },
    3: {
      1: { name: "COMPRESSORS", target: 38, color: "blue" },
      2: { name: "FLUID POWER", target: 37, color: "purple" },
      3: { name: "FANS, HEAT EXCHANGERS, INDUSTRIAL REFRIGERATION, AND DRYERS", target: 13, color: "orange" },
      4: { name: "LEVELLING, ALIGNMENT AND PIPE STRAIN", target: 12, color: "teal" }
    },
    4: {
      1: { name: "STATIONARY ENGINES", target: 19, color: "blue" },
      2: { name: "TURBINES AND GOVERNORS", target: 20, color: "purple" },
      3: { name: "PROCESS PIPING SYSTEMS", target: 11, color: "orange" },
      4: { name: "CONDITION MONITORING, BALANCING AND ADVANCED ALIGNMENT", target: 17, color: "teal" },
      5: { name: "MECHANICAL SYSTEMS WITH ELECTRICAL CONTROLS", target: 13, color: "pink" },
      6: { name: "MATERIAL HANDLING AND CAREER DEVELOPMENT", target: 20, color: "green" }
    }
  }
};

/**
 * Get section info for a specific trade and year
 */
export function getSectionInfo(tradeCode, year, sectionNumber) {
  const tradeSections = SECTION_MAPPINGS[tradeCode];
  if (!tradeSections) return null;

  const yearSections = tradeSections[year];
  if (!yearSections) return null;

  return yearSections[sectionNumber] || null;
}

/**
 * Get all sections for a specific trade and year
 */
export function getSectionsForTradeYear(tradeCode, year) {
  const tradeSections = SECTION_MAPPINGS[tradeCode];
  if (!tradeSections) return {};

  const y = year != null ? Number(year) : null;
  if (y == null || Number.isNaN(y)) return {};

  const yearSections = tradeSections[y];
  if (!yearSections) return {};

  return yearSections;
}

/**
 * Get section color based on section number
 */
export function getSectionColor(sectionNumber) {
  const colors = ["blue", "purple", "orange", "teal", "pink", "green", "indigo", "red"];
  return colors[(sectionNumber - 1) % colors.length];
}
