// 栀·美研所 — Mock 数据（备案期间使用）

const CATEGORIES = [
  { id: 'skin', name: '皮肤管理', icon: '✨', count: 12, tone: 'violet' },
  { id: 'nail', name: '美甲美睫', icon: '💅', count: 8,  tone: 'rose'   },
  { id: 'spa',  name: '私教 SPA', icon: '🌿', count: 6,  tone: 'sage'   },
];

const SERVICES = [
  // ── 皮肤管理
  {
    _id: 's001', categoryId: 'skin',
    name: '深层补水焕肤', duration: 90,
    desc: '医用级面膜 + 微电流导入 · 进口仪器 · 适合干性 / 混油性肤质',
    detail: '本项目采用进口医用级补水面膜，配合微电流导入仪，深度补水同时提升皮肤弹性。适合长期处于空调环境、皮肤干燥缺水的客户。疗程建议每月 2 次，4 次为一个周期。',
    price: 498, originalPrice: 780, unit: '次',
    rating: 4.9, reviewCount: 1203,
    tags: ['首次体验', '干性肤质'],
    emoji: '🌊', tone: 'violet',
    available: true,
  },
  {
    _id: 's002', categoryId: 'skin',
    name: '光子嫩肤美白', duration: 60,
    desc: '强脉冲光技术 · 淡斑提亮 · 改善肤色不均',
    detail: '利用强脉冲光（IPL）技术，针对色斑、毛孔粗大、肤色暗沉等问题进行综合改善。单次即可感受明显提亮效果，疗程建议 5-6 次。',
    price: 380, originalPrice: null, unit: '次',
    rating: 4.8, reviewCount: 876,
    tags: ['热卖', '淡斑'],
    emoji: '☀️', tone: 'amber',
    available: true,
  },
  {
    _id: 's003', categoryId: 'skin',
    name: '清洁毛孔护理', duration: 75,
    desc: '超声波清洁 + 水氧注入 · 疏通堵塞毛孔',
    detail: '使用超声波震动仪配合特殊清洁精华，深层清洁毛孔内污垢和多余皮脂，随后通过水氧仪注入保湿成分，使皮肤清爽细腻。',
    price: 268, originalPrice: null, unit: '次',
    rating: 4.7, reviewCount: 543,
    tags: ['新品', '油性肤质'],
    emoji: '💧', tone: 'cyan',
    available: true,
  },
  // ── 美甲美睫
  {
    _id: 's004', categoryId: 'nail',
    name: '日式凝胶美甲·单色', duration: 90,
    desc: '基础包甲型 + 单色凝胶 + 卸甲一次 · 含修型打磨',
    detail: '采用进口日式凝胶，持色时间长达 3-4 周，颜色鲜艳不褪色。包含修型、打磨、基础补水护甲，卸甲时需返店由专业美甲师操作。',
    price: 128, originalPrice: null, unit: '次',
    rating: 4.8, reviewCount: 892,
    tags: ['热卖'],
    emoji: '💅', tone: 'rose',
    available: true,
  },
  {
    _id: 's005', categoryId: 'nail',
    name: '法式渐变美甲', duration: 120,
    desc: '渐变晕染技法 · 含手部护理 · 2 款图案可选',
    detail: '经典法式或创意渐变，由专业美甲师手工晕染，自然过渡，附赠手部精油护理，让指尖与双手同步细腻。',
    price: 198, originalPrice: 260, unit: '次',
    rating: 4.9, reviewCount: 654,
    tags: ['首次体验', '渐变'],
    emoji: '🌸', tone: 'pink',
    available: true,
  },
  {
    _id: 's006', categoryId: 'nail',
    name: '嫁接睫毛·自然款', duration: 60,
    desc: '单根嫁接 · 0.07mm 极细毛 · 自然裸妆感',
    detail: '选用 0.07mm 超细单根睫毛，手工逐根嫁接，佩戴后轻盈无感，适合日常通勤。可维持 3-4 周，建议 3 周后回店补毛。',
    price: 168, originalPrice: null, unit: '次',
    rating: 4.7, reviewCount: 432,
    tags: ['自然'],
    emoji: '👁️', tone: 'slate',
    available: true,
  },
  // ── 私教 SPA
  {
    _id: 's007', categoryId: 'spa',
    name: '精油全身 SPA', duration: 90,
    desc: '进口调香精油 · 全身淋巴疏通 · 深层放松',
    detail: '甄选来自普罗旺斯的有机调香精油，由专业 SPA 师采用瑞典式按摩与淋巴引流手法相结合，全程 90 分钟，深层舒缓身心疲劳。',
    price: 588, originalPrice: 900, unit: '次',
    rating: 4.9, reviewCount: 1089,
    tags: ['VIP 推荐', '放松'],
    emoji: '🌿', tone: 'green',
    available: true,
  },
  {
    _id: 's008', categoryId: 'spa',
    name: '背部深层按摩', duration: 60,
    desc: '热石 + 手法 · 肩颈肌肉放松 · 改善驼背紧绷',
    detail: '采用天然玄武岩热石配合深层肌筋膜松解手法，重点疏通肩颈和腰背，适合长期伏案工作者。单次即可明显感受到肌肉放松。',
    price: 328, originalPrice: null, unit: '次',
    rating: 4.8, reviewCount: 765,
    tags: ['热卖', '缓解疲劳'],
    emoji: '🪨', tone: 'stone',
    available: true,
  },
  {
    _id: 's009', categoryId: 'spa',
    name: '头皮护理·养发', duration: 45,
    desc: '头皮检测 + 精华导入 · 改善油脂分泌 · 养护发根',
    detail: '使用专业头皮检测仪分析头皮状态，针对性选用养发精华通过离子导入仪渗透毛囊，调节皮脂腺分泌，适合油脂旺盛、发质脆弱人群。',
    price: 198, originalPrice: null, unit: '次',
    rating: 4.6, reviewCount: 334,
    tags: ['养护'],
    emoji: '💆', tone: 'teal',
    available: true,
  },
];

