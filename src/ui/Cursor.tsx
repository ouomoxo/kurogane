import { useEffect, useRef, useState } from 'react'

// Precision-pointer cursor: an immediate red point and a damped ring that
// widens over interactive elements. Disabled on touch and reduced-motion.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
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
      const act = (e.target as HTMLElement | null)?.closest?.('a, button')
      ring.current?.classList.toggle('is-act', !!act)
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
      document.body.classList.remove('cur-on')
    }
  }, [])

  if (!on) return null
  return (
    <div aria-hidden>
      <div ref={ring} className="cur-ring" />
      <div ref={dot} className="cur-dot" />
    </div>
  )
}
