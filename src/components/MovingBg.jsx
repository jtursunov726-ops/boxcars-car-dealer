import { useEffect, useState } from 'react'

/**
 * Slowly zooming/panning background photo (Ken Burns). When `src` changes the new
 * photo fades in on top of the previous one, so hero sliders cross-fade.
 * The parent needs the `has-moving-bg` class.
 */
export default function MovingBg({ src, overlay, variant = 'a' }) {
  const [layers, setLayers] = useState([{ src, key: 0 }])

  useEffect(() => {
    setLayers((l) => (l[l.length - 1].src === src ? l : [...l.slice(-1), { src, key: l[l.length - 1].key + 1 }]))
  }, [src])

  return (
    <div className={`moving-bg kb-${variant}`} aria-hidden="true">
      {layers.map((l, i) => (
        <div key={l.key} className={`moving-bg-img ${i === layers.length - 1 && layers.length > 1 ? 'fade-in' : ''}`} style={{ backgroundImage: `url(${l.src})` }} />
      ))}
      {overlay && <div className="moving-bg-overlay" style={{ background: overlay }} />}
    </div>
  )
}
