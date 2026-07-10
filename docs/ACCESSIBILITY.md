# ACCESSIBILITY — PROJECT KUROGANE

- **Reduced motion** fully honored: global transition collapse + reveals shown at
  rest + quieted 3D idle animation.
- **Keyboard**: divisions overlay closes on Escape; visible focus ring
  (`1px solid --red`, 3px offset) on all interactive elements.
- **Contrast**: body text `--white-dim #cfcdc6` on `#050505` ≈ 13:1; hero copy sits
  above a legibility scrim gradient so it never fights the 3D behind it.
- **Semantics**: one `<h1>` per view, `<nav>`/`<header>`/`<footer>`/`<main>`
  landmarks, `aria-hidden` on decorative glyphs, `aria-expanded` on the menu toggle.
- **No-WebGL / no-JS**: CSS gradient fallback for the hero stage; `<noscript>`
  message in index.html.
- **Motion safety**: no strobing; the only loop is a slow (2.4s) scroll cue.

## Known gaps (tracked)
- Overlay menu could trap focus while open (currently Escape + click only).
- Stat figures use symbolic values (e.g. `10¹⁴`) — decorative, not read as data.
