import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SELECTOR = '.page .section, .page .stats-section, .page .who, .page .online-dark, .page .big-banner, .page .questions-band, .page .loan-overlay'

/** Fades page sections up as they scroll into view. Sections already on screen are left alone. */
export default function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    let frame = 0
    const scan = () => {
      clearTimeout(frame)
      frame = setTimeout(() => {
        document.querySelectorAll(SELECTOR).forEach((el) => {
          if (el.dataset.revealSeen) return
          el.dataset.revealSeen = '1'
          if (el.getBoundingClientRect().top < window.innerHeight) return // already visible
          el.classList.add('reveal')
          observer.observe(el)
        })
      }, 30)
    }
    scan()
    // lazy-loaded pages render a moment later
    const mutations = new MutationObserver(scan)
    mutations.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => {
      clearTimeout(frame)
      mutations.disconnect()
      observer.disconnect()
    }
  }, [pathname])
}
