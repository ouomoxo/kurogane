# SESSION_LOG — PROJECT KUROGANE

## Session 1 — Foundation & first deploy
- Scaffolded Vite/React/TS/R3F project at ~/Desktop/kurogane.
- Built design-token system (global.css), centralized content (site.ts, pages.ts).
- Built world: Monolith (5-segment obsidian, pulsing seams), HeroScene
  (architectural lights, procedural env, ACES + bloom + vignette + SMAA, camera dolly).
- Built UI: Nav + divisions overlay, Footer + disclaimer, shared Page shell.
- Built Home (hero + 4 numbered sequences + division index + closing) and
  App (HashRouter, all 10 routes, env detection).
- Fixed EffectComposer strict-children typing (keyed array); shared-material
  double-mount (material prop, direct seam pulse).
- `npm run build` clean. Validated home + /security via headless Chrome (WebGL on).
- Wrote full /docs set. Initialized git, deployed to GitHub Pages.

## Next session
See NEXT_ACTIONS.md — deepen homepage sequences with distinct 3D, split bundle.

## Session 2 — Prerender migration + CI verification (2026-07-10)
- Objective: kill hash URLs; per-route HTML on GitHub Pages; CI-verified deep links.
- Migrated to React Router 7 Framework Mode (`appDirectory: src`, `ssr: false`,
  `basename: /kurogane/`, 12 prerendered paths incl. designed /404).
- New: src/root.tsx (Layout + Scripts/ScrollRestoration), src/routes.ts, 11 thin
  route modules with per-route <title>/description; removed index.html/main.tsx/App.tsx.
- Home made prerender-safe: WebGL/tier/reduced-motion/sessionClass detection moved
  to post-mount state; static HTML ships the designed fallback stage; `.reveal`
  hiding now gated on `html.js` so no-JS clients read full content.
- scripts/postbuild.mjs assembles deploy root build/site (HTML tree + assets +
  404.html + .nojekyll); scripts/preview.mjs serves it at /kurogane/ locally.
- Gates run: tsc + prerender build clean; local direct-access checks: all 11
  routes 200 with unique titles, unknown path 404 with designed page; headless
  Chrome screenshots (home WebGL + investors) inspected — parity with SPA build.
- CI: .github/workflows/deploy.yml — build (SHA-stamped) → publish gh-pages →
  verify job asserts every route live, fresh, branded; 404 checked.
- Ops: single-writer lock protocol for cron cycles (D-010).
