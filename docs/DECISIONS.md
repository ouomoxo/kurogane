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
