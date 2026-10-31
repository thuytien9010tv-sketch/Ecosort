import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, Theme } from '../types';
import { X, Sun, Moon, Bell, Globe, User, LogOut, Check, Sparkles, Edit3 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    setTheme,
    notificationsEnabled,
    toggleNotifications,
    sendNotificationAlert,
    profile,
    updateProfileName,
    switchAccount,
    t,
  } = useApp();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profile.name);

  if (!isOpen) return null;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文 (简体)', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileName(newName);
    setIsEditingName(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <h3 className="font-black text-gray-900 dark:text-white text-base">
              {t('settingsTitle')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Account Info & Switch */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-2xl shadow-sm">
                {profile.avatar}
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {t('loginAs')}
                </span>
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-1.5 mt-0.5">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-2 py-0.5 text-xs bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2 py-0.5 text-xs bg-emerald-600 text-white font-bold rounded-lg"
                    >
                      OK
                    </button>
                  </form>
                ) : (
                  <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span>{profile.name}</span>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-emerald-500 p-0.5 cursor-pointer"
                      title={t('editProfileName')}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </h4>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                {profile.points} XP
              </span>
              <span className="text-[10px] text-gray-500">Lv.{profile.level}</span>
            </div>
          </div>

          {/* Quick Account Switch Presets */}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-600 space-y-1.5">
            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block">
              {t('accountSwitch')}:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => switchAccount('default')}
                className="p-2 rounded-xl text-center bg-white dark:bg-gray-800 hover:border-emerald-500 border border-gray-200 dark:border-gray-600 text-[11px] font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                🌱 Chiến binh
              </button>
              <button
                onClick={() => switchAccount('family')}
                className="p-2 rounded-xl text-center bg-white dark:bg-gray-800 hover:border-emerald-500 border border-gray-200 dark:border-gray-600 text-[11px] font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                🏡 Gia đình
              </button>
              <button
                onClick={() => switchAccount('guest')}
                className="p-2 rounded-xl text-center bg-white dark:bg-gray-800 hover:border-emerald-500 border border-gray-200 dark:border-gray-600 text-[11px] font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                🍃 Khách
              </button>
            </div>
          </div>
        </div>

        {/* Language Selection (Tiếng Việt, Tiếng Anh, Tiếng Trung, Tiếng Hàn) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span>{t('languageSetting')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                  language === l.code
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span>
                  {l.flag} {l.name}
                </span>
                {language === l.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Mode Toggle (Sáng và Tối) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{t('themeSetting')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border cursor-pointer ${
                theme === 'light'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{t('themeLight')}</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border cursor-pointer ${
                theme === 'dark'
                  ? 'border-emerald-500 bg-gray-700 text-white'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>{t('themeDark')}</span>
            </button>
          </div>
        </div>

        {/* Notifications (Thông báo nhắc nhở phân loại rác) */}
        <div className="space-y-2.5 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="text-xs font-bold text-gray-900 dark:text-white block">
                  {t('notificationSetting')}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {notificationsEnabled ? t('notificationEnabled') : t('notificationDisabled')}
                </span>
              </div>
            </div>

            <button
              onClick={toggleNotifications}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationsEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => sendNotificationAlert()}
            className="w-full py-2 px-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{t('sendTestNotification')}</span>
          </button>
        </div>

        {/* Logout button */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => {
              switchAccount('guest');
              onClose();
            }}
            className="w-full py-2.5 rounded-2xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('logoutBtn')} (Trở về Khách)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
