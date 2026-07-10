# PERFORMANCE_BUDGET — PROJECT KUROGANE

## Targets
- First meaningful paint of hero copy < 1.5s on desktop broadband.
- Interactive < 3s. Sustained 60fps desktop / ≥30fps low tier.
- No layout shift from font swap (font-display swap + system fallback stack).

## Current build (production)
- HTML 1.73 kB (gz 0.88) · CSS 11.64 kB (gz 3.46) · JS 1,231 kB (gz 379).
- The JS is dominated by three.js + R3F. Acceptable for a 3D flagship; flagged
  for future manualChunks/code-split of the world bundle (see NEXT_ACTIONS).

## Runtime tiering (lib/env.ts)
- `high`: shadows on, dpr ≤1.8, antialias off (SMAA instead), bloom 0.7, 1024 shadows.
- `low`: shadows off, dpr ≤1.35, antialias on, bloom 0.5, 512 contact shadows.
- Tier derived from touch, hardwareConcurrency ≤4, deviceMemory ≤4.

## Discipline
No external HDRI/CDN fetches (env map built from Lightformers). Single Canvas.
Scroll handled on a rAF-throttled ref — zero React re-render per scroll frame.
