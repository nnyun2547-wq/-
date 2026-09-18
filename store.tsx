import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react'

export interface AppState {
  favorites: string[]
  cart: Record<string, number>
  scanHistory: string[]
  checkIns: string[]
  orders: number
}

type Action =
  | { type: 'toggleFavorite'; id: string }
  | { type: 'addToCart'; id: string }
  | { type: 'removeFromCart'; id: string }
  | { type: 'clearCart' }
  | { type: 'addScan'; id: string }
  | { type: 'checkIn'; id: string }
  | { type: 'placeOrder' }

const storageKey = 'hong-lu-reborn-state-v1'

const initialState: AppState = {
  favorites: [],
  cart: {},
  scanHistory: [],
  checkIns: [],
  orders: 0,
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'toggleFavorite':
      return state.favorites.includes(action.id)
        ? { ...state, favorites: state.favorites.filter((id) => id !== action.id) }
        : { ...state, favorites: [...state.favorites, action.id] }
    case 'addToCart':
      return { ...state, cart: { ...state.cart, [action.id]: (state.cart[action.id] ?? 0) + 1 } }
    case 'removeFromCart': {
      const next = { ...state.cart }
      const current = next[action.id] ?? 0
      if (current <= 1) delete next[action.id]
      else next[action.id] = current - 1
      return { ...state, cart: next }
    }
    case 'clearCart':
      return { ...state, cart: {} }
    case 'addScan':
      return { ...state, scanHistory: [action.id, ...state.scanHistory.filter((id) => id !== action.id)].slice(0, 12) }
    case 'checkIn':
      return state.checkIns.includes(action.id) ? state : { ...state, checkIns: [...state.checkIns, action.id] }
    case 'placeOrder':
      return { ...state, orders: state.orders + 1, cart: {} }
    default:
      return state
  }
}

function loadState(): AppState {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return initialState
    const parsed: unknown = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') return initialState
    const value = parsed as Partial<AppState>
    return {
      favorites: Array.isArray(value.favorites) ? value.favorites.filter((id): id is string => typeof id === 'string') : [],
      cart: value.cart && typeof value.cart === 'object' ? Object.fromEntries(Object.entries(value.cart).filter(([, quantity]) => typeof quantity === 'number' && quantity > 0)) : {},
      scanHistory: Array.isArray(value.scanHistory) ? value.scanHistory.filter((id): id is string => typeof id === 'string') : [],
      checkIns: Array.isArray(value.checkIns) ? value.checkIns.filter((id): id is string => typeof id === 'string') : [],
      orders: typeof value.orders === 'number' ? value.orders : 0,
    }
  } catch {
    return initialState
  }
}

interface StoreContextValue {
  state: AppState
  dispatch: Dispatch<Action>
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      // Keep the UI usable when storage is unavailable (for example in private browsing).
    }
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}

export function getCartCount(cart: Record<string, number>) {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
}
