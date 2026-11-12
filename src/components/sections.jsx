/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import MovingBg from './MovingBg'
import CountUp from './CountUp'
import CarCard from './CarCard'
import { StoreButtons } from './Footer'
import { byTab, cars, money } from '../data/cars'
import { brands, brandLogo, features, stats as defaultStats, team, quoteReviews, shortReviews, trustReviews, posts, shopLinks, faqs, hours } from '../data/content'
import { img, photos } from '../data/images'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

/* ---------- helpers ---------- */
export function useWidth() {
  const [w, setW] = useState(() => window.innerWidth)
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

export function ArrowLink({ to, children, className = '' }) {
  return <Link to={to} className={`arrow-link ${className}`}>{children} <Icon name="arrow" /></Link>
}

export function Btn({ to, children, variant = 'primary', className = '', icon = true, ...rest }) {
  const cls = `btn btn-${variant} ${className}`
  const inner = <>{children} {icon && <Icon name="arrow" />}</>
  return to ? <Link to={to} className={cls} {...rest}>{inner}</Link> : <button type="button" className={cls} {...rest}>{inner}</button>
}

export function Pager({ onPrev, onNext, className = '' }) {
  return (
    <div className={`pager ${className}`}>
      <button type="button" aria-label={t('Previous')} onClick={onPrev}><Icon name="chev-l" /></button>
      <button type="button" aria-label={t('Next')} onClick={onNext}><Icon name="chev-r" /></button>
    </div>
  )
}

export function Tabs({ items, value, onChange, className = '' }) {
  return (
    <div className={`tabs ${className}`} role="tablist">
      {items.map((item) => (
        <button key={item} type="button" role="tab" aria-selected={value === item} className={value === item ? 'active' : ''} onClick={() => onChange(item)}>{t(item)}</button>
      ))}
    </div>
  )
}

export function SectionHead({ title, link, to = '/listings', center = false, children }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      <h2 className="title">{t(title)}</h2>
      {link && !center && <ArrowLink to={to}>{t(link)}</ArrowLink>}
      {children}
    </div>
  )
}

export function Stars({ n = 5, of = 5, className = '' }) {
  return (
    <span className={`stars ${className}`}>
      {Array.from({ length: of }, (_, i) => <Icon key={i} name="star" className={i < n ? 'on' : ''} />)}
    </span>
  )
}

export function TpStars({ n = 5, small = false }) {
  return (
    <span className={`tp-stars ${small ? 'sm' : ''}`}>
      {Array.from({ length: 5 }, (_, i) => <span key={i} className={i < n ? 'on' : ''}><Icon name="star" /></span>)}
    </span>
  )
}

export function Breadcrumb({ items }) {
  return (
    <p className="breadcrumb">
      <Link to="/">{t('Home')}</Link>
      {items.map(([label, to]) => (
        <span key={label}> / {to ? <Link to={to}>{t(label)}</Link> : t(label)}</span>
      ))}
    </p>
  )
}

/* ---------- car sections ---------- */
export function CarSection({
  title, cars, tabs, variant = 'default', perView = 4, rows = 1, link = 'View All', center = false,
  bg = '', pager = true, pagerCenter = false, className = '',
}) {
  const width = useWidth()
  const [tab, setTab] = useState(tabs?.[0])
  const [page, setPage] = useState(0)
  const list = useMemo(() => {
    if (!tabs || tab === tabs[0]) return cars
    return byTab(tab)?.length ? byTab(tab) : cars
  }, [tab, tabs, cars])

  const isWide = variant === 'horizontal'
  let per = perView * rows
  if (width < 640) per = rows > 1 ? 2 : 1
  else if (width < 1100) per = isWide ? 1 : Math.min(perView, 2) * rows
  else if (isWide) per = Math.min(perView, 2) * rows
  const pages = Math.max(1, Math.ceil(list.length / per))
  const shown = list.slice((page % pages) * per, (page % pages) * per + per)
  const change = (next) => { setTab(next); setPage(0) }

  return (
    <section className={`section car-section ${bg} ${className}`}>
      <div className="container">
        <SectionHead title={title} link={link} center={center} />
        {tabs && <Tabs items={tabs} value={tab} onChange={change} className={center ? 'center' : ''} />}
        <div className={`cars cars-${variant} per-${isWide ? Math.min(perView, 2) : perView}`}>
          {shown.map((c) => <CarCard key={c.id} car={c} variant={variant} />)}
        </div>
        {pager && pages > 1 && (
          <Pager className={pagerCenter || center ? 'center' : ''} onPrev={() => setPage((p) => (p - 1 + pages) % pages)} onNext={() => setPage((p) => (p + 1) % pages)} />
        )}
      </div>
    </section>
  )
}

