import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { USER_RANKS } from '../data/wasteDatabase';
import {
  Award,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Check,
  ChevronRight,
  ShieldCheck,
  Flame,
  LogIn,
} from 'lucide-react';
import { BinColor } from '../types';

interface ProfileAndHistoryProps {
  onOpenSettings: () => void;
}

export const ProfileAndHistory: React.FC<ProfileAndHistoryProps> = ({ onOpenSettings }) => {
  const {
    profile,
    currentRank,
    nextRank,
    pointsToNextRank,
    progressPercent,
    clearHistory,
    language,
    user,
    logout,
    openAuthModal,
    t,
  } = useApp();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getBinBadgeClass = (bin: BinColor) => {
    switch (bin) {
      case 'green':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'yellow':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'red':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      case 'black-orange':
        return 'bg-stone-800 text-amber-300 dark:bg-black dark:text-amber-400';
    }
  };

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* User Hero Achievement Card */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center text-9xl select-none pointer-events-none">
          {currentRank.badge}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl shadow-lg border border-white/30">
              {profile.avatar}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black">{profile.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  {profile.dailyStreak} {t('streakDaysLabel')}
                </span>
              </div>
              <p className="text-sm text-emerald-100 font-semibold flex items-center gap-1.5">
                <span>{currentRank.badge}</span>
                <span>Level {currentRank.level}: {currentRank.title[language] || currentRank.title.vi}</span>
              </p>
              <p className="text-xs text-emerald-200/80 max-w-sm">
                {currentRank.description[language] || currentRank.description.vi}
              </p>
            </div>
          </div>

          {/* Points badge & settings trigger */}
          <div className="flex flex-col sm:items-end gap-2">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center sm:text-right">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200 block">
                {t('totalPoints')}
              </span>
              <span className="text-3xl font-black text-yellow-300">
                {profile.points} <span className="text-sm font-semibold text-white">{t('greenPointsLabel')}</span>
              </span>
            </div>
            <button
              onClick={onOpenSettings}
              className="py-1.5 px-4 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors text-white cursor-pointer self-start sm:self-auto"
            >
              ⚙️ {t('settingsTitle')}
            </button>
          </div>
        </div>

        {/* Progress Bar towards Next Level */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-100">
              {nextRank ? (
                <>
                  {t('nextLevelAt')} Level {nextRank.level} ({nextRank.title[language] || nextRank.title.vi}):
                </>
              ) : (
                <>{t('maxLevelReached')}</>
              )}
            </span>
            <span className="text-yellow-300">
              {nextRank ? `${t('pointsNeededLead')} ${pointsToNextRank} ${t('pointsMoreLead')}` : t('maxLevel500Badge')}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cloud Sync Card */}
      {user ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-gray-900 dark:text-white">
                  Tài khoản thành viên
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Trực tuyến
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Email: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user.email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={logout}
              className="py-2 px-3.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-emerald-900/20 rounded-3xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-600/25 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white">
                Đăng nhập để đồng bộ dữ liệu
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Lưu điểm số, lịch sử phân loại và thứ hạng an toàn trên đám mây.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openAuthModal('login')}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md shadow-emerald-600/20 cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập</span>
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="py-2.5 px-3.5 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              Đăng ký
            </button>
          </div>
        </div>
      )}

      {/* 11 Ranks Progression Roadmap (Exact as described in prompt) */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
              {t('rankOverviewTitle')}
            </h4>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            +5 {t('greenPointsLabel')} / {t('sortTimesCount')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {USER_RANKS.map((rank) => {
            const isCurrent = currentRank.level === rank.level;
            const isUnlocked = profile.points >= rank.minPoints;

            return (
              <div
                key={rank.level}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : isUnlocked
                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/40'
                    : 'border-dashed border-gray-200 dark:border-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isUnlocked
                        ? 'bg-white dark:bg-gray-800 shadow-sm'
                        : 'bg-gray-200 dark:bg-gray-700 grayscale'
                    }`}
                  >
                    {rank.badge}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-gray-900 dark:text-white">
                        Lv.{rank.level} {rank.title[language] || rank.title.vi}
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white">
                          {t('currentRankBadge')}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {rank.minPoints} {t('greenPointsLabel')}
                    </span>
                  </div>
                </div>

                {isUnlocked ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-xs text-gray-400 font-bold shrink-0">🔒</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sorting History */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
              {t('historyTitle')} ({profile.history.length})
            </h4>
          </div>

          {profile.history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('clearHistoryBtn')}</span>
            </button>
          )}
        </div>

        {profile.history.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            {t('emptyHistory')}
          </div>
        ) : (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {profile.history.map((record) => (
              <div
                key={record.id}
                className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-900 dark:text-white">
                      {record.itemName}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${getBinBadgeClass(
                        record.binColor
                      )}`}
                    >
                      {t(`category_${record.category}`)}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {formatTimestamp(record.timestamp)}
                  </span>
                </div>

                <div className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-black text-xs shrink-0">
                  +{record.pointsEarned} {t('greenPointsLabel')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto" />
            <h4 className="font-black text-gray-900 dark:text-white text-base">
              {t('clearHistoryBtn')}?
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t('confirmClearHistory')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {t('cancelBtn')}
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-md"
              >
                {t('clearHistoryBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
