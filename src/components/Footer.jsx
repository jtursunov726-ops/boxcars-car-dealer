import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Logo } from './Header'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const columns = {
  Company: [['About Us', '/about'], ['Blog', '/blog'], ['Services', '/services'], ['FAQs', '/faqs'], ['Terms', '/terms'], ['Contact Us', '/contact']],
  'Quick Links': [['Get in Touch', '/contact'], ['Help center', '/faqs'], ['Live chat', '/contact'], ['How it works', '/about']],
  'Our Brands': ['Toyota', 'Porsche', 'Audi', 'BMW', 'Ford', 'Nissan', 'Peugeot', 'Volkswagen'].map((b) => [b, `/listings?make=${b}`]),
  'Vehicles Type': ['Sedan', 'Hatchback', 'SUV', 'Hybrid', 'Electric', 'Coupe', 'Truck', 'Convertible'].map((b) => [b, `/listings?body=${b}`]),
}

function Newsletter({ dark, button = 'primary' }) {
  const [email, setEmail] = useState('')
  const { notify } = useApp()
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return notify('Please enter a valid email address')
    notify('Thanks! You are subscribed to BoxCar updates.')
    setEmail('')
  }
  return (
    <form className={`newsletter ${dark ? 'dark' : ''}`} onSubmit={submit}>
      <input type="email" placeholder={t('Your email address')} value={email} onChange={(e) => setEmail(e.target.value)} aria-label={t('Email address')} />
      <button type="submit" className={`btn btn-${button}`}>{t('Sign Up')}</button>
    </form>
  )
}

export function Socials() {
  return (
    <div className="socials">
      <a href="https://facebook.com" aria-label={t('Facebook')}><Icon name="fb" /></a>
      <a href="https://twitter.com" aria-label={t('Twitter')}><Icon name="tw" /></a>
      <a href="https://instagram.com" aria-label={t('Instagram')}><Icon name="ig" /></a>
      <a href="https://linkedin.com" aria-label={t('LinkedIn')}><Icon name="in" /></a>
    </div>
  )
}

export function StoreButtons({ dark = true }) {
  return (
    <div className={`stores ${dark ? 'dark' : ''}`}>
      <a href="https://www.apple.com/app-store/" className="store"><Icon name="apple" /><span><small>{t('Download on the')}</small>{t('Apple Store')}</span></a>
      <a href="https://play.google.com" className="store"><Icon name="gplay" /><span><small>{t('Get in on')}</small>{t('Google Play')}</span></a>
    </div>
  )
}

/**
 * variant:
 *  dark        – Join row + columns + mobile app (Home 1/3/4/9, inner pages)
 *  light       – Join row (left) + columns + sale hours (Home 5/8/10)
 *  lightCenter – centered Join + columns + sale hours (Home 2)
 *  darkCenter  – dark, centered Join (Home 6)
 *  boxed       – dark rounded box inside page margins (Home 7)
 *  brand       – dark, logo + contact pills left, Join right (Home 4)
 */
export default function Footer({ variant = 'dark' }) {
  const dark = ['dark', 'darkCenter', 'boxed', 'brand'].includes(variant)
  const center = variant === 'lightCenter' || variant === 'darkCenter'
  const lastCol = dark && variant !== 'darkCenter' ? (
    <div>
      <h4>{t('Our Mobile App')}</h4>
      <StoreButtons />
      <h4 className="mt">{t('Connect With Us')}</h4>
      <Socials />
    </div>
  ) : (
    <div>
      <h4>{t('Sale Hours')}</h4>
      <p>{t('Monday – Friday: 09:00AM – 09:00 PM')}</p>
      <p>{t('Saturday: 09:00AM – 07:00PM')}</p>
      <p>{t('Sunday: Closed')}</p>
      <h4 className="mt">{t('Connect With Us')}</h4>
      <Socials />
    </div>
  )

  return (
    <footer className={`footer footer-${variant} ${dark ? 'is-dark' : 'is-light'}`}>
      <div className={variant === 'boxed' ? 'container footer-box' : ''}>
        <div className="container footer-top">
          {variant === 'brand' ? (
            <>
              <div className="footer-brand">
                <Logo />
                <p>{t('Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.')}</p>
                <div className="pills">
                  <a href="tel:+76956039999" className="pill"><Icon name="phone" /> +76 956 039 999</a>
                  <a href="mailto:ali@boxcars.com" className="pill"><Icon name="mail" /> {t('ali@boxcars.com')}</a>
                </div>
              </div>
              <div className="footer-join stacked">
                <h3>{t('Join BoxCar')}</h3>
                <p>{t('Receive pricing updates, shopping tips & more!')}</p>
                <Newsletter dark />
              </div>
            </>
          ) : (
            <div className={`footer-join ${center ? 'center' : ''}`}>
              <div>
                <h3>{t('Join BoxCar')}</h3>
                <p>{t('Receive pricing updates, shopping tips & more!')}</p>
              </div>
              <Newsletter dark={dark} button={variant === 'light' ? 'dark' : 'primary'} />
            </div>
          )}
        </div>
        <div className="container footer-cols">
          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <h4>{t(title)}</h4>
              {links.map(([label, to]) => <Link key={label} to={to}>{t(label)}</Link>)}
            </div>
          ))}
          {lastCol}
        </div>
        <div className="container footer-bottom">
          <p>{t('© 2024 Boxcars.com. All rights reserved.')}</p>
          <p><Link to="/terms">{t('Terms & Conditions')}</Link><i /><Link to="/terms">{t('Privacy Notice')}</Link></p>
          <button type="button" className="to-top" aria-label={t('Back to top')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="chev-u" /></button>
        </div>
      </div>
    </footer>
  )
}
