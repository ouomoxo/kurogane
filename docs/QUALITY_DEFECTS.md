# QUALITY_DEFECTS — open ledger (QC reset 2026-07-11)

| ID | Sev | Area | Summary | Evidence | Status |
|----|-----|------|---------|----------|--------|
| D1 | CRIT | Motion | Hero copy linear premature fade = double-exposure bug feel | loop-01/stepf/sweep-05..42 (no ghost state at 10 intermediate points) | VERIFIED-RESOLVED (0dcbd69; Step F 2026-07-11) |
| D2 | CRIT | Motion/AD | Temple exits viewport by 15%; 15–50% dead zone | loop-01/stepf/sweep-05..42 + after/mobile-390-scroll50 (stack pinned throughout) | VERIFIED-RESOLVED (0dcbd69; Step F 2026-07-11) |
| D3 | HIGH | Reference | Floating glyph + orphan red bar = hologram cliché | loop-01/after/desktop-2560-settled, after/scroll-00 (bar absent, glyph anchored) | VERIFIED-RESOLVED (0dcbd69; Step F 2026-07-11) |
| D4 | HIGH | 3D | Uniform column rhythm; 2560 left-edge clip | loop-01/before+after/desktop-2560-settled.png | OPEN |
| D5 | HIGH | Reference | Creamy dais + salmon ring ≠ ceremonial lacquer floor | loop-01/after/scroll-00 + desktop-2560-settled (black lacquer, red ring) | VERIFIED-RESOLVED (0dcbd69; Step F 2026-07-11) |
| D6 | MED | Frontend | Fallback undesigned; IN VIEW line lies without WebGL | loop-01/before/ix-webgl-fallback.png | OBSOLETE (D-014: homepage is native DOM/SVG) |
| D7 | MED | 3D | Plasticky top specular; black undersides | loop-01/after/desktop-2560-settled.png (confirmed in Step F) | OPEN |
| D8 | MED | Comp | Keystone crowds nav at 1440 | loop-01/before/scroll-00.png | OPEN |
| D9 | LOW | Type | Three equal-weight mono lines, mushy hierarchy | loop-01/before/scroll-00.png | OPEN |
| D10 | LOW | IX | Nav overlay lacks clearance/classification flavor | loop-01/before/ix-navigation.png | OPEN |
| D11 | HIGH | Comp/Responsive | Mobile 390: copy/3D collision | loop-01/after/mobile-390-settled.png | RESOLVED-BY-PIVOT (D-014: seal recomposes cleanly; re-verify in next loop) |
