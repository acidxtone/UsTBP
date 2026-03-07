/**
 * Build script: CSV questions → static JSON files per trade/year/section and full-exam.
 * Run: node scripts/csv-to-json.mjs [path-to-questions.csv]
 * Output: public/data/{tradeSlug}/year-{n}/section-{s}.json and full-exam.json
 *
 * CSV columns: id, year, section, section_name, difficulty, question_text,
 * option_a, option_b, option_c, option_d, correct_answer, explanation, reference, created_at, trade, country
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Trade slug (URL) ↔ trade code (trade-config) ↔ CSV trade value
const TRADE_SLUG_TO_CODE = {
  electrician: 'E',
  millwright: 'M',
  welder: 'W',
  'steamfitter-pipefitter': 'SF',
};
const TRADE_CSV_TO_SLUG = {
  electrician: 'electrician',
  millwright: 'millwright',
  welder: 'welder',
  'steamfitter_pipefitter': 'steamfitter-pipefitter',
};

// Full exam section distribution (target counts out of 100) per trade code and year.
// Derived from SECTION_MAPPINGS target percentages; normalized to sum to 100.
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

function parseCSVLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (!inQuotes && (c === ',' || c === '\n' || c === '\r')) {
      if (c === ',') {
        out.push(cur);
        cur = '';
      }
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const header = parseCSVLine(lines[0]);
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

function tradeToSlug(trade) {
  const raw = (trade || '').trim().toLowerCase();
  if (raw.includes('electrician')) return 'electrician';
  if (raw.includes('millwright') || raw.includes('industrial mechanic')) return 'millwright';
  if (raw.includes('welder')) return 'welder';
  if (raw.includes('steamfitter') || raw.includes('pipefitter')) return 'steamfitter-pipefitter';
  const t = raw.replace(/\s+/g, '_');
  return TRADE_CSV_TO_SLUG[t] || t.replace(/_/g, '-');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function main() {
  const csvPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(projectRoot, 'public', 'questions_rows.csv');

  if (!fs.existsSync(csvPath)) {
    console.error('CSV not found:', csvPath);
    console.error('Usage: node scripts/csv-to-json.mjs [path-to-questions.csv]');
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csvContent);
  const questions = rows.map(rowToQuestion).filter((q) => q.id && q.question_text);

  console.log('Parsed', questions.length, 'questions from', csvPath);

  const byTradeYearSection = {};
  const byTradeYear = {};

  for (const q of questions) {
    const slug = tradeToSlug(q.trade);
    if (!slug) continue;
    const y = q.year;
    const s = q.section;
    if (!byTradeYearSection[slug]) byTradeYearSection[slug] = {};
    if (!byTradeYearSection[slug][y]) byTradeYearSection[slug][y] = {};
    if (!byTradeYearSection[slug][y][s]) byTradeYearSection[slug][y][s] = [];
    byTradeYearSection[slug][y][s].push(q);

    if (!byTradeYear[slug]) byTradeYear[slug] = {};
    if (!byTradeYear[slug][y]) byTradeYear[slug][y] = [];
    byTradeYear[slug][y].push(q);
  }

  const dataDir = path.join(projectRoot, 'public', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  let filesWritten = 0;

  for (const [tradeSlug, years] of Object.entries(byTradeYearSection)) {
    const tradeCode = TRADE_SLUG_TO_CODE[tradeSlug];
    const dist = tradeCode && FULL_EXAM_DISTRIBUTION[tradeCode];

    for (const [yearStr, sections] of Object.entries(years)) {
      const yearNum = parseInt(yearStr, 10);
      const dir = path.join(dataDir, tradeSlug, `year-${yearNum}`);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      for (const [sectionStr, sectionQuestions] of Object.entries(sections)) {
        const sectionNum = parseInt(sectionStr, 10);
        const out = shuffle(sectionQuestions);
        const filePath = path.join(dir, `section-${sectionNum}.json`);
        fs.writeFileSync(filePath, JSON.stringify(out, null, 0), 'utf8');
        filesWritten++;
      }

      const allForYear = byTradeYear[tradeSlug][yearNum] || [];
      let fullExamQuestions = [];
      if (dist && dist[yearNum] && allForYear.length >= 100) {
        const targets = dist[yearNum];
        const bySec = {};
        for (const q of allForYear) {
          const s = q.section;
          if (!bySec[s]) bySec[s] = [];
          bySec[s].push(q);
        }
        for (const [sec, count] of Object.entries(targets)) {
          const secNum = parseInt(sec, 10);
          const pool = bySec[secNum] ? shuffle(bySec[secNum]) : [];
          fullExamQuestions.push(...pool.slice(0, count));
        }
        fullExamQuestions = shuffle(fullExamQuestions).slice(0, 100);
      } else {
        fullExamQuestions = shuffle(allForYear).slice(0, 100);
      }
      const fullPath = path.join(dir, 'full-exam.json');
      fs.writeFileSync(fullPath, JSON.stringify(fullExamQuestions, null, 0), 'utf8');
      filesWritten++;
    }
  }

  console.log('Wrote', filesWritten, 'JSON files under public/data');
}

main();
