import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight,
  Clock3, Compass, Headphones, Heart, History, LocateFixed, Map as MapIcon, MapPin, Navigation, Package,
  Play, Route, ScanLine, Search, ShoppingCart, Sparkles, Ticket, TrainFront, UserRound, Volume2,
  WalletCards,
} from 'lucide-react'
import {
  AudioToggle, Button, CameraFrame, EmptyState, ExploreButton, FavoriteButton, FloatingBack,
  HeritageCard, InlineLink, MapMarker, MiniPill, MissionCard, Modal, Photo, POICard, ProductCard,
  ProgressBar, QuickAction, QuickStatStrip, SearchBar, SectionTitle, ShareButton, Sheet, StoryRow,
  Tag, TopBar,
} from './components'
import { archiveStories, heritageSites, imageAssets, poiFilters, products, routePlans, shopCategories, type HeritageSite, type PoiType, type Product } from './data'
import { useFeedback } from './feedback'
import { useStore } from './store'

const copy = {
  explore: '开始探索', discover: '发现红炉的新故事', nearby: '附近遗产', today: '今日探索', route: '热门路线', archives: '工业遗产档案', seeAll: '查看全部', map: '红炉工业遗产地图', scan: 'AR扫描', mine: '地下时光', village: '乡村漫游', study: '工业研学', open: '开放中', limited: '需预约', details: '查看详情', start: '开始探索', distance: '距离', hours: '开放时间', free: '免费', all: '全部', camera: '对准工业遗产，开启 AR 体验', enterHistory: '进入历史', archive: '档案', cart: '购物车', checkout: '结算', order: '提交订单', profile: '个人中心', completed: '已完成', checkin: '打卡', navigation: '导航', locate: '定位', favorite: '收藏', saved: '已收藏', share: '分享', loading: '识别中'
}

export function SplashPage() {
  return <section className="splash-page">
    <Photo src={imageAssets.hero} alt="红炉工业铁路与山城景观" className="splash-page__photo" position="center 48%" />
    <div className="splash-page__veil" />
    <div className="splash-page__content"><div className="splash-page__brand"><img src={imageAssets.logo} alt="红炉再燃" /><div><h1>红炉再燃</h1><p>HONG LU REBORN</p></div></div><p className="splash-page__intro">重庆工业遗产数字活化<br />与乡村文旅创新</p><ExploreButton to="/home">{copy.explore}</ExploreButton><span className="splash-page__hint">一座城市，一条铁路，一段被重新看见的记忆</span></div>
    <span className="splash-page__index">01 / 05</span><span className="splash-page__stamp">CHONGQING / 2026</span>
  </section>
}

