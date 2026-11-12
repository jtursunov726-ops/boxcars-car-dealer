import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import MovingBg from '../components/MovingBg'
import { SearchPill, SearchCard, SearchPanel } from '../components/Search'
import {
  Btn, Brands, BrowseTypes, CarSection, Features, Stats, Promo, FairPrice, TrustTestimonials, PhotoTestimonial,
  ReviewCards, QuoteCards, BlogSection, Team, Inspiration, AppPromo, LoanCalculator, ShopYourWay, TypeChips,
} from '../components/sections'
import {
  useSlider, SlideArrows, WhoIsBoxcar, QuestionsBand, OnlineSplit, BigBanner, OurServices, Search150,
  MapGetInTouch, MailingList, ContactBlock, BodyStyles,
} from '../components/blocks'
import { cars, groups, carById, money, miles } from '../data/cars'
import { moreBrands } from '../data/content'
import { img, photos } from '../data/images'
import { t } from '../i18n'

const exploreTabs = ['In Stock', 'New Cars', 'Used Cars']

/* ================= HOME 1 ================= */
export function Home1() {
  return (
    <div className="page home1">
      <section className="hero1 has-moving-bg">
        <MovingBg src={img(photos.mountainRoad, 2000)} overlay="linear-gradient(rgba(5,11,32,.35), rgba(5,11,32,.25))" variant="a" />
        <Header theme="dark" overlay />
        <div className="container hero1-content">
          <p className="eyebrow">{t('Find cars for sale and for rent near you')}</p>
          <h1>{t('Find Your Perfect Car')}</h1>
          <SearchPill tabs />
          <p className="eyebrow small">{t('Or Browse Featured Model')}</p>
          <TypeChips className="glass" />
        </div>
      </section>
      <div className="rounded-panel overlap">
        <Brands className="pt-60" />
        <CarSection title={t('Explore All Vehicles')} cars={groups.explore} tabs={exploreTabs} perView={4} />
        <FairPrice variant="split" />
        <Stats />
        <Features variant="row" className="border-top" />
        <CarSection title={t('Popular Makes')} cars={groups.popularBmw} tabs={['BMW', 'Mercedes Benz', 'Ford']} variant="horizontal" perView={2} bg="bg-dark" />
        <ShopYourWay />
        <PhotoTestimonial />
        <BlogSection />
        <Promo className="pb-100" />
      </div>
      <Footer variant="dark" />
    </div>
  )
}

/* ================= HOME 2 ================= */
export function Home2() {
  return (
    <div className="page home2">
      <Header phone />
      <section className="container">
        <div className="hero2">
          <p className="eyebrow">{t('Find cars for sale and for rent near you')}</p>
          <h1>{t('Find Your Dream Car')}</h1>
          <SearchPill variant="round" condition />
          <img src={img(photos.whiteCar, 1400)} alt="White sedan" className="hero2-car" />
        </div>
      </section>
      <BrowseTypes center link={null} />
      <Promo />
      <CarSection title={t('The Most Searched Cars')} cars={groups.searched} tabs={['In Stock', 'Sedan', 'SUV', 'Convertible']} variant="dark" center />
      <Features variant="centered" className="bg-soft-band" />
      <CarSection title={t('Latest Cars')} cars={groups.latest} variant="dark" center />
      <Inspiration />
      <WhoIsBoxcar />
      <Team variant="pastel" center />
      <BlogSection center />
      <Brands variant="orbit" />
      <Footer variant="lightCenter" />
    </div>
  )
}

