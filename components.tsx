import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Bell, BookOpen, Camera, Check, ChevronRight, CircleHelp, Compass, Heart,
  History, Map, MapPin, MessageCircle, Minus, Navigation, Package, Plus, ScanLine, Search,
  Share2, ShoppingBag, ShoppingCart, Sparkles, Ticket, UserRound, Volume2, VolumeX, X,
} from 'lucide-react'
import { imageAssets, type HeritageSite, type Product } from './data'
import { FeedbackContext, useFeedback } from './feedback'
import { getCartCount, useStore } from './store'

const ui = {
  home: '首页', map: '地图', ar: 'AR扫描', shop: '文创', profile: '我的',
  back: '返回', close: '关闭', favorite: '收藏', unfavorite: '取消收藏', share: '分享',
  clear: '清除', message: '消息', locate: '定位', reduce: '减少数量', increase: '增加数量',
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark'

export function BrandMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <Link to="/home" className={`brand-mark ${light ? 'brand-mark--light' : ''}`} aria-label="Hong Lu Reborn home">
    <img src={imageAssets.logo} alt="Hong Lu Reborn logo" />
    {!compact && <span><strong>红炉再燃</strong><small>HONG LU REBORN</small></span>}
  </Link>
}

export function Button({ variant = 'primary', to, children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; to?: string; children: ReactNode }) {
  const classes = `button button--${variant} ${className}`
  if (to) return <Link to={to} className={classes}>{children}</Link>
  return <button className={classes} {...props}>{children}</button>
}

export function IconButton({ label, children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return <button className={`icon-button ${className}`} aria-label={label} title={label} {...props}>{children}</button>
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'success' | 'dark' }) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="section-title"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{action}</div>
}

function BackButton() {
  const navigate = useNavigate()
  return <IconButton label={ui.back} onClick={() => navigate(-1)}><ArrowLeft size={20} /></IconButton>
}

export function TopBar({ title, back = false, action, light = false }: { title?: string; back?: boolean; action?: ReactNode; light?: boolean }) {
  return <header className={`top-bar ${light ? 'top-bar--light' : ''}`}>
    {back ? <BackButton /> : <BrandMark light={light} compact />}
    {title ? <h1>{title}</h1> : <span className="top-bar__location"><MapPin size={14} /> 重庆 / 红炉镇</span>}
    <div className="top-bar__actions">{action ?? <IconButton label={ui.message}><Bell size={18} /></IconButton>}</div>
  </header>
}

const tabs = [
  { path: '/home', label: ui.home, icon: Compass },
  { path: '/map', label: ui.map, icon: Map },
  { path: '/ar', label: ui.ar, icon: ScanLine, emphasis: true },
  { path: '/shop', label: ui.shop, icon: ShoppingBag },
  { path: '/profile', label: ui.profile, icon: UserRound },
]

