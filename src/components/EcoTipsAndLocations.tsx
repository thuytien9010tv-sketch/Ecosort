import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COLLECTION_LOCATIONS, ECO_TIPS } from '../data/wasteDatabase';
import { MapPin, Sparkles, Phone, Clock, Search, ShieldCheck, Navigation } from 'lucide-react';
import { Language } from '../types';

export const EcoTipsAndLocations: React.FC = () => {
  const { language, t } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'locations' | 'tips'>('locations');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchLocation, setSearchLocation] = useState<string>('');

  const DISTRICT_OPTIONS = [
    { id: 'all', label: t('filterAllDistricts') || 'Toàn tỉnh Vĩnh Long' },
    { id: 'TP. Vĩnh Long', label: 'TP. Vĩnh Long' },
    { id: 'Long Hồ', label: 'H. Long Hồ' },
    { id: 'Bình Minh', label: 'TX. Bình Minh' },
    { id: 'Mang Thít', label: 'H. Mang Thít' },
    { id: 'Vũng Liêm', label: 'H. Vũng Liêm' },
    { id: 'Tam Bình', label: 'H. Tam Bình' },
    { id: 'Trà Ôn', label: 'H. Trà Ôn' },
    { id: 'Bình Tân', label: 'H. Bình Tân' },
  ];

  const filteredLocations = COLLECTION_LOCATIONS.filter((loc) => {
    const matchesType = selectedType === 'all' || loc.type === selectedType;
    const matchesDistrict =
      selectedDistrict === 'all' ||
      loc.city.includes(selectedDistrict) ||
      loc.address.includes(selectedDistrict);
    const query = searchLocation.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      loc.name.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query) ||
      loc.city.toLowerCase().includes(query) ||
      (loc.acceptedItems[language] || loc.acceptedItems.vi).toLowerCase().includes(query);
    return matchesType && matchesDistrict && matchesSearch;
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
      color: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-bold',
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
      color: 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-300 font-bold',
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
      color: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300 font-bold',
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
      color: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-300 font-bold',
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
      color: 'bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-300 font-bold',
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
      color: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold',
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
      color: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 font-bold',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Switcher Tab */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-[#14231e] border border-gray-200/80 dark:border-emerald-800/60 max-w-md mx-auto">
        <button
          onClick={() => setActiveSubTab('locations')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'locations'
              ? 'bg-white dark:bg-[#1d312a] text-emerald-700 dark:text-emerald-300 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-emerald-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t('tabLocations')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tips')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'tips'
              ? 'bg-white dark:bg-[#1d312a] text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-emerald-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('tabEcoTips')}</span>
        </button>
      </div>

      {/* Subtab 1: Locations */}
      {activeSubTab === 'locations' && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-emerald-100">
              {t('tabLocations')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
              {t('locationsSubtitle')}
            </p>

            {/* Reassurance Banner: Exclusively Vinh Long */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#162721] border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('vinhLongOnlyBadge')}</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-900 dark:text-emerald-100 font-black">
                {filteredLocations.length} địa điểm
              </span>
            </div>
          </div>

          {/* Search & Location Filter */}
          <div className="space-y-3 bg-white dark:bg-[#101b17] p-4 rounded-3xl border border-gray-200 dark:border-emerald-800/60 shadow-sm">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-emerald-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder={t('searchLocPlaceholder')}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#162721] border border-gray-200 dark:border-emerald-800/70 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-600/70"
              />
            </div>

            {/* Row 1: Category Filter */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-500 dark:text-emerald-400 uppercase tracking-wider block">
                Loại hình thu gom:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedType === filter.id
                        ? 'bg-emerald-600 text-white shadow-sm font-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#162721] dark:text-emerald-200 dark:hover:bg-[#1d312a] border border-transparent dark:border-emerald-800/50'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: District Filter in Vinh Long */}
            <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-emerald-900/40">
              <span className="text-[11px] font-bold text-gray-500 dark:text-emerald-400 uppercase tracking-wider block">
                Khu vực tại Vĩnh Long:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {DISTRICT_OPTIONS.map((dist) => (
                  <button
                    key={dist.id}
                    onClick={() => setSelectedDistrict(dist.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedDistrict === dist.id
                        ? 'bg-teal-700 text-white shadow-sm font-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#162721] dark:text-emerald-200 dark:hover:bg-[#1d312a] border border-transparent dark:border-emerald-800/50'
                    }`}
                  >
                    {dist.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Grid */}
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white dark:bg-[#101b17] rounded-3xl p-5 border border-gray-200/90 dark:border-emerald-800/70 shadow-sm hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200">
                          {loc.typeName[language] || loc.typeName.vi}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 dark:bg-teal-950/70 dark:text-teal-200 border border-teal-200/70 dark:border-teal-800/60">
                          📍 {loc.city}
                        </span>
                      </div>
                      {loc.workingHours && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-emerald-400 font-medium">
                          <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-emerald-400" />
                          {loc.workingHours}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-extrabold text-gray-900 dark:text-emerald-100 mt-2.5 leading-snug">
                      {loc.name}
                    </h4>

                    <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-emerald-200/90 mt-2">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{loc.address}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-emerald-900/50 text-xs">
                    <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-[#162721] border border-gray-100 dark:border-emerald-800/50">
                      <strong className="text-emerald-800 dark:text-emerald-300 block mb-0.5 font-bold">
                        ✓ {t('acceptedItemsLabel')}
                      </strong>
                      <p className="text-gray-700 dark:text-emerald-100/90 leading-relaxed">
                        {loc.acceptedItems[language] || loc.acceptedItems.vi}
                      </p>
                    </div>

                    <p className="text-[11px] text-gray-500 dark:text-emerald-400/90 italic leading-snug">
                      ℹ️ {loc.notes[language] || loc.notes.vi}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                      {loc.phone ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{t('hotlineLabel')} {loc.phone}</span>
                        </div>
                      ) : <span />}

                      {/* Direct Google Maps Navigation Button */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200/80 dark:border-emerald-800/80 text-[11px] font-black transition-all flex items-center gap-1 shadow-sm"
                      >
                        <Navigation className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{t('directionsBtn')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-6 rounded-3xl bg-white dark:bg-[#101b17] border border-gray-200 dark:border-emerald-800/60 space-y-3">
              <span className="text-3xl block">📍</span>
              <h4 className="text-sm font-bold text-gray-800 dark:text-emerald-200">
                Không tìm thấy địa điểm phù hợp tại khu vực này của Vĩnh Long
              </h4>
              <p className="text-xs text-gray-500 dark:text-emerald-400/80 max-w-md mx-auto">
                Hãy thử chọn lại "Toàn tỉnh Vĩnh Long" hoặc thay đổi từ khóa tìm kiếm để xem tất cả các điểm thu gom.
              </p>
              <button
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedType('all');
                  setSearchLocation('');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
              >
                Xem tất cả địa điểm Vĩnh Long
              </button>
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Zero Waste Eco Tips */}
      {activeSubTab === 'tips' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-emerald-100">
              {t('tabEcoTips')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {t('diySubtitle')}
            </p>
          </div>

          {/* Core Tips from prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ECO_TIPS.map((tip) => (
              <div
                key={tip.id}
                className="bg-white dark:bg-[#101b17] rounded-3xl p-5 sm:p-6 border border-gray-200/90 dark:border-emerald-800/70 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{tip.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-teal-100 text-teal-900 dark:bg-teal-950/70 dark:text-teal-300">
                    {tip.tag}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-gray-900 dark:text-emerald-100 leading-snug">
                  {tip.title[language] || tip.title.vi}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tip.description[language] || tip.description.vi}
                </p>
              </div>
            ))}
          </div>

          {/* Deep-dive Plastics Guide: HDPE, PP, LDPE */}
          <div className="bg-white dark:bg-[#101b17] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 dark:border-emerald-800/80 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="text-lg font-black text-gray-900 dark:text-emerald-100">
                  {t('ecoPlasticsNote')}
                </h4>
                <p className="text-xs text-gray-500 dark:text-emerald-400/80">
                  {t('step1Subheading')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {plasticCodes.map((p) => (
                <div
                  key={p.code}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-[#162721] border border-gray-200 dark:border-emerald-800/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-gray-900 text-white dark:bg-emerald-900 dark:text-emerald-200 flex items-center justify-center font-black text-xs">
                        ♳ {p.code}
                      </span>
                      <span className="font-extrabold text-xs text-gray-900 dark:text-emerald-100">
                        {p.name}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.color}`}>
                      {p.label[language] || p.label.vi}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-emerald-200/90 leading-relaxed">
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
