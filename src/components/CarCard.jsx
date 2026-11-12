import { Link } from 'react-router-dom'
import Icon from './Icon'
import { useApp } from '../context/AppContext'
import { miles, money } from '../data/cars'
import { t } from '../i18n'

const badgeClass = { 'Great Price': 'green', Sale: 'blue', 'Low Mileage': 'blue' }

function Save({ id }) {
  const { saved, toggleSaved } = useApp()
  const on = saved.includes(id)
  return (
    <button
      type="button"
      className={`save ${on ? 'on' : ''}`}
      aria-label={on ? 'Remove from saved' : 'Save car'}
      onClick={(e) => { e.preventDefault(); toggleSaved(id) }}
    >
      <Icon name="bookmark" />
    </button>
  )
}

function CompareToggle({ id }) {
  const { compare, toggleCompare } = useApp()
  const on = compare.includes(id)
  return (
    <button
      type="button"
      className={`save compare-btn ${on ? 'on' : ''}`}
      aria-label={on ? 'Remove from compare' : 'Add to compare'}
      title={on ? 'Remove from compare' : 'Add to compare'}
      onClick={(e) => { e.preventDefault(); toggleCompare(id) }}
    >
      <Icon name="compare" />
    </button>
  )
}

function Price({ car }) {
  return (
    <div className="price">
      {car.oldPrice && <s>{money(car.oldPrice)}</s>}
      <strong>{money(car.price)}</strong>
    </div>
  )
}

/**
 * variant:
 *  default    – white card, 3 icon specs in a row (most pages)
 *  dark       – navy body (Home 2, Home 3 popular makes)
 *  horizontal – image left, info right (Home 1 popular makes, Home 4 explore)
 *  compact    – "2500 Miles · Diesel · Manual" line (Home 8)
 *  grid       – 2×2 spec grid incl. year (Home 7, Home 9)
 */
export default function CarCard({ car, variant = 'default' }) {
  const to = `/listings/${car.id}`
  const media = (
    <Link to={to} className="car-media">
      <img src={car.image} alt={car.title} loading="lazy" />
      {car.thumbs?.[1] && <img src={car.thumbs[1]} alt="" loading="lazy" className="car-img-alt" />}
      {car.badge && <span className={`badge ${badgeClass[car.badge]}`}>{t(car.badge)}</span>}
      {car.images?.length > 1 && <span className="photo-chip"><Icon name="video" /> {car.images.length}</span>}
      <Save id={car.id} />
      <CompareToggle id={car.id} />
    </Link>
  )
  const head = (
    <>
      <h3><Link to={to}>{car.title}</Link></h3>
      <p className="car-spec">{car.spec}</p>
    </>
  )
  const details = <Link to={to} className="details">{t('View Details')} <Icon name="arrow" /></Link>

  if (variant === 'horizontal') {
    return (
      <article className="car car-horizontal">
        {media}
        <div className="car-body">
          {head}
          <ul className="car-list">
            <li><Icon name="gauge" />{miles(car.mileage)}</li>
            <li><Icon name="fuel" />{t(car.fuel)}</li>
            <li><Icon name="gear" />{t(car.transmission)}</li>
          </ul>
          <div className="car-foot"><Price car={car} />{details}</div>
        </div>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="car car-compact">
        {media}
        <div className="car-body">
          <h3><Link to={to}>{car.title}</Link></h3>
          <p className="car-line">{miles(car.mileage)} · {t(car.fuel)} · {t(car.transmission)}</p>
          <Price car={car} />
          {details}
        </div>
      </article>
    )
  }

  return (
    <article className={`car car-${variant}`}>
      {media}
      <div className="car-body">
        {head}
        {variant === 'grid' ? (
          <ul className="spec-grid">
            <li><Icon name="gauge" />{miles(car.mileage)}</li>
            <li><Icon name="fuel" />{t(car.fuel)}</li>
            <li><Icon name="gear" />{t(car.transmission)}</li>
            <li><Icon name="calendar" />{car.year}</li>
          </ul>
        ) : (
          <ul className="car-feats">
            <li><Icon name="gauge" />{miles(car.mileage)}</li>
            <li><Icon name="fuel" />{t(car.fuel)}</li>
            <li><Icon name="gear" />{t(car.transmission)}</li>
          </ul>
        )}
        <div className="car-foot"><Price car={car} />{details}</div>
      </div>
    </article>
  )
}
