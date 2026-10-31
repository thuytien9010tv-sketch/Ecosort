import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COLLECTION_LOCATIONS, ECO_TIPS } from '../data/wasteDatabase';
import { MapPin, Sparkles, Phone, Clock, Search, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

export const EcoTipsAndLocations: React.FC = () => {
  const { language, t } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'locations' | 'tips'>('locations');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchLocation, setSearchLocation] = useState<string>('');

  const filteredLocations = COLLECTION_LOCATIONS.filter((loc) => {
    const matchesType = selectedType === 'all' || loc.type === selectedType;
    const query = searchLocation.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      loc.name.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query) ||
      loc.city.toLowerCase().includes(query) ||
      (loc.acceptedItems[language] || loc.acceptedItems.vi).toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  const plasticCodes: {
    code: string;
    name: string;
    label: Record<Language, string>;
    usage: Record<Language, string>;
    color: string;
  }[] = [
    {
      code: '1',
      name: 'PET / PETE',
      label: {
        vi: 'Tái chế tốt',
        en: 'Highly Recyclable',
        zh: '易回收再生',
        ko: '재활용 우수',
      },
      usage: {
        vi: 'Chai nước khoáng, nước ngọt. Dùng 1 lần, không đựng nước nóng.',
        en: 'Beverage bottles. Single-use only, avoid hot liquids.',
        zh: '饮用水瓶、饮料瓶。一次性使用，忌装热水。',
        ko: '생수병, 음료수병. 1회용 권장, 뜨거운 물 주입 금지.',
      },
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      code: '2',
      name: 'HDPE',
      label: {
        vi: 'Rất an toàn',
        en: 'Very Safe',
        zh: '安全厚实',
        ko: '매우 안전함',
      },
      usage: {
        vi: 'Bình sữa em bé, chai dầu gội, bình nước giặt. Cực bền, ít thôi nhiễm hóa chất.',
        en: 'Milk bottles, shampoo tubs, laundry jugs. Highly durable and non-leaching.',
        zh: '婴儿奶瓶、洗发露瓶、洗衣液桶。坚固耐磨不易析出。',
        ko: '젖병, 샴푸통, 세제용기. 내구성 우수, 유해물질 용출 적음.',
      },
      color: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
    },
    {
      code: '3',
      name: 'PVC',
      label: {
        vi: 'Nguy hại - Tránh dùng',
        en: 'Hazardous - Avoid',
        zh: '有害 - 避免使用',
        ko: '유해 - 사용 자제',
      },
      usage: {
        vi: 'Ống nước, màng bọc thức ăn rẻ tiền. Có thể giải phóng chất độc Phthalate.',
        en: 'Pipes, cheap plastic wraps. May release toxic Phthalates.',
        zh: '水管、劣质保鲜膜。易溶出邻苯二甲酸酯类塑化剂。',
        ko: '배관 파이프, 저가 랩. 프탈레이트 독성물질 배출 위험.',
      },
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    },
    {
      code: '4',
      name: 'LDPE',
      label: {
        vi: 'Tương đối an toàn',
        en: 'Relatively Safe',
        zh: '相对安全',
        ko: '비교적 안전함',
      },
      usage: {
        vi: 'Túi nilon chất lượng cao, màng bọc thực phẩm an toàn, hộp đựng mềm.',
        en: 'Quality food bags, stretch films, flexible squeeze bottles.',
        zh: '高品质塑料袋、食品级保鲜膜、软塑挤压瓶。',
        ko: '식품용 포장 비닐, 안전 랩, 부드러운 튜브 용기.',
      },
      color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
    },
    {
      code: '5',
      name: 'PP',
      label: {
        vi: 'An toàn nhất cho thực phẩm',
        en: 'Safest for Food',
        zh: '食品级最安全',
        ko: '식품용 최적 안전',
      },
      usage: {
        vi: 'Hộp đựng cơm, cốc chịu nhiệt lò vi sóng (đến 130°C), bình sữa tiệt trùng.',
        en: 'Microwave-safe lunchboxes (up to 130°C), sterilizable cups & containers.',
        zh: '微波炉加热保鲜餐盒（耐温达130°C）、高温消毒水杯。',
        ko: '전자레인지용 용기 (130°C 내열), 열탕 소독 컵 및 용기.',
      },
      color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
    },
    {
      code: '6',
      name: 'PS',
      label: {
        vi: 'Không an toàn ở nhiệt cao',
        en: 'Unsafe with Heat',
        zh: '高温不安全',
        ko: '고온 시 유해',
      },
      usage: {
        vi: 'Hộp xốp đựng cơm, ly mì ăn liền. Chứa Styrene độc hại khi tiếp xúc dầu mỡ nóng.',
        en: 'Styrofoam takeout boxes, instant noodle bowls. Releases styrene under heat/oil.',
        zh: '一次性发泡泡沫餐盒、方便面碗。高温接触酸碱热油易析出苯乙烯。',
        ko: '스티로폼 도시락, 컵라면 용기. 뜨거운 기름 접촉 시 스티렌 방출.',
      },
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      code: '7',
      name: 'OTHER',
      label: {
        vi: 'Nhựa hỗn hợp - Cẩn trọng',
        en: 'Mixed - Caution',
        zh: '其他混合树脂 - 谨慎',
        ko: '기타 복합재질 - 주의',
      },
      usage: {
        vi: 'Bình nước thể thao cỡ lớn. Nên kiểm tra nhãn "BPA-Free" trước khi dùng.',
        en: 'Multi-layer bottles, sports flasks. Check for "BPA-Free" labels.',
        zh: '大容量运动水壶。使用前请认准“BPA-Free 无双酚A”环保标识。',
        ko: '대형 스포츠 물병. "BPA-Free" 라벨 여부를 반드시 확인하세요.',
      },
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Switcher Tab */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 max-w-md mx-auto">
        <button
          onClick={() => setActiveSubTab('locations')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'locations'
              ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t('tabLocations')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tips')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'tips'
              ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('tabEcoTips')}</span>
        </button>
      </div>

      {/* Subtab 1: Locations */}
      {activeSubTab === 'locations' && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {t('tabLocations')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('locationsSubtitle')}
            </p>
          </div>

          {/* Search & Location Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder={t('searchLocPlaceholder')}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: t('filterAll') },
                { id: 'supermarket', label: t('filterSupermarket') },
                { id: 'ewaste', label: t('filterEwaste') },
                { id: 'scrap', label: t('filterScrap') },
                { id: 'school', label: t('filterSchool') },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedType(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedType === filter.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {loc.typeName[language] || loc.typeName.vi}
                    </span>
                    {loc.workingHours && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {loc.workingHours}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white mt-2 leading-snug">
                    {loc.name}
                  </h4>

                  <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 mt-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                      ✓ {t('acceptedItemsLabel')}
                    </strong>
                    <p className="text-gray-700 dark:text-gray-300">
                      {loc.acceptedItems[language] || loc.acceptedItems.vi}
                    </p>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                    ℹ️ {loc.notes[language] || loc.notes.vi}
                  </p>

                  {loc.phone && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t('hotlineLabel')} {loc.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Zero Waste Eco Tips */}
      {activeSubTab === 'tips' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {t('tabEcoTips')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('diySubtitle')}
            </p>
          </div>

          {/* Core Tips from prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ECO_TIPS.map((tip) => (
              <div
                key={tip.id}
                className="bg-white dark:bg-gray-800 rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{tip.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    {tip.tag}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-snug">
                  {tip.title[language] || tip.title.vi}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tip.description[language] || tip.description.vi}
                </p>
              </div>
            ))}
          </div>

          {/* Deep-dive Plastics Guide: HDPE, PP, LDPE */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white">
                  {t('ecoPlasticsNote')}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('step1Subheading')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {plasticCodes.map((p) => (
                <div
                  key={p.code}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-black text-xs">
                        ♳ {p.code}
                      </span>
                      <span className="font-extrabold text-xs text-gray-900 dark:text-white">
                        {p.name}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.color}`}>
                      {p.label[language] || p.label.vi}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {p.usage[language] || p.usage.vi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
