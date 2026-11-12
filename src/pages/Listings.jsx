import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InnerLayout from './InnerLayout'
import CarCard from '../components/CarCard'
import Icon from '../components/Icon'
import { cars, makes, bodies } from '../data/cars'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const PER_PAGE = 12
const sorts = {
  default: ['Default', () => 0],
  newest: ['Newest', (a, b) => b.year - a.year],
  priceAsc: ['Price: low to high', (a, b) => a.price - b.price],
  priceDesc: ['Price: high to low', (a, b) => b.price - a.price],
  mileage: ['Lowest mileage', (a, b) => a.mileage - b.mileage],
}

export default function Listings() {
  const [params, setParams] = useSearchParams()
  const { saved } = useApp()
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const get = (k) => params.get(k) || ''
  const update = (k, v) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next)
    setPage(1)
  }

  const results = useMemo(() => {
    const max = Number(get('price')) || Infinity
    return cars
      .filter((c) => (get('saved') ? saved.includes(c.id) : true))
      .filter((c) => !get('make') || c.brand === get('make'))
      .filter((c) => !get('model') || c.model === get('model'))
      .filter((c) => !get('body') || c.body === get('body') || (get('body') === 'Hybrid' && c.fuel === 'Hybrid') || (get('body') === 'Electric' && c.fuel === 'Electric'))
      .filter((c) => !get('condition') || c.condition === get('condition'))
      .filter((c) => !get('fuel') || c.fuel === get('fuel'))
      .filter((c) => !get('transmission') || c.transmission === get('transmission'))
      .filter((c) => !get('year') || c.year === Number(get('year')))
      .filter((c) => c.price <= max)
      .filter((c) => !get('q') || [c.title, c.brand, c.model, c.body, c.fuel].join(' ').toLowerCase().includes(get('q').toLowerCase()))
      .sort(sorts[get('sort') || 'default'][1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, saved])

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, pages)
  const shown = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const from = results.length ? (current - 1) * PER_PAGE + 1 : 0
  const active = [...params.entries()].filter(([k]) => k !== 'sort')

  return (
    <InnerLayout title={get('saved') ? 'Saved Cars' : 'Listing v1'} crumbs={[['Listing v1']]}>
      <div className="container">
        <div className="list-toolbar">
          <p>{t('Showing {a} – {b} of {n} results', { a: from, b: from ? from + shown.length - 1 : 0, n: results.length })}</p>
          <div className="list-tools">
            <button type="button" className="btn btn-outline sm" onClick={() => setShowFilters((s) => !s)}><Icon name="filter" /> {t('Filters')}</button>
            <label className="sort">{t('Sort by:')}
              <select value={get('sort') || 'default'} onChange={(e) => update('sort', e.target.value === 'default' ? '' : e.target.value)}>
                {Object.entries(sorts).map(([k, [l]]) => <option key={k} value={k}>{t(l)}</option>)}
              </select>
            </label>
          </div>
        </div>

        {showFilters && (
          <div className="filters">
            <label className="field"><span>{t('Keyword')}</span><input value={get('q')} onChange={(e) => update('q', e.target.value)} placeholder={t('e.g. Audi')} /></label>
            <label className="field"><span>{t('Make')}</span><select value={get('make')} onChange={(e) => update('make', e.target.value)}><option value="">{t('Any')}</option>{makes.map((m) => <option key={m}>{m}</option>)}</select></label>
            <label className="field"><span>{t('Body')}</span><select value={get('body')} onChange={(e) => update('body', e.target.value)}><option value="">{t('Any')}</option>{bodies.map((m) => <option key={m} value={m}>{t(m)}</option>)}</select></label>
            <label className="field"><span>{t('Fuel')}</span><select value={get('fuel')} onChange={(e) => update('fuel', e.target.value)}><option value="">{t('Any')}</option>{['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((m) => <option key={m} value={m}>{t(m)}</option>)}</select></label>
            <label className="field"><span>{t('Transmission')}</span><select value={get('transmission')} onChange={(e) => update('transmission', e.target.value)}><option value="">{t('Any')}</option>{['Automatic', 'Manual', 'CVT'].map((m) => <option key={m} value={m}>{t(m)}</option>)}</select></label>
            <label className="field"><span>{t('Condition')}</span><select value={get('condition')} onChange={(e) => update('condition', e.target.value)}><option value="">{t('Any')}</option><option value="New">{t('New')}</option><option value="Used">{t('Used')}</option></select></label>
          </div>
        )}

        {active.length > 0 && (
          <div className="active-filters">
            {active.map(([k, v]) => (
              <button key={k} type="button" className="chip-btn" onClick={() => update(k, '')}>{k === 'saved' ? 'Saved' : k === 'price' ? `≤ $${Number(v).toLocaleString()}` : v} <Icon name="close" /></button>
            ))}
            <button type="button" className="link-btn" onClick={() => setParams({})}>{t('Clear all')}</button>
          </div>
        )}

        {shown.length ? (
          <div className="cars cars-default per-4 list-grid">{shown.map((c) => <CarCard key={c.id} car={c} />)}</div>
        ) : (
          <div className="empty">
            <h3>{t('No cars found')}</h3>
            <p>{get('saved') ? 'Tap the bookmark icon on any car to save it here.' : 'Try removing a filter or searching for something else.'}</p>
            <button type="button" className="btn btn-primary" onClick={() => setParams({})}>{t('Show all cars')}</button>
          </div>
        )}

        {pages > 1 && (
          <div className="pagination">
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} type="button" className={current === i + 1 ? 'active' : ''} onClick={() => { setPage(i + 1); window.scrollTo({ top: 300, behavior: 'smooth' }) }}>{i + 1}</button>
            ))}
            <button type="button" aria-label={t('Next page')} onClick={() => setPage(current % pages + 1)}><Icon name="chev-r" /></button>
          </div>
        )}
      </div>
    </InnerLayout>
  )
}
