import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InnerLayout from './InnerLayout'
import Icon from '../components/Icon'
import { CarSection, LoanFields, useLoan, MapEmbed, Stars, Breadcrumb, NotifyForm } from '../components/sections'
import { carById, cars, money, miles } from '../data/cars'
import { img, people } from '../data/images'
import { useApp } from '../context/AppContext'
import NotFound from './NotFound'
import { t } from '../i18n'

const featureGroups = {
  Interior: ['Air Conditioner', 'Digital Odometer', 'Heater', 'Leather Seats', 'Panoramic Moonroof', 'Tachometer', 'Touchscreen Display'],
  Safety: ['Anti-lock Braking', 'Brake Assist', 'Child Safety Locks', 'Driver Air Bag', 'Power Door Locks', 'Stability Control', 'Traction Control'],
  Exterior: ['Fog Lights Front', 'Rain Sensing Wiper', 'Rear Spoiler', 'Windows - Electric'],
  'Comfort & Convenience': ['Android Auto', 'Apple CarPlay', 'Bluetooth', 'HomeLink', 'Power Steering'],
}
const dimensions = [['Length', '4950mm'], ['Width', '2100mm'], ['Height', '1550mm'], ['Width (including mirrors)', '2140mm'], ['Wheelbase', '2560mm'], ['Gross Vehicle Weight (kg)', '1550'], ['Height (including roof rails)', '1550mm'], ['Max. Loading Weight (kg)', '1200'], ['Luggage Capacity (Seats Up - Litres)', '490'], ['Max. Roof Load (kg)', '400'], ['Luggage Capacity (Seats Down - Litres)', '850'], ['No. of Seats', '5']]
const engine = [['Fuel Tank Capacity (Litres)', '80'], ['Minimum Kerbweight (kg)', '350'], ['Max. Towing Weight - Braked (kg)', '1000'], ['Turning Circle - Kerb to Kerb (m)', '1500'], ['Max. Towing Weight - Unbraked (kg)', '1500']]
const ratings = [['Comfort', 5.0, 'Perfect'], ['Interior Design', 4.5, 'Good'], ['Exterior Styling', 5.0, 'Perfect'], ['Value For The Money', 5.0, 'Perfect'], ['Performance', 5.0, 'Perfect'], ['Reliability', 4.5, 'Good']]

function Lightbox({ car, index, onClose, setIndex }) {
  const n = car.images.length
  useEffect(() => {
    if (index < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % n)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, n, onClose, setIndex])
  if (index < 0) return null
  return (
    <div className="modal" onClick={onClose}>
      <div className="lightbox" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label={t('Close')} onClick={onClose}><Icon name="close" /></button>
        <img src={car.images[index]} alt={`${car.title} — photo ${index + 1}`} />
        <span className="lb-count">{index + 1} / {n}</span>
        {n > 1 && (
          <>
            <button type="button" className="slide-arrow left glass" aria-label={t('Previous photo')} onClick={() => setIndex((index - 1 + n) % n)}><Icon name="chev-l" /></button>
            <button type="button" className="slide-arrow right glass" aria-label={t('Next photo')} onClick={() => setIndex((index + 1) % n)}><Icon name="chev-r" /></button>
          </>
        )}
        <div className="lb-thumbs">
          {car.thumbs.map((src, i) => (
            <button type="button" key={src} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} aria-label={`Photo ${i + 1}`}><img src={src} alt="" /></button>
          ))}
        </div>
      </div>
    </div>
  )
}

