export type PoiType = 'mine' | 'rail' | 'factory' | 'view' | 'village'

export interface HeritageSite {
  id: string
  name: string
  english: string
  type: PoiType
  typeLabel: string
  image: string
  period: string
  distance: string
  hours: string
  status: 'open' | 'limited' | 'closed'
  statusLabel: string
  address: string
  duration: string
  ticket: string
  description: string
  coordinates: { left: number; top: number }
  highlights: string[]
}

export interface ArchiveStory {
  id: string
  year: string
  title: string
  summary: string
  image: string
  category: string
}

export interface RouteStop {
  id: string
  time: string
  title: string
  subtitle: string
  distance: string
  duration: string
  transport: string
  image: string
}

export interface RoutePlan {
  id: string
  title: string
  subtitle: string
  cover: string
  duration: string
  distance: string
  level: string
  stops: RouteStop[]
}

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  sold: number
  image: string
  category: string
  badge?: string
  description: string
}

const asset = (file: string) => `./assets/images/${file}`

export const imageAssets = {
  logo: asset('logo-honglu.png'),
  hero: asset('rail-village-crop.jpg'),
  quarry: asset('quarry-crop.jpg'),
  village: asset('mine-village-crop.jpg'),
  locomotive: asset('locomotive-crop.jpg'),
  map: asset('memory-map.png'),
}

export const heritageSites: HeritageSite[] = [
  {
    id: 'mine-lake', name: '天青矿坑遗址', english: 'TIANQING QUARRY', type: 'mine', typeLabel: '矿坑', image: imageAssets.quarry,
    period: '1958 — 2007', distance: '12.6 km', hours: '09:30 — 17:30', status: 'open', statusLabel: '开放中', address: '红炉镇西南 · 天青山脚', duration: '约 1.5 小时', ticket: '免票预约',
    description: '从采掘留下的断面，到雨水汇成的湖面，天青矿坑把一段工业记忆交给了山林。', coordinates: { left: 62, top: 36 }, highlights: ['矿坑观景台', '旧爆破平台', '山地步道'],
  },
  {
    id: 'red-furnace', name: '红炉老矿洞', english: 'RED FURNACE MINE', type: 'mine', typeLabel: '矿洞', image: imageAssets.village,
    period: '1964 — 1980', distance: '8.4 km', hours: '10:00 — 18:00', status: 'limited', statusLabel: '需预约', address: '红炉镇东侧 · 老街入口', duration: '约 1 小时', ticket: '¥30 / 人',
    description: '老矿洞保留了进风巷、矿车轨和工人休息室。数字导览会把每一个编号还原成可听见的故事。', coordinates: { left: 38, top: 58 }, highlights: ['进风巷', '矿车轨', '工人休息室'],
  },
  {
    id: 'rail-station', name: '红炉工业铁路', english: 'HONG LU RAILWAY', type: 'rail', typeLabel: '铁路', image: imageAssets.locomotive,
    period: '1970 — 1990', distance: '5.2 km', hours: '全天开放', status: 'open', statusLabel: '开放中', address: '红炉镇中心 · 老站台', duration: '约 45 分钟', ticket: '免费',
    description: '蓝色电力机车仍停在老站台旁。沿着轨道慢行，可以看到厂区、村落与山谷如何被一条线连接。', coordinates: { left: 54, top: 70 }, highlights: ['老站台', '电力机车', '铁道桥'],
  },
  {
    id: 'workshop', name: '铸造车间旧址', english: 'FOUNDRY WORKSHOP', type: 'factory', typeLabel: '厂房', image: imageAssets.hero,
    period: '1962 — 2001', distance: '6.7 km', hours: '10:00 — 17:00', status: 'open', statusLabel: '开放中', address: '红炉镇北侧 · 旧厂区', duration: '约 50 分钟', ticket: '免费',
    description: '保留下来的天车、铆钉和墙面编号，是一座工厂最诚实的年轮。', coordinates: { left: 73, top: 61 }, highlights: ['老天车', '铆钉墙', '设备档案'],
  },
  {
    id: 'ridge-view', name: '望炉山观景台', english: 'WANG-LU RIDGE', type: 'view', typeLabel: '观景点', image: imageAssets.village,
    period: '当代开放', distance: '10.1 km', hours: '07:00 — 19:00', status: 'open', statusLabel: '开放中', address: '红炉镇北岭 · 山脊线', duration: '约 30 分钟', ticket: '免费',
    description: '从山脊线上仰瞰矿区、铁路与村落，适合在日落前完成最后一站。', coordinates: { left: 25, top: 26 }, highlights: ['山脊线', '日落视野', '村落全景'],
  },
]

