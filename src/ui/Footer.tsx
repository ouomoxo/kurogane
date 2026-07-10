import { Link } from 'react-router'
import { NAV, FOOTER } from '../content/site'

export function Footer() {
  return (
    <footer className="foot wrap">
      <div className="foot__top">
        <div className="foot__seal">
          <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden>
            <path d="M16 4 L26 28 L18.5 28 L16 21 L13.5 28 L6 28 Z" fill="none" stroke="var(--red)" strokeWidth="1.3" />
          </svg>
          <div>
            <div className="foot__name">{FOOTER.seal}</div>
            <div className="mono">{FOOTER.established} · 継続</div>
          </div>
        </div>
        <nav className="foot__nav">
          {NAV.map((n) => (
            <Link key={n.path} to={n.path} className="foot__link">
              {n.label}
            </Link>
          ))}
          <Link to="/legal" className="foot__link">
            Legal
          </Link>
        </nav>
      </div>
      <hr className="rule" />
      <p className="foot__disclaimer mono">{FOOTER.disclaimer}</p>
    </footer>
  )
}
