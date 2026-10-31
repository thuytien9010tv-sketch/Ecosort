import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Sparkles, Check } from 'lucide-react';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, language, t } = useApp();

  if (!levelUpModal.show || !levelUpModal.rank) return null;

  const rank = levelUpModal.rank;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-emerald-400 dark:border-emerald-500 transform animate-bounce-once">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-green-300 flex items-center justify-center text-5xl shadow-lg shadow-emerald-500/40">
          {rank.badge}
        </div>

        <div className="mt-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            {t('congratulations')}
          </div>

          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {t('youReachedLevel')}
          </h3>

          <div className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-green-950/40 border border-emerald-200 dark:border-emerald-800">
            <p className="text-xl font-black text-emerald-700 dark:text-emerald-300">
              Level {rank.level}: {rank.title[language] || rank.title.vi}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {rank.description[language] || rank.description.vi}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>{t('nextLevelAt')} {rank.minPoints} {t('greenPointsLabel')}</span>
          </div>

          <button
            onClick={levelUpModal.close}
            className="w-full mt-4 py-3 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-5 h-5" />
            {t('continueGreenJourney')}
          </button>
        </div>
      </div>
    </div>
  );
};
