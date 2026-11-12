import { useEffect, useState } from 'react'
import Icon from './Icon'
import { t } from '../i18n'

/** Round button that appears after scrolling down and shows how far down the page you are. */
export default function BackToTop() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const r = 22
  const c = 2 * Math.PI * r
  return (
    <button
      type="button"
      className={`back-to-top ${progress > 0.08 ? 'show' : ''}`}
      aria-label={t('Back to top')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r={r} className="track" />
        <circle cx="26" cy="26" r={r} className="bar" style={{ strokeDasharray: c, strokeDashoffset: c * (1 - progress) }} />
      </svg>
      <Icon name="chev-u" />
    </button>
  )
}
