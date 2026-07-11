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

## Session 9 — Temple language propagation 3/3: Global Network (2026-07-11)
- NEXT_ACTIONS item 0, ASSET_AUDIT order: network (placeholder) last. Completes
  the temple-language pass across every division scene.
- Network rebuilt in the Data Temple language via shared world/mats.ts, replacing
  the old generic disc + raw-material pillars + hairline torus (the last scene
  still outside the shared palette). New composition: a ceramic command floor
  over a gunmetal skirt; six deterministic sovereignty steles (steel plinth,
  obsidian/lacquer shaft split by a glass stratum + ember seam, gunmetal capital)
  ring a single red seat of command whose seam burns core-red (animated); ember
  trunk lines inlaid from the seat out to each zone; ember node pads seat each
  zone; twelve steel rim markers ring the floor's edge; a gunmetal orbital ring
  seals the envelope above.
- Local tuning matches colonnade/archive: ceramic darkened to #9b978d, ember 0.85
  for the hotter bloomless division rig; disc tilt 0.08 preserved for the 3/4
  read; slow 0.05 spin — an institution does not improvise. Zones seeded via
  mulberry32(19) so the map is identical on every visit.
- Gates: `npm run build` clean (tsc + prerender + postbuild); /global-network
  scene band screenshot inspected at 1400x1750 — command floor, radiating red
  trunk lines, central core-red seat, ringed steles, rim markers and orbital
  ring all read and separate in value. Item 0 (temple propagation) now DONE.

## Session 10 — Cross-browser pass with device emulation (2026-07-11)
- NEXT_ACTIONS item 7: extended `scripts/crossbrowser.mjs` from WebKit/Firefox
  viewport-only sweeps to a three-engine matrix — WebKit (iOS Safari proxy),
  Firefox, and system Chrome (`channel: 'chrome'`, Android proxy) — with full
  mobile device emulation (390x844, DPR 3, isMobile, hasTouch) on WebKit and
  Chrome; Firefox falls back to viewport-only since Playwright Firefox rejects
  isMobile.
- Sweep: 3 engines x 2 viewports x 11 routes = 66 screenshots in
  artifacts/crossbrowser/, zero console/page errors across the matrix.
- Cycle was interrupted before commit; this session verified the work honestly
  before shipping: `npm run build` re-run clean (tsc + prerender + postbuild),
  chrome-mobile-home and webkit-mobile-global-network re-inspected (nav,
  display type, hero monolith, and temple-language network scene all render).
- True-device spot check on real iOS/Android hardware remains a nice-to-have.

## Session 11 — Hero composition: type clears the temple (2026-07-11)
- Craft-polish item 1: the hero display type previously collided with the
  temple monolith at 1440. Recovered a stale interrupted cycle (lock >45min,
  uncommitted WIP verified rather than discarded) and finished it: temple group
  shifted right (x 1.35 -> 2.3) and scaled 0.98 -> 0.9, float raised
  0.55 -> 0.85 with a longer signal column (2.6 -> 3.0) keeping the dais link,
  camera lookAt 0.9 -> 1.15, title clamp 12vw/168px -> 9.6vw/140px.
- Added `scripts/shot-hero.mjs` (Playwright system Chrome) for 1440/1920/390
  hero screenshots against the preview server.
- Gates: `npm run build` clean (tsc + prerender + postbuild); screenshots
  inspected at all three viewports — 1920 fully separated, 1440 the comma just
  clears the signal column, 390 compact layout unchanged; deploy 72e3c3f pushed,
  GH Actions run 29110555095 completed/success, live root 200.
- Noted for later: 390 hero paragraph passes over the bright dais — readable
  but low margin; consider a subtle compact-mode scrim.

