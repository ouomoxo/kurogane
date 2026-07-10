# PROJECT KUROGANE — ARASAKA Corporate Experience

A production-grade, cinematic, interactive corporate website concept for the
fictional **Arasaka Corporation**, presented in-universe: sovereign-security
propaganda rendered as institutional restraint.

**Live:** https://ouomoxo.github.io/kurogane/

> ⚠️ **Unofficial fan concept.** Not affiliated with, endorsed by, or licensed
> from CD PROJEKT RED or R. Talsorian Games. Arasaka Corporation is fictional;
> all figures and statements are creative fiction. All shipped assets are
> original or procedurally generated — no proprietary game files are used.

## Stack
- Vite + React 18 + TypeScript (strict)
- react-three-fiber / drei / postprocessing (procedural WebGL — no external HDRI)
- react-router-dom (HashRouter, for static-host deep links)

## Develop
```bash
npm install
npm run dev       # localhost:5173
npm run build     # tsc --noEmit && vite build
npm run preview   # serve dist on :4180
```

See `/docs` for charter, art direction, architecture, motion, performance,
accessibility, and the asset manifest.
