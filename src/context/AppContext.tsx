import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, Theme, UserProfile, WasteItem, UserRank, ClassificationRecord } from '../types';
import { USER_RANKS } from '../data/wasteDatabase';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';
import type { User, Session } from '@supabase/supabase-js';
import {
  getSupabaseClient,
  getSession,
  signOut as supabaseSignOut,
  isSupabaseConfigured as checkSupabaseConfigured,
} from '../lib/supabase';
import {
  fetchCloudProfile,
  fetchCloudHistory,
  saveCloudProfile,
  insertCloudClassification,
  clearCloudHistory,
} from '../lib/supabaseSync';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  profile: UserProfile;
  currentRank: UserRank;
  nextRank: UserRank | null;
  pointsToNextRank: number;
  progressPercent: number;
  addClassification: (item: WasteItem) => void;
  clearHistory: () => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  sendNotificationAlert: (customMsg?: string) => void;
  switchAccount: (accountType: 'default' | 'guest' | 'family') => void;
  updateProfileName: (name: string) => void;
  t: (key: string) => string;
  levelUpModal: { show: boolean; rank: UserRank | null; close: () => void };
  toastMessage: string | null;
  closeToast: () => void;

  // Supabase Auth Extensions
  user: User | null;
  session: Session | null;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  logout: () => Promise<void>;
  refreshAuthSession: () => Promise<void>;
  isSupabaseReady: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PRESET_ACCOUNTS: Record<string, Partial<UserProfile>> = {
  default: {
    id: 'user-default',
    name: 'Chiến Binh Xanh',
    avatar: '🌱',
    points: 0,
    dailyStreak: 1,
  },
  guest: {
    id: 'user-guest',
    name: 'Khách Tham Quan',
    avatar: '🍃',
    points: 0,
    dailyStreak: 1,
  },
  family: {
    id: 'user-family',
    name: 'Gia Đình Sống Xanh',
    avatar: '🏡',
    points: 0,
    dailyStreak: 1,
  },
};

