/**
 * Checks for expired anonymous sessions and cleans up localStorage.
 */

import AnonymousSession from './AnonymousSession';

const CHECK_INTERVAL_MS = 60 * 60 * 1000;

export function checkAndCleanup() {
  if (!AnonymousSession.isValid()) {
    AnonymousSession.cleanup();
    return true;
  }
  return false;
}

export function initPeriodicCleanup() {
  if (typeof window === 'undefined') return;
  setInterval(() => checkAndCleanup(), CHECK_INTERVAL_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) checkAndCleanup();
  });
}

export default { checkAndCleanup, initPeriodicCleanup };
