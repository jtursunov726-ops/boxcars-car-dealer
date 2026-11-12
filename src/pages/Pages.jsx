import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import InnerLayout from './InnerLayout'
import Icon from '../components/Icon'
import {
  Stars, Accordion, LoanFields, useLoan, Features, FairPrice, Stats, Brands, Team, QuoteCards, MapEmbed, OpeningHours, Btn,
} from '../components/sections'
import { OurServices, ContactDetails, MessageForm } from '../components/blocks'
import { products, faqs, plans, blogCategories } from '../data/content'
import { money } from '../data/cars'
import { img, photos } from '../data/images'
import { useApp } from '../context/AppContext'
import { carById } from '../data/cars'
import NotFound from './NotFound'
import { QtyStepper } from '../components/Cart'
import { t } from '../i18n'

/* ---------- Shop ---------- */
export function Shop() {
  const { addToCart, cart, totals } = useApp()
  const inCart = (id) => cart.find((l) => l.id === id)?.qty || 0
  const [cat, setCat] = useState('')
  const [max, setMax] = useState(400)
  const [sort, setSort] = useState('latest')
  const list = useMemo(() => {
    const l = products.filter((p) => (!cat || p.category === cat) && p.price <= max)
    if (sort === 'priceAsc') return [...l].sort((a, b) => a.price - b.price)
    if (sort === 'priceDesc') return [...l].sort((a, b) => b.price - a.price)
    return l
  }, [cat, max, sort])
  return (
    <InnerLayout title={t('Shop')} crumbs={[['Shop']]}>
      <div className="container shop">
        <aside className="shop-side">
          <div className="side-card">
            <h4>{t('Categories')}</h4>
            <button type="button" className={`side-link ${!cat ? 'active' : ''}`} onClick={() => setCat('')}>{t('All')} <span>({products.length})</span></button>
            {blogCategories.map((c) => (
              <button key={c} type="button" className={`side-link ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c} <span>({products.filter((p) => p.category === c).length})</span></button>
            ))}
          </div>
          <div className="side-card">
            <h4>{t('Prices')}</h4>
            <input type="range" min="20" max="400" step="5" value={max} onChange={(e) => setMax(Number(e.target.value))} aria-label={t('Maximum price')} />
            <div className="range-values"><span>$20</span><span>${max}</span></div>
          </div>
          {totals.count > 0 && (
            <Link to="/cart" className="side-card cart-note">
              <span><Icon name="cart" /> {t('{n} item(s) in your cart', { n: totals.count })}</span>
              <b>{money(totals.subtotal)}</b>
              <span className="arrow-link">{t('View Cart')} <Icon name="arrow" /></span>
            </Link>
          )}
        </aside>
        <div>
          <div className="list-toolbar">
            <p>{t('Showing {a} – {b} of {n} results', { a: 1, b: list.length, n: products.length })}</p>
            <label className="sort">{t('Sort by:')}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">{t('latest')}</option><option value="priceAsc">{t('Price: low to high')}</option><option value="priceDesc">{t('Price: high to low')}</option>
              </select>
            </label>
          </div>
          <div className="products">
            {list.map((p) => (
              <div key={p.id} className="product">
                <Link to={`/shop/${p.id}`} className="product-img"><img src={p.image} alt={p.name} loading="lazy" /></Link>
                <p className="product-rating"><Stars n={p.rating} /> <small>({p.reviews})</small></p>
                <h3><Link to={`/shop/${p.id}`}>{t(p.name)}</Link></h3>
                <p className="product-price">{money(p.price)}</p>
                <button type="button" className={`btn w-full ${inCart(p.id) ? 'btn-primary' : 'btn-outline'}`} onClick={() => addToCart(p)}>
                  <Icon name={inCart(p.id) ? 'check' : 'cart'} /> {inCart(p.id) ? t('In Cart ({n}) · Add more', { n: inCart(p.id) }) : t('Add To Cart')}
                </button>
              </div>
            ))}
            {list.length === 0 && <p>{t('No products match these filters.')}</p>}
          </div>
        </div>
      </div>
    </InnerLayout>
  )
}

/* ---------- Product ---------- */
export function Product() {
  const { id } = useParams()
  const product = products.find((p) => String(p.id) === id)
  const { addToCart, cart } = useApp()
  const [qty, setQty] = useState(1)
  const inCart = cart.find((l) => String(l.id) === id)?.qty || 0
  if (!product) return <NotFound />
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).concat(products.filter((p) => p.id !== product.id)).slice(0, 4)
  return (
    <InnerLayout docTitle={product.name} crumbs={[['Shop', '/shop'], [product.name]]}>
      <div className="container product-page">
        <img src={product.image.replace('w=500', 'w=1000')} alt={product.name} />
        <div>
          <h1 className="page-title">{t(product.name)}</h1>
          <p className="product-rating"><Stars n={product.rating} /> <small>({product.reviews} {t('reviews')})</small></p>
          <p className="big-price">{money(product.price)}</p>
          <p>{t('Premium quality part, tested for fit and durability. Free returns within 30 days and a 12-month warranty on every order.')}</p>
          <p className="small">{t('Category:')} <Link to="/shop" className="link-btn">{t(product.category)}</Link></p>
          <div className="qty-row">
            <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} />
            <button type="button" className="btn btn-primary" onClick={() => { addToCart(product, qty); setQty(1) }}><Icon name="cart" /> {t('Add To Cart')}</button>
          </div>
          {inCart > 0 && (
            <p className="in-cart-note"><Icon name="check" /> {t('{n} in your cart', { n: inCart })} · <Link to="/cart" className="link-btn">{t('View Cart')}</Link> · <Link to="/checkout" className="link-btn">{t('Checkout')}</Link></p>
          )}
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="title">{t('Related Products')}</h2>
          <div className="products four">
            {related.map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="product">
                <div className="product-img"><img src={p.image} alt={p.name} loading="lazy" /></div>
                <h3>{t(p.name)}</h3>
                <p className="product-price">{money(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </InnerLayout>
  )
}

/* ---------- FAQs ---------- */
export function Faqs() {
  return (
    <InnerLayout title={t('FAQs')} crumbs={[['FAQs']]}>
      <div className="container narrow faq-page">
        <h2 className="title center">{t('General')}</h2>
        <Accordion items={faqs} />
        <h2 className="title center">{t('Payments')}</h2>
        <Accordion items={faqs} />
      </div>
    </InnerLayout>
  )
}

/* ---------- Loan calculator ---------- */
export function LoanPage() {
  const loan = useLoan()
  const r = loan.result
  return (
    <InnerLayout title={t('Loan Calculator')} crumbs={[['Loan Calculator']]}>
      <div className="container">
        <div className="loan-page">
          <form className="loan-form" onSubmit={loan.calc}>
            <h2 className="title">{t('Auto Loan Calculator')}</h2>
            <p>{t('Use our loan calculator to calculate payments over the life of your loan. Enter your information to see how much your monthly payments could be. You can adjust length of loan, down payment and interest rate to see how those changes raise or lower your payments.')}</p>
            <LoanFields loan={loan} />
            <button type="submit" className="btn btn-primary w-full">{t('Calculate')} <Icon name="arrow" /></button>
          </form>
          <div className="loan-results">
            <p>{t('Monthly Payment')}<b>{money(Math.round(r?.monthly || 0))}</b></p>
            <p>{t('Total Interest')}<b>{money(Math.round(r?.interest || 0))}</b></p>
            <p>{t('Total Payment')}<b>{money(Math.round(r?.total || 0))}</b></p>
          </div>
        </div>
      </div>
    </InnerLayout>
  )
}

/* ---------- Pricing ---------- */
export function Pricing() {
  const navigate = useNavigate()
  return (
    <InnerLayout title={t('Pricing')} crumbs={[['Pricing']]}>
      <div className="container">
        <h2 className="title center">{t('Membership Plans')}</h2>
        <div className="plans">
          {plans.map((p) => (
            <div key={p.name} className={`plan ${p.featured ? 'featured' : ''}`} onClick={() => navigate(`/contact?plan=${encodeURIComponent(p.name)}`)} role="link" tabIndex={0}>
              <p className="plan-price">${p.price}</p>
              <h3>{t(p.name)}</h3>
              <p className="plan-text">{t('Quis autem vel eum iure reprehenderit qui in ea voluptate velit.')}</p>
              <ul>
                {[t('{n} Listings', { n: parseInt(p.listings) }), t('{n} Days Visibility', { n: parseInt(p.days) }), 'Highlighted in Search Results', '3 Revisions', '7 days Delivery Time', 'Products Support'].map((f, i) => (
                  <li key={f} className={i > 3 && !p.featured && p.price < 89 ? 'muted' : ''}><Icon name="check" /> {t(f)}</li>
                ))}
              </ul>
              <button type="button" className={`btn w-full ${p.featured ? 'btn-white' : 'btn-outline'}`} onClick={() => navigate(`/contact?plan=${encodeURIComponent(p.name)}`)}>{t('Choose Plan')}</button>
            </div>
          ))}
        </div>
      </div>
    </InnerLayout>
  )
}

/* ---------- Services ---------- */
export function Services() {
  return (
    <InnerLayout title={t('Services')} crumbs={[['Services']]}>
      <div className="container split-intro">
        <div>
          <h2 className="title">{t('Service Options Offered')}<br />{t('by BoxCar')}</h2>
          <p>{t('Choose from thousands of vehicles from multiple brands and buy online with Click & Drive, or visit us at one of our dealerships today.')}</p>
          <Btn to="#schedule" onClick={(e) => { e.preventDefault(); document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }) }}>{t('See Our Service Options')}</Btn>
        </div>
        <img src={img(photos.mechanic, 900)} alt="Mechanics" />
      </div>
      <Features variant="soft" title={t('Customers Get Great benefits!')} />
      <OurServices carousel />
      <section className="section" id="schedule">
        <div className="container schedule">
          <div className="schedule-form">
            <h2 className="title">{t('Schedule Service')}</h2>
            <p>{t('Use our loan calculator to calculate payments over the life of your loan. Enter your information to see how much your monthly payments could be.')}</p>
            <MessageForm fields="service" button={t('Request a Service')} />
            <p className="small">{t('By submitting this form you will be scheduling a service appointment at no obligation and will be contacted within 48 hours by a service advisor.')}</p>
          </div>
          <OpeningHours items={[['Sunday', '9:00 - 12:00'], ['Monday', '9:00 - 17:00'], ['Tuesday', '9:00 - 17:00'], ['Wednesday', '9:00 - 17:00'], ['Thursday', '9:00 - 17:00'], ['Friday', '9:00 - 17:00'], ['Saturday', '9:00 - 12:00']]} />
        </div>
      </section>
    </InnerLayout>
  )
}

/* ---------- Terms ---------- */
const terms = [
  ['1. Terms', 'By accessing this website you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.'],
  ['2. Limitations', 'In no event shall BoxCar or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.'],
  ['3. Revisions and errata', 'The materials appearing on BoxCar’s website could include technical, typographical, or photographic errors. BoxCar does not warrant that any of the materials on its website are accurate, complete, or current.'],
  ['4. Site terms of use modifications', 'BoxCar may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.'],
  ['5. Privacy', 'We only collect the information needed to answer your enquiries and process your orders. We never sell your personal data to third parties.'],
]
export function Terms() {
  const [open, setOpen] = useState(0)
  return (
    <InnerLayout title={t('Terms and Conditions')} crumbs={[['Terms and Conditions']]}>
      <div className="container terms">
        <nav className="terms-nav">
          {terms.map(([title], i) => <button key={title} type="button" className={open === i ? 'active' : ''} onClick={() => { setOpen(i); document.getElementById(`t${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>{t(title)}</button>)}
        </nav>
        <div className="terms-body">
          {terms.map(([title, body], i) => (
            <section key={title} id={`t${i}`}>
              <h2>{t(title)}</h2>
              <p>{t(body)}</p>
              <p>{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo.')}</p>
            </section>
          ))}
        </div>
      </div>
    </InnerLayout>
  )
}

/* ---------- About ---------- */
export function About() {
  return (
    <InnerLayout title={t('About Us')} crumbs={[['About Us']]}>
      <div className="container about-intro">
        <h2 className="title">{t('We Value Our Clients And')}<br />{t('Want Them To Have A Nice')}<br />{t('Experience')}</h2>
        <div>
          <p>{t('Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget sit urna. Eu duis luctus amet vestibulum vehicula. Nibh tellus elit sit diam fermentum. Nunc vulputate eu interdum vitae.')}</p>
          <p>{t('Sit convallis rhoncus diam purus amet orci lacus. Ut vitae phasellus tincidunt pharetra lobortis. Blandit nec pellentesque vestibulum convallis. Auctor eget quis volutpat lorem diam aliquet egestas lorem.')}</p>
          <p>{t('Magna odio sed ornare ultrices dui id nunc nisi. Mauris egestas felis augue.')}</p>
        </div>
      </div>
      <div className="container about-collage">
        <div className="years"><strong>45</strong><span>{t('Years in')}<br />{t('Business')}</span></div>
        <img src={img(photos.salesman, 700)} alt="" className="a-main" />
        <img src={img(photos.showroom, 700)} alt="" className="a-top" />
        <img src={img(photos.showroomBlue, 500)} alt="" className="a-s1" />
        <img src={img(photos.showroomTesla, 500)} alt="" className="a-s2" />
        <img src={img(photos.showroomLuxury, 500)} alt="" className="a-s3" />
      </div>
      <Features variant="row" />
      <FairPrice variant="split" />
      <Stats items={[{ value: '836M', label: 'Cars for sale' }, { value: '738M', label: 'Dealer reviews' }, { value: '95M', label: 'Visitors per day' }, { value: '238M', label: 'Verified dealers' }]} className="border-bottom" />
      <Brands />
      <Team variant="photo" />
      <QuoteCards variant="soft" />
      <section className="section">
        <div className="container narrow">
          <h2 className="title center">{t('Frequently Asked Questions')}</h2>
          <Accordion />
        </div>
      </section>
    </InnerLayout>
  )
}

/* ---------- Contact ---------- */
const offices = [
  ['San Francisco', '481 Fowey Blvd, San Francisco, CA 94105, USA', 'sf@boxcars.com', '+65 958 123 456'],
  ['New York', '220 7th W 4th Ave, Brooklyn, NY 11221, USA', 'ny@boxcars.com', '+76 956 123 456'],
  ['London', '171 Hill Borough High St, London SE1 1NP, UK', 'uk@boxcars.com', '+10 222 333 999'],
]
export function Contact() {
  const [params] = useSearchParams()
  const sell = params.get('topic') === 'sell'
  const plan = params.get('plan')
  const person = params.get('to')
  const car = carById(params.get('car'))
  const heading = plan ? t('Subscribe to the {x}', { x: t(plan) }) : person ? t('Message {x}', { x: person }) : car ? t('Request the {x} brochure', { x: car.title }) : t(sell ? 'Tell Us About Your Car' : 'Get In Touch')
  return (
    <InnerLayout title={t(sell ? 'Sell Your Car' : 'Contact Us')} crumbs={[[sell ? 'Sell Your Car' : 'Contact Us']]} search={false}>
      <div className="container">
        <MapEmbed query="London Eye, London" className="contact-map" />
        <div className="contact-grid">
          <div>
            <h2 className="title">{heading}</h2>
            <p>{t('Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum egestas quam egestas nulla.')}</p>
            <MessageForm />
          </div>
          <ContactDetails />
        </div>
        <h2 className="title">{t('Our Offices')}</h2>
        <div className="offices">
          {offices.map(([city, addr, email, phone]) => (
            <div key={city}>
              <h4><a href={`https://maps.google.com/?q=${encodeURIComponent(addr)}`} target="_blank" rel="noreferrer">{t(city)}</a></h4>
              <p>{addr}</p>
              <a className="arrow-link" href={`https://maps.google.com/?q=${encodeURIComponent(addr)}`} target="_blank" rel="noreferrer">{t('See on Map')} <Icon name="arrow" /></a>
              <p className="office-links"><a href={`mailto:${email}`}><Icon name="mail" /> {email}</a><a href={`tel:${phone.replace(/\s/g, '')}`}><Icon name="call" /> {phone}</a></p>
            </div>
          ))}
        </div>
      </div>
    </InnerLayout>
  )
}

/* ---------- Login ---------- */
export function Login() {
  const [tab, setTab] = useState('signin')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const { user, setUser, notify } = useApp()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const name = String(f.get('name') || '').trim()
    if (tab === 'signin') {
      if (name !== 'demo' || f.get('password') !== 'demo') return setError('Use the demo account: username “demo”, password “demo”.')
      setUser({ name: 'demo' })
    } else {
      if (String(f.get('password')).length < 6) return setError('Password must be at least 6 characters.')
      setUser({ name: name.split('@')[0] })
    }
    notify('Welcome to BoxCar!')
    navigate('/')
  }

  if (user) {
    return (
      <InnerLayout search={false} docTitle={t('Account')}>
        <div className="container login-wrap">
          <div className="login-card center">
            <h2 className="title">{t('Hi, {name}', { name: user.name })}</h2>
            <p>{t('You are signed in on this device.')}</p>
            <button type="button" className="btn btn-primary w-full" onClick={() => { setUser(null); notify('Signed out') }}>{t('Sign out')}</button>
          </div>
        </div>
      </InnerLayout>
    )
  }

  return (
    <InnerLayout search={false} docTitle={t('Login')}>
      <div className="container login-wrap">
        <form className="login-card" onSubmit={submit}>
          <div className="tabs">
            <button type="button" className={tab === 'signin' ? 'active' : ''} onClick={() => { setTab('signin'); setError('') }}>{t('Sign in')}</button>
            <button type="button" className={tab === 'register' ? 'active' : ''} onClick={() => { setTab('register'); setError('') }}>{t('Register')}</button>
          </div>
          {tab === 'register' && <label className="field"><span>{t('Email')}</span><input name="email" type="email" required placeholder={t('you@example.com')} /></label>}
          <label className="field"><span>{t(tab === 'signin' ? 'Username or Email' : 'Username')}</span><input name="name" required placeholder={t('ali')} autoComplete="username" /></label>
          <label className="field pw"><span>{t('Password')}</span><input name="password" type={show ? 'text' : 'password'} required placeholder="••••••" autoComplete={tab === 'signin' ? 'current-password' : 'new-password'} />
            <button type="button" aria-label={t('Show password')} onClick={() => setShow((s) => !s)}><Icon name="eye" /></button>
          </label>
          {tab === 'signin' && (
            <div className="login-row">
              <label className="check"><input type="checkbox" /> {t('Keep me signed in')}</label>
              <button type="button" className="link-btn" onClick={() => notify('Password reset link sent (demo).')}>{t('Lost Your Password?')}</button>
            </div>
          )}
          {error && <p className="form-error">{t(error)}</p>}
          <button type="submit" className="btn btn-primary w-full">{t(tab === 'signin' ? 'Login' : 'Register')} <Icon name="arrow" /></button>
          <p className="or">{t('OR')}</p>
          <div className="social-login">
            <button type="button" className="btn btn-fb" onClick={() => notify('Facebook login is not connected in this demo.')}><Icon name="fb" /> {t('Login with Facebook')}</button>
            <button type="button" className="btn btn-google" onClick={() => notify('Google login is not connected in this demo.')}><b>G</b> {t('Login with Google')}</button>
          </div>
          <div className="demo-box"><p>{t('Username:')} <b>{t('demo')}</b></p><p>{t('Password:')} <b>{t('demo')}</b></p></div>
        </form>
      </div>
    </InnerLayout>
  )
}