export const getRankForPoints = (points: number): UserRank => {
  // Sort descending by minPoints
  const sorted = [...USER_RANKS].sort((a, b) => b.minPoints - a.minPoints);
  for (const rank of sorted) {
    if (points >= rank.minPoints) {
      return rank;
    }
  }
  return USER_RANKS[0];
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ecosort_lang') as Language) || 'vi';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('ecosort_theme') as Theme) || 'light';
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('ecosort_notif');
    return saved !== null ? saved === 'true' : true;
  });

  // Supabase Auth State
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isSupabaseReady, setIsSupabaseReady] = useState<boolean>(() => checkSupabaseConfigured());

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ecosort_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Lọc bỏ mọi lịch sử giả lập demo cũ (nếu có)
        const cleanHistory = Array.isArray(parsed.history)
          ? parsed.history.filter((h: any) => h && h.id && !h.id.startsWith('demo-'))
          : [];
        // Nếu điểm trước đó do demo (lịch sử rỗng mà có điểm mặc định 10 hoặc 85) thì điểm là 0
        const cleanPoints = cleanHistory.length === 0 ? 0 : (typeof parsed.points === 'number' ? parsed.points : 0);
        return {
          ...parsed,
          points: cleanPoints,
          level: getRankForPoints(cleanPoints).level,
          history: cleanHistory,
        };
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }
    return {
      id: 'user-default',
      name: 'Chiến Binh Xanh',
      avatar: '🌱',
      points: 0,
      level: 0,
      history: [],
      dailyStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
  });

  const [levelUpData, setLevelUpData] = useState<{ show: boolean; rank: UserRank | null }>({
    show: false,
    rank: null,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Supabase Auth Session
  const refreshAuthSession = useCallback(async () => {
    const ready = checkSupabaseConfigured();
    setIsSupabaseReady(ready);
    if (!ready) {
      setUser(null);
      setSession(null);
      return;
    }
    try {
      const sess = await getSession();
      setSession(sess);
      setUser(sess?.user || null);
      if (sess?.user) {
        setProfile((prev) => ({
          ...prev,
          id: sess.user.id,
          email: sess.user.email,
          name:
            sess.user.user_metadata?.full_name ||
            sess.user.email?.split('@')[0] ||
            prev.name,
        }));
      }
    } catch (err) {
      console.warn('Error refreshing Supabase session:', err);
    }
  }, []);

  useEffect(() => {
    refreshAuthSession();

    const client = getSupabaseClient();
    if (!client) return;

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      if (newSession?.user) {
        const u = newSession.user;
        const initialName =
          u.user_metadata?.full_name ||
          u.email?.split('@')[0] ||
          'Chiến Binh Xanh';

        setProfile((prev) => ({
          ...prev,
          id: u.id,
          email: u.email,
          name: initialName,
        }));

        // Tự động đồng bộ hồ sơ và lịch sử từ Supabase Database (nếu đã tạo bảng)
        fetchCloudProfile(u.id).then((cloudProfile) => {
          fetchCloudHistory(u.id).then((cloudHistory) => {
            setProfile((prev) => ({
              ...prev,
              id: u.id,
              email: u.email,
              name: cloudProfile?.name || prev.name || initialName,
              avatar: cloudProfile?.avatar || prev.avatar,
              points: cloudProfile?.points ?? prev.points,
              level: cloudProfile?.level ?? prev.level,
              dailyStreak: cloudProfile?.dailyStreak ?? prev.dailyStreak,
              lastActiveDate: cloudProfile?.lastActiveDate || prev.lastActiveDate,
              history: cloudHistory && cloudHistory.length > 0 ? cloudHistory : prev.history,
            }));
          });
        });
      } else {
        // When session is cleared or signed out
        setProfile((prev) => ({
          ...prev,
          id: 'user-default',
          email: undefined,
          name: 'Chiến Binh Xanh',
        }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshAuthSession]);

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    try {
      await supabaseSignOut();
    } catch (err) {
      console.warn('Error during logout:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile((prev) => {
        const resetProfile: UserProfile = {
          ...prev,
          id: 'user-default',
          email: undefined,
          name: 'Chiến Binh Xanh',
        };
        try {
          localStorage.setItem('ecosort_profile', JSON.stringify(resetProfile));
        } catch {
          // ignore
        }
        return resetProfile;
      });
      setToastMessage('Đã đăng xuất tài khoản thành công!');
    }
  };

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('ecosort_theme', theme);
  }, [theme]);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('ecosort_profile', JSON.stringify(profile));
  }, [profile]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ecosort_lang', lang);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('ecosort_notif', String(next));
      if (next) {
        setToastMessage(t('notificationReminderMsg'));
      }
      return next;
    });
  };

  const sendNotificationAlert = (customMsg?: string) => {
    setToastMessage(customMsg || t('notificationReminderMsg'));
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const currentRank = getRankForPoints(profile.points);
  const nextRank = USER_RANKS.find((r) => r.level === currentRank.level + 1) || null;
  const pointsToNextRank = nextRank ? Math.max(0, nextRank.minPoints - profile.points) : 0;

  // Calculate progress percent to next rank
  let progressPercent = 100;
  if (nextRank) {
    const currentMin = currentRank.minPoints;
    const nextMin = nextRank.minPoints;
    const totalSpan = nextMin - currentMin;
    const currentSpan = profile.points - currentMin;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentSpan / totalSpan) * 100)));
  }

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const addClassification = (item: WasteItem) => {
    const pointsGained = 5;
    const newPoints = profile.points + pointsGained;
    const oldRank = getRankForPoints(profile.points);
    const newRank = getRankForPoints(newPoints);

    const newRecord: ClassificationRecord = {
      id: 'rec-' + Date.now(),
      itemId: item.id,
      itemName: item.name[language] || item.name.vi,
      category: item.category,
      binColor: item.binColor,
      pointsEarned: pointsGained,
      timestamp: Date.now(),
    };

    setProfile((prev) => ({
      ...prev,
      points: newPoints,
      level: newRank.level,
      history: [newRecord, ...prev.history],
      lastActiveDate: new Date().toISOString().split('T')[0],
    }));

    if (user) {
      insertCloudClassification(user.id, newRecord);
      saveCloudProfile(user.id, {
        points: newPoints,
        level: newRank.level,
        lastActiveDate: new Date().toISOString().split('T')[0],
      });
    }

    if (newRank.level > oldRank.level) {
      triggerConfetti();
      setLevelUpData({ show: true, rank: newRank });
    } else {
      setToastMessage(`${t('sortActionSuccess')}`);
    }
  };

  const clearHistory = () => {
    setProfile((prev) => ({
      ...prev,
      history: [],
    }));
    if (user) {
      clearCloudHistory(user.id);
    }
  };

  const switchAccount = async (accountType: 'default' | 'guest' | 'family') => {
    if (user) {
      try {
        await supabaseSignOut();
      } catch (e) {
        console.warn('supabaseSignOut error:', e);
      }
      setUser(null);
      setSession(null);
    }

    const preset = PRESET_ACCOUNTS[accountType];
    const initialPoints = preset.points || 0;
    const rank = getRankForPoints(initialPoints);
    const newProfile: UserProfile = {
      id: preset.id || 'user-' + Date.now(),
      name: preset.name || 'Người dùng',
      avatar: preset.avatar || '🌱',
      points: initialPoints,
      level: rank.level,
      history: [],
      dailyStreak: preset.dailyStreak || 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    setProfile(newProfile);
    try {
      localStorage.setItem('ecosort_profile', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
    setToastMessage(`Đã chuyển sang tài khoản: ${newProfile.name}`);
  };

  const updateProfileName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setProfile((prev) => ({ ...prev, name: trimmed }));
    if (user) {
      saveCloudProfile(user.id, { name: trimmed });
    }
    setToastMessage('Đã cập nhật tên tài khoản!');
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.vi[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        setTheme,
        profile,
        currentRank,
        nextRank,
        pointsToNextRank,
        progressPercent,
        addClassification,
        clearHistory,
        notificationsEnabled,
        toggleNotifications,
        sendNotificationAlert,
        switchAccount,
        updateProfileName,
        t,
        levelUpModal: {
          show: levelUpData.show,
          rank: levelUpData.rank,
          close: () => setLevelUpData({ show: false, rank: null }),
        },
        toastMessage,
        closeToast,

        // Auth
        user,
        session,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        logout,
        refreshAuthSession,
        isSupabaseReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
