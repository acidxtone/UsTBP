/**
 * Anonymous session manager: creates a temporary session (no login).
 * Session expires after 1 week of inactivity.
 * Uses crypto.randomUUID() for session IDs (no extra dependency).
 */

const STORAGE_KEY = 'tradebench_anonymous_session';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

class AnonymousSession {
  constructor() {
    this.sessionId = null;
    this.userName = null;
    this.createdAt = null;
    this.lastActivity = null;
  }

  /** Initialize or resume session. Call with optional userName when user chooses a name. */
  init(userName = null) {
    if (typeof localStorage === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (Date.now() - (session.lastActivity || session.createdAt) < ONE_WEEK_MS) {
          this.sessionId = session.sessionId;
          this.userName = (userName != null && String(userName).trim() !== '') ? String(userName).trim() : (session.userName ?? session.user_name);
          this.createdAt = session.createdAt;
          this.lastActivity = Date.now();
          this.save();
          return true;
        }
      } catch (_) {
        // invalid stored data
      }
      this.cleanup();
    }

    this.sessionId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    this.userName = (userName && String(userName).trim()) || `User${Math.floor(Math.random() * 10000)}`;
    this.createdAt = Date.now();
    this.lastActivity = Date.now();
    this.save();
    return true;
  }

  save() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sessionId: this.sessionId,
      userName: this.userName,
      createdAt: this.createdAt,
      lastActivity: this.lastActivity
    }));
  }

  updateActivity() {
    this.lastActivity = Date.now();
    this.save();
  }

  updateUserName(name) {
    if (this.sessionId == null) return;
    this.userName = (name != null && String(name).trim() !== '') ? String(name).trim() : this.userName;
    this.lastActivity = Date.now();
    this.save();
  }

  isValid() {
    return !!(
      this.sessionId &&
      (Date.now() - (this.lastActivity || this.createdAt) < ONE_WEEK_MS)
    );
  }

  /** Clear session and all TradeBench progress from localStorage */
  cleanup() {
    if (typeof localStorage === 'undefined') return;
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === STORAGE_KEY || (key && key.startsWith('tradebench_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    // Also clear legacy keys if present
    ['anonymousSession', 'userProgress', 'bookmarkedQuestions', 'quizResults', 'selected_trade', 'selected_year'].forEach(k => {
      try { localStorage.removeItem(k); } catch (_) {}
    });
    this.sessionId = null;
    this.userName = null;
    this.createdAt = null;
    this.lastActivity = null;
  }

  getSessionData() {
    return {
      sessionId: this.sessionId,
      userName: this.userName,
      createdAt: this.createdAt,
      lastActivity: this.lastActivity
    };
  }
}

const instance = new AnonymousSession();
export default instance;
