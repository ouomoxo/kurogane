import { useEffect, useRef, useState } from 'react'

// Telemetry readout for the hovered interactive: explicit data-cur wins,
// otherwise links resolve to their route (or uplink host) and buttons to
// their accessible name.
function readout(el: HTMLElement): string {
  const custom = el.getAttribute('data-cur')
  if (custom) return custom
  if (el instanceof HTMLAnchorElement) {
    const url = new URL(el.href, window.location.href)
    if (url.origin !== window.location.origin) return `UPLINK ▸ ${url.host}`
    let path = url.pathname.replace(/^\/kurogane(?=\/|$)/, '') || '/'
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1)
    return `ACCESS ▸ ${path === '/' ? 'ROOT' : path}`
  }
  const name = el.getAttribute('aria-label') || el.textContent?.trim() || 'CTRL'
  return `CTRL ▸ ${name.slice(0, 24)}`
}

// Precision-pointer cursor: an immediate red point, a damped ring that widens
// over interactive elements, and a telemetry tag naming the target.
// Disabled on touch and reduced-motion.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const tag = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || rm) return
    setOn(true)
    document.body.classList.add('cur-on')
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0
    let lastAct: HTMLElement | null = null
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current && dot.current.style.opacity !== '1') {
        rx = x
        ry = y
        dot.current.style.opacity = '1'
        if (ring.current) ring.current.style.opacity = '1'
      }
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      const act = ((e.target as HTMLElement | null)?.closest?.('a, button') ?? null) as HTMLElement | null
      ring.current?.classList.toggle('is-act', !!act)
      if (act !== lastAct) {
        lastAct = act
        if (tag.current) {
          if (act) tag.current.textContent = readout(act)
          tag.current.classList.toggle('is-on', !!act)
        }
      }
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      if (tag.current) {
        const flip = rx > window.innerWidth - 200
        tag.current.classList.toggle('is-flip', flip)
        tag.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    // data-cur can change on activation (e.g. the sound bus) — re-read it
    // on the next frame, after React has committed the new attribute.
    const refresh = () => {
      requestAnimationFrame(() => {
        if (lastAct && lastAct.isConnected && tag.current) tag.current.textContent = readout(lastAct)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('click', refresh, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('click', refresh)
      cancelAnimationFrame(raf)
      document.body.classList.remove('cur-on')
    }
  }, [])

  if (!on) return null
  return (
    <div aria-hidden>
      <div ref={ring} className="cur-ring" />
      <div ref={tag} className="cur-tag mono" />
      <div ref={dot} className="cur-dot" />
    </div>
  )
}
