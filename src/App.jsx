import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { CartDrawer } from './components/Cart'
import CompareBar from './components/CompareBar'
import useReveal from './components/useReveal'
import BackToTop from './components/BackToTop'

// Pages are loaded on demand so the first visit only downloads what it shows.
const named = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })))
const homesModule = () => import('./pages/Homes')
const pagesModule = () => import('./pages/Pages')
const blogModule = () => import('./pages/Blog')
const shopModule = () => import('./pages/ShopPages')
const [Home1, Home2, Home3, Home4, Home5, Home6, Home7, Home8, Home9, Home10] =
  Array.from({ length: 10 }, (_, i) => named(homesModule, `Home${i + 1}`))
const Listings = lazy(() => import('./pages/Listings'))
const CarDetails = lazy(() => import('./pages/CarDetails'))
const Compare = lazy(() => import('./pages/Compare'))
const NotFound = lazy(() => import('./pages/NotFound'))
const BlogGrid = named(blogModule, 'BlogGrid')
const BlogList = named(blogModule, 'BlogList')
const BlogDetails = named(blogModule, 'BlogDetails')
const [Shop, Product, Faqs, LoanPage, Pricing, Services, Terms, About, Contact, Login] =
  ['Shop', 'Product', 'Faqs', 'LoanPage', 'Pricing', 'Services', 'Terms', 'About', 'Contact', 'Login'].map((n) => named(pagesModule, n))
const [CartPage, Checkout, Orders] = ['CartPage', 'Checkout', 'Orders'].map((n) => named(shopModule, n))

function PageLoader() {
  return <div className="page-loader" role="status" aria-label="Loading"><span /></div>
}

function ScrollToTop() {
  useReveal()
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // wait for the page to render, then jump to the section named in the URL (#team, #reviews…)
    const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

const homes = [Home1, Home2, Home3, Home4, Home5, Home6, Home7, Home8, Home9, Home10]

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <CartDrawer />
      <CompareBar />
      <BackToTop />
      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home1 />} />
        {homes.map((Home, i) => <Route key={i} path={`/home-${i + 1}`} element={<Home />} />)}
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<CarDetails />} />
        <Route path="/listings/:id/v2" element={<CarDetails v2 />} />
        <Route path="/blog" element={<BlogGrid />} />
        <Route path="/blog/list" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/loan-calculator" element={<LoanPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </AppProvider>
  )
}