function DealerCard({ car, v2 }) {
  return (
    <div className="side-card dealer">
      <img src={img(people.jerome2, 120, 120)} alt="" className="avatar" />
      <h4>{t('admin')}</h4>
      <p className="small">{t('943 Broadway, Brooklyn')}</p>
      <div className="dealer-links">
        <a href="https://maps.google.com/?q=943+Broadway+Brooklyn" target="_blank" rel="noreferrer"><Icon name="pin" /> {t('Get Direction')}</a>
        <a href="tel:+88123456789"><Icon name="call" /> +88-123456789</a>
      </div>
      <a href={`mailto:dealer@boxcars.com?subject=${encodeURIComponent(car.title)}`} className={`btn w-full ${v2 ? 'btn-soft' : 'btn-primary'}`}>{t('Message Dealer')} <Icon name="arrow" /></a>
      <a href="https://wa.me/88123456789" target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full">{t('Chat Via Whatsapp')} <Icon name="arrow" /></a>
      <Link to={`/listings?make=${encodeURIComponent(car.brand)}`} className="arrow-link">{t('View all stock at this dealer')} <Icon name="arrow" /></Link>
    </div>
  )
}

function OfferModal({ car, onClose }) {
  const { notify } = useApp()
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label={t('Close')} onClick={onClose}><Icon name="close" /></button>
        <h3>{t('Make an offer')}</h3>
        <p className="small">{car.title} · {t("listed at")} {money(car.price)}</p>
        <form className="form-grid" onSubmit={(e) => { e.preventDefault(); notify('Your offer was sent to the dealer.'); onClose() }}>
          <label className="field"><span>{t('Name')}</span><input required /></label>
          <label className="field"><span>{t('Email')}</span><input type="email" required /></label>
          <label className="field full"><span>{t('Your offer ($)')}</span><input type="number" required defaultValue={Math.round(car.price * 0.95)} /></label>
          <button type="submit" className="btn btn-primary full">{t('Send Offer')} <Icon name="arrow" /></button>
        </form>
      </div>
    </div>
  )
}