export function HomePage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => query.trim() ? heritageSites.filter((site) => `${site.name}${site.typeLabel}`.includes(query.trim())) : [], [query])
  const quickActions = [
    { to: '/map', icon: MapIcon, label: '遗产地图' }, { to: '/ar', icon: ScanLine, label: copy.scan, accent: true },
    { to: '/immersive/red-furnace', icon: Headphones, label: copy.mine }, { to: '/archives', icon: BookOpen, label: copy.archives },
    { to: '/route/memory-day', icon: Route, label: copy.study }, { to: '/heritage/ridge-view', icon: Compass, label: copy.village },
  ]
  return <div className="page home-page"><TopBar action={<div className="top-bar__actions"><Link to="/profile" className="avatar-button" aria-label={copy.profile}><UserRound size={18} /></Link></div>} /><div className="page-pad">
    <SearchBar value={query} onChange={setQuery} />
    {query && <div className="search-results">{filtered.length ? filtered.map((site) => <Link key={site.id} to={`/heritage/${site.id}`}><span>{site.name}</span><ChevronRight size={16} /></Link>) : <p>没有找到匹配的遗产</p>}</div>}
    <section className="home-hero"><Photo src={imageAssets.hero} alt="红炉工业铁路" position="center 48%" /><div className="home-hero__veil" /><div className="home-hero__meta"><Tag tone="accent">重庆 / 红炉镇</Tag><span>一条轨道，串起山谷里的工业记忆</span></div><div className="home-hero__copy"><span className="eyebrow">HONG LU FIELD NOTE  /  001</span><h1>沿着铁路<br />重新认识红炉</h1><Link to="/route/memory-day" className="hero-link">{copy.start}<ArrowRight size={15} /></Link></div></section>
    <div className="quick-actions">{quickActions.map((item) => <QuickAction key={item.to} {...item} />)}</div>
    <SectionTitle eyebrow="TODAY IN HONG LU" title={copy.today} action={<InlineLink to="/map">{copy.seeAll}</InlineLink>} />
    <Link to="/heritage/mine-lake" className="feature-card"><Photo src={imageAssets.quarry} alt="天青矿坑遗址" position="center 22%" /><div className="feature-card__body"><div><Tag tone="accent">今日推荐</Tag><h3>天青矿坑遗址</h3><p>观景台已开放 · 适合日落前到达</p></div><ArrowRight size={18} /></div></Link>
    <SectionTitle eyebrow="FIELD MISSION" title="今日任务" action={<InlineLink to="/missions">查看任务</InlineLink>} />
    <Link to="/missions" className="home-mission"><div className="home-mission__icon"><ScanLine size={22} /></div><div><span>AR 记忆徽章</span><h3>找到老站台的蓝色机车</h3><p>完成扫描，解锁 80 探索积分</p></div><ArrowRight size={18} /></Link>
    <SectionTitle eyebrow="WALK THE LINE" title={copy.route} action={<InlineLink to="/route/memory-day">{copy.seeAll}</InlineLink>} />
    <div className="horizontal-scroll"><Link to="/route/memory-day" className="route-card"><Photo src={imageAssets.village} alt="一日路线" /><div><span>01 / 04  ·  {copy.route}</span><h3>红炉工业记忆一日游</h3><p>6 小时  /  9.8 km</p></div></Link><Link to="/immersive/red-furnace" className="route-card"><Photo src={imageAssets.locomotive} alt="地下时光" /><div><span>02 / 04  ·  IMMERSIVE</span><h3>地下时光：老矿洞声景</h3><p>40 分钟  /  低照度体验</p></div></Link></div>
    <SectionTitle eyebrow="NEARBY HERITAGE" title={copy.nearby} action={<InlineLink to="/map">{copy.map}</InlineLink>} />
    <div className="site-list">{heritageSites.slice(1, 4).map((site) => <HeritageCard key={site.id} site={site} compact />)}</div>
    <div className="home-note"><Sparkles size={17} /><p>今天的红炉有 5 个遗产点在等你解锁。完成一次 AR 扫描，收集一枚时间印章。</p></div>
  </div></div>
}