## Session 12 — Cursor hover telemetry (2026-07-11)
- Craft-polish item 2 (second half): the precision cursor (session 3) now
  carries a telemetry tag — a 9px mono core-red readout trailing the damped
  ring that names the hovered interactive: `ACCESS ▸ /route` for internal
  links (basename-stripped), `UPLINK ▸ host` for external, `CTRL ▸ name`
  for buttons, with explicit `data-cur` overrides on the nav mark
  (`HQ ▸ TYO-000`), divisions toggle (`INDEX ▸ DIVISIONS`) and sound toggle
  (`AUDIO BUS ▸ LIVE/COLD`, re-read one frame after click so the state flip
  shows). Tag flips left of the ring within 200px of the right viewport edge.
- Recompute only on target change; per-frame work unchanged (one extra
  transform write). Hidden with the rest of the cursor on touch/reduced-motion.
- New gate script `scripts/shot-cursor.mjs` (Playwright system Chrome vs
  preview): hovers nav mark / divisions / SND / first seq link, asserts tag
  text, screenshots each state, clicks SND to verify COLD→LIVE. First run
  caught a measurement flake (box read before scroll-reveal settled) — fixed
  in the script, not the feature.
- Gates: `npm run build` clean (tsc + prerender + postbuild); 4 hover
  screenshots inspected (ring widens, tag reads, edge-flip correct); zero
  console/page errors.

## Session 13 — First-paint choreography (2026-07-11)
- Craft-polish item 3: the arrival is now staged instead of dumped. Nav
  settles from above (0.1s), then the hero copy rises line by line —
  eyebrow 0.25s, title 0.4s, jp 0.7s, lede 0.85s, meta 1.05s, descend
  indicator fades at 1.7s — all pure CSS animations gated on `html.js`,
  so they run from the prerendered first paint with no hydration wait.
  Without JS the page stays fully visible; the global reduced-motion
  clamp collapses the timings.
- The lazy WebGL temple no longer pops: the `hero__fallback` gradient
  stays mounted under the canvas, and the Canvas (`.hero__scene`)
  crossfades in over 1.8s once the renderer has its first frame down
  (double-rAF after onCreated → `--live`).
- New gate script `scripts/shot-boot.mjs` (Playwright system Chrome vs
  preview): slows animations 4x via CDP Animation.setPlaybackRate so
  fixed-delay captures land inside the stagger deterministically —
  early (eyebrow only, title still hidden), mid (stack risen, temple
  crossfaded), settled 1440 + 390; asserts `.hero__scene--live` and
  zero console/page errors.
- Housekeeping: `.react-router/` (generated route types) gitignored.
- Gates: `npm run build` clean (tsc + prerender + postbuild); 4
  screenshots inspected; scene live asserted; zero console/page errors.

## Session 14 — Compact hero lede scrim (2026-07-11)
- Last craft-polish item: at ≤719px the hero paragraph crosses the bright
  dais with thin contrast (confirmed via before-screenshot of the live site
  at 390×844). Added a local scrim — `.hero__lede::before`, a soft radial
  gradient (`rgba(5,5,5,.6)` → transparent 80%) inset -18/-24px behind the
  paragraph only, `z-index:-1` so it rides the boot-rise animation with the
  text and never dims the rest of the scene. Desktop (≥720px) untouched.
- Gates: `npm run build` clean (tsc + prerender + postbuild); before/after
  390 + 1440 screenshots inspected via scripts/shot-hero.mjs against
  preview (lede legible over the dais, soft non-boxy falloff, desktop
  unchanged); CI run 29111852960 green (deploy + live-route verify).

## Session 15 — Content pass: Night City block (2026-07-11)
- Re-read all division copy in src/content/pages.ts for tone drift and
  repetition. Weakest paragraph: Global Network → Night City ("A theater of
  concentrated corporate presence, secured infrastructure, and strategic
  response.") — three abstract noun phrases, no closing turn (every sibling
  block lands one), and "strategic response" duplicated the Security
  division's block title. Rewrote to: "The corporation's deepest presence
  abroad, held street by street. What Tokyo decides, Night City
  demonstrates." — parallel with the Tokyo block, concrete, in-tone.
