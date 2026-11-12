import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InnerLayout from './InnerLayout'
import Icon from '../components/Icon'
import { QtyStepper, FreeShippingBar } from '../components/Cart'
import { useApp } from '../context/AppContext'
import { money } from '../data/cars'
import { t } from '../i18n'

function Summary({ children }) {
  const { totals, cart } = useApp()
  return (
    <aside className="summary side-card">
      <h4>{t('Order Summary')}</h4>
      {cart.map((l) => (
        <p key={l.id} className="summary-line"><span>{l.name} × {l.qty}</span><span>{money(l.price * l.qty)}</span></p>
      ))}
      <hr />
      <p className="summary-line"><span>{t('Subtotal ({n} items)', { n: totals.count })}</span><b>{money(totals.subtotal)}</b></p>
      <p className="summary-line"><span>{t('Shipping')}</span><span>{totals.shipping ? money(totals.shipping) : t('Free')}</span></p>
      <p className="summary-line total"><span>{t('Total')}</span><b>{money(totals.total)}</b></p>
      {children}
    </aside>
  )
}

function EmptyCart() {
  return (
    <div className="empty">
      <Icon name="cart" className="empty-icon" />
      <h3>{t('Your cart is empty')}</h3>
      <p>{t('Browse the shop and add parts and accessories for your car.')}</p>
      <Link to="/shop" className="btn btn-primary">{t('Go to Shop')} <Icon name="arrow" /></Link>
    </div>
  )
}

/* ---------- Cart ---------- */
export function CartPage() {
  const { cart, setQty, removeFromCart, clearCart } = useApp()
  return (
    <InnerLayout title={t('Cart')} crumbs={[['Shop', '/shop'], ['Cart']]} search={false}>
      <div className="container">
        {cart.length === 0 ? <EmptyCart /> : (
          <div className="cart-page">
            <div>
              <FreeShippingBar />
              <div className="cart-table">
                <div className="cart-row head"><span>{t('Product')}</span><span>{t('Price')}</span><span>{t('Quantity')}</span><span>{t('Total')}</span><span /></div>
                {cart.map((l) => (
                  <div key={l.id} className="cart-row">
                    <Link to={`/shop/${l.id}`} className="cart-product"><img src={l.image} alt="" /><span>{l.name}</span></Link>
                    <span data-label={t('Price')}>{money(l.price)}</span>
                    <QtyStepper value={l.qty} onChange={(q) => setQty(l.id, q)} />
                    <b data-label={t('Total')}>{money(l.price * l.qty)}</b>
                    <button type="button" className="remove-x" aria-label={`Remove ${l.name}`} onClick={() => removeFromCart(l.id)}><Icon name="close" /></button>
                  </div>
                ))}
              </div>
              <div className="cart-actions">
                <Link to="/shop" className="arrow-link"><Icon name="chev-l" /> {t('Continue Shopping')}</Link>
                <button type="button" className="link-btn" onClick={clearCart}>{t('Clear cart')}</button>
              </div>
            </div>
            <Summary>
              <Link to="/checkout" className="btn btn-primary w-full">{t('Proceed to Checkout')} <Icon name="arrow" /></Link>
            </Summary>
          </div>
        )}
      </div>
    </InnerLayout>
  )
}

/* ---------- Checkout ---------- */
const payments = [
  ['cod', 'Cash on delivery', 'Pay when your order arrives.'],
  ['bank', 'Bank transfer', 'We email you our bank details after you order.'],
  ['dealer', 'Pay at dealership', 'Collect and pay at 943 Broadway, Brooklyn.'],
]