export default function CarDetails({ v2 = false }) {
  const { id } = useParams()
  const car = carById(id)
  const { saved, toggleSaved, compare, toggleCompare, notify, recent, addRecent } = useApp()
  useEffect(() => {
    if (car) addRecent(car.id)
  }, [car, addRecent])
  const [light, setLight] = useState(-1)
  const [active, setActive] = useState(0)
  const closeLight = useCallback(() => setLight(-1), [])
  useEffect(() => {
    setActive(0)
    setLight(-1)
  }, [id])
  const [offer, setOffer] = useState(false)
  const loan = useLoan({ price: car?.price || 10000, rate: 10, years: 3, down: 5000 })
  if (!car) return <NotFound />

  const recentCars = recent.filter((rid) => rid !== car.id).map(carById).filter(Boolean)
  const isSaved = saved.includes(car.id)
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: car.title, url: location.href })
      else { await navigator.clipboard.writeText(location.href); notify('Link copied to clipboard') }
    } catch { /* cancelled */ }
  }
  const overview = [
    ['body', 'Body', car.body], ['condition', 'Condition', car.condition], ['gauge', 'Mileage', car.mileage], ['engine', 'Engine Size', car.engine],
    ['fuel', 'Fuel Type', car.fuel], ['door', 'Door', car.doors], ['calendar', 'Year', car.year], ['cylinder', 'Cylinder', car.cylinders],
    ['gear', 'Transmission', car.transmission], ['color', 'Color', car.color], ['drive', 'Drive Type', car.drive], ['vin', 'VIN', `FCB${String(car.price).slice(0, 5)}`],
  ]

  return (
    <InnerLayout docTitle={car.title}>
      <div className="container details-page">
        <Breadcrumb items={[['Listings', '/listings'], [car.title]]} />
        <div className="details-head">
          <div>
            <h1 className="page-title">{car.title}</h1>
            <p className="small">{car.spec}</p>
            <div className="spec-chips">
              <span><Icon name="calendar" /> {car.year}</span>
              <span><Icon name="gauge" /> {miles(car.mileage).toLowerCase()}</span>
              <span><Icon name="gear" /> {t(car.transmission)}</span>
              <span><Icon name="fuel" /> {t(car.fuel)}</span>
            </div>
          </div>
          <div className="details-actions">
            <div className="icon-actions">
              <button type="button" onClick={share}>{t('Share')} <Icon name="share" /></button>
              <button type="button" onClick={() => toggleSaved(car.id)} className={isSaved ? 'on' : ''}>{t(isSaved ? 'Saved' : 'Save')} <Icon name="bookmark" /></button>
              <button type="button" onClick={() => toggleCompare(car.id)} className={compare.includes(car.id) ? 'on' : ''}>{t(compare.includes(car.id) ? 'In Compare' : 'Compare')} <Icon name="compare" /></button>
            </div>
            {!v2 && (
              <>
                <p className="big-price">{money(car.price)}</p>
                <button type="button" className="link-btn" onClick={() => setOffer(true)}><Icon name="pricing" /> {t('Make An Offer Price')}</button>
              </>
            )}
          </div>
        </div>

        {v2 ? (
          <div className="details-cols">
            <div>
              <div className="gallery-single" onClick={() => setLight(active)}>
                <img src={car.images[active]} alt={`${car.title} — photo ${active + 1}`} />
                {car.badge && <span className="badge blue">{t(car.badge)}</span>}
                <span className="photo-count"><Icon name="video" /> {active + 1} / {car.images.length} {t("photos")}</span>
              </div>
              <div className="gallery-strip">
                {car.thumbs.map((src, i) => (
                  <button type="button" key={src} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`}><img src={src} alt="" loading="lazy" /></button>
                ))}
              </div>
            </div>
            <aside className="details-side">
              <div className="side-card price-card">
                <p className="small">{t('Our Price')}</p>
                <p className="big-price">{car.oldPrice && <s>{money(car.oldPrice)}</s>} {money(car.price)}</p>
                {car.oldPrice && <p className="small">Instant Saving: {money(car.oldPrice - car.price)}</p>}
                <button type="button" className="btn btn-primary w-full" onClick={() => setOffer(true)}><Icon name="pricing" /> {t('Make An Offer Price')}</button>
                <Link to="/services#schedule" className="btn btn-outline-dark w-full"><Icon name="video" /> {t('Schedule Test Drive')}</Link>
              </div>
              <DealerCard car={car} v2 />
            </aside>
          </div>
        ) : (
          <div className={`gallery thumbs-${Math.min(4, car.images.length - 1)}`}>
            <button type="button" className="g-main" onClick={() => setLight(0)}>
              <img src={car.images[0]} alt={car.title} />
              {car.badge && <span className="badge green">{t(car.badge)}</span>}
              <span className="photo-count"><Icon name="video" /> {car.images.length} {t("photos")}</span>
            </button>
            {car.thumbs.slice(1, 5).map((src, i) => (
              <button type="button" key={src} className="g-thumb" onClick={() => setLight(i + 1)} aria-label={`Open photo ${i + 2}`}>
                <img src={src} alt="" loading="lazy" />
                {i === 3 && car.images.length > 5 && <span className="more-photos">+{car.images.length - 5}</span>}
              </button>
            ))}
          </div>
        )}

        <div className="details-cols">
          <div className="details-main">
            <section className="d-block">
              <h2>{t('Car Overview')}</h2>
              <div className="overview">
                {overview.map(([icon, label, value]) => (
                  <p key={label}><span><Icon name={icon} /> {t(label)}</span><b>{t(value)}</b></p>
                ))}
              </div>
            </section>
            <section className="d-block">
              <h2>{t('Description')}</h2>
              <p>{t('Quisque imperdiet dignissim enim dictum finibus. Sed consectetur convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus.')}</p>
              <p>{t('Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec.')}</p>
              <div className="pdf-pills">
                {!v2 && <Link to="/services#schedule" className="pill soft"><Icon name="doc" /> {t('Schedule-Test-Drive.Pdf')}</Link>}
                <Link to={`/contact?topic=brochure&car=${car.id}`} className="pill soft"><Icon name="doc" /> {t('Car-Brochure.Pdf')}</Link>
              </div>
            </section>
            <section className="d-block">
              <h2>{t('Features')}</h2>
              <div className="feature-cols">
                {Object.entries(featureGroups).map(([g, items]) => (
                  <div key={g}><h4>{t(g)}</h4>{items.map((f) => <p key={f}><Icon name="check" /> {t(f)}</p>)}</div>
                ))}
              </div>
            </section>
            <section className="d-block">
              <h2>{t('Dimensions & Capacity')}</h2>
              <div className="spec-table">{dimensions.map(([k, v]) => <p key={k}><span>{t(k)}</span><b>{t(v)}</b></p>)}</div>
            </section>
            <section className="d-block">
              <h2>{t('Engine and Transmission')}</h2>
              <div className="spec-table">{engine.map(([k, v]) => <p key={k}><span>{t(k)}</span><b>{t(v)}</b></p>)}</div>
            </section>
            <section className="d-block">
              <h2>{t('Location')}</h2>
              <p className="small">{t('328 Kent Ave, Brooklyn')}</p>
              <a className="arrow-link" href="https://maps.google.com/?q=328+Kent+Ave+Brooklyn" target="_blank" rel="noreferrer">{t('Get Direction')} <Icon name="arrow" /></a>
              <MapEmbed query="328 Kent Ave, Brooklyn" className="d-map" />
            </section>
            <section className="d-block">
              <h2>{t('Financing Calculator')}</h2>
              <form onSubmit={loan.calc}>
                <LoanFields loan={loan} />
                <button type="submit" className="btn btn-primary">{t('Calculate')} <Icon name="arrow" /></button>
                {loan.result && <p className="loan-result">{t('Monthly payment:')} <b>{money(Math.round(loan.result.monthly))}</b> {t('· Total:')} <b>{money(Math.round(loan.result.total))}</b></p>}
              </form>
            </section>
            <section className="d-block">
              <h2>{t('2 Reviews')}</h2>
              <div className="rating-summary">
                <div className="rating-circle"><small>{t('Overall Rating')}</small><strong>4.5</strong><small>{t('Out of 5')}</small></div>
                <div className="rating-grid">{ratings.map(([k, v, w]) => <p key={k}><span><b>{t(k)}</b><small>{t(w)}</small></span><span className="r-val"><Icon name="star" /> {v.toFixed(1)}</span></p>)}</div>
              </div>
              {[['November 30, 2023', 4.7, 'Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis.'], ['December 16, 2023', 5.0, 'Great car and an easy buying process. Would recommend.']].map(([d, r, text]) => (
                <div key={d} className="comment">
                  <div className="comment-head"><img src={img(people.floyd, 80, 80)} alt="" /><b>{t('Demo')}</b><small>{d}</small></div>
                  <p className="comment-stars"><Stars /> {r}</p>
                  <p>{t(text)}</p>
                </div>
              ))}
            </section>
            <section className="d-block">
              <h2>{t('Add a review')}</h2>
              <div className="rate-grid">{ratings.map(([k]) => <p key={k}><span>{t(k)}</span><Stars /></p>)}</div>
              <NotifyForm className="form-grid" message={t('Thanks! Your review was submitted.')}>
                <label className="field"><span>{t('Name')}</span><input required placeholder={t('Ali')} /></label>
                <label className="field"><span>{t('Email')}</span><input type="email" required placeholder={t('Example@gmail.com')} /></label>
                <label className="check full"><input type="checkbox" /> {t('Save my name, email, and website in this browser for the next time I comment.')}</label>
                <label className="field full"><span>{t('Review')}</span><textarea rows="5" required /></label>
                <button type="submit" className="btn btn-primary">{t('Submit Review')} <Icon name="arrow" /></button>
              </NotifyForm>
            </section>
          </div>
          {!v2 && <aside className="details-side"><DealerCard car={car} /></aside>}
        </div>
      </div>
      <CarSection title={t('Related Listings')} cars={cars.filter((c) => c.id !== car.id && (c.body === car.body || c.brand === car.brand)).concat(cars).filter((c, i, a) => c.id !== car.id && a.indexOf(c) === i).slice(0, 8)} />
      {recentCars.length > 0 && <CarSection title={t('Recently Viewed')} cars={recentCars} link={t('View All')} className="pt-0" />}
      <Lightbox car={car} index={light} onClose={closeLight} setIndex={setLight} />
      {offer && <OfferModal car={car} onClose={() => setOffer(false)} />}
    </InnerLayout>
  )
}