- Rest of the copy judged consistent: "sovereign"/"continuity" recurrence is
  deliberate leitmotif, not drift; no other paragraph flagged.
- Gates: `npm run build` clean (tsc + prerender + postbuild); 1440
  screenshot of /global-network/ inspected (new copy renders, layout
  intact); CI run 29112105686 green (deploy + live-route verify).

## Session 16 — Lighthouse audit + a11y fixes (2026-07-11)
- Ran Lighthouse (headless Chrome, swiftshader) against the live site:
  perf 0.28 / a11y 0.95 / best-practices 1.0 / SEO 1.0. Perf score is a
  software-GL artifact (WebGL burns main thread under swiftshader — TBT
  10.5s, bootup 8s); unminified/inefficient-cache findings trace to Google
  Fonts + gh-pages headers, neither ours to fix. Real findings = the two
  a11y failures:
  1. color-contrast — `--ash-2 #5c5b56` on `--void-1 #080808` = 2.94:1
     (foot__seal mono line + foot__disclaimer, i.e. the legal disclaimer).
     Lifted the token hue-preserved to `#7a7972` = 4.58:1 (WCAG AA); sits
     between old ash-2 and `--ash #8b8a84` so the type hierarchy holds.
  2. label-content-name-mismatch — SND toggle's aria-label lacked its
     visible text. Now `SND: enable/mute ambient sound`.
- Gates: `npm run build` clean (tsc + prerender + postbuild); hero + footer
  screenshots inspected (disclaimer legible, still muted; computed color
  asserted rgb(122,121,114) via playwright); Lighthouse a11y re-run on the
  local build = 1.0 with both audits passing; CI run 29112562067 green
  (deploy + live-route verify).

## Session 17 — Self-hosted fonts (2026-07-11)
- Implemented the perf follow-up from session 16: dropped the render-blocking
  Google Fonts CSS + preconnects from root.tsx; all three families now ship
  from our own origin via `src/styles/fonts.css` (imported before global.css,
  so the woff2s ride the vite asset pipeline with hashed URLs).
- Archivo + JetBrains Mono: Google's own variable-wght woff2s (latin +
  latin-ext subsets, unicode-range preserved) — 4 files, ~110 KB total.
- Zen Kaku Gothic New: full JP TTFs are ~2.3 MB/weight; site copy uses a
  fixed glyph set, so subset each weight with pyftsubset to kana/punct blocks
  (U+3000-30FF) + the 82 kanji appearing under src/ → ~33 KB/weight.
  Regen recipe + OFL notes in `src/styles/fonts/README.md`; missing future
  glyphs degrade to the system JP font (no tofu).
- Gates: `npm run build` clean (tsc + prerender + postbuild); 1440 screenshots
  of / and /legal/ inspected (Archivo display type, mono telemetry, JP glyphs
  株式会社アラサカ / 法務・分類 all render in the right faces; disclaimer
  intact); built site greps 0 hits for googleapis|gstatic; CI run
  29113036336 green (deploy + live-route verify); live HTML clean, subset
  woff2 serves 200.
- Next perf step if a cycle wants it: re-measure Lighthouse on real-GPU
  Chrome to quantify the delta.

## Session 18 — Real-GPU Lighthouse re-measure (2026-07-11)
- Closed the follow-up from session 17: Lighthouse against the live site on
  real-GPU headless Chrome (no swiftshader flags).
  - Default (mobile-throttled sim): perf 0.79 / a11y 1.0 / BP 1.0 / SEO 1.0
    — FCP 1.6s, LCP 3.8s(sim), TBT 340ms, CLS 0.028.
  - Desktop preset: perf 0.97 — FCP 0.7s, LCP 0.9s, TBT 0ms, CLS 0.
  - Session 16's perf 0.28 confirmed as pure software-GL artifact.
- PerformanceObserver probe in real Chrome (Playwright): actual LCP is the
  hero H1 at 1.08s; the 3.8s sim number is 4x-CPU + slow-4G throttling, and
  the boot-rise choreography does not delay real LCP (element paints on its
  first >0-opacity frame).