export function Checkout() {
  const { cart, placeOrder, user } = useApp()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('cod')

  if (cart.length === 0) {
    return (
      <InnerLayout title={t('Checkout')} crumbs={[['Cart', '/cart'], ['Checkout']]} search={false}>
        <div className="container"><EmptyCart /></div>
      </InnerLayout>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    const order = placeOrder({ ...f, payment: payments.find((p) => p[0] === payment)[1] })
    navigate(`/orders?placed=${order.number}`)
  }

  return (
    <InnerLayout title={t('Checkout')} crumbs={[['Cart', '/cart'], ['Checkout']]} search={false}>
      <div className="container cart-page">
        <form id="checkout" className="checkout-form" onSubmit={submit}>
          <h2 className="title sm">{t('Billing details')}</h2>
          <div className="form-grid">
            <label className="field"><span>{t('First Name *')}</span><input name="firstName" required defaultValue={user?.name || ''} autoComplete="given-name" /></label>
            <label className="field"><span>{t('Last Name *')}</span><input name="lastName" required autoComplete="family-name" /></label>
            <label className="field"><span>{t('Email *')}</span><input name="email" type="email" required autoComplete="email" /></label>
            <label className="field"><span>{t('Phone *')}</span><input name="phone" type="tel" required autoComplete="tel" /></label>
            <label className="field full"><span>{t('Street address *')}</span><input name="address" required autoComplete="street-address" /></label>
            <label className="field"><span>{t('City *')}</span><input name="city" required autoComplete="address-level2" /></label>
            <label className="field"><span>{t('Postcode')}</span><input name="postcode" autoComplete="postal-code" /></label>
            <label className="field full"><span>{t('Order notes (optional)')}</span><textarea name="notes" rows="3" /></label>
          </div>
          <h2 className="title sm">{t('Payment')}</h2>
          <div className="pay-options">
            {payments.map(([v, label, hint]) => (
              <label key={v} className={`pay-option ${payment === v ? 'active' : ''}`}>
                <input type="radio" name="pay" value={v} checked={payment === v} onChange={() => setPayment(v)} />
                <span><b>{t(label)}</b><small>{t(hint)}</small></span>
              </label>
            ))}
          </div>
        </form>
        <Summary>
          <button type="submit" form="checkout" className="btn btn-primary w-full">{t('Place Order')} <Icon name="arrow" /></button>
          <Link to="/cart" className="arrow-link center-link"><Icon name="chev-l" /> {t('Back to cart')}</Link>
        </Summary>
      </div>
    </InnerLayout>
  )
}

/* ---------- Orders ---------- */
export function Orders() {
  const { orders } = useApp()
  const placed = new URLSearchParams(location.search).get('placed')
  return (
    <InnerLayout title={t('My Orders')} crumbs={[['Shop', '/shop'], ['My Orders']]} search={false}>
      <div className="container narrow">
        {placed && (
          <div className="order-success">
            <Icon name="check" />
            <div>
              <h3>{t('Thank you! Your order {n} has been placed.', { n: placed })}</h3>
              <p>{t('We will contact you shortly to confirm delivery.')}</p>
            </div>
          </div>
        )}
        {orders.length === 0 ? (
          <div className="empty">
            <h3>{t('No orders yet')}</h3>
            <p>{t('Orders you place in the shop appear here.')}</p>
            <Link to="/shop" className="btn btn-primary">{t('Go to Shop')} <Icon name="arrow" /></Link>
          </div>
        ) : (
          orders.map((o) => (
            <div key={o.number} className={`order side-card ${o.number === placed ? 'highlight' : ''}`}>
              <div className="order-head">
                <div><b>{t('Order {n}', { n: o.number })}</b><small>{o.date} · {t(o.customer.payment)}</small></div>
                <b className="order-total">{money(o.totals.total)}</b>
              </div>
              {o.lines.map((l) => (
                <Link key={l.id} to={`/shop/${l.id}`} className="order-line">
                  <img src={l.image} alt="" /><span>{l.name} × {l.qty}</span><span>{money(l.price * l.qty)}</span>
                </Link>
              ))}
              <p className="small">{t('Deliver to:')} {o.customer.firstName} {o.customer.lastName}, {o.customer.address}, {o.customer.city}</p>
            </div>
          ))
        )}
        <Link to="/shop" className="arrow-link"><Icon name="chev-l" /> {t('Continue Shopping')}</Link>
      </div>
    </InnerLayout>
  )
}