/* ================= HOME 3 ================= */
export function Home3() {
  return (
    <div className="page home3">
      <section className="hero3 has-moving-bg">
        <MovingBg src={img(photos.porscheRoad, 2000)} overlay="linear-gradient(90deg, rgba(5,11,32,.6), rgba(5,11,32,.1))" variant="b" />
        <Header theme="dark" overlay menuButton />
        <div className="container hero3-content">
          <p className="eyebrow">{t('Shop Online. Pickup Today. It’s Fast, Simple and Easy.')} <Link to="/about">{t('Learn More.')}</Link></p>
          <h1>{t('Fast, Simple and Easy')}</h1>
          <SearchPill tabs button={t('Search')} />
        </div>
        <div className="container hero3-types"><TypeChips items={['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid', 'Convertible']} className="bare" /></div>
      </section>
      <CarSection title={t('The Most Searched SUV Cars')} cars={groups.searched} rows={2} pager={false} />
      <Promo />
      <Features variant="split" title={<>{t('We’re BIG on what')}<br />{t('matters to you')}</>} />
      <CarSection title={t('Popular Makes')} cars={groups.latest} tabs={['In Stock', 'BMW', 'Ford', 'Mercedes Benz']} variant="dark" bg="bg-dark" link={t('View All')} />
      <TrustTestimonials bg="" />
      <Brands />
      <FairPrice variant="finance" className="bg-soft" />
      <Stats items={[{ value: '810M', label: 'Cars for sale' }, { value: '715M', label: 'Dealer reviews' }, { value: '96M', label: 'Visitors per day' }, { value: '230M', label: 'Verified dealers' }]} />
      <BlogSection />
      <QuestionsBand />
      <Footer variant="dark" />
    </div>
  )
}

/* ================= HOME 4 ================= */
const h4Slides = ['bmw-x7-2024', 'jeep-wrangler-2022', 'mercedes-glc-2023'].map(carById)
export function Home4() {
  const s = useSlider(h4Slides.length)
  const car = h4Slides[s.i]
  return (
    <div className="page home4">
      <Header phone />
      <section className="hero4 has-moving-bg">
        <MovingBg src={img(car.photo, 2000)} overlay="linear-gradient(90deg, rgba(5,11,32,.55), rgba(5,11,32,.05))" variant="c" />
        <div className="container hero4-inner">
          <div className="hero4-text">
            <p className="hero-price">{money(car.price)}</p>
            <h1>{car.title}</h1>
          </div>
          <div className="spec-glass">
            <p><Icon name="fuel" /><small>{t('Fuel Type')}</small>{t(car.fuel)}</p>
            <p><Icon name="gauge" /><small>{t('Mileage')}</small>{miles(car.mileage)}</p>
            <p><Icon name="gear" /><small>{t('Transmission')}</small>{t(car.transmission)}</p>
            <p><Icon name="calendar" /><small>{t('Year')}</small>{car.year}</p>
            <Link to={`/listings/${car.id}`} className="learn-more">{t('Learn More')} <Icon name="arrow" /></Link>
          </div>
          <div className="dashes">{h4Slides.map((c, k) => <button key={c.id} type="button" aria-label={`Slide ${k + 1}`} className={k === s.i ? 'active' : ''} onClick={() => s.go(k)} />)}</div>
        </div>
      </section>
      <CarSection title={t('Explore All Vehicles')} cars={groups.latest} tabs={exploreTabs} variant="horizontal" perView={2} className="dark-panels" />
      <Features variant="soft" />
      <BrowseTypes variant="photos" />
      <ShopYourWay />
      <Brands />
      <LoanCalculator variant="lavender" />
      <ReviewCards />
      <Team variant="photo" />
      <AppPromo variant="blue" />
      <BlogSection />
      <Footer variant="brand" />
    </div>
  )
}

