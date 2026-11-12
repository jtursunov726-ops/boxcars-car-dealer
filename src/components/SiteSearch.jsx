import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { cars, money } from '../data/cars'
import { products, posts } from '../data/content'
import { t } from '../i18n'

const pages = [
  ['Listings', '/listings'], ['Compare cars', '/compare'], ['Shop', '/shop'], ['Cart', '/cart'], ['My Orders', '/orders'],
  ['Blog', '/blog'], ['Services', '/services'], ['Pricing', '/pricing'], ['Loan Calculator', '/loan-calculator'],
  ['FAQs', '/faqs'], ['About Us', '/about'], ['Contact Us', '/contact'], ['Terms and Conditions', '/terms'], ['Login / Register', '/login'],
]
const suggestions = ['SUV', 'Mercedes', 'Audi', 'Electric', 'Brake', 'BMW']

const match = (q, ...fields) => fields.some((f) => String(f).toLowerCase().includes(q))

/** Full-screen search over cars, shop products, blog posts and pages. */
export default function SiteSearch({ open, onClose }) {
  const [q, setQ] = useState('')
  const input = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    setQ('')
    const timer = setTimeout(() => input.current?.focus(), 50)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(timer); window.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  const term = q.trim().toLowerCase()
  const results = useMemo(() => {
    if (term.length < 2) return null
    return {
      cars: cars.filter((c) => match(term, c.title, c.brand, c.model, c.body, c.fuel)).slice(0, 6),
      products: products.filter((p) => match(term, p.name, p.category)).slice(0, 4),
      posts: posts.filter((p) => match(term, p.title, p.category)).slice(0, 3),
      pages: pages.filter(([label]) => match(term, label)).slice(0, 4),
    }
  }, [term])
  const total = results ? Object.values(results).reduce((n, l) => n + l.length, 0) : 0

  const submit = (e) => {
    e.preventDefault()
    if (!term) return
    onClose()
    navigate(`/listings?q=${encodeURIComponent(q.trim())}`)
  }

  if (!open) return null
  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t('Search the site')}>
        <form onSubmit={submit} className="search-input">
          <Icon name="search" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search cars, parts, articles…')} aria-label={t('Search')} />
          <button type="button" aria-label={t('Close search')} onClick={onClose}><Icon name="close" /></button>
        </form>

        {!results && (
          <div className="search-hint">
            <p className="small">{t('Popular searches')}</p>
            <div className="chips">{suggestions.map((s) => <button key={s} type="button" className="chip-btn" onClick={() => setQ(s)}>{s}</button>)}</div>
          </div>
        )}

        {results && total === 0 && <p className="search-empty">{t("No results for “{q}”. Try a brand, a body type or a part name.", { q })}</p>}

        {results && total > 0 && (
          <div className="search-results">
            {results.cars.length > 0 && (
              <div className="sr-group">
                <h4>{t('Cars')} <Link to={`/listings?q=${encodeURIComponent(q.trim())}`} onClick={onClose} className="link-btn">{t('See all')}</Link></h4>
                {results.cars.map((c) => (
                  <Link key={c.id} to={`/listings/${c.id}`} onClick={onClose} className="sr-item">
                    <img src={c.image} alt="" /><span><b>{c.title}</b><small>{c.body} · {c.fuel} · {c.year}</small></span><em>{money(c.price)}</em>
                  </Link>
                ))}
              </div>
            )}
            {results.products.length > 0 && (
              <div className="sr-group">
                <h4>{t('Shop')}</h4>
                {results.products.map((p) => (
                  <Link key={p.id} to={`/shop/${p.id}`} onClick={onClose} className="sr-item">
                    <img src={p.image} alt="" /><span><b>{t(p.name)}</b><small>{t(p.category)}</small></span><em>{money(p.price)}</em>
                  </Link>
                ))}
              </div>
            )}
            {results.posts.length > 0 && (
              <div className="sr-group">
                <h4>{t('Blog')}</h4>
                {results.posts.map((p) => (
                  <Link key={p.id} to={`/blog/${p.id}`} onClick={onClose} className="sr-item">
                    <img src={p.image} alt="" /><span><b>{t(p.title)}</b><small>{t(p.category)} · {t(p.date)}</small></span>
                  </Link>
                ))}
              </div>
            )}
            {results.pages.length > 0 && (
              <div className="sr-group">
                <h4>{t('Pages')}</h4>
                {results.pages.map(([label, to]) => (
                  <Link key={to} to={to} onClick={onClose} className="sr-item page"><Icon name="arrow" /><span><b>{t(label)}</b></span></Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
