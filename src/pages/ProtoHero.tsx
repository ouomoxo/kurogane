import { Suspense, lazy, useEffect, useState } from 'react'
import { detectWebGL } from '../lib/env'
import type { HeroDirection } from '../world/heroDirections'

const ProtoScene = lazy(() => import('../world/heroDirections'))

export function meta() {
  return [{ title: 'HERO DIRECTIONS — internal comparison' }, { name: 'robots', content: 'noindex' }]
}

const F_STOPS = [0, 0.25, 0.5] as const

// P1 direction matrix stage (internal, not linked from navigation).
// ?v=a|b|c selects a direction; ?f=0|0.25|0.5 parks the scene at that
// scroll fraction (same open/camera math as the production hero).
export default function ProtoHeroRoute() {
  const [v, setV] = useState<HeroDirection>('a')
  const [f, setF] = useState(0)
  const [gl, setGl] = useState(false)
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    setGl(detectWebGL())
    setCompact(window.innerWidth < 780)
    const q = new URLSearchParams(window.location.search)
    const qv = q.get('v')
    if (qv === 'a' || qv === 'b' || qv === 'c') setV(qv)
    const qf = parseFloat(q.get('f') ?? '')
    if (Number.isFinite(qf)) setF(Math.min(1, Math.max(0, qf)))
  }, [])
  return (
    <main style={{ position: 'fixed', inset: 0, background: '#050505' }}>
      {gl && (
        <Suspense fallback={null}>
          {/* key remounts the scene so each state change re-runs ignition */}
          <ProtoScene key={`${v}-${f}`} variant={v} f={f} compact={compact} />
        </Suspense>
      )}
      <div style={{ position: 'fixed', left: 24, bottom: 20, display: 'flex', gap: 14, zIndex: 5 }}>
        {(['a', 'b', 'c'] as const).map((k) => (
          <button key={k} className="mono" onClick={() => setV(k)}
            style={{ color: v === k ? '#e10600' : undefined, border: '1px solid rgba(207,205,198,.2)', padding: '8px 14px' }}>
            {k === 'a' ? 'A · Reliquary' : k === 'b' ? 'B · Defense Core' : 'C · Data Temple'}
          </button>
        ))}
        {F_STOPS.map((k) => (
          <button key={k} className="mono" onClick={() => setF(k)}
            style={{ color: f === k ? '#e10600' : undefined, border: '1px solid rgba(207,205,198,.2)', padding: '8px 10px' }}>
            {Math.round(k * 100)}%
          </button>
        ))}
      </div>
    </main>
  )
}
