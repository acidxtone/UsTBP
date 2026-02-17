/**
 * Local storage for anonymous progress, bookmarks, quiz results.
 * All keys prefixed with tradebench_ for easy cleanup.
 */

const PREFIX = 'tradebench_';
const PROGRESS_KEY = `${PREFIX}progress`;

function defaultProgressForYear(year) {
  return {
    id: `local_${year}`,
    year: year,
    total_questions_answered: 0,
    total_correct: 0,
    quizzes_completed: 0,
    full_exams_completed: 0,
    section_stats: {},
    bookmarked_questions: [],
    weak_questions: [],
    best_score: 0,
    study_streak_days: 0,
    last_study_date: null
  };
}

class LocalStorageManager {
  constructor() {
    this.prefix = PREFIX;
  }

  _key(name) {
    return `${this.prefix}${name}`;
  }

  save(key, data) {
    try {
      localStorage.setItem(this._key(key), JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorageManager save error:', e);
    }
  }

  load(key) {
    try {
      const raw = localStorage.getItem(this._key(key));
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('LocalStorageManager load error:', e);
      return null;
    }
  }

  loadProgressForYear(year) {
    const all = this.load('progress');
    if (!all || typeof all !== 'object') return defaultProgressForYear(year);
    const y = year != null ? Number(year) : null;
    if (y == null || Number.isNaN(y)) return null;
    const data = all[String(y)] || all[y];
    return data ? { ...defaultProgressForYear(y), ...data } : defaultProgressForYear(y);
  }

  saveProgressForYear(year, data) {
    const y = year != null ? Number(year) : null;
    if (y == null || Number.isNaN(y)) return;
    const all = this.load('progress') || {};
    all[String(y)] = { ...data, year: y };
    this.save('progress', all);
  }

  loadAllProgress() {
    const all = this.load('progress');
    if (!all || typeof all !== 'object') return [];
    return Object.entries(all).map(([y, data]) => ({
      ...defaultProgressForYear(Number(y)),
      ...data,
      year: Number(y)
    }));
  }

  saveBookmarks(bookmarks) {
    this.save('bookmarks', Array.isArray(bookmarks) ? bookmarks : []);
  }

  loadBookmarks() {
    const b = this.load('bookmarks');
    return Array.isArray(b) ? b : [];
  }

  clear() {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.prefix)) localStorage.removeItem(key);
      });
    } catch (e) {
      console.error('LocalStorageManager clear error:', e);
    }
  }
}

export default new LocalStorageManager();
