import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, UserProfile, WasteItem, UserRank, ClassificationRecord } from '../types';
import { USER_RANKS } from '../data/wasteDatabase';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PRESET_ACCOUNTS: Record<string, Partial<UserProfile>> = {
  default: {
    id: 'user-default',
    name: 'Chiến Binh Xanh',
    avatar: '🌱',
    points: 10,
    dailyStreak: 3,
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
    points: 85,
    dailyStreak: 12,
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

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ecosort_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }
    const initialPoints = 10;
    return {
      id: 'user-default',
      name: 'Chiến Binh Xanh',
      avatar: '🌱',
      points: initialPoints,
      level: getRankForPoints(initialPoints).level,
      history: [
        {
          id: 'demo-1',
          itemId: 'chai-nhua-pet',
          itemName: 'Chai nhựa nước ngọt / nước suối (PET số 1)',
          category: 'recyclable',
          binColor: 'yellow',
          pointsEarned: 5,
          timestamp: Date.now() - 3600000 * 2,
        },
        {
          id: 'demo-2',
          itemId: 'thuc-an-thua',
          itemName: 'Thức ăn thừa, cơm canh, rau củ hỏng',
          category: 'organic',
          binColor: 'green',
          pointsEarned: 5,
          timestamp: Date.now() - 3600000 * 24,
        },
      ],
      dailyStreak: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
  });

  const [levelUpData, setLevelUpData] = useState<{ show: boolean; rank: UserRank | null }>({
    show: false,
    rank: null,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
  };

  const switchAccount = (accountType: 'default' | 'guest' | 'family') => {
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
    setToastMessage(`Đã chuyển sang tài khoản: ${newProfile.name}`);
  };

  const updateProfileName = (name: string) => {
    if (!name.trim()) return;
    setProfile((prev) => ({ ...prev, name: name.trim() }));
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
