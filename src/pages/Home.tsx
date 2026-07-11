import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { HERO, CLOSING, SEQUENCES, NAV, GOV } from '../content/site'
import { detectWebGL, prefersReducedMotion, performanceTier, sessionClass } from '../lib/env'

// The hero WebGL bundle (three.js) loads after the prerendered copy paints.
const HeroScene = lazy(() => import('../world/HeroScene').then((m) => ({ default: m.HeroScene })))

export function meta() {
  return [
    { title: 'ARASAKA CORPORATION — Sovereignty, Secured' },
    {
      name: 'description',
      content:
        'Arasaka Corporation — a stabilizing force for institutions, infrastructure, and human continuity. Public access node. (In-universe fan concept.)',
    },
    { property: 'og:title', content: 'ARASAKA CORPORATION' },
    { property: 'og:description', content: 'Sovereignty, secured. Public access node.' },
  ]
}

interface ClientEnv {
  webgl: boolean
  tier: 'high' | 'low'
  reducedMotion: boolean
  sc: ReturnType<typeof sessionClass>
}

// The homepage is the descent. Hero monolith, then numbered sequences that read
// as a single institutional argument, then the closing statement. This module is
// prerendered at build time, so anything touching window/navigator/WebGL resolves
// after mount; the static HTML ships the designed fallback stage.
const AUTH_STEPS = ['Scanning visitor…', 'Class: External · Civilian', 'Access granted · Public node']

const GATE_LINES = ['ARASAKA SECURE NETWORK', 'NODE TYO-000 · PUBLIC ACCESS LAYER', 'CLASSIFYING VISITOR…']

