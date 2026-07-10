# MOTION_SYSTEM — PROJECT KUROGANE

## Principles
Motion is institutional, not playful. Everything eases with intent and settles
firmly. Nothing bounces. Nothing loops fast enough to distract.

## Tokens
- `--e-inout: cubic-bezier(0.65,0,0.35,1)` — symmetric UI transitions.
- `--e-out:   cubic-bezier(0.16,1,0.3,1)`  — reveals, entrances.
- `--t-micro 0.16s` · `--t-ui 0.36s` · `--t-reveal 0.9s`.

## Choreography
- Nav: transparent → solid glass on 40px scroll.
- Divisions overlay: staggered item entrance (0.03s step), hairline underlines.
- Section reveals: 34px rise + fade via IntersectionObserver, once.
- Hero seam: red emissive pulse `2.1 + sin(t·1.4)·0.5` in useFrame.
- Camera: damped dolly `z: 15 → 11.8` mapped to scroll 0→1; frame-rate independent.
- Monolith: pointer parallax (damped) + scroll-driven segment separation.

## Reduced motion
`prefers-reduced-motion` collapses transitions globally and forces all reveals to
their resting state on mount; the 3D scene is passed `reducedMotion` to quiet its
idle animation.
