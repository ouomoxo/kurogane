import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { NAV } from '../content/site'

// Persistent, restrained navigation. Identity left, divisions in an overlay,
// access status right. Transforms from transparent to solid on scroll. The
// overlay reads as movement between secure divisions of one system.
export function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [loc.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`nav${solid ? ' nav--solid' : ''}`}>
        <Link to="/" className="nav__mark" aria-label="Arasaka — home">
          <span className="nav__glyph" aria-hidden>
            <svg viewBox="0 0 32 32" width="22" height="22">
              <path d="M16 4 L26 28 L18.5 28 L16 21 L13.5 28 L6 28 Z" fill="none" stroke="var(--red)" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="nav__word">ARASAKA</span>
          <span className="nav__jp jp">アラサカ</span>
        </Link>

        <div className="nav__right">
          <span className="nav__status mono">
            <span className="dot" /> Node TYO-000
          </span>
          <button className="nav__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Divisions menu">
            <span className="mono">{open ? 'Close' : 'Divisions'}</span>
            <span className={`nav__bars${open ? ' is-open' : ''}`} aria-hidden>
              <i /><i />
            </span>
          </button>
        </div>
      </header>

      <div className={`menu${open ? ' menu--open' : ''}`} aria-hidden={!open}>
        <div className="menu__inner wrap">
          <div className="menu__meta mono">Secure Divisions · 部門</div>
          <nav className="menu__list">
            {NAV.map((n, i) => (
              <Link key={n.path} to={n.path} className="menu__item" style={{ transitionDelay: open ? `${0.05 + i * 0.03}s` : '0s' }}>
                <span className="menu__code mono">{n.code}</span>
                <span className="menu__label">{n.label}</span>
                <span className="menu__jp jp">{n.jp}</span>
              </Link>
            ))}
          </nav>
          <Link to="/legal" className="menu__legal mono">
            Legal · Classification · 法務
          </Link>
        </div>
      </div>
    </>
  )
}
