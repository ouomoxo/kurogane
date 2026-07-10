import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HeroScene } from '../world/HeroScene'
import { HERO, CLOSING, SEQUENCES, NAV } from '../content/site'
import { sessionClass } from '../lib/env'

interface HomeProps {
  webgl: boolean
  tier: 'high' | 'low'
  reducedMotion: boolean
}

// The homepage is the descent. Hero monolith, then numbered sequences that read
// as a single institutional argument, then the closing statement. Scroll drives
// the 3D camera through a shared ref updated on rAF-throttled scroll.
export function Home({ webgl, tier, reducedMotion }: HomeProps) {
  const scrollY = useRef(0)
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const h = window.innerHeight || 1
        scrollY.current = Math.min(window.scrollY / h, 1)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      revealRefs.current.forEach((el) => el?.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    revealRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [reducedMotion])

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  const sc = sessionClass()

  return (
    <main className="home">
      {/* SEQ-01 — Arrival */}
      <section className="hero">
        <div className="hero__stage">
          {webgl ? (
            <HeroScene tier={tier} reducedMotion={reducedMotion} scrollY={scrollY} />
          ) : (
            <div className="hero__fallback" aria-hidden />
          )}
        </div>

        <div className="hero__overlay wrap">
          <p className="eyebrow hero__eyebrow">{HERO.eyebrow}</p>
          <h1 className="hero__title display">
            Sovereignty,
            <br />
            Secured.
          </h1>
          <p className="hero__jp jp">{HERO.jp}</p>
          <p className="lede hero__lede">{HERO.lede}</p>
          <div className="hero__meta mono">
            <span>
              <span className="dot" /> {HERO.node}
            </span>
            <span>
              {sc.tz} · {sc.locale} · {sc.pointer}
            </span>
          </div>
        </div>

        <div className="hero__scroll mono" aria-hidden>
          <span>Descend</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* Numbered institutional sequences */}
      <div className="seqs">
        {SEQUENCES.map((s, i) => (
          <section
            key={s.id}
            ref={addReveal}
            className={`seq reveal seq--${i % 2 === 0 ? 'l' : 'r'}`}
          >
            <div className="wrap seq__grid">
              <div className="seq__meta">
                <span className="mono seq__code">{s.code}</span>
                <span className="seq__rule" />
                <span className="mono">{s.eyebrow}</span>
              </div>
              <div className="seq__body">
                <p className="jp seq__jp">{s.jp}</p>
                <h2 className="seq__title display">{s.title}</h2>
                {s.body.map((p, k) => (
                  <p key={k} className="lede seq__p">
                    {p}
                  </p>
                ))}
                <Link className="seq__link mono" to={`/${s.id === 'history' ? 'corporation' : s.id}`}>
                  Enter division →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Division index — the whole system at a glance */}
      <section ref={addReveal} className="index-band reveal">
        <div className="wrap">
          <p className="eyebrow">Secure Divisions</p>
          <div className="index-band__grid">
            {NAV.map((n) => (
              <Link key={n.path} to={n.path} className="index-cell">
                <span className="mono index-cell__code">{n.code}</span>
                <span className="index-cell__label">{n.label}</span>
                <span className="jp index-cell__jp">{n.jp}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEQ-09 — Closing statement */}
      <section ref={addReveal} className="closing reveal">
        <div className="wrap closing__inner">
          <p className="eyebrow">{CLOSING.eyebrow}</p>
          <h2 className="closing__title display">{CLOSING.title}</h2>
          <p className="lede closing__lede">{CLOSING.lede}</p>
          <div className="closing__seal" aria-hidden>
            <svg viewBox="0 0 32 32" width="46" height="46">
              <path d="M16 4 L26 28 L18.5 28 L16 21 L13.5 28 L6 28 Z" fill="none" stroke="var(--red)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </section>
    </main>
  )
}
