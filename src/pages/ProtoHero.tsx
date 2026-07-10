import { Suspense, lazy, useEffect, useState } from 'react'
import { detectWebGL } from '../lib/env'
import type { HeroDirection } from '../world/heroDirections'

const ProtoScene = lazy(() => import('../world/heroDirections'))

export function meta() {
  return [{ title: 'HERO DIRECTIONS — internal comparison' }, { name: 'robots', content: 'noindex' }]
}

// Internal comparison stage for the quality-recovery vertical slice.
// Not linked from navigation. ?v=a|b|c selects a direction.
export default function ProtoHeroRoute() {
  const [v, setV] = useState<HeroDirection>('a')
  const [gl, setGl] = useState(false)
  useEffect(() => {
    setGl(detectWebGL())
    const q = new URLSearchParams(window.location.search).get('v')
    if (q === 'a' || q === 'b' || q === 'c') setV(q)
  }, [])
  return (
    <main style={{ position: 'fixed', inset: 0, background: '#050505' }}>
      {gl && (
        <Suspense fallback={null}>
          <ProtoScene variant={v} />
        </Suspense>
      )}
      <div style={{ position: 'fixed', left: 24, bottom: 20, display: 'flex', gap: 14, zIndex: 5 }}>
        {(['a', 'b', 'c'] as const).map((k) => (
          <button key={k} className="mono" onClick={() => setV(k)}
            style={{ color: v === k ? '#e10600' : undefined, border: '1px solid rgba(207,205,198,.2)', padding: '8px 14px' }}>
            {k === 'a' ? 'A · Reliquary' : k === 'b' ? 'B · Defense Core' : 'C · Data Temple'}
          </button>
        ))}
      </div>
    </main>
  )
}
