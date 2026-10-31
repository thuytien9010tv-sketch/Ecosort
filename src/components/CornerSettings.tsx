import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Bell, BellOff, User, Moon, Sun, Globe, LogOut, Check, Edit3, X } from 'lucide-react';
import { Language } from '../types';

interface CornerSettingsProps {
  onOpenFullSettings?: () => void;
}

export const CornerSettings: React.FC<CornerSettingsProps> = () => {
  const {
    profile,
    currentRank,
    notificationsEnabled,
    toggleNotifications,
    sendNotificationAlert,
    theme,
    toggleTheme,
    language,
    setLanguage,
    updateProfileName,
    switchAccount,
    t,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profile.name);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditingName(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      updateProfileName(newName.trim());
      setIsEditingName(false);
    }
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Corner Quick Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-sm transition-all cursor-pointer group active:scale-95"
        title={t('settingsTitle')}
        aria-label={t('settingsTitle')}
      >
        <div className="relative">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-sm shadow-inner">
            {profile.avatar}
          </div>
          {/* Notification indicator dot */}
          <span
            className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${
              notificationsEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
            }`}
          />
        </div>

        <div className="hidden sm:block text-left">
          <span className="text-xs font-bold block max-w-[85px] truncate leading-tight">
            {profile.name}
          </span>
          <span className="text-[10px] text-gray-400 block leading-tight">
            Lv.{profile.level} • {profile.points}đ
          </span>
        </div>

        <Settings className="w-4 h-4 text-gray-500 group-hover:rotate-45 transition-transform" />
      </button>

      {/* Popover Menu in the Corner */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-84 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-slide-up space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <Settings className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                {t('quickSettingsTitle')}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SECTION 1: QUẢN LÝ THÔNG BÁO (BẬT / TẮT THÔNG BÁO) */}
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    notificationsEnabled
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {notificationsEnabled ? (
                    <Bell className="w-4 h-4" />
                  ) : (
                    <BellOff className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                    {t('notificationSetting')}
                  </h5>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {notificationsEnabled ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {t('notificationStatusOn')}
                      </span>
                    ) : (
                      <span className="text-gray-400">{t('notificationStatusOff')}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={toggleNotifications}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  notificationsEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={t('notificationSetting')}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Test notification button */}
            <button
              onClick={() => sendNotificationAlert()}
              className="w-full py-1.5 px-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-gray-200 dark:border-gray-600 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Bell className="w-3 h-3" />
              <span>{t('sendTestNotification')}</span>
            </button>
          </div>

          {/* SECTION 2: QUẢN LÝ TÀI KHOẢN */}
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-lg shadow-sm">
                  {profile.avatar}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {t('currentAccount')}
                  </span>
                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className="flex items-center gap-1 mt-0.5">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-1.5 py-0.5 text-xs bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white max-w-[110px]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-2 py-0.5 text-[10px] bg-emerald-600 text-white font-bold rounded-lg"
                      >
                        {t('saveBtn')}
                      </button>
                    </form>
                  ) : (
                    <h5 className="text-xs font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span className="truncate max-w-[120px]">{profile.name}</span>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-gray-400 hover:text-emerald-500 cursor-pointer"
                        title={t('editProfileName')}
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </h5>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                  {profile.points} XP
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  Lv.{currentRank.level}
                </span>
              </div>
            </div>

            {/* Quick Account Switch Presets */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 block">
                {t('accountSwitch')}
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                <button
                  onClick={() => switchAccount('default')}
                  className="p-1.5 rounded-xl text-center bg-white dark:bg-gray-800 hover:border-emerald-500 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  🌱 {t('userEcoWarrior')}
                </button>
                <button
                  onClick={() => switchAccount('family')}
                  className="p-1.5 rounded-xl text-center bg-white dark:bg-gray-800 hover:border-emerald-500 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  🏡 {t('userFamily')}
                </button>
                <button
                  onClick={() => switchAccount('guest')}
                  className="p-1.5 rounded-xl text-center bg-white dark:bg-gray-800 hover:border-emerald-500 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  🍃 {t('userGuest')}
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: GIAO DIỆN & NGÔN NGỮ NHANH */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Theme Toggle */}
            <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span className="font-bold text-[11px]">
                  {theme === 'dark' ? t('themeDark') : t('themeLight')}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-2 py-0.5 rounded-lg bg-white dark:bg-gray-800 text-[10px] font-bold border border-gray-200 dark:border-gray-600 hover:border-emerald-500 cursor-pointer"
              >
                {t('themeSetting').split(' ')[0] || 'Theme'}
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative group p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-bold text-[11px] uppercase">{language}</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                aria-label={t('languageSetting')}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-gray-400">▼</span>
            </div>
          </div>

          {/* Bottom Logout / Reset */}
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={() => {
                switchAccount('guest');
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('logoutBtn')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