export const archiveStories: ArchiveStory[] = [
  { id: 'archive-01', year: '1964', title: '三线建设档案', summary: '一座工厂如何落在山谷里', image: imageAssets.hero, category: '档案' },
  { id: 'archive-02', year: '1970', title: '红炉电力机车', summary: '轨道把煤与日常生活连在一起', image: imageAssets.locomotive, category: '机车' },
  { id: 'archive-03', year: '1980', title: '矿工口述史', summary: '下井之前，先把灯点亮', image: imageAssets.village, category: '人物' },
  { id: 'archive-04', year: '1992', title: '老站台的最后一班车', summary: '一条铁路留下的乡镇纹理', image: imageAssets.quarry, category: '铁路' },
]

export const routePlans: RoutePlan[] = [{
  id: 'memory-day', title: '红炉工业记忆一日游', subtitle: '沿着轨道，走进山谷里的工业年代', cover: imageAssets.hero, duration: '6 小时', distance: '9.8 km', level: '轻徒步',
  stops: [
    { id: 'stop-1', time: '09:30', title: '红炉老矿洞', subtitle: '听见第一盏矿灯', distance: '0 km', duration: '60 分钟', transport: '步行', image: imageAssets.village },
    { id: 'stop-2', time: '11:10', title: '红炉工业铁路', subtitle: '与蓝色机车合影', distance: '1.8 km', duration: '45 分钟', transport: '步行 25 分钟', image: imageAssets.locomotive },
    { id: 'stop-3', time: '13:30', title: '铸造车间旧址', subtitle: '看设备留下的年轮', distance: '2.6 km', duration: '50 分钟', transport: '接驳车', image: imageAssets.hero },
    { id: 'stop-4', time: '16:20', title: '天青矿坑遗址', subtitle: '在矿坑湖面收束一天', distance: '5.4 km', duration: '90 分钟', transport: '接驳车', image: imageAssets.quarry },
  ],
}]

export const products: Product[] = [
  { id: 'lamp', name: '复制矿灯', subtitle: '红炉档案系列 · 可充电', price: 128, sold: 286, image: asset('product-lamp.png'), category: '灯具', badge: '热卖', description: '以老矿灯轮廓为原型，加入暖光 LED 与 Type-C 充电，适合露营和书桌使用。' },
  { id: 'badge', name: '工业徽章套装', subtitle: '机车 / 矿洞 / 车间', price: 48, sold: 512, image: asset('product-badge.png'), category: '徽章', badge: '新品', description: '三枚珐琯徽章，记录红炉最有辨识度的三个工业符号。' },
  { id: 'tote', name: '轨道帆布包', subtitle: '16oz 厚帆布 · 内袋', price: 98, sold: 174, image: asset('product-tote.png'), category: '包袋', description: '以旧铁路信号色为灵感，宽肩带适合一日探索携带。' },
  { id: 'magnet', name: '矿车冰箱贴', subtitle: '锈红金属 · 手工做旧', price: 38, sold: 328, image: asset('product-magnet.png'), category: '摆件', description: '小尺寸金属矿车，保留焊点与磨砂质感。' },
  { id: 'figure', name: '山城小队挂件', subtitle: '探索者 IP · 限量色', price: 58, sold: 96, image: asset('product-figure.png'), category: '挂件', badge: '限量', description: '把红炉探索者带在身边，附可替换的小旗帜配件。' },
]

export const poiFilters: Array<{ id: PoiType | 'all'; label: string }> = [
  { id: 'all', label: '全部' }, { id: 'mine', label: '矿洞 / 矿坑' }, { id: 'rail', label: '工业铁路' }, { id: 'factory', label: '厂房设备' }, { id: 'view', label: '观景点' },
]

export const shopCategories = ['全部', '灯具', '徽章', '包袋', '摆件', '挂件']
