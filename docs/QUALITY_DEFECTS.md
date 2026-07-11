# QUALITY_DEFECTS — open ledger (QC reset 2026-07-11)

| ID | Sev | Area | Summary | Evidence | Status |
|----|-----|------|---------|----------|--------|
| D1 | CRIT | Motion | Hero copy linear premature fade = double-exposure bug feel | loop-01/before/scroll-15.png → after/scroll-00/15.png | CANDIDATE (0dcbd69; Step F pending) |
| D2 | CRIT | Motion/AD | Temple exits viewport by 15%; 15–50% dead zone | loop-01/before/scroll-15/30/50.png → after/scroll-15/30/50.png | CANDIDATE (0dcbd69; Step F pending) |
| D3 | HIGH | Reference | Floating glyph + orphan red bar = hologram cliché | loop-01/before/desktop-2560-settled.png → after/desktop-2560-settled.png | CANDIDATE (0dcbd69; Step F pending) |
| D4 | HIGH | 3D | Uniform column rhythm; 2560 left-edge clip | loop-01/before+after/desktop-2560-settled.png | OPEN |
| D5 | HIGH | Reference | Creamy dais + salmon ring ≠ ceremonial lacquer floor | loop-01/before/scroll-15.png → after/scroll-00.png, after/desktop-2560-settled.png | CANDIDATE (0dcbd69; Step F pending) |
| D6 | MED | Frontend | Fallback undesigned; IN VIEW line lies without WebGL | loop-01/before/ix-webgl-fallback.png | OPEN |
| D7 | MED | 3D | Plasticky top specular; black undersides | loop-01/before/desktop-2560-settled.png | OPEN |
| D8 | MED | Comp | Keystone crowds nav at 1440 | loop-01/before/scroll-00.png | OPEN |
| D9 | LOW | Type | Three equal-weight mono lines, mushy hierarchy | loop-01/before/scroll-00.png | OPEN |
| D10 | LOW | IX | Nav overlay lacks clearance/classification flavor | loop-01/before/ix-navigation.png | OPEN |
