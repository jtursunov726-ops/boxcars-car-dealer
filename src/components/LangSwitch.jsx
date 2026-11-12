import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { getLang, languages, setLang, t } from '../i18n'

/** Header button with a small menu: English / Русский / O'zbekcha. */
export default function LangSwitch() {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const current = languages.find((l) => l.code === getLang())

  useEffect(() => {
    if (!open) return
    const close = (e) => !box.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div className={`lang ${open ? 'open' : ''}`} ref={box}>
      <button type="button" className="lang-btn" aria-haspopup="listbox" aria-expanded={open} aria-label={t('Language')} onClick={() => setOpen((o) => !o)}>
        <Icon name="globe" /> <span>{current.short}</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {languages.map((l) => (
            <li key={l.code}>
              <button type="button" role="option" aria-selected={l.code === current.code} className={l.code === current.code ? 'selected' : ''} onClick={() => { setOpen(false); setLang(l.code) }}>
                <b>{l.short}</b> {l.name} {l.code === current.code && <Icon name="check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
