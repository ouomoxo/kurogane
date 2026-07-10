# ART_DIRECTION — PROJECT KUROGANE

## Thesis
Japanese corporate modernism × institutional brutalism. The visual language of a
company that believes it *is* the state. Authority expressed through emptiness,
alignment, and the disciplined absence of decoration.

## Color
Material blacks, never pure #000 — separation is preserved so the dark reads as
architecture, not void:
- `--void #050505` · `--void-1 #080808` · `--void-2 #0c0c0d` · `--panel #121214`
Institutional whites: `--white #edece7`, `--white-dim #cfcdc6`, ash greys for meta.
Arasaka red `#e10600` is a **signal**, never a background — seams, dots,
classification labels, single hover accents. Amber is reserved for warnings only.

## Typography
- Display / UI: **Archivo** (institutional grotesk) — 600 weight, tight tracking.
- Japanese: **Zen Kaku Gothic New** — used as authentic bilingual counterweight.
- Mono: **JetBrains Mono** — classification codes, meta, surveillance flavor.
Hierarchy is dramatic: hero display runs to ~168px; body sits at a calm 15–19px.

## Composition
Generous gutters (`clamp(20px, 4.4vw, 96px)`), hairline rules, numbered sections.
Whitespace is the primary tool. The eye is led by alignment, not ornament.

## 3D
A five-segment obsidian **monolith** with pulsing red emissive seams, lit by a
soft architectural key + narrow red rim, env-mapped from geometry (no HDRI CDN).
Scroll separates the segments and dollies the camera — the object "decompiles"
as you descend. Postprocessing: ACES tone map, restrained bloom, vignette, SMAA.
