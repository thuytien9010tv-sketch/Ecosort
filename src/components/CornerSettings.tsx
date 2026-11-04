import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Bell,
  BellOff,
  User,
  Moon,
  Sun,
  Globe,
  LogOut,
  Check,
  Edit3,
  X,
  LogIn,
  Cloud,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
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
    authModal,
    authUser,
    logout,
    openAuthModal,
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
        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white dark:bg-[#14231e] hover:bg-emerald-50 dark:hover:bg-[#1c2f29] border border-gray-200 dark:border-emerald-800/60 text-gray-800 dark:text-emerald-100 shadow-sm transition-all cursor-pointer group active:scale-95"
        title={t('settingsTitle')}
        aria-label={t('settingsTitle')}
      >
        <div className="relative">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 text-emerald-950 dark:bg-[#1d312a] dark:text-emerald-200 flex items-center justify-center text-sm shadow-inner font-bold">
            {profile.avatar}
          </div>
          {/* Notification indicator dot */}
          <span
            className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#14231e] ${
              notificationsEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
            }`}
          />
        </div>

        <div className="hidden sm:block text-left">
          <span className="text-xs font-bold block max-w-[85px] truncate leading-tight text-gray-900 dark:text-emerald-100">
            {profile.name}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-emerald-300/80 block leading-tight font-semibold">
            Lv.{profile.level} • {profile.points}đ
          </span>
        </div>

        <Settings className="w-4 h-4 text-gray-500 dark:text-emerald-400 group-hover:rotate-45 transition-transform" />
      </button>

      {/* Popover Menu in the Corner (Eye-friendly dark theme #101b17 with high-contrast text) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-84 sm:w-92 bg-white dark:bg-[#101b17] rounded-3xl shadow-2xl border border-gray-200 dark:border-emerald-800/70 p-4 z-50 animate-slide-up space-y-3.5 text-gray-800 dark:text-emerald-100 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-emerald-900/50 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-950 dark:bg-emerald-900/50 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Settings className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-emerald-200">
                {t('quickSettingsTitle')}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-700 dark:text-emerald-400 dark:hover:text-emerald-200 p-1 rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SECTION 1: TÀI KHOẢN THÀNH VIÊN (SUPABASE AUTH) */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-[#162721] border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-black text-emerald-950 dark:text-emerald-200">
                Tài khoản thành viên
              </span>
            </div>

            {user ? (
              <div className="space-y-2 pt-1 border-t border-emerald-200/70 dark:border-emerald-800/60">
                <div className="flex items-center justify-between text-xs">
                  <div className="truncate max-w-[190px]">
                    <p className="font-extrabold text-gray-900 dark:text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                      ✓ Đã đồng bộ trực tuyến
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      await logout();
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
                  {authUser.email}
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <p className="text-[11px] text-emerald-950 dark:text-emerald-200/90 font-medium leading-relaxed">
                  Đăng nhập để lưu điểm tích lũy và đồng bộ giữa các thiết bị.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openAuthModal('login');
                    }}
                    className="py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Đăng nhập</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openAuthModal('signup');
                    }}
                    className="py-1.5 px-2 bg-white hover:bg-gray-100 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-100 border border-gray-300 dark:border-emerald-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-sm"
                  >
                    <span>Đăng ký</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: QUẢN LÝ THÔNG BÁO (NHẮC NHỞ & RESEND EMAIL) */}
          <div className="p-3.5 rounded-2xl bg-gray-50/90 dark:bg-[#162721] border border-gray-200/80 dark:border-emerald-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                    notificationsEnabled
                      ? 'bg-emerald-100 text-emerald-950 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {notificationsEnabled ? (
                    <Bell className="w-3.5 h-3.5" />
                  ) : (
                    <BellOff className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-black text-gray-900 dark:text-emerald-100">
                    {t('notificationSetting')}
                  </h5>
                  <p className="text-[11px] text-gray-600 dark:text-emerald-300/80 font-medium">
                    {notificationsEnabled ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                        {t('notificationStatusOn')}
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">{t('notificationStatusOff')}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={toggleNotifications}
                className={`w-11 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  notificationsEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={t('notificationSetting')}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => sendNotificationAlert()}
              className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 text-[11px] font-bold border border-emerald-300 dark:border-emerald-700/80 flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t('sendTestNotification')}</span>
            </button>

            {/* Resend Email Reminder Box */}
            <div className="pt-2 border-t border-gray-200/80 dark:border-emerald-800/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-emerald-950 dark:text-emerald-300 uppercase flex items-center gap-1">
                  <Mail className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('resendEmailReminder')}</span>
                </span>
                {user?.email && (
                  <span className="text-[9px] text-gray-500 dark:text-emerald-400 font-semibold truncate max-w-[130px]" title={user.email}>
                    {user.email}
                  </span>
                )}
              </div>

              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={reminderEmail || user?.email || ''}
                  onChange={(e) => setReminderEmail(e.target.value)}
                  placeholder={t('enterReminderEmail')}
                  className="flex-1 px-2.5 py-1 text-xs bg-white text-gray-900 dark:bg-[#0c1613] dark:text-emerald-100 border border-gray-300 dark:border-emerald-800 rounded-xl placeholder-gray-400 dark:placeholder-emerald-600/70 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => sendEmailReminder()}
                  disabled={isSendingEmailReminder}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
                  title={t('sendEmailReminderBtn')}
                >
                  {isSendingEmailReminder ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  <span>{isSendingEmailReminder ? t('sendingEmail') : 'Gửi'}</span>
                </button>
              </div>
              <p className="text-[10px] text-gray-600 dark:text-emerald-300/70 leading-tight font-medium">
                {t('emailReminderNote')}
              </p>
            </div>
          </div>

          {/* SECTION 3: THÔNG TIN HỒ SƠ & ĐỔI TÊN */}
          <div className="p-3.5 rounded-2xl bg-gray-50/90 dark:bg-[#162721] border border-gray-200/80 dark:border-emerald-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white text-gray-900 dark:bg-[#0c1613] dark:text-emerald-100 border border-gray-200 dark:border-emerald-800/80 flex items-center justify-center text-lg shadow-sm">
                  {profile.avatar}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 dark:text-emerald-400 uppercase tracking-wider">
                    {t('currentAccount')}
                  </span>
                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className="flex items-center gap-1 mt-0.5">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-1.5 py-0.5 text-xs bg-white text-gray-900 dark:bg-[#0c1613] dark:text-emerald-100 border border-gray-300 dark:border-emerald-700 rounded-lg max-w-[120px]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-2 py-0.5 text-[10px] bg-emerald-600 text-white font-bold rounded-lg cursor-pointer"
                      >
                        {t('saveBtn')}
                      </button>
                    </form>
                  ) : (
                    <h5 className="text-xs font-black text-gray-900 dark:text-emerald-100 flex items-center gap-1.5">
                      <span className="truncate max-w-[120px]">{profile.name}</span>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-gray-400 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-200 cursor-pointer"
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
                <span className="text-[10px] text-gray-500 dark:text-emerald-300/80 font-bold">
                  Lv.{profile.level}
                </span>
              </div>
            </div>

            {/* Quick Account Switch Presets */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-500 dark:text-emerald-400 block">
                {t('accountSwitch')}
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                <button
                  onClick={() => switchAccount('default')}
                  className="p-1.5 rounded-xl text-center bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-gray-200 dark:border-emerald-700/80 cursor-pointer transition-colors shadow-sm"
                >
                  🌱 {t('userEcoWarrior')}
                </button>
                <button
                  onClick={() => switchAccount('family')}
                  className="p-1.5 rounded-xl text-center bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-gray-200 dark:border-emerald-700/80 cursor-pointer transition-colors shadow-sm"
                >
                  🏡 {t('userFamily')}
                </button>
                <button
                  onClick={() => switchAccount('guest')}
                  className="p-1.5 rounded-xl text-center bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-gray-200 dark:border-emerald-700/80 cursor-pointer transition-colors shadow-sm"
                >
                  🍃 {t('userGuest')}
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4: GIAO DIỆN & NGÔN NGỮ */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Theme Toggle */}
            <div className="p-2.5 rounded-2xl bg-gray-50/90 dark:bg-[#162721] border border-gray-200/80 dark:border-emerald-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span className="font-bold text-[11px] text-gray-900 dark:text-emerald-100">
                  {theme === 'dark' ? t('themeDark') : t('themeLight')}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 text-[10px] font-black border border-gray-300 dark:border-emerald-700/80 cursor-pointer shadow-sm transition-colors"
              >
                {t('themeSetting').split(' ')[0] || 'Theme'}
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative group p-2.5 rounded-2xl bg-gray-50/90 dark:bg-[#162721] border border-gray-200/80 dark:border-emerald-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-[11px] uppercase text-gray-900 dark:text-emerald-100">{language}</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                aria-label={t('languageSetting')}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-white text-gray-900 dark:bg-[#101b17] dark:text-emerald-100 font-bold">
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-gray-500 dark:text-emerald-400">▼</span>
            </div>
          </div>

          {/* Bottom Logout Button (Chỉ hiển thị khi đã đăng nhập) */}
          {user && (
            <div className="pt-1 border-t border-gray-200/80 dark:border-emerald-900/50">
              <button
                onClick={async () => {
                  await logout();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-2xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('logoutBtn')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