export function MapPage() {
  const [searchParams] = useSearchParams()
  const initialSite = heritageSites.find((site) => site.id === searchParams.get('site')) ?? heritageSites[1]
  const [filter, setFilter] = useState<PoiType | 'all'>('all')
  const [selected, setSelected] = useState<HeritageSite | null>(initialSite)
  const [locating, setLocating] = useState(false)
  const { showToast } = useFeedback()
  const visible = filter === 'all' ? heritageSites : heritageSites.filter((site) => site.type === filter)
  const locate = () => { setLocating(true); window.setTimeout(() => { setLocating(false); showToast('已定位到红炉镇老街'); }, 700) }
  return <div className="page map-page"><TopBar title={copy.map} action={<Link to="/route/memory-day" className="text-action">{copy.route}</Link>} /><div className="map-toolbar">{poiFilters.map((item) => <button key={item.id} className={`chip ${filter === item.id ? 'is-active' : ''}`} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div><section className="map-stage"><Photo src={imageAssets.map} alt="红炉工业遗产地图" /><div className="map-stage__wash" /><div className="map-route-line" />{visible.map((site) => <span key={site.id} style={{ left: `${site.coordinates.left}%`, top: `${site.coordinates.top}%` }} className="map-marker-wrap"><MapMarker label={site.typeLabel} type={site.type} active={selected?.id === site.id} onClick={() => setSelected(site)} /></span>)}<button className={`locate-button ${locating ? 'is-loading' : ''}`} aria-label={copy.locate} onClick={locate}><LocateFixed size={19} /></button><div className="map-legend"><span><i className="legend-dot legend-dot--orange" />遗产点</span><span><i className="legend-dot legend-dot--gray" />建议路线</span></div></section><Sheet open={Boolean(selected)} onClose={() => setSelected(null)} title="附近遗产">{selected && <POICard site={selected} />}</Sheet></div>
}

export function ARPage() {
  const [cameraState, setCameraState] = useState<'idle' | 'scanning' | 'result'>('idle')
  const [helpOpen, setHelpOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const timerRef = useRef<number | null>(null)
  const { dispatch } = useStore()
  const { showToast } = useFeedback()
  const navigate = useNavigate()
  const target = heritageSites.find((site) => site.id === searchParams.get('site')) ?? heritageSites.find((site) => site.id === 'rail-station') ?? heritageSites[0]

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current) }, [])

  const startScan = () => {
    setCameraState('scanning')
    timerRef.current = window.setTimeout(() => { dispatch({ type: 'addScan', id: target.id }); setCameraState('result'); showToast(`识别成功：${target.name}`) }, 1200)
  }

  return <div className="ar-page"><div className="ar-page__background"><Photo src={target.image} alt="AR 记忆扫描背景" /><div className="ar-page__scrim" /></div><div className="ar-page__top"><button className="ar-back" onClick={() => navigate('/home')} aria-label="返回首页"><ArrowLeft size={20} /></button><div><span>AR SCAN / HONG LU</span><strong>记忆扫描</strong></div><button className="ar-help" aria-label="使用说明" onClick={() => setHelpOpen(true)}><span>?</span></button></div><div className="ar-page__center"><span className="ar-overline">{cameraState === 'result' ? '已识别遗产档案' : copy.camera}</span>{cameraState !== 'result' && <CameraFrame scanning={cameraState === 'scanning'} />}{cameraState === 'result' && <div className="scan-result"><div className="scan-result__image"><Photo src={target.image} alt={target.name} /><Tag tone="accent">{target.period} / {target.typeLabel}</Tag></div><span className="eyebrow">RECOGNIZED HERITAGE</span><h2>{target.name}</h2><p>{target.description}</p><Button to={`/heritage/${target.id}`}>{copy.enterHistory}<ArrowRight size={16} /></Button></div>}</div><div className="ar-page__bottom">{cameraState !== 'result' && <div className="ar-control"><div className="ar-control__caption"><ScanLine size={18} /><span>{cameraState === 'scanning' ? copy.loading : '识别老照片或遗产标识'}</span></div><Button onClick={startScan} disabled={cameraState === 'scanning'}><ScanLine size={18} />{cameraState === 'scanning' ? '正在识别' : '开始扫描'}</Button></div>}{cameraState === 'result' && <Button variant="outline" onClick={() => setCameraState('idle')}>再扫一次</Button>}</div><Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="AR 记忆扫描"><div className="ar-help-copy"><p>对准遗产标识或老照片，即可读取对应历史档案。</p><Button onClick={() => setHelpOpen(false)}>知道了</Button></div></Modal></div>
}

