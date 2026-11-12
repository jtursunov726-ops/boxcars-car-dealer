import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { useApp } from '../context/AppContext'
import SiteSearch from './SiteSearch'
import LangSwitch from './LangSwitch'
import { t } from '../i18n'

// eslint-disable-next-line react-refresh/only-export-components
export const menu = [
  {
    label: 'Home',
    children: Array.from({ length: 10 }, (_, i) => ({ label: `Home ${i + 1}`, to: i === 0 ? '/' : `/home-${i + 1}` })),
  },
  {
    label: 'Listings',
    children: [
      { label: 'Listing v1', to: '/listings' },
      { label: 'Details v1', to: '/listings/mercedes-glc-2023' },
      { label: 'Details v2', to: '/listings/vw-tiguan-2023/v2' },
      { label: 'Saved cars', to: '/listings?saved=1' },
      { label: 'Compare cars', to: '/compare' },
    ],
  },
  {
    label: 'Blog',
    children: [
      { label: 'Blog v1', to: '/blog' },
      { label: 'Blog v2', to: '/blog/list' },
      { label: 'Blog details', to: '/blog/bmw-x6-m50i' },
    ],
  },
  {
    label: 'Pages',
    children: [
      { label: 'Shop', to: '/shop' },
      { label: 'Cart', to: '/cart' },
      { label: 'My Orders', to: '/orders' },
      { label: 'Services', to: '/services' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Loan Calculator', to: '/loan-calculator' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Terms and Conditions', to: '/terms' },
      { label: 'Login / Register', to: '/login' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Nav({ onNavigate }) {
  const [open, setOpen] = useState(null)
  return (
    <nav className="nav" onMouseLeave={() => setOpen(null)}>
      {menu.map((item) =>
        item.children ? (
          <div key={item.label} className={`nav-item has-sub ${open === item.label ? 'open' : ''}`} onMouseEnter={() => setOpen(item.label)}>
            <button type="button" onClick={() => setOpen(open === item.label ? null : item.label)}>
              {t(item.label)} <Icon name="chev-d" />
            </button>
            <div className="sub">
              {item.children.map((c) => (
                <Link key={c.to} to={c.to} onClick={onNavigate}>{t(c.label)}</Link>
              ))}
            </div>
          </div>
        ) : (
          <NavLink key={item.to} to={item.to} className="nav-item" onClick={onNavigate}>{t(item.label)}</NavLink>
        ),
      )}
    </nav>
  )
}

export function Logo({ className = '' }) {
  return <Link to="/" className={`logo ${className}`}>{t('BOXCARS')}</Link>
}

/**
 * theme:   'light' (dark text) | 'dark' (white text)
 * layout:  'default' | 'center' (menu+phone · logo · actions) | 'navLeft' (nav · logo · actions)
 */
export default function Header({ theme = 'light', layout = 'default', phone = false, menuButton = false, overlay = false, className = '' }) {
  const [drawer, setDrawer] = useState(false)
  const { user, saved, compare, totals, setCartOpen } = useApp()
  const { pathname } = useLocation()
  useEffect(() => {
    setDrawer(false)
  }, [pathname])
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // After scrolling down a bit the header sticks to the top of the screen.
  const ref = useRef(null)
  const [stuck, setStuck] = useState(false)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 220
      setStuck((prev) => {
        if (next && !prev && ref.current) setHeight(ref.current.offsetHeight)
        return next
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phoneLink = (
    <a href="tel:+75123456789" className="h-phone"><Icon name="phone" /> +75 123 456 789</a>
  )
  const actions = (
    <div className="h-actions">
      <LangSwitch />
      <button type="button" className="h-saved" title={t('Search')} aria-label={t('Search the site')} onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
      {saved.length > 0 && (
        <Link to="/listings?saved=1" className="h-saved" title={t('Saved cars')}><Icon name="bookmark" /><span>{saved.length}</span></Link>
      )}
      {compare.length > 0 && (
        <Link to="/compare" className="h-saved" title={t('Compare cars')}><Icon name="compare" /><span>{compare.length}</span></Link>
      )}
      <button type="button" className="h-saved h-cart" title={t('Cart')} aria-label={t("Cart, {n} items", { n: totals.count })} onClick={() => setCartOpen(true)}>
        <Icon name="cart" />{totals.count > 0 && <span>{totals.count}</span>}
      </button>
      <Link to="/login" className="h-signin"><Icon name="user" /> {user ? user.name : t('Sign in')}</Link>
      <Link to="/contact?topic=sell" className="btn-submit">{t('Submit Listing')}</Link>
      <button type="button" className="burger" aria-label={t('Open menu')} onClick={() => setDrawer(true)}><Icon name="menu" /></button>
    </div>
  )

  return (
    <>
    {stuck && !overlay && <div className="header-spacer" style={{ height }} aria-hidden="true" />}
    <header ref={ref} className={`header theme-${theme} layout-${layout} ${overlay ? 'overlay' : ''} ${stuck ? 'is-stuck' : ''} ${className}`}>
      <div className="container header-inner">
        {layout === 'center' ? (
          <>
            <div className="h-left">
              {menuButton && <button type="button" className="menu-btn" onClick={() => setDrawer(true)}><Icon name="menu" /> {t('Menu')}</button>}
              {phone && phoneLink}
            </div>
            <Logo />
            {actions}
          </>
        ) : layout === 'navLeft' ? (
          <>
            <Nav />
            <Logo />
            {actions}
          </>
        ) : (
          <>
            <div className="h-left">
              {menuButton && <button type="button" className="menu-btn" onClick={() => setDrawer(true)}><Icon name="menu" /> {t('Menu')}</button>}
              <Logo />
              {phone && phoneLink}
            </div>
            <Nav />
            {actions}
          </>
        )}
      </div>

      <SiteSearch open={searchOpen} onClose={closeSearch} />
      <div className={`drawer ${drawer ? 'open' : ''}`} onClick={() => setDrawer(false)}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-head">
            <Logo />
            <button type="button" aria-label={t('Close menu')} onClick={() => setDrawer(false)}><Icon name="close" /></button>
          </div>
          {menu.map((item) => (
            <div key={item.label} className="drawer-group">
              {item.children ? (
                <>
                  <p>{t(item.label)}</p>
                  {item.children.map((c) => <Link key={c.to} to={c.to}>{t(c.label)}</Link>)}
                </>
              ) : (
                <Link to={item.to} className="drawer-top">{t(item.label)}</Link>
              )}
            </div>
          ))}
          <Link to="/contact?topic=sell" className="btn btn-primary w-full">{t('Submit Listing')}</Link>
        </div>
      </div>
    </header>
    </>
  )
}
