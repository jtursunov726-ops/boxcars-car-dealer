import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { useApp } from '../context/AppContext'
import { carById } from '../data/cars'
import { t } from '../i18n'

/** Sticky bar at the bottom while cars are picked for comparison. */
export default function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useApp()
  const { pathname } = useLocation()
  const list = compare.map(carById).filter(Boolean)
  const visible = list.length > 0 && pathname !== '/compare'
  // keep page content clear of the fixed bar
  useEffect(() => {
    document.body.classList.toggle('has-compare-bar', visible)
    return () => document.body.classList.remove('has-compare-bar')
  }, [visible])
  if (!visible) return null
  return (
    <div className="compare-bar" role="region" aria-label={t('Cars selected for comparison')}>
      <div className="compare-thumbs">
        {list.map((c) => (
          <span key={c.id} className="compare-thumb">
            <img src={c.image} alt="" />
            <button type="button" aria-label={`Remove ${c.title}`} onClick={() => toggleCompare(c.id)}><Icon name="close" /></button>
          </span>
        ))}
        <span className="small">{t("{n} of 3 selected", { n: list.length })}</span>
      </div>
      <div className="compare-bar-actions">
        <button type="button" className="link-btn light" onClick={clearCompare}>{t('Clear')}</button>
        <Link to="/compare" className="btn btn-primary sm">{t('Compare Now')} <Icon name="arrow" /></Link>
      </div>
    </div>
  )
}
