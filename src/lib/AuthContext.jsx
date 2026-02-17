import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AnonymousSession from '@/lib/AnonymousSession';

const AuthContext = createContext();

function getStoredTrade() {
  try {
    const t = localStorage.getItem('selected_trade');
    return t != null && t !== '' ? t : null;
  } catch {
    return null;
  }
}

function getStoredYear() {
  try {
    const y = localStorage.getItem('selected_year');
    return y != null && y !== '' ? parseInt(y, 10) : null;
  } catch {
    return null;
  }
}

function buildUserFromSession() {
  const data = AnonymousSession.getSessionData();
  if (!data.sessionId) return null;
  return {
    id: data.sessionId,
    email: 'anonymous@local.session',
    full_name: data.userName,
    selected_trade: getStoredTrade(),
    selected_year: getStoredYear(),
    role: 'user',
    anonymous: true
  };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  const refreshUser = useCallback(() => {
    const ok = AnonymousSession.init();
    if (ok && AnonymousSession.isValid()) {
      setUser(buildUserFromSession());
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setAuthError(null);
    }
  }, []);

  useEffect(() => {
    setIsLoadingAuth(true);
    const ok = AnonymousSession.init();
    if (ok && AnonymousSession.isValid()) {
      setUser(buildUserFromSession());
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setAuthError(null);
    setIsLoadingAuth(false);
  }, []);

  const updateActivity = useCallback(() => {
    AnonymousSession.updateActivity();
  }, []);

  const signIn = async () => {
    setAuthError(null);
    return { success: false, message: 'Sign in is disabled. Use Get Started on the home page.' };
  };

  const signUp = async () => {
    setAuthError(null);
    return { success: false, message: 'Sign up is disabled. Use Get Started on the home page.' };
  };

  const signOut = async () => {
    AnonymousSession.cleanup();
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const updateMe = async (data) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev };
      if (data.selected_trade !== undefined) next.selected_trade = data.selected_trade;
      if (data.selected_year !== undefined) next.selected_year = data.selected_year;
      return next;
    });
    if (data.selected_trade !== undefined) {
      try {
        localStorage.setItem('selected_trade', data.selected_trade || 'SF');
      } catch (_) {}
    }
    if (data.selected_year !== undefined) {
      try {
        if (data.selected_year != null) localStorage.setItem('selected_year', String(data.selected_year));
        else localStorage.removeItem('selected_year');
      } catch (_) {}
    }
    return { success: true };
  };

  const logout = signOut;
  const navigateToLogin = () => {
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError,
      appPublicSettings: { id: 'custom', public_settings: {} },
      anonymousSessionData: AnonymousSession.getSessionData(),
      logout,
      navigateToLogin,
      checkAppState: refreshUser,
      signIn,
      signUp,
      signOut,
      updateMe,
      updateActivity
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
