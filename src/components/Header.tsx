import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Bell, Globe, Sparkles, User, Award } from 'lucide-react';
import { Language } from '../types';
import { CornerSettings } from './CornerSettings';

interface HeaderProps {
  onOpenSettings: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onNavigateTab }) => {
  const { language, setLanguage, theme, toggleTheme, profile, currentRank, notificationsEnabled, sendNotificationAlert, t } = useApp();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo and Brand */}
        <div
          onClick={() => onNavigateTab('sort')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
            <span className="text-xl sm:text-2xl">🌱</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                Eco<span className="text-emerald-600 dark:text-emerald-400">Sort</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                Green App
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:block truncate max-w-[200px] md:max-w-xs">
              {t('appTagline')}
            </p>
          </div>
        </div>

        {/* User Rank & XP bar indicator */}
        <div
          onClick={() => onNavigateTab('profile')}
          className="cursor-pointer hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all"
        >
          <div className="text-2xl" title={currentRank.title[language]}>
            {currentRank.badge}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Lv.{currentRank.level} {currentRank.title[language] || currentRank.title.vi}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(5, (profile.points % 50) * 2))}%`,
                  }}
                />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {profile.points} XP
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Points Pill */}
          <button
            onClick={() => onNavigateTab('profile')}
            className="md:hidden flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300"
          >
            <span>{currentRank.badge}</span>
            <span>{profile.points}đ</span>
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 text-xs font-semibold transition-colors"
              title={t('languageSetting')}
            >
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline uppercase">{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-36 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 hidden group-hover:block hover:block z-40">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/40 ${
                    language === l.code
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>
                    {l.flag} {l.label}
                  </span>
                  {language === l.code && <span className="text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Quick Reminder */}
          <button
            onClick={() => sendNotificationAlert()}
            className={`p-2 rounded-xl transition-colors relative ${
              notificationsEnabled
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Nhắc nhở phân loại rác"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {notificationsEnabled && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            )}
          </button>

          {/* Corner Settings Popover (Account & Notifications management) */}
          <CornerSettings onOpenFullSettings={onOpenSettings} />
        </div>
      </div>
    </header>
  );
};
