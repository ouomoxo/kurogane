import { useMemo } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Nav } from './ui/Nav'
import { Footer } from './ui/Footer'
import { Page } from './ui/Page'
import { Home } from './pages/Home'
import { detectWebGL, prefersReducedMotion, performanceTier } from './lib/env'
import {
  CORPORATION,
  SECURITY,
  INTELLIGENCE,
  ADVANCED,
  CONTINUITY,
  GLOBAL,
  INVESTORS,
  CAREERS,
  CONTACT,
  LEGAL,
} from './content/pages'

// HashRouter: robust deep-linking on static GitHub Pages without server rewrites
// (documented in docs/ARCHITECTURE.md — the Next.js → Vite/SPA decision).
export default function App() {
  const env = useMemo(
    () => ({
      webgl: detectWebGL(),
      tier: performanceTier(),
      reducedMotion: prefersReducedMotion(),
    }),
    [],
  )

  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home webgl={env.webgl} tier={env.tier} reducedMotion={env.reducedMotion} />}
        />
        <Route path="/corporation" element={<Page data={CORPORATION} />} />
        <Route path="/security" element={<Page data={SECURITY} />} />
        <Route path="/intelligence" element={<Page data={INTELLIGENCE} />} />
        <Route path="/advanced-systems" element={<Page data={ADVANCED} />} />
        <Route path="/continuity" element={<Page data={CONTINUITY} />} />
        <Route path="/global-network" element={<Page data={GLOBAL} />} />
        <Route path="/investors" element={<Page data={INVESTORS} />} />
        <Route path="/careers" element={<Page data={CAREERS} />} />
        <Route path="/contact" element={<Page data={CONTACT} />} />
        <Route path="/legal" element={<Page data={LEGAL} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}
