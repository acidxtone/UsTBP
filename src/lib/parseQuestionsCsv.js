/**
 * Parse questions CSV in the browser and filter by trade/year/section or build full exam.
 * CSV columns: id, year, section, section_name, difficulty, question_text,
 * option_a, option_b, option_c, option_d, correct_answer, explanation, reference, created_at, trade, country
 */

// URL slug -> CSV trade column value
const TRADE_SLUG_TO_CSV = {
  electrician: 'electrician',
  millwright: 'millwright',
  welder: 'welder',
  'steamfitter-pipefitter': 'steamfitter_pipefitter',
};

// Full exam section distribution (target counts out of 100) per trade code and year
const FULL_EXAM_DISTRIBUTION = {
  SF: {
    1: { 1: 10, 2: 38, 3: 19, 4: 13, 5: 20 },
    2: { 1: 13, 2: 16, 3: 23, 4: 10, 5: 22, 6: 16 },
    3: { 1: 22, 2: 15, 3: 25, 4: 12, 5: 26 },
    4: { 1: 19, 2: 15, 3: 28, 4: 38 },
  },
  W: {
    1: { 1: 19, 2: 20, 3: 49, 4: 12 },
    2: { 1: 37, 2: 18, 3: 18, 4: 27 },
    3: { 1: 30, 2: 43, 3: 17, 4: 10 },
  },
  E: {
    1: { 1: 13, 2: 19, 3: 31, 4: 37 },
    2: { 1: 19, 2: 45, 3: 36 },
    3: { 1: 16, 2: 27, 3: 57 },
    4: { 1: 9, 2: 31, 3: 22, 4: 38 },
  },
  M: {
    1: { 1: 13, 2: 17, 3: 22, 4: 38, 5: 10 },
    2: { 1: 18, 2: 16, 3: 36, 4: 30 },
    3: { 1: 38, 2: 37, 3: 13, 4: 12 },
    4: { 1: 19, 2: 20, 3: 11, 4: 17, 5: 13, 6: 20 },
  },
};

const TRADE_SLUG_TO_CODE = {
  electrician: 'E',
  millwright: 'M',
  welder: 'W',
  'steamfitter-pipefitter': 'SF',
};

function parseCSVLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (!inQuotes && c === ',') {
      out.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

/** Split CSV text into rows, respecting quoted fields that contain newlines */
function splitCSVRows(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
      current += c;
    } else if (c === '\n' || c === '\r') {
      if (!inQuotes) {
        if (current.trim()) rows.push(current);
        current = '';
        if (c === '\r' && text[i + 1] === '\n') i++;
      } else {
        current += c;
      }
    } else {
      current += c;
    }
  }
  if (current.trim()) rows.push(current);
  return rows;
}

export function parseCSV(csvText) {
  const raw = (csvText || '').replace(/^\uFEFF/, '');
  const lines = splitCSVRows(raw);
  if (lines.length < 2) return [];
  const header = parseCSVLine(lines[0]).map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    header.forEach((h, j) => {
      row[h] = values[j] !== undefined ? values[j].trim() : '';
    });
    rows.push(row);
  }
  return rows;
}

function rowToQuestion(row) {
  const section = row.section ? parseInt(row.section, 10) : 0;
  return {
    id: row.id,
    year: parseInt(row.year, 10) || 1,
    section: Number.isNaN(section) ? 0 : section,
    section_name: row.section_name || '',
    difficulty: row.difficulty || 'medium',
    question_text: row.question_text || '',
    option_a: row.option_a || '',
    option_b: row.option_b || '',
    option_c: row.option_c || '',
    option_d: row.option_d || '',
    correct_answer: (row.correct_answer || 'A').trim().toUpperCase().slice(0, 1),
    explanation: row.explanation || '',
    reference: row.reference || '',
    trade: row.trade || '',
    country: row.country || '',
  };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Get questions for static quiz from parsed CSV rows.
 * @param {Object[]} rows - Parsed CSV rows (from parseCSV)
 * @param {{ tradeSlug: string, yearNum: number, isFullExam: boolean, sectionNum?: number }} opts
 * @returns {Object[]} Questions in quiz shape
 */
/** Normalize CSV trade value for matching: lowercase, spaces and slashes to underscore */
function normalizeTrade(trade) {
  return (trade || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_');
}

export function getQuestionsFromCSV(rows, { tradeSlug, yearNum, isFullExam, sectionNum }) {
  const csvTrade = TRADE_SLUG_TO_CSV[tradeSlug];
  if (!csvTrade) return [];

  const questions = rows
    .filter((r) => {
      const norm = normalizeTrade(r.trade);
      // Match exact (electrician, welder, steamfitter_pipefitter) or prefix (millwright_...)
      return norm === csvTrade || norm.startsWith(csvTrade + '_');
    })
    .filter((r) => parseInt(r.year, 10) === yearNum)
    .map(rowToQuestion)
    .filter((q) => q.id && q.question_text);

  if (isFullExam) {
    const code = TRADE_SLUG_TO_CODE[tradeSlug];
    const dist = code && FULL_EXAM_DISTRIBUTION[code] && FULL_EXAM_DISTRIBUTION[code][yearNum];
    if (dist && questions.length >= 100) {
      const bySection = {};
      questions.forEach((q) => {
        const s = q.section;
        if (!bySection[s]) bySection[s] = [];
        bySection[s].push(q);
      });
      const picked = [];
      for (const [sec, count] of Object.entries(dist)) {
        const secNum = parseInt(sec, 10);
        const pool = bySection[secNum] ? shuffle(bySection[secNum]) : [];
        picked.push(...pool.slice(0, count));
      }
      return shuffle(picked).slice(0, 100);
    }
    return shuffle(questions).slice(0, 100);
  }

  const sectionQs = questions.filter((q) => q.section === sectionNum);
  return shuffle(sectionQs);
}