/* ---------- brands ---------- */
export function Brands({ title = 'Explore Our Premium Brands', variant = 'boxes', items = brands, className = '' }) {
  if (variant === 'orbit') {
    return (
      <section className={`section ${className}`}>
        <div className="container">
          <div className="orbit-box">
            <div>
              <h2 className="title">{t('Explore Our Premium')}<br />{t('Brands')}</h2>
              <p>{t('Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.')}</p>
              <Btn to="/listings">{t('Show All Brands')}</Btn>
            </div>
            <div className="orbit">
              <span className="orbit-ring" />
              <span className="orbit-center">{t('BOXCARS')}</span>
              {items.map((b, i) => (
                <Link key={b.name} to={`/listings?make=${encodeURIComponent(b.name.replace(' Benz', '-Benz'))}`} className={`orbit-logo o${i}`} title={b.name}>
                  <img src={brandLogo(b.logo)} alt={b.name} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <SectionHead title={title} link={t('Show All Brands')} />
        <div className={`brands brands-${variant}`}>
          {items.map((b) => (
            <Link key={b.name} to={`/listings?make=${encodeURIComponent(b.name.replace(' Benz', '-Benz'))}`} className="brand">
              <img src={brandLogo(b.logo)} alt="" />
              <span>{b.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- body types ---------- */
const typeIcons = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid', 'Convertible', 'Van', 'Truck', 'Electric']
const typePhotos = [
  ['SUV', '1684239845179-0bb0362dfd28'], ['Sedan', '1652453822986-04f70788b118'], ['Coupe', '1609386463693-caf39be25c6d'],
  ['Truck', '1641437638621-1de977395a9c'], ['Hybrid', '1653227158553-ddaa680cdd65'], ['Van', '1674935644433-ba2b2ffe87cf'],
]
const countFor = (type) => cars.filter((c) => c.body === type || c.fuel === type).length

export function TypeChips({ items = typeIcons.slice(0, 5), className = '' }) {
  return (
    <div className={`type-chips ${className}`}>
      {items.map((type) => (
        <Link key={type} to={`/listings?body=${type}`} className="type-chip"><Icon name={type.toLowerCase()} /> {t(type)}</Link>
      ))}
    </div>
  )
}

/** variant: boxes (icon tiles) | photos (Home 4 mosaic) | tiles (Home 7 tall photo cards) */
export function BrowseTypes({ variant = 'boxes', count = 9, center = false, link = 'View All', className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <SectionHead title={t('Browse by Type')} link={link} center={center} />
        {variant === 'boxes' && (
          <div className={`type-boxes n${count}`}>
            {typeIcons.slice(0, count).map((type) => (
              <Link key={type} to={`/listings?body=${type}`} className="type-box"><Icon name={type.toLowerCase()} /><span>{t(type)}</span></Link>
            ))}
          </div>
        )}
        {variant === 'photos' && (
          <div className="type-mosaic">
            {typePhotos.slice(0, 5).map(([type, id], i) => (
              <Link key={type} to={`/listings?body=${type}`} className={`mosaic-item m${i}`}>
                <img src={img(id, i < 2 ? 900 : 600)} alt={t(type)} loading="lazy" />
                <span className="chip-label"><Icon name={type.toLowerCase()} /> {t(type)}</span>
              </Link>
            ))}
          </div>
        )}
        {variant === 'tiles' && (
          <div className="type-tiles">
            {typePhotos.slice(0, 5).map(([type, id]) => (
              <Link key={type} to={`/listings?body=${type}`} className="type-tile">
                <img src={img(id, 500)} alt={t(type)} loading="lazy" />
                <span><small>{t('{n} Cars', { n: countFor(type) })}</small>{t(type)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- features / why choose us ---------- */
const featureLinks = { finance: '/loan-calculator', trusted: '/about', pricing: '/pricing', service: '/services' }

function FeatureItem({ f, card }) {
  return (
    <Link to={featureLinks[f.icon]} className={`feature ${card ? 'card' : ''}`}>
      <Icon name={f.icon} className="feature-icon" />
      <h3>{t(f.title)}</h3>
      <p>{t(f.text)}</p>
    </Link>
  )
}

/** variant: row | centered | cards | split | blue | soft */
export function Features({ variant = 'row', title = 'Why Choose Us?', intro, button, className = '' }) {
  if (variant === 'split') {
    return (
      <section className={`section ${className}`}>
        <div className="container features-split">
          <div>
            <h2 className="title">{t(title)}</h2>
            {intro && <p className="lead">{t(intro)}</p>}
            {button && <Btn to="/about">{t(button)}</Btn>}
          </div>
          <div className="features-grid two">
            {features.map((f) => <FeatureItem key={f.title} f={f} />)}
          </div>
        </div>
      </section>
    )
  }
  const center = variant === 'centered' || variant === 'cards'
  return (
    <section className={`section features-${variant} ${className}`}>
      <div className="container">
        <div className={variant === 'soft' || variant === 'cards' ? 'soft-box' : ''}>
          <h2 className={`title ${center ? 'center' : ''}`}>{t(title)}</h2>
          <div className="features-grid">
            {features.map((f) => <FeatureItem key={f.title} f={f} card={variant === 'cards'} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- stats ---------- */
export function Stats({ items = defaultStats, variant = 'plain', className = '' }) {
  return (
    <section className={`stats-section ${className}`}>
      <div className="container">
        <div className={`stats stats-${variant}`}>
          {items.map((s, i) => (
            <Link key={s.label} to={['/listings', '/about#reviews', '/about', '/contact'][i]}><strong><CountUp value={s.value} /></strong><span>{t(s.label)}</span></Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- buy / sell promo ---------- */
function CarIcon() {
  return (
    <svg className="promo-icon" viewBox="0 0 64 64" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 42V30l6-12c1-2 3-3 5-3h22c2 0 4 1 5 3l6 12v12z" stroke="#405FF2" />
      <circle cx="20" cy="46" r="5" stroke="#405FF2" /><circle cx="44" cy="46" r="5" stroke="#405FF2" />
      <path d="M35 24c-1-1.5-2.5-2-4-2-2.5 0-4 1.3-4 3s1.5 2.5 4 3 4 1.5 4 3.2-1.7 2.8-4 2.8c-1.8 0-3.3-.7-4-2M31 19v3M31 34v3" stroke="#EE3F9C" />
    </svg>
  )
}
function SellIcon() {
  return (
    <svg className="promo-icon" viewBox="0 0 64 64" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="8" width="34" height="46" rx="6" stroke="#405FF2" />
      <path d="M18 24v-4l3-5h12l3 5v4zM18 24h18" stroke="#EE3F9C" />
      <path d="m17 36 3 3 5-5M17 46h10" stroke="#405FF2" />
      <path d="M54 34c-1-1.5-2.5-2-4-2-2.5 0-4 1.3-4 3s1.5 2.5 4 3 4 1.5 4 3.2-1.7 2.8-4 2.8c-1.8 0-3.3-.7-4-2M50 29v3M50 44v3" stroke="#EE3F9C" />
    </svg>
  )
}

/** variant: light (blue/pink cards) | photo (Home 9) */
export function Promo({ variant = 'light', className = '' }) {
  if (variant === 'photo') {
    return (
      <section className={`section ${className}`}>
        <div className="container promo-grid">
          <div className="promo promo-photo" style={{ backgroundImage: `url(${img(photos.greyCoupe, 900)})` }}>
            <h3>{t('Are You Looking')}<br />{t('For a Car ?')}</h3>
            <p>{t('We are committed to providing our customers with exceptional service.')}</p>
            <Btn to="/listings" variant="white">{t('Get Started')}</Btn>
          </div>
          <div className="promo promo-photo" style={{ backgroundImage: `url(${img('1615063029891-497bebd4f03c', 900)})` }}>
            <h3>{t('Do You Want to')}<br />{t('Sell a Car ?')}</h3>
            <p>{t('We are committed to providing our customers with exceptional service.')}</p>
            <Btn to="/contact?topic=sell" variant="white">{t('Get Started')}</Btn>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className={`section ${className}`}>
      <div className="container promo-grid">
        <div className="promo promo-blue">
          <div>
            <h3>{t('Are You Looking')}<br />{t('For a Car ?')}</h3>
            <p>{t('We are committed to providing our customers with exceptional service.')}</p>
            <Btn to="/listings">{t('Get Started')}</Btn>
          </div>
          <CarIcon />
        </div>
        <div className="promo promo-pink">
          <div>
            <h3>{t('Do You Want to')}<br />{t('Sell a Car ?')}</h3>
            <p>{t('We are committed to providing our customers with exceptional service.')}</p>
            <Btn to="/contact?topic=sell" variant="dark">{t('Get Started')}</Btn>
          </div>
          <SellIcon />
        </div>
      </div>
    </section>
  )
}

/* ---------- "Get a fair price" split ---------- */
function VideoThumb({ src, className = '' }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`video-thumb ${className}`}>
      <img src={src} alt="" loading="lazy" />
      <button type="button" className="play" aria-label={t('Play video')} onClick={() => setOpen(true)}><Icon name="play" /></button>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-box video" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label={t('Close')} onClick={() => setOpen(false)}><Icon name="close" /></button>
            <iframe src="https://www.youtube-nocookie.com/embed/zcJMV1DzXjw?autoplay=1" title={t('BoxCar video')} allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  )
}

const checks = ['We are the UK’s largest provider, with more patrols in more places', 'You get 24/7 roadside assistance', 'We fix 4 out of 5 cars at the roadside']

/** variant: split (lavender panel) | soft (soft bg behind photo) | stack (2 photos) | collage (3 photos) | finance (Home 3) */
export function FairPrice({ variant = 'split', className = '' }) {
  const text = (
    <div className="fair-text">
      <h2 className="title">{variant === 'finance' ? <>{t('Flexible Finance For Added')}<br />{t('Shine')}</> : <>{t('Get A Fair Price For Your')}<br />{t('Car Sell To Us Today')}</>}</h2>
      {variant === 'finance' ? (
        <p>{t('AX Car Finance allows you to get a quote without affecting your credit rating. Find a car from any dealer, and we’ll do the rest. With a large panel of 30+ lenders we can help most drivers.')}</p>
      ) : (
        <>
          <p>{t('We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of.')}</p>
          <ul className="checks">{checks.map((c) => <li key={c}><Icon name="check" />{t(c)}</li>)}</ul>
        </>
      )}
      <Btn to={variant === 'finance' ? '/loan-calculator' : '/contact?topic=sell'}>{t(variant === 'finance' ? 'Find Out More' : 'Get Started')}</Btn>
    </div>
  )
  if (variant === 'stack' || variant === 'collage') {
    return (
      <section className={`section ${className}`}>
        <div className="container fair fair-photos">
          <div className={`fair-${variant}`}>
            {variant === 'collage' && <img src={img(photos.greyCoupe, 500)} alt="" className="c1" />}
            {variant === 'collage' && <img src={img(photos.garageSuv, 500)} alt="" className="c2" />}
            {variant === 'stack' && <img src={img(photos.greyCoupe, 500)} alt="" className="c1" />}
            <img src={img(variant === 'collage' ? '1622893288761-823ba60f17a6' : '1631347826177-de288776ed3b', 600)} alt="" className="c3" />
          </div>
          {text}
        </div>
      </section>
    )
  }
  return (
    <section className={`section ${className}`}>
      <div className={`container fair fair-${variant}`}>
        <VideoThumb src={img(variant === 'soft' ? photos.mustang : photos.mountainRoad, 1000)} />
        {text}
      </div>
    </section>
  )
}

/* ---------- testimonials ---------- */
export function TrustTestimonials({ bg = 'bg-soft', className = '' }) {
  const [i, setI] = useState(0)
  const r = trustReviews[i]
  return (
    <section className={`section testimonials ${bg} ${className}`}>
      <div className="container">
        <div className="section-head">
          <h2 className="title">{t('What Our')}<br />{t('Customers Say')}</h2>
          <Pager onPrev={() => setI((i + trustReviews.length - 1) % trustReviews.length)} onNext={() => setI((i + 1) % trustReviews.length)} />
        </div>
        <div className="testi-grid">
          <div className="trust">
            <p className="trust-label">{t('Great')}</p>
            <TpStars />
            <p className="small">{t('Based on 5,801 reviews')}</p>
            <p className="trust-brand"><Icon name="star" /> {t('Trustpilot')}</p>
          </div>
          <div className="review">
            <div className="review-top"><TpStars small /><span className="verified"><Icon name="check" /> {t('Verified')}</span></div>
            <p className="review-name">{r.name}</p>
            <p className="small">{t(r.role)}</p>
            <blockquote>{t(r.text)}</blockquote>
            <div className="avatars">
              {trustReviews.map((rev, k) => (
                <button key={rev.name} type="button" className={k === i ? 'active' : ''} onClick={() => setI(k)} aria-label={rev.name}>
                  <img src={img(rev.photo, 120, 120)} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PhotoTestimonial({ className = '' }) {
  const [i, setI] = useState(0)
  const r = trustReviews[i]
  const n = trustReviews.length
  return (
    <section className={`section testimonials bg-soft ${className}`}>
      <div className="container">
        <div className="section-head">
          <h2 className="title">{t('What our customers say')}</h2>
          <p className="small">{t('Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews')}</p>
        </div>
        <div className="photo-testi">
          <button type="button" className="side-arrow" aria-label={t('Previous')} onClick={() => setI((i + n - 1) % n)}><Icon name="chev-l" /></button>
          <img src={img(r.photo, 500, 560)} alt={r.name} />
          <div>
            <div className="review-top"><Stars /><span className="score">4.9</span></div>
            <p className="review-name">{r.name}</p>
            <p className="small">{t(r.role)}</p>
            <blockquote>{t(r.text)}</blockquote>
          </div>
          <button type="button" className="side-arrow" aria-label={t('Next')} onClick={() => setI((i + 1) % n)}><Icon name="chev-r" /></button>
        </div>
      </div>
    </section>
  )
}

export function ReviewCards({ bg = '', sideArrows = false, className = '' }) {
  const [start, setStart] = useState(0)
  const width = useWidth()
  const per = width < 640 ? 1 : width < 1100 ? 2 : sideArrows ? 4 : 5
  const shown = Array.from({ length: per }, (_, k) => shortReviews[(start + k) % shortReviews.length])
  const move = (d) => setStart((s) => (s + d + shortReviews.length) % shortReviews.length)
  return (
    <section className={`section ${bg} ${className}`}>
      <div className="container">
        <div className="section-head">
          <h2 className="title">{t('What our customers say')}</h2>
          <p className="small">{t('Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews')}</p>
        </div>
        <div className={`review-cards ${sideArrows ? 'with-arrows' : ''}`}>
          {sideArrows && <button type="button" className="side-arrow" aria-label={t('Previous')} onClick={() => move(-1)}><Icon name="chev-l" /></button>}
          {shown.map((r, k) => (
            <Link key={k} to="/about#reviews" className="review-card">
              <div className="review-top"><TpStars n={r.stars} small /><span className="verified"><Icon name="check" /> {t('Verified')}</span></div>
              <h4>{t(r.title)}</h4>
              <p>{t(r.text)}</p>
              <strong>{r.name}</strong>
            </Link>
          ))}
          {sideArrows && <button type="button" className="side-arrow" aria-label={t('Next')} onClick={() => move(1)}><Icon name="chev-r" /></button>}
        </div>
        {!sideArrows && <Pager onPrev={() => move(-1)} onNext={() => move(1)} />}
      </div>
    </section>
  )
}

/** variant: soft (grey rounded box) | dark (navy box) | plain | blue (light blue cards) */
export function QuoteCards({ variant = 'soft', className = '' }) {
  const [start, setStart] = useState(0)
  const width = useWidth()
  const per = width < 640 ? 1 : width < 1100 ? 2 : 3
  const shown = Array.from({ length: per }, (_, k) => quoteReviews[(start + k) % quoteReviews.length])
  const move = (d) => setStart((s) => (s + d + quoteReviews.length) % quoteReviews.length)
  return (
    <section id="reviews" className={`section ${className}`}>
      <div className="container">
        <div className={`quote-box quote-${variant}`}>
          <div className="section-head">
            <h2 className="title">{t('What our customers say')}</h2>
            <p className="small">{t('Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews')}</p>
          </div>
          <div className="quote-cards">
            {shown.map((r, k) => (
              <Link key={k} to="/about#reviews" className="quote-card">
                <div className="quote-top"><h4>{t(r.title)}</h4><Icon name="quote" /></div>
                <p>{t(r.text)}</p>
                <div className="person"><img src={img(r.photo, 80, 80)} alt="" /><div><strong>{r.name}</strong><small>{t(r.role)}</small></div></div>
              </Link>
            ))}
          </div>
          <Pager className={variant === 'dark' ? 'light' : ''} onPrev={() => move(-1)} onNext={() => move(1)} />
        </div>
      </div>
    </section>
  )
}

/* ---------- blog ---------- */
export function PostCard({ post }) {
  return (
    <article className="post">
      <Link to={`/blog/${post.id}`} className="post-img">
        <img src={post.image} alt="" loading="lazy" />
        <span className="chip">{t(post.category)}</span>
      </Link>
      <p className="post-meta">{t(post.author)} <i /> {t(post.date)}</p>
      <h3><Link to={`/blog/${post.id}`}>{t(post.title)}</Link></h3>
    </article>
  )
}

export function BlogSection({ center = false, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <SectionHead title={t('Latest Blog Posts')} link={t('View All')} to="/blog" center={center} />
        <div className="posts">{posts.slice(0, 3).map((p) => <PostCard key={p.id} post={p} />)}</div>
      </div>
    </section>
  )
}

/* ---------- team ---------- */
export function Team({ variant = 'photo', count = 4, center = false, className = '' }) {
  const members = variant === 'pastel' ? team : team.slice(0, 4)
  return (
    <section id="team" className={`section ${className}`}>
      <div className="container">
        <SectionHead title={t('Our Team')} link={t('View All')} to="/about#team" center={center} />
        <div className={`team team-${variant}`}>
          {members.slice(0, variant === 'pastel' ? 5 : count).map((m, i) => (
            <Link key={i} to={`/contact?to=${encodeURIComponent(m.name)}`} className="member" style={variant === 'pastel' ? { background: m.bg } : undefined}>
              {variant === 'pastel' && <div className="member-text"><strong>{m.name}</strong><small>{t(m.role)}</small></div>}
              <img src={img(m.photo, 400, variant === 'pastel' ? 440 : 480)} alt={m.name} loading="lazy" />
              {variant !== 'pastel' && <div className="member-text"><strong>{m.name}</strong><small>{t(m.role)}</small></div>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- misc blocks ---------- */
const inspiration = [['Automatics Cars', 'transmission=Automatic'], ['SUVs', 'body=SUV'], ['Electrics Cars', 'fuel=Electric'], ['New in Stock', 'condition=New'], ['Petrol', 'fuel=Petrol'], ['Diesel', 'fuel=Diesel']]

export function Inspiration({ className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <h2 className="title">{t('Need Some Inspiration?')}</h2>
        <div className="chips">{inspiration.map(([l, q]) => <Link key={l} to={`/listings?${q}`} className="chip-btn">{t(l)}</Link>)}</div>
      </div>
    </section>
  )
}

export function PhoneMock() {
  return (
    <div className="phone-mock">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-bar"><b>●</b> {t('Superio')} <span>☰</span></div>
        <p className="phone-title">{t('There Are')} <span>93,178</span> {t('Postings Here For you!')}</p>
        <p className="phone-sub">{t('Find Jobs, Employment & Career Opportunities')}</p>
        <div className="phone-input"><Icon name="search" /> {t('Job title, keywords, or company')}</div>
        <div className="phone-input"><Icon name="pin" /> {t('City or postcode')}</div>
        <span className="phone-btn">{t('Find Jobs')}</span>
      </div>
    </div>
  )
}

/** variant: blue (Home 4) | lavender (Home 5) */
export function AppPromo({ variant = 'blue', className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <div className={`app-promo app-${variant}`}>
          <div>
            <h2>{t('Shop Used Cars, Whether You’re')}<br />{t('On The Lot Or On The Go')}</h2>
            <p>{t('Download our app to save cars and create alerts, scan window stickers on our lot for more details, and even call dibs on a car by holding it for up to 7 days.')}</p>
            <StoreButtons dark={variant === 'lavender'} />
          </div>
          <PhoneMock />
        </div>
      </div>
    </section>
  )
}

function loanResult(v) {
  const principal = Math.max(0, Number(v.price) - Number(v.down))
  const n = Math.max(1, Number(v.years) * 12)
  const r = Number(v.rate) / 100 / 12
  const monthly = r ? (principal * r) / (1 - (1 + r) ** -n) : principal / n
  return { monthly, total: monthly * n, interest: monthly * n - principal }
}

export function useLoan(initial = { price: 10000, rate: 10, years: 3, down: 5000 }) {
  const [v, setV] = useState(initial)
  const [result, setResult] = useState(() => loanResult(initial))
  const set = (k) => (e) => {
    const next = { ...v, [k]: e.target.value }
    setV(next)
    setResult(loanResult(next))
  }
  const calc = (e) => {
    e?.preventDefault()
    setResult(loanResult(v))
  }
  return { v, set, calc, result }
}

export function LoanFields({ loan, light = false }) {
  const { v, set } = loan
  return (
    <div className={`loan-fields ${light ? 'light' : ''}`}>
      <label className="field"><span>{t('Price ($)')}</span><input type="number" min="0" value={v.price} onChange={set('price')} /></label>
      <label className="field"><span>{t('Interest Rate')}</span><input type="number" min="0" step="0.1" value={v.rate} onChange={set('rate')} /></label>
      <label className="field"><span>{t('Loan Term (year)')}</span><input type="number" min="1" value={v.years} onChange={set('years')} /></label>
      <label className="field"><span>{t('Down Payment')}</span><input type="number" min="0" value={v.down} onChange={set('down')} /></label>
    </div>
  )
}

const fmt = (n) => money(Math.round(n))

/** variant: lavender (Home 4: form left, photo right) | dark (Home 7) | overlay (Home 9) */
export function LoanCalculator({ variant = 'lavender', className = '' }) {
  const loan = useLoan()
  const form = (
    <form className="loan-form" onSubmit={loan.calc}>
      <h2 className="title">{t('Auto Loan Calculator')}</h2>
      <p>{t('Use this car payment calculator to estimate monthly payments on your next new or used auto loan.')}</p>
      <LoanFields loan={loan} />
      <button type="submit" className="btn btn-primary w-full">{t('Calculate')} <Icon name="arrow" /></button>
      {loan.result && (
        <p className="loan-result">{t('Monthly:')} <b>{fmt(loan.result.monthly)}</b> {t('· Interest:')} <b>{fmt(loan.result.interest)}</b> {t('· Total:')} <b>{fmt(loan.result.total)}</b></p>
      )}
    </form>
  )
  if (variant === 'overlay') {
    return (
      <section className={`loan-overlay has-moving-bg ${className}`}>
        <MovingBg src={img(photos.greyCoupe, 1800)} variant="c" />
        <div className="container">{form}</div>
      </section>
    )
  }
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <div className={`loan loan-${variant}`}>
          {variant === 'dark' && <img src={img(photos.showroomTesla, 900)} alt="" />}
          {form}
          {variant === 'lavender' && <img src={img(photos.showroomLuxury, 900)} alt="" />}
        </div>
      </div>
    </section>
  )
}

export function ShopYourWay({ className = '' }) {
  const tabs = Object.keys(shopLinks)
  const [tab, setTab] = useState(tabs[0])
  const toFor = (label) => {
    if (tab === 'Browse By Type') return `/listings?body=${label}`
    const brand = label.replace(/^Used /, '').replace(/ Cars$/, '')
    return `/listings?make=${encodeURIComponent(brand)}${tab.startsWith('Used') ? '&condition=Used' : ''}`
  }
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <SectionHead title={t('Shop BoxCar Your Way')} link={t('View More')} />
        <Tabs items={tabs} value={tab} onChange={setTab} />
        <div className="link-cols">
          {shopLinks[tab].map((l) => <Link key={l} to={toFor(l)}>{t(l)}</Link>)}
        </div>
      </div>
    </section>
  )
}

export function Accordion({ items = faqs, className = '' }) {
  const [open, setOpen] = useState(0)
  return (
    <div className={`accordion ${className}`}>
      {items.map((f, i) => (
        <div key={f.q} className={`acc-item ${open === i ? 'open' : ''}`}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {t(f.q)} <Icon name={open === i ? 'minus' : 'plus'} />
          </button>
          {open === i && <p>{t(f.a)}</p>}
        </div>
      ))}
    </div>
  )
}

export function OpeningHours({ title = 'Opening hours', items = hours }) {
  return (
    <div className="hours">
      <h4>{t(title)}</h4>
      {items.map(([d, h]) => <p key={d}><span>{t(d)}:</span> <span>{t(h)}</span></p>)}
    </div>
  )
}

const places = {
  'London Eye, London': [51.5033, -0.1196],
  '328 Kent Ave, Brooklyn': [40.7128, -73.9667],
  'Tampa Bay, Florida': [27.9506, -82.4572],
}
// Map built from OpenStreetMap tiles (plain images, so it always renders); click opens Google Maps.
export function MapEmbed({ query = '328 Kent Ave, Brooklyn', className = '' }) {
  const [lat, lon] = places[query] || places['328 Kent Ave, Brooklyn']
  const z = 14
  const n = 2 ** z
  const fx = ((lon + 180) / 360) * n
  const rad = (lat * Math.PI) / 180
  const fy = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n
  const cx = Math.floor(fx)
  const cy = Math.floor(fy)
  const tiles = []
  for (let dy = -2; dy <= 2; dy++) for (let dx = -4; dx <= 4; dx++) tiles.push([dx, dy])
  return (
    <a className={`map ${className}`} href={`https://maps.google.com/?q=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer" aria-label={`Open ${query} in Google Maps`}>
      <span className="map-tiles" style={{ transform: `translate(${-(fx - cx) * 256}px, ${-(fy - cy) * 256}px)` }}>
        {tiles.map(([dx, dy]) => (
          <img key={`${dx}${dy}`} alt="" loading="lazy" src={`https://tile.openstreetmap.org/${z}/${cx + dx}/${cy + dy}.png`} style={{ left: dx * 256, top: dy * 256 }} />
        ))}
      </span>
      <span className="map-pin"><Icon name="pin" /></span>
      <span className="map-credit">{t('© OpenStreetMap')}</span>
    </a>
  )
}

export function useGo() {
  return useNavigate()
}

export function NotifyForm({ children, message = 'Thanks! We received your message.', className = '' }) {
  const { notify } = useApp()
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        notify(message)
        e.target.reset()
      }}
    >
      {children}
    </form>
  )
}