// 时段（09:00-20:00 每小时）
const TIME_SLOTS = [
  '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00',
];

// 模拟已满时段（随机）
const FULL_SLOTS = { '10:00': true, '14:00': true };

// 模拟预约订单
const MOCK_ORDERS = [
  {
    _id: 'o001', serviceId: 's001',
    serviceName: '深层补水焕肤', duration: 90,
    date: '2026-05-28', time: '15:00',
    status: 'confirmed',   // pending / confirmed / done / cancelled
    price: 498,
    emoji: '🌊',
    createdAt: '2026-05-27T10:20:00Z',
  },
  {
    _id: 'o002', serviceId: 's007',
    serviceName: '精油全身 SPA', duration: 90,
    date: '2026-05-20', time: '13:00',
    status: 'done',
    price: 588,
    emoji: '🌿',
    createdAt: '2026-05-18T09:00:00Z',
  },
  {
    _id: 'o003', serviceId: 's004',
    serviceName: '日式凝胶美甲·单色', duration: 90,
    date: '2026-05-15', time: '11:00',
    status: 'done',
    price: 128,
    emoji: '💅',
    createdAt: '2026-05-13T14:30:00Z',
  },
];

const STATUS_MAP = {
  pending:   { text: '待确认', color: '#C28A2A', bg: '#FAF1DA' },
  confirmed: { text: '已确认', color: '#3D8E5C', bg: '#EEF6F0' },
  done:      { text: '已完成', color: '#7A7390', bg: '#EEE9F6' },
  cancelled: { text: '已取消', color: '#B5503E', bg: '#FAE6E0' },
};

module.exports = { CATEGORIES, SERVICES, TIME_SLOTS, FULL_SLOTS, MOCK_ORDERS, STATUS_MAP };
