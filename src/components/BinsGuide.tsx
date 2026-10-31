import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Check, X, Sparkles, Info } from 'lucide-react';
import { BinColor, Language } from '../types';

export const BinsGuide: React.FC = () => {
  const { language, t } = useApp();
  const [activeBin, setActiveBin] = useState<BinColor>('green');

  const binsInfo: {
    id: BinColor;
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    colorClass: string;
    borderClass: string;
    bgLight: string;
    badgeClass: string;
    icon: string;
    badgeIcon: string;
    destination: Record<Language, string>;
    allowed: Record<Language, string[]>;
    disallowed: Record<Language, string[]>;
    tips: Record<Language, string>;
  }[] = [
    {
      id: 'green',
      title: {
        vi: 'Thùng Màu Xanh Lục',
        en: 'Green Bin',
        zh: '绿色垃圾桶',
        ko: '초록색 수거함',
      },
      subtitle: {
        vi: 'Rác Hữu Cơ (Dễ phân hủy sinh học)',
        en: 'Organic Waste (Biodegradable)',
        zh: '厨余有机垃圾 (生物易降解)',
        ko: '유기물/음식물 (생분해성)',
      },
      colorClass: 'from-emerald-500 to-green-600',
      borderClass: 'border-emerald-500',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      icon: '🥗',
      badgeIcon: '🟢',
      destination: {
        vi: 'Ủ phân compost sinh học & Sản xuất khí Biogas',
        en: 'Organic composting & Biogas fuel generation',
        zh: '生物堆肥发酵转化为有机肥与沼气清洁能源',
        ko: '친환경 유기농 퇴비화 및 바이오가스 발전',
      },
      allowed: {
        vi: [
          'Thức ăn thừa, cơm nguội, canh thịt cá (đã chắt kiệt nước)',
          'Rau củ quả giập nát, vỏ trái cây, cùi ngô, cuống rau',
          'Bã trà, bã cà phê, bã thuốc nam thảo mộc',
          'Cành hoa tàn, lá cây rụng tỉa vườn nhà',
          'Vỏ trứng gà/vịt nghiền nhỏ',
        ],
        en: [
          'Leftover food, rice, meat/fish broth (strictly drained of liquid)',
          'Spoiled vegetables, fruit peels, corn cobs, vegetable stalks',
          'Tea leaves, coffee grounds, herbal brew residues',
          'Wilted flowers, pruned yard branches, fallen leaves',
          'Crushed eggshells',
        ],
        zh: [
          '剩饭剩菜、鱼肉熟食（务必沥干汤汁水分）',
          '残烂蔬菜叶、果皮果壳、玉米芯、菜根',
          '茶渣、咖啡渣、中药草本药渣',
          '凋谢花束、庭院修剪枝条、落叶',
          '压碎的鸡蛋壳与鸭蛋壳',
        ],
        ko: [
          '남은 음식물, 밥, 찌개 건더기 (국물 물기 완전히 제거)',
          '상한 채소, 과일 껍질, 옥수수 속대, 채소 뿌리',
          '찻잎, 커피 찌꺼기, 한약재 찌꺼기',
          '시든 꽃, 마당 전정 나뭇가지, 낙엽',
          '잘게 부순 달걀 껍데기',
        ],
      },
      disallowed: {
        vi: [
          'Túi nilon bọc thức ăn thừa (phải trút thức ăn ra, túi bỏ thùng đỏ)',
          'Dây thun cao su buộc túi, tăm tre nhọn',
          'Xương ống động vật cỡ lớn (xương bò, heo lớn khó phân hủy)',
          'Bã kẹo cao su (chứa polymer nhân tạo)',
          'Phân động vật bị bệnh truyền nhiễm',
        ],
        en: [
          'Plastic bags wrapping food (empty food into bin, bag goes to red bin)',
          'Rubber bands, toothpicks, skewers',
          'Large livestock bone joints (beef/pork bones take years to decompose)',
          'Chewing gum (contains synthetic polymers)',
          'Infectious animal feces',
        ],
        zh: [
          '盛装厨余的塑料袋（需倒出残渣，袋子投红色桶）',
          '扎袋橡皮筋、牙签、竹签',
          '大型畜禽大骨头（牛骨、猪大骨难以降解）',
          '口香糖残胶（含人工合成聚合物）',
          '患病宠物排泄物',
        ],
        ko: [
          '음식물이 담긴 비닐봉지 (내용물만 붓고 비닐은 빨간색 함으로)',
          '고무줄, 이쑤시개, 나무 꼬치',
          '대형 가축 뼈 (소뼈, 돼지 뼈 등 분해 불가)',
          '씹던 껌 (인공 폴리머 함유)',
          '감염성 동물 배설물',
        ],
      },
      tips: {
        vi: 'Luôn chắt lọc hết nước canh trước khi bỏ vào thùng để giảm 80% mùi hôi và tránh nước rỉ rác làm bẩn sàn nhà.',
        en: 'Always thoroughly drain broths and moisture to eliminate 80% of bad odors and prevent leakage.',
        zh: '投放前务必挤干汤水水分，可减少80%异味产生并防止污水渗漏。',
        ko: '국물과 물기를 최대한 짜낸 후 배출하면 악취를 80% 줄이고 침출수를 방지할 수 있습니다.',
      },
    },
    {
      id: 'yellow',
      title: {
        vi: 'Thùng Màu Vàng',
        en: 'Yellow Bin',
        zh: '黄色垃圾桶',
        ko: '노란색 수거함',
      },
      subtitle: {
        vi: 'Rác Tái Chế (Có giá trị sử dụng lại)',
        en: 'Recyclable Waste (Reusable)',
        zh: '可回收物 (可循环再制造)',
        ko: '재활용 폐기물 (재자원화 가능)',
      },
      colorClass: 'from-amber-400 to-yellow-500',
      borderClass: 'border-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/30',
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
      icon: '♻️',
      badgeIcon: '🟡',
      destination: {
        vi: 'Nhà máy tái chế làm bột giấy, hạt nhựa & phôi kim loại mới',
        en: 'Recycling plants to manufacture pulp, plastic pellets & metal ingots',
        zh: '运送至造纸厂、塑料颗粒厂与冶炼厂回炉再生',
        ko: '재활용 제지공장, 재생 플라스틱 펠릿 및 제철소 원료로 재생',
      },
      allowed: {
        vi: [
          'Chai nhựa PET số 1 (chai nước khoáng, nước ngọt rỗng)',
          'Hộp nhựa cứng PP số 5, HDPE số 2 (hộp thức ăn sạch, chai dầu gội)',
          'Lon nhôm đựng bia, nước ngọt; đồ hộp sắt thiếc',
          'Thùng bìa carton, giấy báo, sách vở cũ, tài liệu giấy văn phòng',
          'Chai lọ thủy tinh lành lặn nguyên vẹn (chai rượu, chai siro)',
          'Quần áo cũ sạch sẽ còn khả năng tái sử dụng',
        ],
        en: [
          'Plastic bottles PET #1 (empty mineral water & soda bottles)',
          'Rigid containers PP #5, HDPE #2 (clean food tubs, shampoo bottles)',
          'Aluminum beer/soda cans; tin food cans',
          'Cardboard boxes, newspapers, old books, office paper',
          'Intact whole glass bottles & jars (beverage, sauce)',
          'Clean wearable clothes & textiles',
        ],
        zh: [
          '1号PET塑料瓶（纯净水瓶、饮料瓶）',
          '5号PP与2号HDPE厚硬塑料容器（洁净食品盒、洗发水瓶）',
          '铝制易拉罐、马口铁罐头盒',
          '瓦楞纸箱、报纸书籍、办公白纸',
          '完整未碎的玻璃瓶罐（酱油瓶、酒瓶）',
          '干净可再次穿戴的旧衣物',
        ],
        ko: [
          '1번 PET 페트병 (생수병, 음료수병)',
          '5번 PP 및 2번 HDPE 용기 (세척된 반찬통, 샴푸통)',
          '알루미늄 캔, 통조림 철캔',
          '골판지 박스, 신문, 헌책, 복사용지',
          '깨지지 않은 온전한 유리병류 (음료병, 양념병)',
          '세탁된 깨끗한 헌옷 및 섬유류',
        ],
      },
      disallowed: {
        vi: [
          'Hóa đơn tính tiền / giấy in nhiệt siêu thị (chứa hóa chất BPA)',
          'Bát đĩa sành sứ, gốm men nứt vỡ (nhiệt độ nóng chảy lệch thủy tinh)',
          'Thủy tinh chịu nhiệt Pyrex, vung kính cường lực',
          'Hộp bánh pizza dính dầu mỡ nặng',
          'Ly giấy cà phê phủ màng tráng nhựa PE',
        ],
        en: [
          'Cash receipts / thermal paper (contains toxic BPA coating)',
          'Ceramics, porcelain & clay mugs (higher melting point than bottle glass)',
          'Pyrex bakeware & tempered lid glass',
          'Greasy pizza boxes with heavy oil stains',
          'Takeout paper cups lined with polyethylene film',
        ],
        zh: [
          '热敏小票与超市收据（含化学双酚A涂层）',
          '陶瓷碗盘、破瓷杯（熔点与普通玻璃严重不一致）',
          '耐热硼硅玻璃（烤盘、防爆锅盖玻璃）',
          '浸满油污的披萨外卖纸盒',
          '内壁压合防渗塑膜的咖啡外带纸杯',
        ],
        ko: [
          '영수증 및 감열지 (BPA 화학약품 코팅 오염)',
          '도자기, 사기그릇, 머그컵 (유리와 녹는점이 달라 용광로 폭발 유발)',
          '내열유리 (오븐 용기, 냄비 뚜껑 유리)',
          '기름이 깊게 밴 피자 상자',
          '비닐 코팅된 테이크아웃 종이컵',
        ],
      },
      tips: {
        vi: 'Quy tắc 3B: Bỏ nắp - Rửa sạch - Đạp bẹp để tiết kiệm diện tích tối đa cho thùng rác và công xe thu gom.',
        en: 'Golden 3R Rule: Remove caps - Rinse residue - Reduce volume (flatten) to save 70% space.',
        zh: '三步黄金口诀：去盖 - 冲净 - 压扁，节省多达70%的运输体积。',
        ko: '3단계 핵심 규칙: 뚜껑 분리 - 세척 - 압축하여 부피를 70% 절약하세요.',
      },
    },
    {
      id: 'red',
      title: {
        vi: 'Thùng Màu Đỏ',
        en: 'Red Bin',
        zh: '红色垃圾桶',
        ko: '빨간색 수거함',
      },
      subtitle: {
        vi: 'Rác Vô Cơ / Rác Còn Lại (Không tái chế được)',
        en: 'Inorganic / Residual Waste',
        zh: '其他无机垃圾 / 残余垃圾',
        ko: '무기물/일반 잔여 쓰레기',
      },
      colorClass: 'from-rose-500 to-red-600',
      borderClass: 'border-rose-500',
      bgLight: 'bg-rose-50 dark:bg-rose-950/30',
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
      icon: '🗑️',
      badgeIcon: '🔴',
      destination: {
        vi: 'Bãi chôn lấp hợp vệ sinh & Nhà máy điện rác (đốt sinh năng lượng)',
        en: 'Sanitary landfills & Waste-to-Energy incineration plants',
        zh: '卫生填埋场与垃圾焚烧发电厂（转化为电能）',
        ko: '위생 매립지 및 쓰레기 소각 발전 시설 (에너지 회수)',
      },
      allowed: {
        vi: [
          'Túi nilon bẩn dính dầu mỡ, màng bọc thực phẩm',
          'Hộp xốp đựng cơm (nhựa số 6 PS), muỗng nĩa nhựa dùng 1 lần',
          'Tã bỉm em bé, băng vệ sinh, giấy ăn đã qua sử dụng',
          'Mảnh thủy tinh vỡ sắc nhọn (ĐÃ ĐƯỢC BỌC KÍN BÌA CARTOON)',
          'Bát đĩa sứ, tách gốm sành vỡ',
          'Vỏ gói bim bim màng nhôm tráng bạc phức hợp',
          'Bút bi cạn mực, băng dính cũ, đầu mẩu thuốc lá',
        ],
        en: [
          'Greasy dirty plastic bags, oily food cling wraps',
          'Styrofoam food boxes (#6 PS), single-use plastic cutlery',
          'Baby diapers, sanitary napkins, used tissues',
          'Broken glass shards & mirror pieces (SECURELY WRAPPED IN CARDBOARD)',
          'Broken ceramics, porcelain pottery shards',
          'Multi-layer metallic snack chip wrappers',
          'Dried ballpoint pens, used tapes, cigarette butts',
        ],
        zh: [
          '沾满油污的塑料袋、厨房保鲜膜',
          '6号PS泡沫快餐盒、一次性塑料刀叉勺',
          '婴儿纸尿裤、卫生巾、使用过的抽纸餐巾纸',
          '尖锐碎玻璃、碎镜子（必须用厚纸箱严密包裹包裹）',
          '碎陶瓷碗盘、破瓷砖碎片',
          '多层镀铝复合薯片零食袋',
          '写尽圆珠笔、旧胶带、烟头',
        ],
        ko: [
          '기름 묻은 비닐봉지, 오염된 식품 랩',
          '스티로폼 도시락 용기 (6번 PS), 일회용 수저',
          '기저귀, 생리대, 사용한 휴지/물티슈',
          '깨진 유리 조각, 거울 파편 (두꺼운 박스로 안전 포장 필수)',
          '깨진 도자기, 사기그릇 파편',
          '은박 코팅된 과자 봉지류',
          '다 쓴 볼펜, 테이프 찌꺼기, 담배꽁초',
        ],
      },
      disallowed: {
        vi: [
          'Pin tiểu, ắc quy cũ (chứa kim loại nặng cực độc, phải bỏ thùng đen/cam)',
          'Bóng đèn huỳnh quang (chứa thủy ngân)',
          'Thuốc trừ sâu, lọ hóa chất độc hại',
          'Rác hữu cơ dễ thối rữa (phải bỏ thùng xanh)',
        ],
        en: [
          'Household batteries & accumulators (heavy metal toxicity -> black/orange bin)',
          'Fluorescent lamp tubes (contains toxic mercury vapour)',
          'Pesticides & dangerous household chemicals',
          'Perishable organic food scraps (goes to green bin)',
        ],
        zh: [
          '干电池、蓄电池（含剧毒重金属，必须投黑/橙色桶）',
          '荧光日光灯管（含剧毒挥发水银汞）',
          '农药瓶、强腐蚀性化学溶剂',
          '易腐烂的厨余果皮菜渣（必须投绿色桶）',
        ],
        ko: [
          '폐건전지, 축전지 (중금속 유해 폐기물 -> 검정/주황색 함으로)',
          '형광등 (수은 증기 함유)',
          '살충제, 유해 화학물질',
          '부패하기 쉬운 음식물 찌꺼기 (초록색 유기물함으로)',
        ],
      },
      tips: {
        vi: 'Mảnh thủy tinh và đồ sắc nhọn PHẢI bọc giấy báo hoặc bìa cứng, dán keo và dán nhãn cảnh báo để bảo vệ cô chú lao công.',
        en: 'Broken glass and sharp objects MUST be wrapped in thick cardboard and labeled to protect sanitation workers.',
        zh: '碎玻璃与尖锐利器必须用厚纸箱严密包扎并注明提醒，切实保护环卫工人人身安全。',
        ko: '깨진 유리와 날카로운 물건은 수거원의 안전을 위해 반드시 두꺼운 박스로 감싸 테이프로 고정하세요.',
      },
    },
    {
      id: 'black-orange',
      title: {
        vi: 'Thùng Màu Đen / Cam',
        en: 'Black/Orange Bin',
        zh: '黑/橙色垃圾桶',
        ko: '검정/주황색 수거함',
      },
      subtitle: {
        vi: 'Rác Nguy Hại (Độc hại cho sức khỏe & đất nước)',
        en: 'Hazardous Waste (Toxic to Life & Soil)',
        zh: '有害垃圾 (威胁生态与人体健康)',
        ko: '유해 폐기물 (환경 및 인체 유해)',
      },
      colorClass: 'from-zinc-800 via-stone-800 to-orange-700',
      borderClass: 'border-orange-500',
      bgLight: 'bg-orange-50 dark:bg-stone-900/80',
      badgeClass: 'bg-stone-900 text-amber-300 dark:bg-black dark:text-amber-400',
      icon: '☣️',
      badgeIcon: '⚫🟠',
      destination: {
        vi: 'Trạm xử lý chất thải nguy hại chuyên dụng, trung hòa hóa học & lò thiêu cao tần',
        en: 'Specialized hazardous treatment facilities, chemical neutralization & high-temp kilns',
        zh: '有害危险废弃物特许处理中心、化学中和及高温无害化等离子焚烧炉',
        ko: '특수 유해폐기물 전문 처리장, 화학 중화 및 고온 특수 소각로',
      },
      allowed: {
        vi: [
          'Pin gia dụng (AA, AAA, nút áo, pin lithium điện thoại)',
          'Ắc quy xe máy, ô tô cũ chứa axit chì',
          'Bóng đèn tuýp huỳnh quang, bóng đèn thủy ngân',
          'Vỏ chai lọ chứa thuốc bảo vệ thực vật, thuốc diệt mối muỗi',
          'Bình xịt nén khí (sơn xịt, xịt phòng, keo bọt)',
          'Linh kiện điện tử hỏng (bo mạch, chuột máy tính, sạc hỏng)',
          'Rác y tế phát sinh tại nhà (kim tiêm tiểu đường, bông băng vết thương)',
        ],
        en: [
          'Household batteries (AA, AAA, button cells, lithium phone packs)',
          'Lead-acid motorcycle and car batteries',
          'Fluorescent tubes, compact mercury-vapor bulbs',
          'Pesticides, rodenticide containers, aerosol cans',
          'Pressurized spray cans (spray paints, foam sprays)',
          'Broken electronics (circuit boards, mouse, damaged chargers)',
          'Home medical sharps (insulin needles, contaminated bandages)',
        ],
        zh: [
          '各类家用干电池（AA、AAA、纽扣电池、手机锂电池）',
          '含铅酸摩托车与汽车蓄电池',
          '荧光直管日光灯管、节能汞灯',
          '农药瓶、杀虫灭鼠剂残留容器',
          '受压气雾罐（自喷漆罐、空气清新剂罐）',
          '废弃电子零配件（电路板、坏鼠标、受损充电器）',
          '家庭医疗锐器（胰岛素注射针头、污染绷带）',
        ],
        ko: [
          '가정용 건전지 (AA, AAA, 단추형, 휴대폰 리튬 배터리)',
          '납축전지 (오토바이, 차량용)',
          '형광등, 수은 함유 조명 램프',
          '농약 용기, 살충제 캔, 에어로졸 스프레이',
          '고압 가스 분사 캔 (라카 스프레이 등)',
          '폐전자부품 (기판, 마우스, 파손 충전기)',
          '가정 발생 의료폐기물 (인슐린 주삿바늘, 오염 거즈)',
        ],
      },
      disallowed: {
        vi: [
          'Rác sinh hoạt gia đình thông thường',
          'Rác tái chế như giấy bìa sạch, lon nước ngọt sạch',
          'Thức ăn thừa và thực phẩm hữu cơ',
        ],
        en: [
          'General harmless household waste',
          'Clean recyclables like cardboard or clean soda cans',
          'Food scraps and kitchen organics',
        ],
        zh: [
          '普通无害生活废弃物',
          '纸板箱、洁净易拉罐等可回收物',
          '果皮菜叶等厨余食物残渣',
        ],
        ko: [
          '일반 무해 생활폐기물',
          '깨끗한 종이상자, 캔 등 재활용품',
          '음식물 찌꺼기 및 유기물',
        ],
      },
      tips: {
        vi: 'Dán băng dính vào 2 đầu cực âm/dương của pin để chống chập cháy; để pin trong hũ nhựa/thủy tinh khô ráo mang nộp tại siêu thị.',
        en: 'Tape both battery terminals to prevent short circuit fires; store in a dry sealed jar and drop at supermarket boxes.',
        zh: '用绝缘胶带封贴电池两极防止起火爆炸；装在密封干燥罐中送往超市有害收集箱。',
        ko: '화재 예방을 위해 건전지 양극에 절연테이프를 붙이고, 건조한 병에 모아 마트 전용 수거함에 배출하세요.',
      },
    },
  ];

  const current = binsInfo.find((b) => b.id === activeBin) || binsInfo[0];

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('quickBinsMemory')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          {t('binsTitle')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('binsSubtitle')}
        </p>
      </div>

      {/* 4 Bins Selector Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {binsInfo.map((bin) => {
          const isSelected = activeBin === bin.id;
          return (
            <button
              key={bin.id}
              onClick={() => setActiveBin(bin.id)}
              className={`relative p-4 sm:p-5 rounded-3xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between h-40 sm:h-44 group ${
                isSelected
                  ? `${bin.borderClass} ${bin.bgLight} shadow-lg scale-[1.02]`
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${bin.colorClass} flex items-center justify-center text-white text-xl sm:text-2xl shadow-md`}
                >
                  {bin.icon}
                </div>
                <span className="text-lg">{bin.badgeIcon}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block truncate">
                  {bin.subtitle[language] || bin.subtitle.vi}
                </span>
                <h3 className="text-sm sm:text-base font-black text-gray-900 dark:text-white leading-tight">
                  {bin.title[language] || bin.title.vi}
                </h3>
              </div>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Bin Detailed Guide Card */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border-2 ${current.borderClass} ${current.bgLight} transition-all shadow-md`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200/80 dark:border-gray-700/80">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br ${current.colorClass} flex items-center justify-center text-white text-3xl shadow-lg shrink-0`}
            >
              {current.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {current.title[language] || current.title.vi}
                </h3>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${current.badgeClass}`}
                >
                  {current.badgeIcon}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {current.subtitle[language] || current.subtitle.vi}
              </p>
            </div>
          </div>

          <div className="text-xs px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 max-w-sm">
            <span className="font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
              {t('postCollectionLead')}
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {current.destination[language] || current.destination.vi}
            </span>
          </div>
        </div>

        {/* 2 Columns: Allowed vs Disallowed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Allowed Column */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-5 border border-emerald-500/20 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm border-b pb-2 border-gray-100 dark:border-gray-700">
              <Check className="w-5 h-5 bg-emerald-100 dark:bg-emerald-950 rounded-full p-1 text-emerald-600" />
              <span>{t('whatGoesIn')}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {(current.allowed[language] || current.allowed.vi).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disallowed Column */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-5 border border-rose-500/20 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-sm border-b pb-2 border-gray-100 dark:border-gray-700">
              <X className="w-5 h-5 bg-rose-100 dark:bg-rose-950 rounded-full p-1 text-rose-600" />
              <span>{t('whatStaysOut')}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {(current.disallowed[language] || current.disallowed.vi).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pro Tip note */}
        <div className="mt-5 p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>{t('goldenTipsLead')} </strong>
            {current.tips[language] || current.tips.vi}
          </p>
        </div>
      </div>

      {/* 4 Golden Handling Rules Highlight */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              {t('handlingRules')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('binsSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 space-y-1.5">
            <span className="text-2xl">💧</span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              1. {t('rule1Title')}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('rule1Desc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 space-y-1.5">
            <span className="text-2xl">📦</span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              2. {t('rule2Title')}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('rule2Desc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 space-y-1.5">
            <span className="text-2xl">🧽</span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              3. {t('rule3Title')}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('rule3Desc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 space-y-1.5">
            <span className="text-2xl">🔋</span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              4. {t('rule4Title')}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('rule4Desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