/* ================= HOME 5 ================= */
const h5Slides = ['mercedes-amg-gt-2022', 'chevrolet-corvette-2024', 'dodge-challenger-2021'].map(carById)
export function Home5() {
  const s = useSlider(h5Slides.length)
  const car = h5Slides[s.i]
  return (
    <div className="page home5">
      <section className="hero5 has-moving-bg">
        <MovingBg src={img(car.photo, 2000)} overlay="linear-gradient(90deg, rgba(5,11,32,.55), rgba(5,11,32,.05))" variant="a" />
        <Header theme="dark" overlay />
        <div className="container hero5-content">
          <p className="hero-price">{money(car.price)}</p>
          <h1>{car.title}</h1>
          <ul className="hero-specs">
            <li><Icon name="fuel" /> {t(car.fuel)}</li>
            <li><Icon name="gauge" /> {miles(car.mileage)}</li>
            <li><Icon name="gear" /> {t(car.transmission)}</li>
          </ul>
          <Btn to={`/listings/${car.id}`} variant="white">{t('Learn More')}</Btn>
        </div>
        <SlideArrows prev={s.prev} next={s.next} className="white" />
      </section>
      <BrowseTypes count={6} />
      <CarSection title={t('Explore All Vehicles')} cars={groups.searched} tabs={['Recent Cars', 'Featured Cars', 'Popular Cars']} rows={2} pager={false} bg="bg-soft" />
      <OnlineSplit variant="light" />
      <Features variant="row" />
      <CarSection title={t('Specials')} cars={groups.specials} />
      <ReviewCards bg="bg-soft" sideArrows />
      <Team variant="photo" />
      <Inspiration />
      <AppPromo variant="lavender" />
      <Brands />
      <BigBanner />
      <Footer variant="light" />
    </div>
  )
}

/* ================= HOME 6 ================= */
export function Home6() {
  return (
    <div className="page home6">
      <section className="hero6">
        <div className="hero6-photo has-moving-bg"><MovingBg src={img(photos.garageSuv, 1400)} variant="b" /></div>
        <Header />
        <div className="container hero6-content">
          <p className="eyebrow">{t('Find cars for sale and for rent near you')}</p>
          <h1>{t('4,675 Vehicles')}<br />{t('Available')}</h1>
          <div className="btn-row">
            <Btn to="/listings">{t('View Inventory')}</Btn>
            <Btn to="/contact" variant="outline">{t('Contact Us')}</Btn>
          </div>
          <p className="eyebrow small">{t('Or Browse Featured Model')}</p>
          <TypeChips className="outline" />
        </div>
      </section>
      <Brands />
      <OurServices />
      <FairPrice variant="soft" />
      <Stats className="border-y" />
      <CarSection title={t('Featured Listings')} cars={groups.latest} tabs={exploreTabs} />
      <Search150 />
      <Features variant="centered" />
      <QuoteCards variant="soft" />
      <Team variant="photo" />
      <MapGetInTouch />
      <Footer variant="darkCenter" />
    </div>
  )
}

/* ================= HOME 7 ================= */
export function Home7() {
  const slides = [photos.desertCar, photos.suvForest, photos.mustang]
  const s = useSlider(slides.length)
  return (
    <div className="page home7">
      <Header layout="center" menuButton phone />
      <section className="container hero7-wrap">
        <div className="hero7 has-moving-bg">
        <MovingBg src={img(slides[s.i], 2000)} overlay="linear-gradient(rgba(5,11,32,.25), rgba(5,11,32,.35))" variant="b" />
          <p className="eyebrow">{t('Find cars for sale and for rent near you')}</p>
          <h1>{t('A Vehicle For Every Lifestyle')}<br />{t('Today')}</h1>
          <SlideArrows prev={s.prev} next={s.next} className="glass" />
        </div>
        <SearchCard />
      </section>
      <BrowseTypes variant="tiles" />
      <Features variant="cards" />
      <CarSection title={t('Featured Listings')} cars={groups.searched} tabs={['New Cars', 'Used Cars', 'In Stock']} variant="grid" />
      <FairPrice variant="stack" />
      <Stats className="border-bottom" />
      <QuoteCards variant="blue" />
      <LoanCalculator variant="dark" />
      <Brands className="soft-brands" />
      <BlogSection />
      <Footer variant="boxed" />
    </div>
  )
}

