# NEXT_ACTIONS — PROJECT KUROGANE

## Priority
1. **Bundle split** — manualChunks to separate three/R3F ("world") from app shell;
   lazy-load HeroScene so text paints before WebGL.
2. **Per-division 3D accents** — a distinct restrained procedural motif per route
   (security lattice, intelligence point-field, continuity archive slab).
3. **Homepage depth** — realize sequences 5 & 7 as in-page scenes, not just index.
4. **Focus trap** in the divisions overlay; return focus to toggle on close.

## Craft polish
- Hero title/monolith composition: nudge overlay so display type clears the object.
- Custom cursor + hover telemetry flavor on precision pointers.
- Sound design (optional, muted-by-default; original tones only).
- Loading state / first-paint choreography.

## Autonomous protocol
Main-session cron re-enters this file each cycle, picks the top undone item,
implements, rebuilds, re-validates via headless Chrome, redeploys, and appends to
SESSION_LOG.md. Never claims a step done without a clean build + screenshot.
