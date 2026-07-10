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

## Session 3 — Division 3D scenes + 9-sequence homepage (2026-07-10)
- Objective: directive Phases 4–6 increment — distinct visual concept per key
  division; complete the homepage narrative sequence count; perf + micro-interaction.
- New src/world/DivisionScene.tsx (lazy chunk): four procedural concepts —
  security interception lattice (124 instanced sentinels around a pulsing red
  core), intelligence node-field (deterministic 88-node cloud, nearest-neighbour
  paths, one classified signal), continuity archive (stacked strata, one record
  pulled with lit red edge), global network (operational disc, regional pillars,
  red sovereign seat, orbital ring). Shared front-fill + env lighting; no
  postprocessing to keep bands cheap.
- Page shell renders the band only when `scene` set + WebGL + motion allowed;
  prerendered HTML never includes it.
- Homepage: added SEQ-05 Advanced Systems and SEQ-07 Global Network sequences,
  SEQ-08 governance/investor band (restrained stats, no racing counters) —
  narrative now runs SEQ-01…09. Hero scroll arc extended to ~1.6 viewports.
- HeroScene now lazy: hero copy paints before the three.js chunk parses.
- Custom precision cursor (red point + damped ring, widens over interactives);
  hidden on touch/reduced-motion; invisible until first pointer move (defect
  caught in headless screenshots: initial-position artifacts).
- Defect found & fixed: division materials unreadable (albedo too low under
  ACES + no env) → Lightformer env + front fill + raised albedo. Verified by
  repeated headless captures (SwiftShader capture itself is flaky; multiple
  shots taken; live GPU rendering unaffected).
- Gates: tsc + prerender build clean; screenshots of security / intelligence /
  continuity / global-network inspected.

## Session 4 — Corporation/Advanced scenes + focus trap (2026-07-10, continuous cadence)
- Objective: remaining division visual concepts + overlay accessibility gate.
- New scene variants: corporation `colonnade` (nine dark lacquer stelae on a
  plinth, one era marked red — institutional timeline as architecture),
  advanced-systems `gimbal` (three counter-rotating precision rings around a
  machined red core). All six flagship divisions now carry a distinct 3D concept.
- Divisions overlay: full keyboard focus trap — focus moves to first item on
  open, Tab/Shift+Tab cycle inside, Escape closes, focus returns to the toggle
  only when the overlay was actually open (guard added after catching an
  initial-mount focus steal); role=dialog + aria-modal.
- Ops: autonomous cadence tightened 25min → 5min per owner request; stale
  .build-lock from an earlier cycle cleared; this session ran under its own lock.
- Gates: tsc + prerender clean; corporation & advanced-systems screenshots
  inspected (colonnade + gimbal both read correctly).