- Only remaining sim-mobile finding: 113 KiB unused three.js in the lazy
  mats chunk — inherent, judged not worth chasing.
- No source changes. Gates: `npm run build` clean (tsc + prerender +
  postbuild), preview screenshot of / inspected (hero type, JP glyphs,
  nav intact). Docs-only commit, [skip ci].

## Session 19 — 2026-07-11 (03:10 KST) — steady-state health check

- NEXT_ACTIONS has no undone items (true-device check remains blocked on owner
  hardware), so per protocol this cycle is a live-site health check only —
  no new scope, no source changes.
- CI: latest "Deploy & verify Pages" run on main and the subsequent gh-pages
  build both completed/success (2026-07-10 18:01 UTC).
- Live routes: all 11 prerendered routes (/, advanced-systems, careers,
  contact, continuity, corporation, global-network, intelligence, investors,
  legal, security + proto) return 200 via curl.
- Disclaimer intact on homepage: "…not affiliated with, endorsed by, or
  licensed from CD PROJEKT RED or R. Talsorian Games. All corporate figures
  and statements are fictional."
- No build/deploy performed. Docs-only commit, [skip ci].
- Addendum (03:13 KST, duplicate cron fire): independent re-check confirmed
  the same state — CI green, all 12 routes (11 + /proto) return 200,
  disclaimer intact. No changes.

## Session 20 — 2026-07-11 (03:16 KST) — cadence fix, health re-confirmed

- Third cron fire within 6 minutes (03:10 / 03:13 / 03:14). Root cause found:
  the `kurogane-autonomous-build` job ran on `everyMs: 300000` (5-minute
  cadence) — appropriate for the active build phase, wasteful now that
  NEXT_ACTIONS is fully done and cycles are health-check-only.
- Action: slowed the OpenClaw cron job to a 12-hour cadence (payload/protocol
  unchanged, description updated). Owner notified on Telegram.
