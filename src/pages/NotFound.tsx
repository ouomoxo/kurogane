import { Link } from 'react-router'

export function meta() {
  return [{ title: 'Record Not Found — ARASAKA' }]
}

export default function NotFoundRoute() {
  return (
    <main className="page">
      <div className="page__bar wrap mono">
        <span>ERR-404</span>
        <span className="classif">Record Not Found</span>
        <span>アラサカ社 · Secure Division</span>
      </div>
      <header className="page__head wrap">
        <p className="eyebrow">Access Control</p>
        <h1 className="page__title display">No such record exists</h1>
        <p className="page__jp jp">該当記録なし · 分類外</p>
        <p className="lede page__lede">
          The requested node is outside your clearance, or it never existed. Arasaka does
          not distinguish between the two.
        </p>
        <p style={{ marginTop: 34 }}>
          <Link to="/" className="seq__link mono">
            Return to the public node →
          </Link>
        </p>
      </header>
    </main>
  )
}
