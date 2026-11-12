import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import Dropdown from './Dropdown'
import { cars, makes } from '../data/cars'
import { t } from '../i18n'

const priceOptions = [
  ['', 'All Prices'],
  ['20000', 'Under $20,000'],
  ['50000', 'Under $50,000'],
  ['100000', 'Under $100,000'],
  ['300000', 'Under $300,000'],
]

function useSearch(initial = {}) {
  const navigate = useNavigate()
  const [q, setQ] = useState({ condition: '', make: '', model: '', price: '', year: '', ...initial })
  const models = useMemo(
    () => [...new Set(cars.filter((c) => !q.make || c.brand === q.make).map((c) => c.model))].sort(),
    [q.make],
  )
  const set = (k) => (e) => setQ((s) => ({ ...s, [k]: e.target.value, ...(k === 'make' ? { model: '' } : {}) }))
  const submit = (e) => {
    e?.preventDefault()
    const params = new URLSearchParams(Object.entries(q).filter(([, v]) => v))
    navigate(`/listings${params.toString() ? `?${params}` : ''}`)
  }
  return { q, setQ, set, models, submit }
}

function Select(props) {
  return <Dropdown {...props} />
}

function ConditionTabs({ value, onChange, className = '' }) {
  return (
    <div className={`cond-tabs ${className}`}>
      {[['', 'All'], ['New', 'New'], ['Used', 'Used']].map(([v, l]) => (
        <button key={l} type="button" className={value === v ? 'active' : ''} onClick={() => onChange(v)}>{t(l)}</button>
      ))}
    </div>
  )
}

/**
 * Horizontal pill search used by Home 1/2/3/9 and the inner pages band.
 * variant: 'white' | 'glass' | 'round' (Home 2: round icon button) | 'band' (inner pages: + More Filters)
 */
export function SearchPill({ variant = 'white', tabs = false, condition = false, button = 'Search Cars' }) {
  const { q, setQ, set, models, submit } = useSearch()
  return (
    <div className={`search-wrap search-${variant}`}>
      {tabs && <ConditionTabs value={q.condition} onChange={(v) => setQ((s) => ({ ...s, condition: v }))} className="light" />}
      <form className="search-pill" onSubmit={submit}>
        {condition && (
          <Select value={q.condition} onChange={set('condition')}>
            <option value="">{t(variant === 'band' ? 'Condition' : 'Used Cars')}</option>
            <option value="New">{t('New Cars')}</option>
            <option value="Used">{t('Used Cars')}</option>
          </Select>
        )}
        <Select value={q.make} onChange={set('make')}>
          <option value="">{t('Any Makes')}</option>
          {makes.map((m) => <option key={m} value={m}>{m}</option>)}
        </Select>
        <Select value={q.model} onChange={set('model')}>
          <option value="">{t('Any Models')}</option>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </Select>
        <Select value={q.price} onChange={set('price')} label={t('Prices:')}>
          {priceOptions.map(([v, l]) => <option key={l} value={v}>{t(l)}</option>)}
        </Select>
        {variant === 'band' && (
          <button type="button" className="more-filters" onClick={submit}><Icon name="filter" /> {t('More Filters')}</button>
        )}
        {variant === 'round' ? (
          <button type="submit" className="search-round-btn" aria-label={t('Search')}><Icon name="search" /></button>
        ) : (
          <button type="submit" className="btn btn-primary search-btn"><Icon name="search" /> {t(button)}</button>
        )}
      </form>
    </div>
  )
}

/** Home 7: white card with tabs and labelled selects, overlapping the hero. */
export function SearchCard() {
  const { q, setQ, set, models, submit } = useSearch()
  return (
    <form className="search-card" onSubmit={submit}>
      <ConditionTabs value={q.condition} onChange={(v) => setQ((s) => ({ ...s, condition: v }))} />
      <div className="search-card-row">
        <Select label={t('Select Makes')} value={q.make} onChange={set('make')}>
          <option value="">{t('Any')}</option>
          {makes.map((m) => <option key={m}>{m}</option>)}
        </Select>
        <Select label={t('Select Models')} value={q.model} onChange={set('model')}>
          <option value="">{t('Any')}</option>
          {models.map((m) => <option key={m}>{m}</option>)}
        </Select>
        <Select label={t('Year')} value={q.year} onChange={set('year')}>
          <option value="">0 - 2024</option>
          {[2024, 2023, 2022, 2021, 2015].map((y) => <option key={y} value={y}>{y}</option>)}
        </Select>
        <Select label={t('Select Price')} value={q.price} onChange={set('price')}>
          {priceOptions.map(([v, l]) => <option key={l} value={v}>{t(l)}</option>)}
        </Select>
        <button type="submit" className="btn btn-primary"><Icon name="search" /> {t('Search')}</button>
      </div>
    </form>
  )
}

/** Home 8: vertical card with New/Used toggle and price range slider. */
export function SearchPanel() {
  const { q, setQ, set, models, submit } = useSearch({ condition: 'New', price: '150000' })
  return (
    <form className="search-panel" onSubmit={submit}>
      <div className="toggle">
        {['New', 'Used'].map((c) => (
          <button key={c} type="button" className={q.condition === c ? 'active' : ''} onClick={() => setQ((s) => ({ ...s, condition: c }))}>{t(c)}</button>
        ))}
      </div>
      <Select label={t('Select Makes')} value={q.make} onChange={set('make')}>
        <option value="">{t('Any')}</option>
        {makes.map((m) => <option key={m}>{m}</option>)}
      </Select>
      <Select label={t('Select Models')} value={q.model} onChange={set('model')}>
        <option value="">{t('Any')}</option>
        {models.map((m) => <option key={m}>{m}</option>)}
      </Select>
      <p className="range-label">{t('Select Price')}</p>
      <input type="range" min="0" max="300000" step="5000" value={q.price} onChange={set('price')} />
      <div className="range-values"><span>$0</span><span>${Number(q.price).toLocaleString()}</span></div>
      <button type="submit" className="btn btn-primary w-full"><Icon name="search" /> {t('Search')}</button>
    </form>
  )
}
