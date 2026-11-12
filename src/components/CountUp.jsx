import { useEffect, useRef, useState } from 'react'

/** Counts from 0 up to a value like "836M" the first time it scrolls into view. */
export default function CountUp({ value, duration = 1600 }) {
  const match = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/)
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : 0
  const ref = useRef(null)
  const [shown, setShown] = useState(match ? 0 : value)

  useEffect(() => {
    if (!match) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      setShown(target)
      return
    }
    // a timer (not requestAnimationFrame) so it also finishes in throttled/background tabs
    let timer = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = Date.now()
      timer = setInterval(() => {
        const p = Math.min(1, (Date.now() - start) / duration)
        setShown(Math.round(target * (1 - (1 - p) ** 3)))
        if (p >= 1) clearInterval(timer)
      }, 30)
    }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  if (!match) return <span ref={ref} className="count">{value}</span>
  return <span ref={ref} className="count">{match[1]}{shown.toLocaleString('en-US')}{match[3]}</span>
}
