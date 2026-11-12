import { Children, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

/**
 * Styled replacement for <select>: the chosen option is highlighted with a check mark.
 * Accepts <option> children like a normal select and calls onChange({ target: { value } }).
 * The list is rendered in a portal so hero sections with overflow:hidden never clip it.
 */
export default function Dropdown({ value, onChange, children, label, className = '' }) {
  const options = Children.toArray(children)
    .filter((c) => c?.type === 'option')
    .map((c) => ({ value: String(c.props.value ?? c.props.children), label: c.props.children }))
  const current = options.find((o) => o.value === String(value)) || options[0]

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(null)
  const button = useRef(null)
  const list = useRef(null)
  const id = useId()

  const place = () => {
    const r = button.current?.getBoundingClientRect()
    if (!r) return
    const below = window.innerHeight - r.bottom
    const height = Math.min(280, options.length * 42 + 12)
    const up = below < height + 12 && r.top > below
    setPos({ left: r.left, width: Math.max(r.width, 200), top: up ? undefined : r.bottom + 6, bottom: up ? window.innerHeight - r.top + 6 : undefined })
  }

  useLayoutEffect(() => {
    if (open) place()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (!button.current?.contains(e.target) && !list.current?.contains(e.target)) setOpen(false)
    }
    const reposition = () => place()
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close)
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, true)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('touchstart', close)
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (open) list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open])

  const choose = (o) => {
    onChange?.({ target: { value: o.value } })
    setOpen(false)
    button.current?.focus()
  }

  const openList = () => {
    setActive(Math.max(0, options.indexOf(current)))
    setOpen(true)
  }

  const onKeyDown = (e) => {
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      openList()
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(options[active]) }
    if (e.key === 'Escape' || e.key === 'Tab') setOpen(false)
  }

  return (
    <div className={`sel dd ${open ? 'open' : ''} ${current && current !== options[0] ? 'has-value' : ''} ${className}`}>
      {label && <span className="sel-label">{label}</span>}
      <button
        ref={button}
        type="button"
        className="dd-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span>{current?.label}</span>
      </button>
      <Icon name="chev-d" className="sel-arrow" />
      {open && pos && createPortal(
        <ul ref={list} id={id} role="listbox" className="dd-list" style={pos}>
          {options.map((o, i) => {
            const selected = o === current
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={selected}
                className={`${selected ? 'selected' : ''} ${i === active ? 'active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
              >
                <span>{o.label}</span>
                {selected && <Icon name="check" />}
              </li>
            )
          })}
        </ul>,
        document.body,
      )}
    </div>
  )
}
