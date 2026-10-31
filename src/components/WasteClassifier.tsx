import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WASTE_ITEMS } from '../data/wasteDatabase';
import { MaterialType, WasteItem, BinColor } from '../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Search, 
  Trash2, 
  ChevronRight,
} from 'lucide-react';

interface WasteClassifierProps {
  onNavigateTab: (tab: string) => void;
}

export const WasteClassifier: React.FC<WasteClassifierProps> = ({ onNavigateTab }) => {
  const { language, addClassification, profile, currentRank, t } = useApp();

  // Wizard States: 'home' | 'select-material' | 'select-item' | 'result' | 'success'
  const [step, setStep] = useState<'home' | 'select-material' | 'select-item' | 'result' | 'success'>('home');
  const [chosenMaterial, setChosenMaterial] = useState<MaterialType | null>(null);
  const [chosenItem, setChosenItem] = useState<WasteItem | null>(null);
  const [searchItemTerm, setSearchItemTerm] = useState('');

  const materialTypesList: {
    type: MaterialType;
    icon: string;
    bgClass: string;
  }[] = [
    { type: 'nhua', icon: '🥤', bgClass: 'hover:border-amber-400 bg-amber-50/50 dark:bg-amber-950/20' },
    { type: 'giay', icon: '📦', bgClass: 'hover:border-amber-400 bg-amber-50/50 dark:bg-amber-950/20' },
    { type: 'nilon', icon: '🛍️', bgClass: 'hover:border-rose-400 bg-rose-50/50 dark:bg-rose-950/20' },
    { type: 'thuy-tinh', icon: '🍾', bgClass: 'hover:border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20' },
    { type: 'kim-loai', icon: '🥫', bgClass: 'hover:border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20' },
    { type: 'pin', icon: '🔋', bgClass: 'hover:border-orange-500 bg-orange-50/50 dark:bg-orange-950/20' },
    { type: 'vai', icon: '👕', bgClass: 'hover:border-blue-400 bg-blue-50/50 dark:bg-blue-950/20' },
    { type: 'thuc-an', icon: '🥗', bgClass: 'hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' },
    { type: 'dien-tu', icon: '💻', bgClass: 'hover:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20' },
    { type: 'hoa-chat', icon: '☣️', bgClass: 'hover:border-red-500 bg-red-50/50 dark:bg-red-950/20' },
    { type: 'y-te', icon: '😷', bgClass: 'hover:border-rose-500 bg-rose-50/50 dark:bg-rose-950/20' },
    { type: 'cay-co', icon: '🍂', bgClass: 'hover:border-green-500 bg-green-50/50 dark:bg-green-950/20' },
  ];

  const materialOptions = materialTypesList.map((m) => {
    const keyPrefix = m.type.replace('-', '_');
    return {
      type: m.type,
      label: t(`mat_${keyPrefix}`),
      examples: t(`mat_${keyPrefix}_ex`),
      icon: m.icon,
      bgClass: m.bgClass,
    };
  });

  // Filter items based on chosen material
  const itemsUnderMaterial = WASTE_ITEMS.filter((item) => {
    if (!chosenMaterial) return true;
    const matchesMaterial = item.material === chosenMaterial;
    if (!searchItemTerm.trim()) return matchesMaterial;
    const q = searchItemTerm.toLowerCase().trim();
    const name = (item.name[language] || item.name.vi).toLowerCase();
    const prep = (item.preparationGuide[language] || item.preparationGuide.vi).toLowerCase();
    return matchesMaterial && (name.includes(q) || prep.includes(q));
  });

  const handleSelectMaterial = (mat: MaterialType) => {
    setChosenMaterial(mat);
    setSearchItemTerm('');
    setStep('select-item');
  };

  const handleSelectItem = (item: WasteItem) => {
    setChosenItem(item);
    setStep('result');
  };

  const handleConfirmSorted = () => {
    if (!chosenItem) return;
    addClassification(chosenItem);
    setStep('success');
  };

  const getBinMeta = (bin: BinColor) => {
    switch (bin) {
      case 'green':
        return {
          title: t('binColor_green'),
          subtitle: t('binDesc_green'),
          badgeClass: 'bg-emerald-600 text-white',
          borderClass: 'border-emerald-500',
          bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
          icon: '🟢',
          iconSymbol: '🥗',
        };
      case 'yellow':
        return {
          title: t('binColor_yellow'),
          subtitle: t('binDesc_yellow'),
          badgeClass: 'bg-amber-500 text-white',
          borderClass: 'border-amber-500',
          bgClass: 'bg-amber-50 dark:bg-amber-950/40',
          icon: '🟡',
          iconSymbol: '♻️',
        };
      case 'red':
        return {
          title: t('binColor_red'),
          subtitle: t('binDesc_red'),
          badgeClass: 'bg-rose-600 text-white',
          borderClass: 'border-rose-500',
          bgClass: 'bg-rose-50 dark:bg-rose-950/40',
          icon: '🔴',
          iconSymbol: '🗑️',
        };
      case 'black-orange':
        return {
          title: t('binColor_black_orange'),
          subtitle: t('binDesc_black_orange'),
          badgeClass: 'bg-stone-900 text-amber-400 border border-amber-500/40',
          borderClass: 'border-amber-600',
          bgClass: 'bg-stone-900 text-stone-100',
          icon: '⚫🟠',
          iconSymbol: '☣️',
        };
    }
  };

  // ==========================================
  // VIEW 1: TRANG CHỦ MỞ ĐẦU (HOME SCREEN)
  // ==========================================
  if (step === 'home') {
    return (
      <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto">
        {/* Big Hero Card with Main Action Button */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-center sm:text-left">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center text-9xl select-none pointer-events-none">
            ♻️
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{t('realTimeSupportTag')}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
              {t('holdingWasteQuestion')}
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              {t('dontLitterDesc')}
            </p>

            {/* THE BIG PROMINENT BUTTON */}
            <div className="pt-2 sm:pt-4">
              <button
                onClick={() => setStep('select-material')}
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-base sm:text-lg shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
                <span>{t('startSortNowBtn')}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  +5 {t('greenPointsLabel')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* User Mini Progress Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-2xl shrink-0">
              {currentRank.badge}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {t('yourCurrentRank')}
                </span>
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                  Level {currentRank.level} - {currentRank.title[language] || currentRank.title.vi}
                </span>
              </div>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                {t('totalAccumulated')}{' '}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {profile.points} {t('greenPointsLabel')}
                </span>{' '}
                ({profile.history.length} {t('sortTimesCount')})
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('profile')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{t('viewHistoryAndRanks')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Access to 4 Bins & Guides */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-emerald-600" />
              <span>{t('quickBinsMemory')}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('bins')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {t('viewDetailedStandards')}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                title: t('binColor_green'),
                type: t('category_organic'),
                desc: t('binDesc_green'),
                icon: '🟢',
                bg: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
              },
              {
                title: t('binColor_yellow'),
                type: t('category_recyclable'),
                desc: t('binDesc_yellow'),
                icon: '🟡',
                bg: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
              },
              {
                title: t('binColor_red'),
                type: t('category_inorganic'),
                desc: t('binDesc_red'),
                icon: '🔴',
                bg: 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
              },
              {
                title: t('binColor_black_orange'),
                type: t('category_hazardous'),
                desc: t('binDesc_black_orange'),
                icon: '⚫',
                bg: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-amber-400',
              },
            ].map((bin, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateTab('bins')}
                className={`p-3.5 rounded-2xl border border-gray-100 dark:border-gray-700 ${bin.bg} space-y-1 cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{bin.icon}</span>
                  <span className="text-[10px] font-black uppercase">{bin.title}</span>
                </div>
                <h4 className="text-xs font-black">{bin.type}</h4>
                <p className="text-[10px] opacity-80 truncate">{bin.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: BƯỚC 1 - CHỌN CHẤT LIỆU CỦA RÁC
  // ==========================================
  if (step === 'select-material') {
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        {/* Back and Title Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backBtn')}</span>
          </button>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {t('step1Title')}
          </span>
        </div>

        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {t('step1Heading')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t('step1Subheading')}
          </p>
        </div>

        {/* 12 Materials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {materialOptions.map((mat) => (
            <button
              key={mat.type}
              onClick={() => handleSelectMaterial(mat.type)}
              className={`p-4 sm:p-5 rounded-3xl border-2 border-gray-200 dark:border-gray-700 ${mat.bgClass} text-left flex flex-col justify-between h-36 sm:h-40 hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                  {mat.icon}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                  {mat.label}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-tight">
                  {mat.examples}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: BƯỚC 2 - CHỌN CỤ THỂ MÓN ĐỒ & TÌNH TRẠNG THỰC TẾ
  // ==========================================
  if (step === 'select-item') {
    const currentMatObj = materialOptions.find((m) => m.type === chosenMaterial);

    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        {/* Back and Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('select-material')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('chooseOtherMaterial')}</span>
          </button>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {t('step2Title')}
          </span>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-gray-100 dark:bg-gray-800 text-sm font-black">
            <span>{currentMatObj?.icon}</span>
            <span>{t('step2SelectedMat')} {currentMatObj?.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {t('step2Heading')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t('step2Subheading')}
          </p>
        </div>

        {/* Quick filter search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchItemTerm}
            onChange={(e) => setSearchItemTerm(e.target.value)}
            placeholder={t('searchItemInMatPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
          />
        </div>

        {/* Items list under this material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {itemsUnderMaterial.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 space-y-2">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                {t('noItemsInMat')}
              </p>
              <button
                onClick={() => setSearchItemTerm('')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
              >
                {t('viewAllInMat')}
              </button>
            </div>
          ) : (
            itemsUnderMaterial.map((item) => {
              const binMeta = getBinMeta(item.binColor);
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-500 hover:shadow-md transition-all text-left flex items-start gap-4 cursor-pointer group active:scale-98"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-3xl shrink-0 overflow-hidden shadow-inner">
                    {item.icon}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.name[language] || item.name.vi}
                      </h4>
                      <span className="text-base shrink-0 ml-1">{binMeta.icon}</span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {item.preparationGuide[language] || item.preparationGuide.vi}
                    </p>

                    <div className="pt-1 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${binMeta.badgeClass}`}>
                        {binMeta.title.split('(')[0]}
                      </span>
                      {item.isMistakeProne && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{t('mistakeProneBadge')}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 4: BƯỚC 3 - KẾT QUẢ NHẬN ĐỊNH & THÙNG RÁC TƯƠNG ỨNG
  // ==========================================
  if (step === 'result' && chosenItem) {
    const binMeta = getBinMeta(chosenItem.binColor);

    return (
      <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
        {/* Navigation & Step tracker */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('select-item')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('chooseOtherMaterial')}</span>
          </button>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {t('step3Title')}
          </span>
        </div>

        {/* Selected Item Title */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl shrink-0">
            {chosenItem.icon}
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase text-gray-400 tracking-wider">
              {t('step3ItemHolding')}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-tight">
              {chosenItem.name[language] || chosenItem.name.vi}
            </h2>
          </div>
        </div>

        {/* HUGE PROMINENT BIN CARD */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border-3 ${binMeta.borderClass} ${binMeta.bgClass} shadow-xl text-center space-y-4`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-white/80 dark:bg-gray-800/80 shadow-sm">
            <span>{binMeta.icon}</span>
            <span>{t('step3AccurateResult')}</span>
          </div>

          <div className="space-y-1">
            <span className="text-5xl sm:text-6xl block">{binMeta.iconSymbol}</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              {t('step3PutInto')} {binMeta.title}
            </h3>
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">
              {binMeta.subtitle}
            </p>
          </div>
        </div>

        {/* STEP-BY-STEP PREPARATION GUIDE */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h4 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
            <span>📋</span>
            <span>{t('step3PrepGuide')}</span>
          </h4>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-semibold">
            {chosenItem.preparationGuide[language] || chosenItem.preparationGuide.vi}
          </div>

          {/* Golden Rules checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{t('ruleDrainWater')}</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{t('ruleFlatten')}</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{t('ruleWrapSharp')}</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{t('ruleIsolateBattery')}</span>
            </div>
          </div>
        </div>

        {/* IMPORTANT NOTES / MISTAKE PRONE ALERT */}
        {chosenItem.tips && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-black mb-0.5">{t('importantNote')}</strong>
              <p>{chosenItem.tips[language] || chosenItem.tips.vi}</p>
            </div>
          </div>
        )}

        {/* THE FINAL CONFIRM BUTTON (+5 POINTS) */}
        <div className="pt-2">
          <button
            onClick={handleConfirmSorted}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>{t('confirmSortedBtn')}</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 5: HOÀN THÀNH (+5 ĐIỂM THÀNH CÔNG)
  // ==========================================
  if (step === 'success') {
    return (
      <div className="space-y-6 animate-fade-in max-w-md mx-auto text-center py-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-green-300 mx-auto flex items-center justify-center text-5xl shadow-xl shadow-emerald-500/30 animate-bounce">
          🎉
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {t('sortCompleted')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {t('pointsHarvested')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t('thankYouSortMsg')}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {t('currentTotalPoints')}
          </span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {profile.points} {t('greenPointsLabel')}
          </p>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-semibold block">
            Level {currentRank.level}: {currentRank.title[language] || currentRank.title.vi}
          </span>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => {
              setChosenMaterial(null);
              setChosenItem(null);
              setStep('select-material');
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>✨</span>
            <span>{t('sortNextItemBtn')}</span>
          </button>

          <button
            onClick={() => {
              setChosenMaterial(null);
              setChosenItem(null);
              setStep('home');
            }}
            className="w-full py-3 px-6 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-bold text-sm cursor-pointer transition-colors"
          >
            {t('backToHomeBtn')}
          </button>
        </div>
      </div>
    );
  }

  return null;
};
