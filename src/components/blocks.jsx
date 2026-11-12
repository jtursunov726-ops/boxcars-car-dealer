/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import MovingBg from './MovingBg'
import { Btn, Pager, MapEmbed, TpStars, useWidth, NotifyForm } from './sections'
import { Socials } from './Footer'
import { img, photos } from '../data/images'
import { posts, hours } from '../data/content'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

/** Auto-rotating slides with arrows. Children render a slide: (slide, index) => node */
export function useSlider(count, delay = 6000) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setI((x) => (x + 1) % count), delay)
    return () => clearInterval(timer)
  }, [count, delay, i])
  return { i, prev: () => setI((i - 1 + count) % count), next: () => setI((i + 1) % count), go: setI }
}

export function SlideArrows({ prev, next, className = '' }) {
  return (
    <>
      <button type="button" className={`slide-arrow left ${className}`} aria-label={t('Previous slide')} onClick={prev}><Icon name="chev-l" /></button>
      <button type="button" className={`slide-arrow right ${className}`} aria-label={t('Next slide')} onClick={next}><Icon name="chev-r" /></button>
    </>
  )
}

export function WhoIsBoxcar() {
  const cards = [['Trustpilot', <span className="tp-logo"><Icon name="star" /> Trustpilot</span>], ['Google', <span className="g-logo"><b>G</b>o<b>o</b>g<i>l</i>e</span>], ['Birdeye', <span className="be-logo">◆ Birdeye</span>]]
  return (
    <section className="who">
      <div className="container who-inner">
        <div>
          <h2>{t('Who is BoxCar')}</h2>
          <p>{t('Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.')}</p>
        </div>
        <div className="who-cards">
          {cards.map(([k, logo]) => (
            <Link key={k} to="/about#reviews" className="who-card"><p>{t('Great')}</p><TpStars /><small>{t('Based on 5,801 reviews')}</small>{logo}</Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function QuestionsBand() {
  return (
    <section className="questions-band">
      <div className="container">
        <h3>{t('Have a Questions? Feel Free To Ask...')}</h3>
        <a href="tel:+76956039999" className="q-phone"><Icon name="phone" /> +76 956 039 999</a>
      </div>
    </section>
  )
}

/** variant: dark (Home 10 full-width) | light (Home 5 text left, image right) */
export function OnlineSplit({ variant = 'dark' }) {
  const text = (
    <div className="online-text">
      <h2>{t('Online, in-person,')}<br />{t('everywhere')}</h2>
      <p>{t('Choose from thousands of vehicles from multiple brands and buy online with Click & Drive, or visit us at one of our dealerships today.')}</p>
      <Btn to="/listings" variant={variant === 'dark' ? 'outline-light' : 'dark'}>{t('Get Started')}</Btn>
    </div>
  )
  if (variant === 'light') {
    return (
      <section className="section">
        <div className="container online-light">{text}<img src={img(photos.maseratiBridge, 900)} alt="" /></div>
      </section>
    )
  }
  return (
    <section className="online-dark">
      <img src={img('1622893288761-823ba60f17a6', 1200)} alt="" />
      {t(text)}
    </section>
  )
}

export function BigBanner() {
  return (
    <section className="big-banner has-moving-bg">
        <MovingBg src={img(photos.womanTrench, 1800)} overlay="linear-gradient(90deg, rgba(5,11,32,.55), rgba(5,11,32,.05))" variant="a" />
      <div className="container">
        <h2>{t('We Make Finding The')}<br />{t('Right Car Simple')}</h2>
        <Btn to="/listings" variant="outline-light">{t('Find Out More')}</Btn>
      </div>
    </section>
  )
}

export function OurServices({ title = 'Our Services', carousel = false }) {
  const width = useWidth()
  const per = width < 640 ? 1 : width < 1100 ? 2 : carousel ? 5 : 3
  const [start, setStart] = useState(0)
  const list = Array.from({ length: Math.min(per, posts.length) }, (_, k) => posts[(start + k) % posts.length])
  return (
    <section className="section">
      <div className="container">
        <h2 className="title">{t(title)}</h2>
        <div className={`services per-${per}`}>
          {list.map((p) => (
            <div key={p.id} className="service-card">
              <Link to={carousel ? '/services#schedule' : '/services'}><img src={p.image} alt="" loading="lazy" /></Link>
              <h3><Link to={carousel ? '/services#schedule' : '/services'}>{t(p.title)}</Link></h3>
              <p>{t('Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.')}</p>
              {carousel ? <Link to="/services#schedule" className="arrow-link">{t('Explore More')} <Icon name="arrow" /></Link> : <Link to="/services" className="btn btn-outline w-full">{t('View')} <Icon name="arrow" /></Link>}
            </div>
          ))}
        </div>
        {carousel && <Pager onPrev={() => setStart((s) => (s - 1 + posts.length) % posts.length)} onNext={() => setStart((s) => (s + 1) % posts.length)} />}
      </div>
    </section>
  )
}

export function Search150() {
  const chips = [['Automatics Cars', 'transmission=Automatic'], ['SUVs', 'body=SUV'], ['Electrics Cars', 'fuel=Electric'], ['New in Stock', 'condition=New'], ['Petrol', 'fuel=Petrol'], ['Diesel', 'fuel=Diesel']]
  return (
    <section className="section">
      <div className="container">
        <div className="search150">
          <div className="s150-top">
            <svg className="s150-icon" viewBox="0 0 64 64" fill="none" strokeWidth="4" strokeLinecap="round"><circle cx="27" cy="27" r="19" stroke="#405FF2" /><path d="m41 41 14 14" stroke="#fff" /><path d="m19 27 6 6 11-12" stroke="#fff" /></svg>
            <div>
              <h2>{t('Search over 150,000 vehicles')}</h2>
              <p>{t('Choose from thousands of trusted used cars and vans across the UK, from our national network of vetted dealers.')}</p>
            </div>
            <div className="s150-btns">
              <Btn to="/listings">{t('Search Cars')}</Btn>
              <Btn to="/listings?body=Van">{t('Search Vans')}</Btn>
            </div>
          </div>
          <p className="s150-label">{t('Or browse by type:')}</p>
          <div className="chips">{chips.map(([l, q]) => <Link key={l} to={`/listings?${q}`} className="chip-btn dark">{t(l)}</Link>)}</div>
        </div>
      </div>
    </section>
  )
}

export function MapGetInTouch() {
  return (
    <section className="map-touch">
      <MapEmbed query="Tampa Bay, Florida" />
      <div className="container">
        <div className="touch-card">
          <h3>{t('Get in Touch')}</h3>
          <p>{t('Contact our Sales Department')}</p>
          <a href="tel:+76956039999" className="pill"><Icon name="phone" /> +76 956 039 999</a>
          {hours.map(([d, h]) => <p key={d} className="small">{t(d)}: {t(h)}</p>)}
        </div>
      </div>
    </section>
  )
}

export function MailingList() {
  const { notify } = useApp()
  return (
    <section className="section">
      <div className="container">
        <div className="mailing">
          <div className="mailbox">
            <svg viewBox="0 0 160 140" aria-hidden="true">
              <rect x="70" y="60" width="10" height="70" rx="3" fill="#7FB3FF" />
              <path d="M30 40h80a25 25 0 0 1 25 25v25H30z" fill="#9CC9FF" />
              <path d="M30 40a25 25 0 0 0-25 25v25h50V65a25 25 0 0 0-25-25z" fill="#6AA8FF" />
              <rect x="112" y="30" width="5" height="40" fill="#EE3F9C" /><rect x="117" y="30" width="18" height="12" rx="2" fill="#EE3F9C" />
              <path d="M40 20l25 12-28 4z" fill="#FFD27A" /><path d="M18 30l20 6-22 6z" fill="#fff" />
            </svg>
          </div>
          <div>
            <h2>{t('Subscribe To Our Mailing')}<br />{t('List And Stay Up To Date')}</h2>
            <p>{t('We’ll keep you updated with the best new jobs.')}</p>
            <form className="newsletter" onSubmit={(e) => { e.preventDefault(); notify('Thanks for subscribing!'); e.target.reset() }}>
              <input type="email" required placeholder={t('Your email address')} aria-label={t('Email')} />
              <button type="submit" className="btn btn-white">{t('Sign Up')}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContactBlock() {
  return (
    <section className="section bg-soft contact-block">
      <div className="container contact-inner">
        <img src={img(photos.womanPhone, 900)} alt={t("Customer with phone")} />
        <div>
          <h2 className="title">{t('Have More Questions? Don’t')}<br />{t('Hesitate To Reach Us')}</h2>
          <p>{t('123 Queensberry Street, North')}<br />{t('Melbourne VIC3051, Australia.')}</p>
          <div className="pills">
            <a href="tel:+76956039999" className="pill"><Icon name="phone" /> +76 956 039 999</a>
            <a href="mailto:ali@boxcars.com" className="pill"><Icon name="mail" /> {t('ali@boxcars.com')}</a>
          </div>
          <Btn to="/contact" variant="dark">{t('Get Started')}</Btn>
        </div>
      </div>
    </section>
  )
}

const silhouettes = {
  Sedan: 'M8 52c0-6 3-9 10-10l30-6c10-9 24-16 44-16 22 0 34 6 48 15l34 5c12 2 18 6 18 13v4H8z',
  Coupe: 'M10 52c0-7 4-10 12-11l36-6c14-10 26-14 42-14 18 0 30 6 42 15l36 6c8 1 12 5 12 11v4H10z',
  SUV: 'M8 54V38c0-4 3-6 7-7l26-4 14-12c3-2 6-3 10-3h72c5 0 8 2 11 5l13 13 18 3c5 1 7 4 7 8v13z',
  Truck: 'M6 54V36h88V18c0-3 2-5 5-5h40c4 0 7 2 9 5l12 16 26 4c5 1 8 4 8 9v7z',
  Hatchback: 'M14 54V30c0-5 3-9 8-11l14-5c6-2 12-3 18-3h50c10 0 18 3 26 9l12 10 30 5c7 1 12 5 12 12v7z',
  Convertible: 'M8 52c0-6 4-9 10-10l40-5 10-9h8l-6 9h70l34 4c10 2 16 6 16 12v5H8z',
}
export function BodyStyles() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="title center">{t('Select a Body Style')}</h2>
        <div className="body-styles">
          {Object.entries(silhouettes).map(([name, d]) => (
            <Link key={name} to={`/listings?body=${name}`} className="body-style">
              <svg viewBox="0 0 200 70"><path d={d} /><circle cx="48" cy="55" r="11" className="wheel" /><circle cx="152" cy="55" r="11" className="wheel" /></svg>
              <span>{t(name)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactDetails() {
  return (
    <div className="contact-details">
      <h3>{t('Contact details')}</h3>
      <p>{t('Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum egestas quam egestas nulla.')}</p>
      <p className="cd-row"><Icon name="pin" /><span><b>{t('Address')}</b>{t('123 Queensberry Street, North Melbourne VIC3051, Australia.')}</span></p>
      <p className="cd-row"><Icon name="mail" /><span><b>{t('Email')}</b><a href="mailto:ali@boxcars.com">{t('ali@boxcars.com')}</a></span></p>
      <p className="cd-row"><Icon name="call" /><span><b>{t('Phone')}</b><a href="tel:+76956123456">+76 956 123 456</a></span></p>
      <h4>{t('Follow us')}</h4>
      <Socials />
    </div>
  )
}

export function MessageForm({ fields = 'contact', button = 'Send Message' }) {
  return (
    <NotifyForm className="form-grid" message={t('Thanks! Your message has been sent.')}>
      {fields === 'contact' ? (
        <>
          <label className="field"><span>{t('First Name')}</span><input required placeholder={t('Ali')} /></label>
          <label className="field"><span>{t('Last Name')}</span><input required placeholder={t('Tufan')} /></label>
          <label className="field"><span>{t('Email')}</span><input type="email" required placeholder={t('creativelayers088@gmail.com')} /></label>
          <label className="field"><span>{t('Phone')}</span><input type="tel" placeholder="+90 123 456 789" /></label>
          <label className="field full"><span>{t('Message')}</span><textarea rows="6" required /></label>
        </>
      ) : (
        <>
          <label className="field"><span>{t('Name')}</span><input required placeholder={t('Ali')} /></label>
          <label className="field"><span>{t('Email')}</span><input type="email" required placeholder={t('example@gmail.com')} /></label>
          <label className="field"><span>{t('Phone')}</span><input type="tel" placeholder="+90" /></label>
          <label className="field"><span>{t('Make and Model')}</span><input placeholder={t('Audi Model')} /></label>
          <label className="field"><span>{t('Mileage (optional)')}</span><input placeholder="$1000" /></label>
          <label className="field"><span>{t('Best time')}</span><input type="date" /></label>
        </>
      )}
      <button type="submit" className={`btn btn-primary ${fields === 'contact' ? '' : 'full'}`}>{t(button)} <Icon name="arrow" /></button>
    </NotifyForm>
  )
}
