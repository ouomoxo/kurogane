import { forwardRef, useMemo } from 'react'

/* THE SEAL — the corporation rendered as an instrument, not an ornament.
   A measuring ring of 72 ticks; the glyph draws itself in strokes when access
   is granted (a state transition, never a loop); a red index and progress arc
   are driven exclusively by scroll from the page's rAF. Pure SVG: crisp at
   every DPI, weightless, identical on mobile. */
export const Seal = forwardRef<SVGSVGElement, { on: boolean; instant?: boolean }>(function Seal(
  { on, instant = false },
  ref,
) {
  const ticks = useMemo(() => Array.from({ length: 72 }, (_, i) => (i / 72) * 360), [])
  return (
    <svg
      ref={ref}
      className={`seal${on ? ' seal--on' : ''}${instant ? ' seal--now' : ''}`}
      viewBox="0 0 400 400"
      aria-hidden
    >
      <g className="seal__ticks">
        {ticks.map((a, i) => (
          <line key={i} x1={200} y1={22} x2={200} y2={i % 6 === 0 ? 34 : 28} transform={`rotate(${a} 200 200)`} />
        ))}
      </g>

      {/* scroll-driven progress arc + red index (transforms set from Home's rAF) */}
      <circle className="seal__arc" data-arc cx={200} cy={200} r={172} pathLength={100} />
      <g data-index className="seal__index">
        <line x1={200} y1={14} x2={200} y2={40} />
      </g>

      <defs>
        <path id="sealring" d="M 200,352 a 152,152 0 1,1 0.01,0" />
      </defs>
      <text className="seal__ringtext">
        <textPath href="#sealring">
          PUBLIC ACCESS LAYER · 公開接続層 · CLEARANCE 0 · NODE TYO-000 · PUBLIC ACCESS LAYER · 公開接続層 ·
          CLEARANCE 0
        </textPath>
      </text>

      {/* the glyph, drawn in three strokes */}
      <g className="seal__glyph">
        <path className="seal__stroke seal__s1" d="M200 101 L281 299" />
        <path className="seal__stroke seal__s2" d="M200 101 L119 299" />
        <path className="seal__stroke seal__s3" d="M119 299 L182 299 L200 245 L218 299 L281 299" />
      </g>
      <circle className="seal__core" cx={200} cy={252} r={4.5} />
    </svg>
  )
})