/* ================= HOME 8 ================= */
export function Home8() {
  return (
    <div className="page home8">
      <section className="container hero8-wrap">
        <div className="hero8">
          <Header theme="dark" />
          <div className="hero8-inner">
            <div>
              <h1>{t('Let’s Find Your Perfect Car')}</h1>
              <SearchPanel />
            </div>
            <img src={img(photos.chargingNight, 1100)} alt="Electric car charging at night" />
          </div>
        </div>
      </section>
      <BrowseTypes />
      <Brands variant="inline" items={moreBrands} />
      <CarSection title={t('Featured Listings')} cars={groups.explore} tabs={exploreTabs} variant="compact" className="soft-wrap" />
      <Features variant="split" title={<>{t('Why Electric')}<br />{t('Vehicles?')}</>} intro={t('We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of.')} button={t('Get Started')} />
      <Stats variant="lavender" />
      <CarSection title={t('Recently Added')} cars={groups.latest} variant="compact" />
      <QuoteCards variant="dark" />
      <BlogSection />
      <MailingList />
      <Footer variant="light" />
    </div>
  )
}

/* ================= HOME 9 ================= */
export function Home9() {
  return (
    <div className="page home9">
      <section className="hero9 has-moving-bg">
        <MovingBg src={img(photos.mustang, 2000)} overlay="linear-gradient(rgba(5,11,32,.45), rgba(5,11,32,.25))" variant="c" />
        <Header theme="dark" layout="navLeft" overlay />
        <div className="container hero9-search"><SearchPill variant="glass" condition button={t('Search')} /></div>
        <div className="container hero9-content">
          <p className="eyebrow">{t('We make finding the right car simple')}</p>
          <h1>{t('Search Less. Live More.')}</h1>
          <div className="btn-row center">
            <Btn to="/listings" variant="white">{t('View Inventory')}</Btn>
            <Btn to="/contact" variant="outline-light">{t('Contact Us')}</Btn>
          </div>
        </div>
      </section>
      <BrowseTypes />
      <FairPrice variant="collage" />
      <Stats className="border-bottom" />
      <Promo variant="photo" />
      <CarSection title={t('Explore All Vehicles')} cars={groups.searched} tabs={['Recent Cars', 'Featured Cars', 'Popular Cars']} variant="grid" rows={2} pager={false} />
      <Features variant="blue" />
      <Team variant="photo" />
      <TrustTestimonials />
      <BlogSection />
      <LoanCalculator variant="overlay" />
      <Footer variant="dark" />
    </div>
  )
}

/* ================= HOME 10 ================= */
export function Home10() {
  const slides = [photos.greyCoupe, photos.silverCoupe, photos.neonHeadlight]
  const s = useSlider(slides.length)
  return (
    <div className="page home10">
      <Header />
      <section className="container">
        <div className="hero10 has-moving-bg">
          <MovingBg src={img(slides[s.i], 2000)} overlay="linear-gradient(180deg, rgba(5,11,32,.45), rgba(5,11,32,.05) 60%)" variant="c" />
          <p className="eyebrow">{t('The World’s Largest Used Car Dealership')}</p>
          <h1>{t('Find Your Perfect Vehicle Online')}</h1>
          <SlideArrows prev={s.prev} next={s.next} className="glass" />
        </div>
      </section>
      <BodyStyles />
      <Features variant="split" title={<>{t('We’re BIG On What')}<br />{t('Matters To You')}</>} className="bg-soft-band" />
      <CarSection title={t('The Most Searched Cars')} cars={cars.filter((c) => c.body === 'Sedan')} tabs={['Sedan', 'SUV', 'Convertible', 'Hatchback']} center />
      <Promo />
      <CarSection title={t('Recommended Cars For You')} cars={groups.recommended} center />
      <OnlineSplit variant="dark" />
      <Stats />
      <CarSection title={t('Upcoming Cars')} cars={groups.latest} center />
      <TrustTestimonials />
      <BlogSection />
      <Brands />
      <ContactBlock />
      <Footer variant="light" />
    </div>
  )
}
