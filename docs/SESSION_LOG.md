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

## Session 5 — Ambient sound toggle (2026-07-10, autonomous cycle)
- Objective: NEXT_ACTIONS #6 — optional sound, muted by default, original tones.
- New `src/sound/engine.ts`: fully procedural Web Audio — low detuned-sine drone
  bed through a lowpass with a slow breathing LFO, plus generated-noise "air"
  band and short bandpassed UI ticks on link/button clicks (event delegation).
  No recorded or sampled assets anywhere; legal posture unchanged.
- New `src/ui/SoundToggle.tsx` in the nav (SND + three level bars, red animated
  when live; static under prefers-reduced-motion). Muted by default; stored
  preference only re-arms on the next user gesture per browser autoplay policy.
- Gates: `npm run build` clean (tsc + prerender + postbuild); homepage
  screenshot inspected via headless Chrome — toggle renders correctly in muted
  state between node status and Divisions; CI deploy + live route verify green
  (run 29101633384).

## Session 6 — QUALITY RECOVERY PASS: hero vertical slice (2026-07-11)
- Owner directive: freeze expansion; reclassify honestly (ASSET_AUDIT.md);
  rebuild one production-quality vertical slice; three hero directions compared.
- Built /proto comparison stage (noindex) + three directions on identical
  cinematography: Reliquary / Defense Core / Data Temple. All three rendered
  and inspected; C chosen on visual evidence (D-011).
- Production hero rebuilt around the Data Temple: scroll-separating strata,
  glass interlayers, emissive seams, ceramic dais + signal column, authored
  panel trims/indicators/service markers, spatial labels (drei Html, desktop
  pointer only), camera dolly with mass, mobile recomposition (centered, 0.78
  scale, longer lens), reduced-motion static composition, authentication
  readout sequence in the overlay (skipped under reduced motion).
- Primitive 5-box monolith deleted (D-012). Shared material system extracted
  to world/mats.ts (obsidian/lacquer/ceramic/gunmetal/steel/glass/core/ember).
- Defects caught via renders: proto dais overexposure (ceramic albedo + bloom
  threshold corrected), keystone crop (framing), initial invisible-canvas
  captures diagnosed as SwiftShader capture flakiness (1-in-3), not app error.
- Gates: tsc + prerender clean; desktop + 390px mobile hero renders inspected;
  macro pass 3 scores recorded in QUALITY_AUDIT.md.

## Session 7 — Temple language propagation 1/3: Corporation colonnade (2026-07-11)
- NEXT_ACTIONS item 0, ASSET_AUDIT order: colonnade (placeholder) first.
- Colonnade rebuilt in the Data Temple language via shared world/mats.ts:
  each stele is now an authored stack — steel plinth, alternating
  obsidian/lacquer shaft split by a glass stratum with an emissive seam,
  gunmetal capital + face trim; one era's seam burns core-red (brighter,
  animated) while the rest sit as dim embers. Primitive-bar floor replaced by
  ceramic dais over gunmetal skirt with ember timeline inlay + steel markers.
- Local material tuning documented in-code: division rig is hotter than the
  hero rig and has no bloom, so ceramic albedo darkened (#9b978d) and seams
  protrude past the glass faces to read without postprocessing.
- Iteration caught via renders: v1 seams invisible (enclosed in glass, no
  bloom); v2 capture was a SwiftShader blank-frame flake (known 1-in-3);
  v3 ember too hot — all seams read equal, era hierarchy diluted; v4 shipped.
- Gates: `npm run build` clean (tsc + prerender + postbuild); /corporation
  scene band screenshot inspected (era hierarchy, material separation, dais
  inlay all read). Remaining in item 0: archive, network.

## Session 8 — Temple language propagation 2/3: Continuity archive (2026-07-11)
- NEXT_ACTIONS item 0, ASSET_AUDIT order: archive (placeholder) second.
- Archive rebuilt in the Data Temple language via shared world/mats.ts: nine
  alternating obsidian/lacquer records separated by glass interlayers carrying
  ember seams; the record under review drawn out on its glass runner, lip
  burning core-red (animated) with a steel pull-marker; ceramic registry tags
  catalog every record face; gunmetal pylons with ember index lights rail the
  stack beneath a gunmetal capital; ceramic dais over gunmetal skirt with
  ember inlay + steel rim markers (hero/colonnade dais language).
- Local tuning documented in-code: ember 0.65 not 0.9 — this object carries
  eight seams, at 0.9 it read as red stripes instead of stacked records;
  registry tags ceramic not gunmetal (gunmetal vanishes on obsidian head-on);
  base rotation -0.19 so record faces catch the front fill.
- Iteration caught via renders: v1 rotated -0.42 read as a black monolith
  with red stripes (faces off-light, embers over-counted); two SwiftShader
  blank-frame flakes (known 1-in-3) retried; v3 shipped after comparison
  against the shipped colonnade band for dais/value consistency.
- Gates: `npm run build` clean (tsc + prerender + postbuild); /continuity
  scene band screenshot inspected (catalog tags, drawn-record hierarchy,
  material separation all read); CI deploy + live route verify green
  (run 29103800338). Remaining in item 0: network.
