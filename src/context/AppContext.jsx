import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { products } from '../data/content'

const AppContext = createContext(null)

function useStored(key, initial, normalize = (v) => v) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? normalize(JSON.parse(raw)) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage blocked – keep in memory only */
    }
  }, [key, value])
  return [value, setValue]
}

// Older versions stored the cart as a plain list of product ids; turn that into [{ id, qty }].
const normalizeCart = (raw) => {
  if (!Array.isArray(raw)) return []
  const items = []
  raw.forEach((entry) => {
    const id = typeof entry === 'object' ? entry.id : entry
    const qty = typeof entry === 'object' ? entry.qty : 1
    const found = items.find((i) => i.id === id)
    if (found) found.qty += qty
    else if (products.some((p) => p.id === id)) items.push({ id, qty })
  })
  return items
}

export const SHIPPING_FREE_FROM = 200
const MAX_COMPARE = 3
const SHIPPING_COST = 15

export function AppProvider({ children }) {
  const [saved, setSaved] = useStored('boxcars-saved', [])
  const [compare, setCompare] = useStored('boxcars-compare', [])
  const [recent, setRecent] = useStored('boxcars-recent', [])
  const [cart, setCart] = useStored('boxcars-cart', [], normalizeCart)
  const [orders, setOrders] = useStored('boxcars-orders', [])
  const [user, setUser] = useStored('boxcars-user', null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (msg) => {
    setToast(msg)
    clearTimeout(notify.t)
    notify.t = setTimeout(() => setToast(''), 2600)
  }

  const toggleSaved = (id) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  // Up to 3 cars side by side; adding a 4th drops the oldest one.
  const toggleCompare = (id) => {
    if (compare.includes(id)) return setCompare((c) => c.filter((x) => x !== id))
    if (compare.length >= MAX_COMPARE) notify(`You can compare up to ${MAX_COMPARE} cars — the oldest one was replaced`)
    setCompare((c) => [...c, id].slice(-MAX_COMPARE))
  }
  const clearCompare = () => setCompare([])
  // newest first, without duplicates
  const addRecent = useCallback((id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)), [setRecent])

  const addToCart = (product, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.id === product.id)
      return found ? c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i)) : [...c, { id: product.id, qty }]
    })
    setCartOpen(true)
  }
  const setQty = (id, qty) => setCart((c) => (qty < 1 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))))
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))
  const clearCart = () => setCart([])

  // Cart lines joined with product data, plus totals.
  const lines = cart.map((i) => ({ ...products.find((p) => p.id === i.id), qty: i.qty })).filter((l) => l.name)
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0)
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_COST
  const totals = { count, subtotal, shipping, total: subtotal + shipping }

  const placeOrder = (customer) => {
    const order = { number: `BX-${Date.now().toString().slice(-6)}`, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), customer, lines, totals }
    setOrders((o) => [order, ...o])
    clearCart()
    return order
  }

  return (
    <AppContext.Provider
      value={{
        saved, toggleSaved, compare, toggleCompare, clearCompare, recent, addRecent,
        cart: lines, totals, addToCart, setQty, removeFromCart, clearCart, cartOpen, setCartOpen,
        orders, placeOrder,
        user, setUser, notify,
      }}
    >
      {children}
      <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)
