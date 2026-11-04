import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, Theme } from '../types';
import {
  X,
  Sun,
  Moon,
  Bell,
  Globe,
  User,
  LogOut,
  Check,
  Sparkles,
  Edit3,
  LogIn,
  Cloud,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

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
    authModal,
    authUser,
    logout,
    syncWithCloud,
    isSyncing,
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
      <div className="bg-white dark:bg-[#101b17] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-emerald-800/70 space-y-5 max-h-[90vh] overflow-y-auto text-gray-800 dark:text-emerald-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-emerald-900/50 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-950 dark:bg-emerald-900/50 dark:text-emerald-300 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <h3 className="font-black text-gray-900 dark:text-emerald-100 text-base">
              {t('settingsTitle')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:text-emerald-400 dark:hover:text-emerald-200 text-sm font-bold p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MEMBER ACCOUNT SECTION */}
        <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-[#162721] border border-emerald-200 dark:border-emerald-800/60 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
              Tài khoản thành viên
            </h4>
          </div>

          {user ? (
            <div className="space-y-2 pt-1 border-t border-emerald-200/70 dark:border-emerald-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                    ✓ Đã đồng bộ trực tuyến
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await logout();
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs text-emerald-950 dark:text-emerald-200/90 font-medium leading-relaxed">
                Đăng nhập bằng Supabase để lưu điểm tích lũy và đồng bộ giữa các thiết bị.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    openAuthModal('login');
                  }}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    openAuthModal('signup');
                  }}
                  className="py-2 px-3 bg-white hover:bg-gray-100 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-100 border border-gray-300 dark:border-emerald-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Đăng ký</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Account Info & Switch */}
        <div className="p-4 rounded-2xl bg-gray-50/90 dark:bg-[#162721] border border-gray-200/80 dark:border-emerald-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-gray-900 dark:bg-[#0c1613] dark:text-emerald-100 border border-gray-200 dark:border-emerald-800/80 flex items-center justify-center text-2xl shadow-sm">
                {profile.avatar}
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-emerald-400 uppercase tracking-wider">
                  {t('loginAs')}
                </span>
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-1.5 mt-0.5">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-2 py-0.5 text-xs bg-white text-gray-900 dark:bg-[#0c1613] dark:text-emerald-100 border border-gray-300 dark:border-emerald-700 rounded-lg"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2 py-0.5 text-xs bg-emerald-600 text-white font-bold rounded-lg cursor-pointer"
                    >
                      OK
                  </form>
                ) : (
                  <h4 className="text-sm font-black text-gray-900 dark:text-emerald-100 flex items-center gap-1.5">
                    <span>{profile.name}</span>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-200 p-0.5 cursor-pointer"
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
              <span className="text-[10px] text-gray-500 dark:text-emerald-300/80 font-bold">Lv.{profile.level}</span>
            </div>
          </div>

          {/* Supabase Account Status */}
          {authUser ? (
            <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('authCloudSynced')}</span>
                </span>
                <button
                  onClick={syncWithCloud}
                  disabled={isSyncing}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? t('authSyncing') : t('authCloudSync')}</span>
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t('authConnectedAs')} <strong className="font-semibold">{authUser.email}</strong>
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 space-y-2 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t('authLoginToSync')}
              </p>
              <button
                onClick={() => {
                  onClose();
                  authModal.open('login');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('authLogin')} / {t('authRegister')}</span>
              </button>
            </div>
          )}

          {/* Quick Account Switch Presets */}
          <div className="pt-2 border-t border-gray-200/80 dark:border-emerald-800/60 space-y-1.5">
            <span className="text-[11px] font-bold text-gray-500 dark:text-emerald-400 block">
              {t('accountSwitch')}:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => switchAccount('default')}
                className="p-2 rounded-xl text-center bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-gray-200 dark:border-emerald-700/80 text-[11px] font-bold cursor-pointer transition-colors shadow-sm"
              >
                🌱 {t('userEcoWarrior')}
              </button>
              <button
                onClick={() => switchAccount('family')}
                className="p-2 rounded-xl text-center bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-gray-200 dark:border-emerald-700/80 text-[11px] font-bold cursor-pointer transition-colors shadow-sm"
              >
                🏡 {t('userFamily')}
              </button>
              <button
                onClick={() => switchAccount('guest')}
                className="p-2 rounded-xl text-center bg-white hover:bg-emerald-50 text-gray-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-gray-200 dark:border-emerald-700/80 text-[11px] font-bold cursor-pointer transition-colors shadow-sm"
                🍃 {t('userGuest')}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-emerald-300 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('languageSetting')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                  language === l.code
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950 dark:bg-emerald-900/60 dark:text-emerald-200 font-black'
                    : 'border-gray-200 dark:border-emerald-800/70 text-gray-700 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-[#162721]'
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

        {/* Theme Mode Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-emerald-300 flex items-center gap-1.5">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{t('themeSetting')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border cursor-pointer ${
                theme === 'light'
                  ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black'
                  : 'border-gray-200 dark:border-emerald-800/70 text-gray-500 dark:text-emerald-300/80 hover:bg-gray-50 dark:hover:bg-[#162721]'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{t('themeLight')}</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border cursor-pointer ${
                theme === 'dark'
                  ? 'border-emerald-500 bg-[#1d312a] text-emerald-200 font-black'
                  : 'border-gray-200 dark:border-emerald-800/70 text-gray-500 dark:text-emerald-300/80 hover:bg-gray-50 dark:hover:bg-[#162721]'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>{t('themeDark')}</span>
            </button>
          </div>
        </div>

        {/* Notifications & Email Reminders */}
        <div className="space-y-2.5 p-4 rounded-2xl border border-gray-200/80 dark:border-emerald-800/60 bg-gray-50/90 dark:bg-[#162721]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-gray-900 dark:text-emerald-100 block">
                  {t('notificationSetting')}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-emerald-300/80">
                  {notificationsEnabled ? t('notificationEnabled') : t('notificationDisabled')}
                </span>
              </div>
            </div>

            <button
              onClick={toggleNotifications}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationsEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-700'
              }`}
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => sendNotificationAlert()}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 dark:bg-[#1d312a] dark:hover:bg-[#253d34] dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/80 text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{t('sendTestNotification')}</span>
          </button>
        </div>

          {/* Resend Email Reminder Input in Settings Modal */}
          <div className="pt-2 border-t border-gray-200/80 dark:border-emerald-800/60 space-y-1.5">
            <span className="text-[10px] font-black text-emerald-950 dark:text-emerald-300 uppercase flex items-center gap-1">
              <Mail className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{t('resendEmailReminder')}</span>
            </span>
            <div className="flex gap-1.5">
              <input
                type="email"
                value={reminderEmail || user?.email || ''}
                onChange={(e) => setReminderEmail(e.target.value)}
                placeholder={t('enterReminderEmail')}
                className="flex-1 px-3 py-1.5 text-xs bg-white text-gray-900 dark:bg-[#0c1613] dark:text-emerald-100 border border-gray-300 dark:border-emerald-800 rounded-xl placeholder-gray-400 dark:placeholder-emerald-600/70 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => sendEmailReminder()}
                disabled={isSendingEmailReminder}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
              >
                {isSendingEmailReminder ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Send className="w-3 h-3" />
                )}
                <span>{isSendingEmailReminder ? t('sendingEmail') : 'Gửi'}</span>
              </button>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-emerald-300/70 leading-tight">
              {t('emailReminderNote')}
            </p>
          </div>
        </div>

        {/* Logout button (Chỉ hiển thị khi đã đăng nhập) */}
        {user && (
          <div className="pt-2 border-t border-gray-200/80 dark:border-emerald-900/50">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="w-full py-2.5 rounded-2xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logoutBtn')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
