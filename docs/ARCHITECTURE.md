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

## Routing & prerendering (D-008)
React Router 7 **Framework Mode**, `ssr: false` + build-time `prerender`. Every
fixed route is emitted as its own `index.html` under real URLs
(`/kurogane/security/`), so direct access and refresh work on GitHub Pages with
no rewrites and no hash URLs. A designed `/404` route is prerendered and copied
to `404.html` for unknown paths. CI verifies all of this against the live domain
on every deploy (D-009).

## Structure
```
src/
  root.tsx            <html> Layout + Nav/Outlet/Footer + ScrollRestoration
  routes.ts           route config (index + 10 divisions + splat 404)
  content/
    site.ts           nav, hero, closing, homepage sequences, footer
    pages.ts          all 10 division PageData records
  pages/Home.tsx      hero (HeroScene) + sequences + index + closing
  pages/*.tsx         thin route modules: meta() + <Page data={...}/>
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
`npm run build` = `tsc --noEmit && react-router build`, then postbuild assembles
the deploy root at `build/site` (prerendered HTML tree + `/kurogane/`-based
assets + 404.html + .nojekyll). Deploys are CI-only: push to main → GitHub
Actions builds with `VITE_BUILD_ID=<sha>`, publishes to `gh-pages`, and a verify
job polls the live site until the new SHA is served, then asserts every route
(200, brand content, fresh build, unique title) and the 404 path. Prerendered
route components run in Node at build time — anything touching
window/navigator/WebGL resolves post-mount.
