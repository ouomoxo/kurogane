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