export function BottomTabs() {
  const location = useLocation()
  const { state } = useStore()
  const cartCount = getCartCount(state.cart)
  return <nav className="bottom-tabs" aria-label="Main navigation">{tabs.map(({ path, label, icon: Icon, emphasis }) => {
    const active = location.pathname === path || (path === '/home' && location.pathname === '/')
    return <Link key={path} to={path} data-testid={`tab-${path.slice(1)}`} className={`bottom-tab ${emphasis ? 'bottom-tab--ar' : ''} ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
      <span className="bottom-tab__icon"><Icon size={emphasis ? 22 : 19} strokeWidth={active ? 2.4 : 1.8} />{path === '/shop' && cartCount > 0 && <b className="tab-badge">{cartCount}</b>}</span><span>{label}</span>
    </Link>
  })}</nav>
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const noTabs = location.pathname === '/' || location.pathname === '/ar' || location.pathname.startsWith('/immersive') || location.pathname.startsWith('/product') || location.pathname.startsWith('/heritage') || location.pathname.startsWith('/route') || location.pathname.startsWith('/archives') || location.pathname.startsWith('/missions')
  return <div className="app-shell"><main className={`app-main ${noTabs ? 'app-main--no-tabs' : ''}`}>{children}</main>{!noTabs && <BottomTabs />}</div>
}

export function Photo({ src, alt, className = '', position }: { src: string; alt: string; className?: string; position?: string }) {
  return <img className={`photo ${className}`} src={src} alt={alt} loading="lazy" style={position ? { objectPosition: position } : undefined} />
}

export function FavoriteButton({ id, light = false }: { id: string; light?: boolean }) {
  const { state, dispatch } = useStore()
  const active = state.favorites.includes(id)
  return <IconButton label={active ? ui.unfavorite : ui.favorite} className={`favorite-button ${light ? 'favorite-button--light' : ''} ${active ? 'is-active' : ''}`} onClick={() => dispatch({ type: 'toggleFavorite', id })}><Heart size={19} fill={active ? 'currentColor' : 'none'} /></IconButton>
}

export function ShareButton() {
  const { showToast } = useFeedback()
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: 'Hong Lu Reborn', text: '一起去发现红炉的工业记忆', url: window.location.href })
      else await navigator.clipboard.writeText(window.location.href)
      showToast('链接已准备好')
    } catch { showToast('分享已取消') }
  }
  return <IconButton label={ui.share} onClick={share}><Share2 size={18} /></IconButton>
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null)
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(null), 2600); return () => window.clearTimeout(timer) }, [toast])
  return <FeedbackContext.Provider value={{ showToast: setToast }}>{children}{toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}</FeedbackContext.Provider>
}

export function Sheet({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: ReactNode; title?: string }) {
  if (!open) return null
  return <div className="sheet-backdrop" role="presentation" onClick={onClose}><section className="bottom-sheet" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}><div className="sheet-handle" />{title && <div className="sheet-title"><h2>{title}</h2><IconButton label={ui.close} onClick={onClose}><X size={18} /></IconButton></div>}{children}</section></div>
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}><div className="modal__head"><h2>{title}</h2><IconButton label={ui.close} onClick={onClose}><X size={18} /></IconButton></div>{children}</section></div>
}

export function SearchBar({ value, onChange, placeholder = '搜索遗产、路线或故事' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="search-bar"><Search size={17} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} />{value && <IconButton label={ui.clear} onClick={() => onChange('')}><X size={15} /></IconButton>}</label>
}

export function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  const { state, dispatch } = useStore()
  const quantity = state.cart[product.id] ?? 0
  const favoriteId = `product-${product.id}`
  const favorite = state.favorites.includes(favoriteId)
  return <article className="product-card"><Link to={`/product/${product.id}`} className="product-card__image"><Photo src={product.image} alt={product.name} />{product.badge && <Tag tone="accent">{product.badge}</Tag>}</Link><button className={`product-card__corner ${favorite ? 'is-active' : ''}`} aria-label={favorite ? `取消收藏${product.name}` : `收藏${product.name}`} onClick={() => dispatch({ type: 'toggleFavorite', id: favoriteId })}><Heart size={14} fill={favorite ? 'currentColor' : 'none'} /></button><div className="product-card__body"><Link to={`/product/${product.id}`}><h3>{product.name}</h3><p>{product.subtitle}</p></Link><div className="product-card__bottom"><strong>¥{product.price}</strong><button className={`add-button ${quantity ? 'is-added' : ''}`} aria-label={`加入购物车: ${product.name}`} onClick={onAdd}>{quantity ? <><Check size={15} /> {quantity}</> : <Plus size={17} />}</button></div></div></article>
}

export function HeritageCard({ site, compact = false }: { site: HeritageSite; compact?: boolean }) {
  return <Link to={`/heritage/${site.id}`} className={`site-card ${compact ? 'site-card--compact' : ''}`}>
    <Photo src={site.image} alt={site.name} position={site.id === 'mine-lake' ? 'center 35%' : 'center center'} />
    <div className="site-card__shade" />
    <div className="site-card__content"><div><Tag tone="dark">{site.typeLabel}</Tag><h3>{site.name}</h3><p>{site.distance} / {site.statusLabel}</p></div><ChevronRight size={18} /></div>
  </Link>
}

export function POICard({ site }: { site: HeritageSite }) {
  return <article className="poi-card"><Photo src={site.image} alt={site.name} /><div className="poi-card__body"><div><Tag tone="accent">{site.typeLabel}</Tag><h3>{site.name}</h3><p>{site.distance} · {site.statusLabel}</p></div><Link to={`/heritage/${site.id}`} className="round-arrow" aria-label={`查看${site.name}`}><ArrowRight size={17} /></Link></div><div className="poi-card__meta"><MiniPill icon={History}>{site.hours}</MiniPill><MiniPill icon={Ticket}>{site.ticket}</MiniPill><MiniPill icon={Navigation}>{site.duration}</MiniPill></div><div className="sheet-actions"><Button to={`/heritage/${site.id}`}>查看详情</Button><Button to="/route/memory-day" variant="outline">加入路线</Button></div></article>
}

export function MissionCard({ title, subtitle, reward, progress, completed, image, onAction }: { title: string; subtitle: string; reward: string; progress: number; completed?: boolean; image: string; onAction: () => void }) {
  return <article className={`mission-card ${completed ? 'is-complete' : ''}`}><Photo src={image} alt="" /><div className="mission-card__body"><div className="mission-card__head"><Tag tone={completed ? 'success' : 'accent'}>{completed ? '已完成' : reward}</Tag><span>{Math.round(progress)}%</span></div><h3>{title}</h3><p>{subtitle}</p><ProgressBar value={progress} /><Button variant={completed ? 'secondary' : 'dark'} onClick={onAction}>{completed ? <><Check size={16} /> 已收集</> : '前往打卡'}</Button></div></article>
}

export function Stat({ value, label }: { value: string; label: string }) { return <div className="stat"><strong>{value}</strong><span>{label}</span></div> }

export function MapMarker({ label, active = false, type, onClick }: { label: string; active?: boolean; type: string; onClick: () => void }) {
  const Icon = type === 'rail' ? Navigation : type === 'factory' ? Package : type === 'view' ? Compass : MapPin
  return <button className={`map-marker ${active ? 'is-active' : ''}`} onClick={onClick} aria-label={`查看${label}`}><span><Icon size={15} /></span><b>{label}</b></button>
}

export function QuantityStepper({ value, onDecrease, onIncrease }: { value: number; onDecrease: () => void; onIncrease: () => void }) {
  return <div className="quantity-stepper"><IconButton label={ui.reduce} onClick={onDecrease}><Minus size={15} /></IconButton><strong>{value}</strong><IconButton label={ui.increase} onClick={onIncrease}><Plus size={15} /></IconButton></div>
}

export function EmptyState({ icon: Icon = History, title, text, action }: { icon?: typeof History; title: string; text: string; action?: ReactNode }) {
  return <div className="empty-state"><Icon size={28} /><h3>{title}</h3><p>{text}</p>{action}</div>
}

export function AudioToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) { return <IconButton label={playing ? '暂停环境音' : '播放环境音'} className="audio-toggle" onClick={onToggle}>{playing ? <Volume2 size={18} /> : <VolumeX size={18} />}</IconButton> }
export function MiniPill({ icon: Icon, children }: { icon: typeof MapPin; children: ReactNode }) { return <span className="mini-pill"><Icon size={13} />{children}</span> }
export function InlineLink({ to, children }: { to: string; children: ReactNode }) { return <Link to={to} className="inline-link">{children}<ArrowRight size={14} /></Link> }
export function RouteButton({ to, children }: { to: string; children: ReactNode }) { return <Link to={to} className="route-button">{children}<ChevronRight size={16} /></Link> }
export function ProgressBar({ value }: { value: number }) { return <div className="progress-bar"><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div> }
export function QuickStatStrip({ distance, duration, level }: { distance: string; duration: string; level: string }) { return <div className="quick-stat-strip"><MiniPill icon={Navigation}>{distance}</MiniPill><MiniPill icon={History}>{duration}</MiniPill><MiniPill icon={Sparkles}>{level}</MiniPill></div> }
export function FloatingBack() { return <BackButton /> }
export function ExploreButton({ to, children = '开始探索' }: { to: string; children?: ReactNode }) { return <Button to={to} className="explore-button">{children}<ArrowRight size={17} /></Button> }
export function CameraFrame({ scanning }: { scanning: boolean }) { return <div className={`camera-frame ${scanning ? 'is-scanning' : ''}`} aria-hidden="true"><i className="camera-corner camera-corner--tl" /><i className="camera-corner camera-corner--tr" /><i className="camera-corner camera-corner--bl" /><i className="camera-corner camera-corner--br" />{scanning && <span className="camera-line" />}</div> }
export function CameraPermissionHint({ onRetry }: { onRetry: () => void }) { return <div className="camera-hint"><CircleHelp size={20} /><h3>相机权限未开启</h3><p>可以先使用演示识别，开启权限后可在现场扫描。</p><Button variant="outline" onClick={onRetry}>重新开启相机</Button></div> }
export function QuickAction({ to, icon: Icon, label, accent = false }: { to: string; icon: typeof MapPin; label: string; accent?: boolean }) { return <Link to={to} className={`quick-action ${accent ? 'quick-action--accent' : ''}`}><span><Icon size={20} /></span><b>{label}</b></Link> }
export function StoryRow({ image, year, title, summary, to }: { image: string; year: string; title: string; summary: string; to: string }) { return <Link to={to} className="story-row"><Photo src={image} alt="" /><div><span className="story-row__year">{year}</span><h3>{title}</h3><p>{summary}</p></div><ChevronRight size={18} /></Link> }

export { BookOpen, Camera, MapPin, MessageCircle, ScanLine, ShoppingCart, Ticket, Volume2 }