- Health re-confirmed this cycle: live homepage 200, full disclaimer sentence
  present ("…not affiliated with, endorsed by, or licensed from CD PROJEKT RED
  or R. Talsorian Games. All corporate figures and statements are fictional.").
- No source changes. Docs-only commit, [skip ci].

## Session 21 — PROJECT RESET: machine-space vertical slice (2026-07-11)
- Owner reset directive: atmosphere/identity over asset count. Diagnosis and
  correction recorded as D-013.
- HeroScene rewritten: MeshReflectorMaterial floor (tier-gated), 6 perimeter
  security columns with status seams, etched Arasaka glyph on the fog wall,
  per-part emissive channels with a sequenced ignition state machine (ignite()
  ramp with catch-flicker), idle float/rotate removed — all motion now
  state-driven (scroll opens strata + rotates rig; camera dolly with mass).
- Home: ACCESS GATE threshold (readout + progress hairline + parting panels,
  1.75s, any input skips, session-once, reduced-motion/no-JS exempt); hero copy
  yields on scroll (opacity/lift from the scroll rAF); object-reference line;
  sequences renumbered as RECORD 00N with a connecting thread.
- Verified with scripts/shot-reset.mjs (Playwright + real Chrome): gate frame,
  ignited hero, 25%/50% scroll states, compact hero — zero console errors,
  canvas live. All five frames inspected.

## Session 22 — QC RESET: Loop 01 Steps A–C (2026-07-11, no code modified)
- Owner QC directive: evidence-gated loops, no self-certification. Framework
  installed: QUALITY_DEFECTS.md, CURRENT_STATUS.md, ARASAKA_REFERENCE_MATRIX.md,
  scripts/qc-observe.mjs (full viewport/scroll/interaction matrix + recording).
- Observed DEPLOYED build 69d3737 on the live domain: 19 frames + video into
  artifacts/review/loop-01/before/ — 2560/1920/1440 desktop, 430/390 mobile,
  scroll 0/15/30/50/transition/reveal, gate/auth/nav/reduced-motion/no-WebGL.
  pageerrors 0, requestfailed 0.
- Four-role critique recorded (critique.md): 10 defects, 2 critical (D1 copy
  yield reads as bug; D2 15–50% scroll dead zone — temple exits viewport).
- Loop-01 decision on current build: **REJECTED.** Implementation is the next
  cycle's Step D. Code deliberately untouched this session per directive.

## Session 23 — Loop 01 Step D implemented (reconstructed from git, 2026-07-11)
- Prior cycle committed 0dcbd69 "QC Loop 01 Step D: D2 pinned hero choreography,
  D1 threshold copy yield, D5 dais inversion, D3 anchored glyph" and pushed;
  "Deploy & verify Pages" green (00:02 UTC). Hall refactor d526c41 also landed
  (the previously-uncommitted P1 work — reconciled, nothing lost).
- That cycle ended before updating SESSION_LOG/CURRENT_STATUS; this entry
  backfills the record from commit + CI evidence only.

## Session 24 — Loop 01 Step E: re-render + verification (2026-07-11)
- Took over stale build lock (50 min). Confirmed tree clean, HEAD==origin/main,
  Step D build live via green deploy run.
- Re-rendered the exact frame matrix from the DEPLOYED site:
  `node scripts/qc-observe.mjs loop-01 after` → 19 frames + recording,
  pageerrors 0, netfail 0 → artifacts/review/loop-01/after/.
- Frame-pair inspection recorded in comparison/COMPARISON.md + verification.md:
  D1/D2/D3/D5 improvements visible at captured frames → CANDIDATE (not
  VERIFIED — Step F adversarial pass pending). D4/D6–D10 unchanged (OPEN).
- Loop-01 state: A–E done; F (adversarial review incl. recording + mobile +
  reduced-motion frames) is the next mandatory action, then G decision.

## Session 25 — Loop 01 Steps F+G: adversarial review + decision (2026-07-11)
- Took over stale build lock (49 min). Deployed build unchanged (0dcbd69,
  Pages last-modified 00:02 UTC); stepf/ sweep frames (09:53 KST) confirmed
  captured against that build via timestamps.
- Step F: adversarial pass over stepf/sweep-05..42 (10 intermediate scroll
  states), scroll-00, desktop-2560-settled, mobile-390 settled + scroll-50,
  ix-reduced-motion — all frames visually inspected. Refutation attempts on
  D1/D2/D3/D5 FAILED → VERIFIED-RESOLVED. One successful attack: NEW D11
  (HIGH) — mobile 390 hero copy collides with strata stack, beam behind
  "Secured.", no scrim/reflow. Full record:
  artifacts/review/loop-01/stepf/adversarial-review.md.
- Step G decision: **CANDIDATE.** Zero critical defects survive; D4/D11 HIGH
  + D6–D10 open. Loop-01 complete (1 of min 5). Clean-of-critical adversarial
  reviews: 1 consecutive.
- Ledger + CURRENT_STATUS updated; scripts/stepf-capture.mjs committed.
- Next mandatory action: Loop-02 Step A observe (loop-02 before matrix).

## Session 26 — CTO pivot: interface-first homepage (2026-07-11)
- Owner granted full CTO autonomy; 3D deprioritized. D-014 recorded.
- Removed HeroScene/three.js from the homepage. New system stage: hgrid,
  watermark glyph, scanline (post-gate, one-shot), THE SEAL (ui/Seal.tsx),
  session Dossier, Record-001 redaction, threshold sweeps. Pin tightened
  240svh→165svh after a first-render critique found the yielded stretch empty.
- Evidence: artifacts/reset/ re-captured (gate/hero/25/50/mobile) and
  inspected; D11 mobile collision eliminated by design; D4/D6/D7 obsolete on
  the homepage (ledger updated next cycle). Build clean.
