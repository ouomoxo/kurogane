# ARCHITECTURE — PROJECT KUROGANE

## Stack
Vite 5 · React 18 · TypeScript (strict) · react-three-fiber v8 · drei v9 ·
postprocessing · react-router-dom 6.

## Why Vite/SPA instead of the directive's Next.js
The directive named Next.js. We deliberately chose a Vite static SPA because the
delivery target is **GitHub Pages** — a pure static host with no Node runtime and
no server-side rewrites. Next.js SSR/ISR would be inert there, and its static
export would give us no advantage over Vite while adding weight. Recorded as
decision D-001 in DECISIONS.md.

## Routing
`HashRouter`. On a static host without rewrite rules, a `BrowserRouter` deep link
(e.g. `/security`) 404s on refresh. Hash routing keeps every division deep-linkable
and refresh-safe with zero server config.

## Structure
```
src/
  main.tsx            React root
  App.tsx             HashRouter + Nav + Routes + Footer; env detection once
  content/
    site.ts           nav, hero, closing, homepage sequences, footer
    pages.ts          all 10 division PageData records
  pages/Home.tsx      hero (HeroScene) + sequences + index + closing
  ui/
    Nav.tsx           fixed nav + divisions overlay
    Footer.tsx        seal + nav + disclaimer
    Page.tsx          shared editorial shell (PageData → page)
  world/
    HeroScene.tsx     Canvas, lights, env, postprocessing, camera dolly
    Monolith.tsx      the 5-segment hero object
  lib/env.ts          webgl / reduced-motion / tier / sessionClass
  styles/global.css   tokens + primitives + all component CSS
```

## Rendering strategy
One shared `scrollY` ref (0→1) is updated by a rAF-throttled scroll listener in
Home and read inside `useFrame` to drive the camera and segment separation — no
React re-render on scroll. WebGL is feature-detected; a CSS gradient fallback
renders when unavailable.

## Build & deploy
`npm run build` = `tsc --noEmit && vite build`. `base: './'` for subpath hosting.
Deployed to the `gh-pages` branch; `.nojekyll` preserves hashed asset paths.
