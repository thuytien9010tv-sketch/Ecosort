import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RECYCLE_IDEAS, COMMON_MISTAKES } from '../data/wasteDatabase';
import { RecycleIdea, CommonMistake } from '../types';
import { Lightbulb, AlertTriangle, CheckCircle, ArrowRight, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const RecycleIdeas: React.FC = () => {
  const { language, t } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'diy' | 'mistakes'>('diy');
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(RECYCLE_IDEAS[0].id);

  const toggleExpand = (id: string) => {
    setExpandedIdeaId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 max-w-md mx-auto">
        <button
          onClick={() => setActiveSubTab('diy')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'diy'
              ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>{t('tabDIY')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mistakes')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'mistakes'
              ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t('tabMistakes')}</span>
        </button>
      </div>

      {/* Subtab 1: DIY Upcycling Ideas */}
      {activeSubTab === 'diy' && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {t('tabDIY')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('diySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECYCLE_IDEAS.map((idea) => {
              const isExpanded = expandedIdeaId === idea.id;
              const steps = idea.steps[language] || idea.steps.vi;

              return (
                <div
                  key={idea.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-44 w-full bg-gray-100 dark:bg-gray-700">
                    <img
                      src={idea.image}
                      alt={idea.title[language] || idea.title.vi}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-black/60 backdrop-blur-md text-white shadow-sm">
                        {t(`material_${idea.material.replace('-', '_')}`)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm">
                        {idea.difficulty === 'easy'
                          ? t('difficultyEasy')
                          : idea.difficulty === 'medium'
                          ? t('difficultyMedium')
                          : t('difficultyHard')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-snug">
                        {idea.title[language] || idea.title.vi}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                        {idea.description[language] || idea.description.vi}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => toggleExpand(idea.id)}
                        className="w-full py-2.5 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>{t('stepsGuide')} ({steps.length} {t('stepsCount')})</span>
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 space-y-2 border border-gray-100 dark:border-gray-600 text-xs">
                          {steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Common Sorting Mistakes */}
      {activeSubTab === 'mistakes' && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t('tabMistakes')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {t('tabMistakes')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('mistakesSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {COMMON_MISTAKES.map((mistake) => (
              <div
                key={mistake.id}
                className="bg-white dark:bg-gray-800 rounded-3xl p-5 sm:p-6 border border-amber-200/70 dark:border-amber-900/40 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      src={mistake.image}
                      alt={mistake.item[language] || mistake.item.vi}
                      className="w-12 h-12 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                        {t('commonMistakeBadge')}
                      </span>
                      <h4 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                        {mistake.item[language] || mistake.item.vi}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200">
                      ✕ {mistake.wrongBin[language] || mistake.wrongBin.vi}
                    </span>
                    <span className="text-gray-400 font-bold">➔</span>
                    <span className="px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200">
                      ✓ {mistake.correctBin[language] || mistake.correctBin.vi}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-1">
                    <span className="font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {t('reasonLabel')}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {mistake.reason[language] || mistake.reason.vi}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-1">
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t('solutionLabel')}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {mistake.solution[language] || mistake.solution.vi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
