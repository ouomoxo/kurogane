# NEXT_ACTIONS — PROJECT KUROGANE

## Priority (post-recovery)
0. ~~**Propagate the temple design language** to division scenes in ASSET_AUDIT
   order~~ DONE — colonnade (session 7), archive (session 8), network (session 9:
   ceramic command floor, sovereignty steles, core-red command seat, ember trunk
   lines, orbital ring). Every division scene now shares world/mats.ts. Next top
   undone work: craft polish below. Do NOT add new routes/sections.

1. ~~Bundle split~~ DONE (route-level splitting; HeroScene now also lazy).
2. ~~Per-division 3D accents~~ DONE — lattice / nodes / archive / network scenes.
3. ~~Homepage sequence depth~~ DONE — SEQ-01…09 complete (advanced systems,
   global network, governance band added).
4. ~~Focus trap~~ DONE (dialog semantics, Tab cycle, guarded focus return).
5. ~~Corporation & Advanced Systems visual concepts~~ DONE (colonnade + gimbal).
6. ~~Sound toggle~~ DONE (procedural Web Audio engine, muted by default, SND nav control).
7. ~~Cross-browser pass~~ DONE (session 10) — WebKit/Firefox/Chrome × desktop +
   device-emulated mobile (iOS proxy: WebKit isMobile+touch; Android proxy:
   Chrome isMobile+touch), 11 routes each via `scripts/crossbrowser.mjs`:
   zero console/page errors, screenshots inspected. True-device spot check on
   real iOS/Android hardware remains a nice-to-have (needs a phone).

## Craft polish
- ~~Hero title/monolith composition: nudge overlay so display type clears the
  object~~ DONE (session 11 — temple offset right + rescaled, title clamp
  reduced; validated 1440/1920/390).
- ~~Custom cursor + hover telemetry flavor on precision pointers~~ DONE
  (cursor session 3; telemetry tag session 12 — mono readout trailing the ring:
  `ACCESS ▸ /route` on links, `UPLINK ▸ host` external, `CTRL ▸ name` buttons,
  `data-cur` overrides on nav mark / divisions / SND with live LIVE/COLD state;
  right-edge flip; validated via scripts/shot-cursor.mjs).
- ~~Loading state / first-paint choreography~~ DONE (session 13 — staged
  arrival: nav drop + hero copy staggered rise via html.js-gated CSS
  animations running from the prerendered paint; WebGL temple crossfades in
  over a persistent fallback after its first frame instead of popping;
  no-JS stays fully visible, reduced-motion clamp collapses it; validated
  via scripts/shot-boot.mjs with 4x-slowed CDP playback).
- ~~Compact (390) hero: subtle scrim behind the paragraph where it crosses the
  bright dais~~ DONE (session 14 — `.hero__lede::before` radial scrim ≤719px,
  rides the boot-rise anim; validated 390/1440 before/after).

All craft-polish items are now done. Candidate next work (pick one per cycle,
smallest honest increment first):
- True-device spot check on real iOS/Android hardware (needs a phone — blocked
  on owner; skip until available).
- ~~Content pass: re-read all division copy for tone drift / repetition;
  tighten weakest paragraph~~ DONE (session 15 — Global Network / Night City
  block rewritten; rest judged consistent).
- Lighthouse audit (perf/a11y/SEO) on the live site; fix the top finding.

## Autonomous protocol
Main-session cron re-enters this file each cycle, picks the top undone item,
implements, rebuilds, re-validates via headless Chrome, redeploys, and appends to
SESSION_LOG.md. Never claims a step done without a clean build + screenshot.