export default function HomeRoute() {
  const scrollY = useRef(0)
  const revealRefs = useRef<HTMLElement[]>([])
  const pinRef = useRef<HTMLDivElement>(null)
  const yielded = useRef(false)
  const [env, setEnv] = useState<ClientEnv | null>(null)
  const [auth, setAuth] = useState(0)
  // Access threshold: 'hold' (readout running) → 'open' (panels parting) → 'done'
  const [gate, setGate] = useState<'hold' | 'open' | 'done'>('hold')
  const ignited = gate !== 'hold'

  useEffect(() => {
    setEnv({
      webgl: detectWebGL(),
      tier: performanceTier(),
      reducedMotion: prefersReducedMotion(),
      sc: sessionClass(),
    })
  }, [])

  // Access threshold — first visit per session only; any input skips it;
  // reduced-motion and no-JS never see it (prerendered HTML has no gate).
  useEffect(() => {
    if (!env) return
    if (env.reducedMotion || sessionStorage.getItem('kuro-gate')) {
      setGate('done')
      return
    }
    let opened = false
    const open = () => {
      if (opened) return
      opened = true
      sessionStorage.setItem('kuro-gate', '1')
      setGate('open')
      window.setTimeout(() => setGate('done'), 750)
    }
    const t = window.setTimeout(open, 1750)
    const onInput = () => open()
    window.addEventListener('keydown', onInput)
    window.addEventListener('pointerdown', onInput)
    window.addEventListener('wheel', onInput, { passive: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onInput)
      window.removeEventListener('pointerdown', onInput)
      window.removeEventListener('wheel', onInput)
    }
  }, [env])

  // Authentication sequence — restrained, text-only, skipped under reduced motion
  useEffect(() => {
    if (!env || gate === 'hold') return
    if (env.reducedMotion) {
      setAuth(AUTH_STEPS.length - 1)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setAuth(i)
      if (i >= AUTH_STEPS.length - 1) window.clearInterval(id)
    }, 950)
    return () => window.clearInterval(id)
  }, [env, gate])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const h = window.innerHeight || 1
        const p = window.scrollY / h
        // The hero is pinned for ~1.4 viewports (D2): the open arc completes
        // within the pin, so the machine transforms instead of exiting.
        scrollY.current = Math.min(p, 1)
        // Copy is a threshold state, not a fade (D1): hold until the strata
        // begin to part, then yield decisively. Hysteresis so it can't flicker.
        if (pinRef.current) {
          if (!yielded.current && p > 0.12) {
            yielded.current = true
            pinRef.current.classList.add('hero__pin--yield')
          } else if (yielded.current && p < 0.05) {
            yielded.current = false
            pinRef.current.classList.remove('hero__pin--yield')
          }
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!env) return
    if (env.reducedMotion) {
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
  }, [env])

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <main className="home">
      {/* SEQ-01 — Arrival. The stage is pinned (D2): scroll transforms the
          machine in place — strata part, camera pushes and orbits — and
          Record 001 arrives over the opened archive before the pin releases. */}
      <section className="hero">
        <div className="hero__pin" ref={pinRef}>
        <div className="hero__stage">
          {/* The fallback stays mounted under the canvas so the scene can
              crossfade over it instead of swapping in against bare void. */}
          <div className="hero__fallback" aria-hidden />
          {env?.webgl && (
            <Suspense fallback={null}>
              <HeroScene tier={env.tier} reducedMotion={env.reducedMotion} scrollY={scrollY} ignited={ignited} />
            </Suspense>
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
          <p className="hero__object mono" aria-hidden>
            In view ▸ Continuity Core · Cognition strata ×5 · Signal TYO-000
          </p>
          <div className="hero__meta mono">
            <span>
              <span className="dot" /> {HERO.node}
            </span>
            <span className="auth" key={auth}>
              {env
                ? auth < AUTH_STEPS.length - 1
                  ? AUTH_STEPS[auth]
                  : `${AUTH_STEPS[auth]} · ${env.sc.tz} · ${env.sc.pointer}`
                : 'Establishing link…'}
            </span>
          </div>
        </div>

        {env && !env.reducedMotion && gate !== 'done' && (
          <div className={`gate${gate === 'open' ? ' gate--open' : ''}`} aria-hidden>
            <div className="gate__panel gate__panel--l" />
            <div className="gate__panel gate__panel--r" />
            <div className="gate__body mono">
              {GATE_LINES.map((l, i) => (
                <span key={i} className="gate__line" style={{ animationDelay: `${0.15 + i * 0.4}s` }}>
                  {l}
                </span>
              ))}
              <span className="gate__bar">
                <i />
              </span>
            </div>
          </div>
        )}

        <div className="hero__scroll mono" aria-hidden>
          <span>Descend</span>
          <span className="hero__scroll-line" />
        </div>
        </div>
      </section>

      {/* Numbered institutional sequences */}
      <div className="seqs">
        {SEQUENCES.map((s, i) => (
          <section
            key={s.id}
            ref={addReveal}
            className={`seq reveal seq--${i % 2 === 0 ? 'l' : 'r'}${i === 0 ? ' seq--first' : ''}`}
          >
            <div className="wrap seq__grid">
              <div className="seq__meta">
                <span className="mono seq__record">{`Record ${String(i + 1).padStart(3, '0')}`}</span>
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

      {/* SEQ-08 — Governance & investor confidence */}
      <section ref={addReveal} className="gov-band reveal">
        <div className="wrap">
          <div className="seq__meta gov-band__meta">
            <span className="mono seq__code">SEQ-08</span>
            <span className="seq__rule" />
            <span className="mono">{GOV.eyebrow}</span>
          </div>
          <h2 className="seq__title display">{GOV.title}</h2>
          <div className="gov-band__grid">
            {GOV.stats.map((st) => (
              <div key={st.k} className="page__stat">
                <div className="page__stat-v display">{st.v}</div>
                <div className="mono">{st.k}</div>
              </div>
            ))}
          </div>
          <Link to="/investors" className="seq__link mono">
            Access investor relations →
          </Link>
        </div>
      </section>

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
