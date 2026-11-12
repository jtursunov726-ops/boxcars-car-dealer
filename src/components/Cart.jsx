import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { useApp, SHIPPING_FREE_FROM } from '../context/AppContext'
import { money } from '../data/cars'
import { t } from '../i18n'

export function QtyStepper({ value, onChange, small = false }) {
  return (
    <div className={`qty ${small ? 'sm' : ''}`}>
      <button type="button" aria-label={t('Decrease quantity')} onClick={() => onChange(value - 1)}><Icon name="minus" /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label={t('Increase quantity')} onClick={() => onChange(value + 1)}><Icon name="plus" /></button>
    </div>
  )
}

export function FreeShippingBar() {
  const { totals } = useApp()
  const left = SHIPPING_FREE_FROM - totals.subtotal
  const pct = Math.min(100, (totals.subtotal / SHIPPING_FREE_FROM) * 100)
  return (
    <div className="ship-bar">
      <p>{left > 0 ? <>{t('Add')} <b>{money(left)}</b> {t('more for')} <b>{t('free shipping')}</b></> : <>{t('You get')} <b>{t('free shipping')}</b> 🎉</>}</p>
      <span><i style={{ width: `${pct}%` }} /></span>
    </div>
  )
}

/** Slide-out cart, opened from the header icon or after adding a product. */
export function CartDrawer() {
  const { cart, totals, setQty, removeFromCart, cartOpen, setCartOpen } = useApp()
  const { pathname } = useLocation()
  const close = () => setCartOpen(false)

  useEffect(() => {
    setCartOpen(false)
  }, [pathname, setCartOpen])

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])

  return (
    <div className={`cart-drawer ${cartOpen ? 'open' : ''}`} onClick={close} aria-hidden={!cartOpen}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()} aria-label={t('Shopping cart')}>
        <div className="cart-head">
          <h3>{t('Your Cart')} <span>({totals.count})</span></h3>
          <button type="button" aria-label={t('Close cart')} onClick={close}><Icon name="close" /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <Icon name="cart" />
            <p>{t('Your cart is empty.')}</p>
            <Link to="/shop" className="btn btn-primary" onClick={close}>{t('Go to Shop')} <Icon name="arrow" /></Link>
          </div>
        ) : (
          <>
            <FreeShippingBar />
            <ul className="cart-lines">
              {cart.map((l) => (
                <li key={l.id} className="cart-line">
                  <Link to={`/shop/${l.id}`} onClick={close}><img src={l.image} alt="" /></Link>
                  <div>
                    <Link to={`/shop/${l.id}`} onClick={close} className="cart-name">{l.name}</Link>
                    <p className="small">{money(l.price)}</p>
                    <QtyStepper small value={l.qty} onChange={(q) => setQty(l.id, q)} />
                  </div>
                  <div className="cart-line-end">
                    <b>{money(l.price * l.qty)}</b>
                    <button type="button" className="link-btn remove" onClick={() => removeFromCart(l.id)}>{t('Remove')}</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-foot">
              <p><span>{t('Subtotal')}</span><b>{money(totals.subtotal)}</b></p>
              <p className="small"><span>{t('Shipping')}</span><span>{totals.shipping ? money(totals.shipping) : t('Free')}</span></p>
              <p className="cart-total"><span>{t('Total')}</span><b>{money(totals.total)}</b></p>
              <Link to="/checkout" className="btn btn-primary w-full" onClick={close}>{t('Checkout')} <Icon name="arrow" /></Link>
              <Link to="/cart" className="btn btn-outline w-full" onClick={close}>{t('View Cart')}</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