export function ArchivesPage() {
  const [category, setCategory] = useState(copy.all)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const categories = [copy.all, '档案', '机车', '人物', '铁路']
  const visible = archiveStories.filter((story) => (category === copy.all || story.category === category) && `${story.year}${story.title}${story.summary}`.includes(query.trim()))
  return <div className="page archives-page"><TopBar title={copy.archives} back action={<button className="text-action" onClick={() => setSearchOpen(!searchOpen)} aria-label="搜索档案"><Search size={18} /></button>} /><div className="page-pad">{searchOpen && <div className="archive-search"><SearchBar value={query} onChange={setQuery} placeholder="搜索年份、人物或历史故事" /></div>}<div className="archive-intro"><span className="eyebrow">THE HONG LU ARCHIVE / 1964—2007</span><h2>把遗产变成可以触摸的故事</h2><p>沿着时间轴去看，每一个站点都有人生在里面。</p></div><div className="chip-row">{categories.map((item) => <button key={item} className={`chip ${category === item ? 'is-active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div><section className="archive-feature"><Photo src={imageAssets.hero} alt="三线建设档案" /><div><span className="eyebrow">FEATURED FILE / 1964</span><h3>三线建设：一座工厂落在山谷里</h3><Link to="/heritage/workshop">打开档案 <ArrowRight size={15} /></Link></div></section><SectionTitle eyebrow="TIMELINE" title="时间轴" /><div className="archive-list">{visible.length ? visible.map((story) => <StoryRow key={story.id} image={story.image} year={story.year} title={story.title} summary={story.summary} to={`/heritage/${story.id === 'archive-02' ? 'rail-station' : story.id === 'archive-03' ? 'red-furnace' : story.id === 'archive-04' ? 'mine-lake' : 'workshop'}`} />) : <EmptyState icon={Search} title="暂无匹配档案" text="换一个年份或关键词试试。" />}</div></div></div>
}

export function HeritageDetailPage() {
  const { id } = useParams()
  const site = heritageSites.find((item) => item.id === id)
  if (!site) return <Navigate to="/home" replace />
  return <div className="detail-page"><section className="detail-hero"><Photo src={site.image} alt={site.name} position={site.id === 'mine-lake' ? 'center 18%' : 'center 38%'} /><div className="detail-hero__veil" /><div className="detail-hero__top"><FloatingBack /><div className="detail-hero__actions"><FavoriteButton id={site.id} light /><ShareButton /></div></div><div className="detail-hero__copy"><Tag tone="accent">{site.typeLabel} / {site.period}</Tag><h1>{site.name}</h1><p>{site.english}</p></div></section><div className="detail-body"><div className="detail-location"><MapPin size={17} /><span>{site.address}</span><Tag tone="success">{site.statusLabel}</Tag></div><QuickStatStrip distance={site.distance} duration={site.duration} level={site.ticket} /><p className="detail-lead">{site.description}</p><div className="detail-actions"><Button to={`/ar?site=${site.id}`}><ScanLine size={17} /> AR {copy.explore}</Button><Button to={`/map?site=${site.id}`} variant="outline"><Navigation size={17} />{copy.navigation}</Button></div><section className="detail-block"><SectionTitle eyebrow="FIELD NOTES" title="现场建议" /><ul className="detail-list"><li><Clock3 size={17} /><span><b>{copy.hours}</b>{site.hours}</span></li><li><Ticket size={17} /><span><b>参观方式</b>{site.ticket}</span></li><li><Compass size={17} /><span><b>建议停留</b>{site.duration}</span></li></ul></section><section className="detail-block"><SectionTitle eyebrow="HIGHLIGHTS" title="这里可以看见" /><div className="highlight-grid">{site.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></section><section className="detail-story"><span className="eyebrow">A NOTE FROM HONG LU</span><h2>工业不是被封存的时间，而是仍在与山水相处的日常。</h2><Link to="/archives" className="inline-link">读更多档案 <ArrowRight size={15} /></Link></section></div><div className="detail-bottom-bar"><Button to="/route/memory-day">{copy.start}<ArrowRight size={16} /></Button><span>{site.status === 'limited' ? '需提前预约' : '今日可前往'}</span></div></div>
}

export function UndergroundPage() {
  const [playing, setPlaying] = useState(false)
  const [chapter, setChapter] = useState(0)
  const chapters = [
    { title: '进风巷', text: '水滴、脚步和远处的风机声', time: '02:18' },
    { title: '矿灯下', text: '一位老工人记得的第一次下井', time: '04:42' },
    { title: '轨道尽头', text: '从黑暗走到有光的地方', time: '03:26' },
  ]
  return <div className="immersive-page"><Photo src={imageAssets.village} alt="地下时光矿洞场景" className="immersive-page__photo" position="center 36%" /><div className="immersive-page__veil" /><div className="immersive-page__top"><FloatingBack /><div className="immersive-page__actions"><AudioToggle playing={playing} onToggle={() => setPlaying(!playing)} /><ShareButton /></div></div><div className="immersive-page__content"><span className="eyebrow">UNDERGROUND MEMORY / 01</span><h1>地下时光</h1><p>穿过老矿洞，听见一座小镇的心跳。</p><div className="immersive-player"><div className="immersive-player__head"><div><span>FIELD RECORDING</span><strong>{chapters[chapter].title}</strong></div><span>{chapters[chapter].time}</span></div><div className="waveform">{Array.from({ length: 30 }, (_, index) => <i key={index} style={{ height: `${18 + ((index * 13) % 36)}px` }} className={index < 9 && playing ? 'is-played' : ''} />)}</div><p>{chapters[chapter].text}</p><button className="player-button" onClick={() => setPlaying(!playing)} aria-label={playing ? '暂停' : '播放'}>{playing ? <Volume2 size={21} /> : <Play size={21} fill="currentColor" />}</button></div><div className="chapter-list">{chapters.map((item, index) => <button key={item.title} className={`chapter-item ${chapter === index ? 'is-active' : ''}`} onClick={() => { setChapter(index); setPlaying(false) }}><span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.text}</small></div><span>{item.time}</span></button>)}</div><Button to="/heritage/red-furnace" variant="outline">查看遗址详情 <ArrowRight size={16} /></Button></div></div>
}

function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, dispatch } = useStore()
  const { showToast } = useFeedback()
  const items = Object.entries(state.cart).map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity })).filter((item): item is { product: Product; quantity: number } => Boolean(item.product))
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const [checkout, setCheckout] = useState(false)
  const placeOrder = () => { dispatch({ type: 'placeOrder' }); setCheckout(false); onClose(); showToast('订单已提交，感谢支持红炉文创') }
  return <Sheet open={open} onClose={onClose} title={copy.cart}>{items.length === 0 ? <EmptyState icon={ShoppingCart} title="购物车还是空的" text="把一件红炉记忆带回家。" action={<Button onClick={onClose}>继续选购</Button>} /> : <div className="cart-sheet"><div className="cart-items">{items.map(({ product, quantity }) => <div className="cart-item" key={product.id}><Photo src={product.image} alt={product.name} /><div><h3>{product.name}</h3><p>¥{product.price}</p><div className="cart-item__stepper"><button onClick={() => dispatch({ type: 'removeFromCart', id: product.id })}>-</button><span>{quantity}</span><button onClick={() => dispatch({ type: 'addToCart', id: product.id })}>+</button></div></div><strong>¥{product.price * quantity}</strong></div>)}</div><div className="cart-total"><span>合计</span><strong>¥{total}</strong></div><Button onClick={() => setCheckout(true)} data-testid="checkout-button">{copy.checkout}<ArrowRight size={16} /></Button><Modal open={checkout} onClose={() => setCheckout(false)} title={copy.order}><div className="checkout-modal"><div className="checkout-row"><span>商品金额</span><strong>¥{total}</strong></div><div className="checkout-row"><span>配送方式</span><span>文创仓配送</span></div><Button onClick={placeOrder}>{copy.order}<Check size={16} /></Button></div></Modal></div>}</Sheet>
}

export function ShopPage() {
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(shopCategories[0])
  const [cartOpen, setCartOpen] = useState(searchParams.get('cart') === '1')
  const [sortMode, setSortMode] = useState<'popular' | 'price'>('popular')
  const { state, dispatch } = useStore()
  const { showToast } = useFeedback()
  const filteredProducts = category === shopCategories[0] ? products : products.filter((item) => item.category === category)
  const visible = [...filteredProducts].sort((a, b) => sortMode === 'popular' ? b.sold - a.sold : a.price - b.price)
  const cartCount = Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0)
  const add = (product: Product) => { dispatch({ type: 'addToCart', id: product.id }); showToast(`${product.name} 已加入购物车`) }
  return <div className="page shop-page"><TopBar title="红炉文创局" action={<button className="cart-button" onClick={() => setCartOpen(true)} aria-label={copy.cart}><ShoppingCart size={19} />{cartCount > 0 && <b>{cartCount}</b>}</button>} /><div className="page-pad"><div className="shop-banner"><Photo src={imageAssets.locomotive} alt="工业文创" /><div><span className="eyebrow">OBJECTS WITH A MEMORY</span><h2>把一段工业记忆带回家</h2><p>从矿灯、机车到帆布包，每一件都有档案番号。</p></div></div><div className="chip-row shop-categories">{shopCategories.map((item) => <button key={item} className={`chip ${category === item ? 'is-active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="shop-toolbar"><span>今日推荐  /  {visible.length} 件</span><button onClick={() => setSortMode(sortMode === 'popular' ? 'price' : 'popular')}>{sortMode === 'popular' ? '销量优先' : '价格优先'} <ChevronDown size={15} /></button></div><div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} />)}</div><div className="shop-note"><Package size={18} /><div><strong>每件文创都附有一张小档案</strong><p>收到后扫描包装上的 QR 码，解锁它的原型故事。</p></div></div></div><CartSheet open={cartOpen} onClose={() => setCartOpen(false)} /></div>
}

export function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const { state, dispatch } = useStore()
  const { showToast } = useFeedback()
  const [buyOpen, setBuyOpen] = useState(false)
  if (!product) return <Navigate to="/shop" replace />
  const quantity = state.cart[product.id] ?? 0
  const add = () => { dispatch({ type: 'addToCart', id: product.id }); showToast('已加入购物车') }
  return <div className="product-detail"><div className="product-detail__top"><FloatingBack /><div><FavoriteButton id={`product-${product.id}`} light /><Link to="/shop?cart=1" className="icon-button" aria-label={copy.cart}><ShoppingCart size={19} /></Link></div></div><div className="product-detail__image"><Photo src={product.image} alt={product.name} /><Tag tone="accent">{product.badge ?? '红炉档案系列'}</Tag></div><div className="product-detail__body"><span className="eyebrow">HONG LU OBJECT / {product.category}</span><h1>{product.name}</h1><p className="product-detail__subtitle">{product.subtitle}</p><div className="product-detail__price"><strong>¥{product.price}</strong><span>{product.sold} 人已购</span></div><p className="product-detail__description">{product.description}</p><div className="product-detail__specs"><div><span>材质</span><strong>金属 / 厚帆布</strong></div><div><span>档案号</span><strong>HL-{product.id.toUpperCase()}</strong></div><div><span>配送</span><strong>全国包邮</strong></div></div></div><div className="product-detail__bar"><div className="product-detail__qty">{quantity > 0 && <span>已选 {quantity} 件</span>}</div><Button variant="outline" onClick={add} data-testid="product-add">加入购物车</Button><Button onClick={() => { add(); setBuyOpen(true) }}>{copy.checkout}<ArrowRight size={16} /></Button></div><Modal open={buyOpen} onClose={() => setBuyOpen(false)} title="确认购买"><div className="checkout-modal"><div className="checkout-row"><span>{product.name} x {quantity || 1}</span><strong>¥{product.price * (quantity || 1)}</strong></div><Button onClick={() => { dispatch({ type: 'placeOrder' }); setBuyOpen(false); showToast('订单已提交') }}>{copy.order}<Check size={16} /></Button></div></Modal></div>
}

const missionDefinitions = [
  { id: 'mission-rail', title: '找到蓝色机车', subtitle: '在老站台完成一次 AR 记忆扫描', reward: '80 积分', image: imageAssets.locomotive },
  { id: 'mission-mine', title: '听完一段矿工故事', subtitle: '进入“地下时光”，点亮第一盏矿灯', reward: '120 积分', image: imageAssets.village },
  { id: 'mission-route', title: '走完工业记忆线', subtitle: '沿铁路连续打卡 4 个遗产点', reward: '限定徽章', image: imageAssets.hero },
]

export function MissionsPage() {
  const { state, dispatch } = useStore()
  const { showToast } = useFeedback()
  const completed = missionDefinitions.filter((mission) => state.checkIns.includes(mission.id)).length
  const completeMission = (id: string, title: string) => {
    dispatch({ type: 'checkIn', id })
    showToast(`打卡成功：${title}`)
  }
  return <div className="page missions-page"><TopBar title="探索任务" back action={<Tag tone="accent">{completed}/{missionDefinitions.length}</Tag>} /><div className="page-pad"><section className="mission-summary"><div><span className="eyebrow">FIELD MISSION / SEASON 01</span><h1>把历史，走成自己的足迹</h1><p>完成现场打卡，收集属于红炉的数字印章。</p></div><div className="mission-summary__progress"><strong>{completed * 100 + 40}</strong><span>探索积分</span><ProgressBar value={(completed / missionDefinitions.length) * 100} /></div></section><SectionTitle eyebrow="ACTIVE MISSIONS" title="本期任务" /><div className="mission-list">{missionDefinitions.map((mission) => { const done = state.checkIns.includes(mission.id); return <MissionCard key={mission.id} {...mission} completed={done} progress={done ? 100 : mission.id === 'mission-route' ? 25 : 0} onAction={() => completeMission(mission.id, mission.title)} /> })}</div><SectionTitle eyebrow="DIGITAL BADGES" title="我的数字徽章" /><div className="badge-shelf">{['初见红炉', '铁路记录员', '地下听风者'].map((badge, index) => <div key={badge} className={index < Math.max(1, completed) ? 'is-unlocked' : ''}><Sparkles size={22} /><strong>{badge}</strong><span>{index < Math.max(1, completed) ? '已解锁' : '待解锁'}</span></div>)}</div></div></div>
}

export function RoutePlanPage() {
  const { id } = useParams()
  const plan = routePlans.find((item) => item.id === id)
  const { state, dispatch } = useStore()
  const { showToast } = useFeedback()
  if (!plan) return <Navigate to="/home" replace />
  const siteIds = ['red-furnace', 'rail-station', 'workshop', 'mine-lake']
  const completed = siteIds.filter((siteId) => state.checkIns.includes(siteId)).length
  const checkIn = (siteId: string, title: string) => { dispatch({ type: 'checkIn', id: siteId }); showToast(`已打卡：${title}`) }
  return <div className="route-page"><section className="route-hero"><Photo src={plan.cover} alt={plan.title} /><div className="route-hero__veil" /><div className="route-hero__top"><FloatingBack /><Tag tone="dark">一日线 / 4 站</Tag></div><div className="route-hero__copy"><span className="eyebrow">CURATED ROUTE / HONG LU</span><h1>{plan.title}</h1><p>{plan.subtitle}</p></div></section><div className="route-body"><div className="route-overview"><MiniPill icon={Clock3}>{plan.duration}</MiniPill><MiniPill icon={Navigation}>{plan.distance}</MiniPill><MiniPill icon={TrainFront}>{plan.level}</MiniPill></div><div className="route-progress"><div><strong>行程进度</strong><span>{completed} / {plan.stops.length} 站</span></div><ProgressBar value={(completed / plan.stops.length) * 100} /></div><SectionTitle eyebrow="SCHEDULE" title="按时间走过红炉" /><div className="route-timeline">{plan.stops.map((stop, index) => { const siteId = siteIds[index]; const done = state.checkIns.includes(siteId); return <article className={`route-stop ${done ? 'is-complete' : ''}`} key={stop.id}><div className="route-stop__rail"><span>{done ? <Check size={14} /> : index + 1}</span></div><Link to={`/heritage/${siteId}`} className="route-stop__image"><Photo src={stop.image} alt={stop.title} /></Link><div className="route-stop__content"><div className="route-stop__time"><CalendarDays size={14} />{stop.time}<Tag tone={done ? 'success' : 'neutral'}>{done ? '已打卡' : stop.transport}</Tag></div><Link to={`/heritage/${siteId}`}><h3>{stop.title}</h3><p>{stop.subtitle}</p></Link><div className="route-stop__meta"><span>{stop.distance}</span><span>{stop.duration}</span></div><Button variant={done ? 'secondary' : 'outline'} onClick={() => checkIn(siteId, stop.title)}>{done ? <><Check size={15} />已完成</> : '现场打卡'}</Button></div></article> })}</div></div><div className="route-bottom-bar"><div><span>当前路线</span><strong>{plan.distance} · {plan.duration}</strong></div><Button to="/map">打开地图<Navigation size={16} /></Button></div></div>
}

export function ProfilePage() {
  const { state } = useStore()
  const favoriteSites = heritageSites.filter((site) => state.favorites.includes(site.id))
  const favoriteProducts = products.filter((product) => state.favorites.includes(`product-${product.id}`))
  const scannedSites = state.scanHistory.map((id) => heritageSites.find((site) => site.id === id)).filter((site): site is HeritageSite => Boolean(site))
  return <div className="page profile-page"><TopBar title="我的红炉" action={<Link to="/missions" className="text-action">任务</Link>} /><div className="page-pad"><section className="profile-hero"><div className="profile-avatar"><UserRound size={28} /></div><div><span>HONG LU EXPLORER</span><h1>山城探索者</h1><p>NO. CQ-HL-2026</p></div><Tag tone="accent">LV.2</Tag></section><div className="profile-stats"><div><strong>{state.checkIns.length}</strong><span>打卡</span></div><div><strong>{state.favorites.length}</strong><span>收藏</span></div><div><strong>{state.scanHistory.length}</strong><span>AR 记录</span></div><div><strong>{state.orders}</strong><span>订单</span></div></div><div className="profile-actions"><Link to="/missions"><Sparkles size={20} /><span>数字徽章</span><ChevronRight size={16} /></Link><Link to="/map"><History size={20} /><span>探索足迹</span><ChevronRight size={16} /></Link><Link to="/shop?cart=1"><Package size={20} /><span>文创订单</span><ChevronRight size={16} /></Link><Link to="/shop"><WalletCards size={20} /><span>优惠与权益</span><ChevronRight size={16} /></Link></div><SectionTitle eyebrow="SAVED PLACES" title="我的收藏" action={<span className="section-count">{favoriteSites.length + favoriteProducts.length}</span>} />{favoriteSites.length || favoriteProducts.length ? <div className="profile-saved">{favoriteSites.map((site) => <HeritageCard key={site.id} site={site} compact />)}{favoriteProducts.map((product) => <Link key={product.id} to={`/product/${product.id}`} className="saved-product"><Photo src={product.image} alt={product.name} /><div><span>红炉文创</span><strong>{product.name}</strong><b>¥{product.price}</b></div><ChevronRight size={18} /></Link>)}</div> : <EmptyState icon={Heart} title="还没有收藏" text="收藏一处遗产或一件文创，下次快速找到。" action={<Button to="/home" variant="outline">去发现</Button>} />}<SectionTitle eyebrow="RECENT RECORDS" title="最近探索" />{scannedSites.length ? <div className="profile-records">{scannedSites.slice(0, 3).map((site) => <Link key={site.id} to={`/heritage/${site.id}`}><ScanLine size={18} /><div><strong>{site.name}</strong><span>AR 识别档案</span></div><ChevronRight size={16} /></Link>)}</div> : <div className="profile-records"><Link to="/ar"><ScanLine size={18} /><div><strong>开始第一次 AR 扫描</strong><span>识别遗产标识，留下数字足迹</span></div><ChevronRight size={16} /></Link></div>}</div></div>
}
