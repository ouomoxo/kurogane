# DECISIONS — PROJECT KUROGANE

- **D-001 Vite static SPA over Next.js.** Target is GitHub Pages (no Node/SSR).
  Next.js would be inert; Vite ships a leaner static bundle. See ARCHITECTURE.md.
- **D-002 HashRouter over BrowserRouter.** Refresh-safe deep links on a static
  host without rewrite rules.
- **D-003 Procedural env map (Lightformers), no HDRI CDN.** Offline-capable,
  zero network dependency, consistent lighting, smaller footprint.
- **D-004 Single shared scrollY ref for 3D.** Avoids per-frame React re-render.
- **D-005 Monolith over a literal building/character.** Abstract obsidian object
  keeps the tone premium and avoids any game-asset resemblance.
- **D-006 Original SVG mark, not the game logo.** Legal cleanliness; still reads
  as an authoritarian corporate seal.
- **D-007 Copy centralized in content/*.** Single source of truth; enables the
  planned multi-session deepening without touching components.
- **D-008 React Router Framework Mode prerendering (replaces HashRouter SPA).**
  Owner asked why not Next.js; the honest answer was that the CSR/hash-URL SPA
  was the weak point, not Vite. Next.js on GitHub Pages degrades to static
  export (SSR/ISR/middleware inert), so we kept Vite and adopted RR7 framework
  mode with `ssr: false` + `prerender`: every fixed route ships its own HTML at
  a real URL (`/kurogane/security/`), directly accessible and refresh-safe.
  Bonus: true route-level code splitting — three.js lives only in the Home
  chunk (~1.0 MB); division pages load ~280 KB. react-router pinned to v7 (v8
  requires React 19; R3F v8 requires React 18).
- **D-009 CI is the only writer of gh-pages.** GitHub Actions builds on every
  push to main (VITE_BUILD_ID = commit SHA baked into a meta tag), publishes
  build/site, then a verify job polls the live domain until the new SHA is
  served and asserts every route returns 200 + brand content + fresh build,
  and that unknown paths return the designed 404.
- **D-010 Single-writer principle for the working tree.** Autonomous cron
  cycles take an atomic lock (mkdir ~/Desktop/kurogane/.build-lock) before
  touching the tree and release it when done; a cycle that finds a fresh lock
  skips instead of writing concurrently. Deploys happen only via CI (D-009),
  so local cycles never race each other on gh-pages either.
- **D-011 Hero direction: Data Temple.** Three materially different directions
  were built and rendered on identical cinematography (/proto?v=a|b|c):
  A Corporate Reliquary (8.5 — strong vertical rhythm, soft crown), B Sovereign
  Defense Core (7.5 — engineering logic present but muddled top silhouette,
  underlit), C Data Temple (9 — unmistakable inverted-ziggurat silhouette, red
  strata bleed, ceramic dais, direct expression of "ancient institutional power
  through post-human technology"). C chosen on rendered evidence; corrections
  applied (dais exposure, framing, authored panel seams/indicators/markers).
- **D-012 Primitive-bar hero retired.** The 5-box monolith is deleted; the
  colonnade remains flagged placeholder in ASSET_AUDIT.md and is next in line
  for replacement with the temple's design language.
