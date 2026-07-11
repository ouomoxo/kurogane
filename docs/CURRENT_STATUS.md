# CURRENT_STATUS — verified facts only (2026-07-11, after Loop-01 Step E)

## Program
- Governing docs: RECOVERY_PLAN.md (phases) + QUALITY_DEFECTS.md (ledger) +
  ARASAKA_REFERENCE_MATRIX.md. Loop protocol per owner QC directive.
- **Current loop: 01.** Steps A–E done. Step D implemented in commit 0dcbd69
  (D2 pinned hero choreography, D1 threshold yield, D5 dais inversion, D3
  anchored glyph), pushed, "Deploy & verify Pages" green (2026-07-11 00:02 UTC).
  Step E re-rendered the same frame matrix from the deployed site
  (artifacts/review/loop-01/after/ + comparison/ + verification.md).
- **Steps F (adversarial review) and G (decision) NOT executed.** Loop-01
  decision therefore remains **REJECTED** (Step C) until F/G re-decide.
- Loops completed (full A–G with before/after): **0 of minimum 5.**
- Hall-refactor reconciliation: done — d526c41 committed; working tree clean.

## Multi-dimensional status
| Dimension | Status | Evidence |
|---|---|---|
| Architecture (RR7 prerender, CI verify) | VERIFIED | .github/workflows/deploy.yml runs; live routes 200 w/ SHA check |
| Route coverage | VERIFIED (scope frozen) | CI verify job logs |
| Content maturity | CANDIDATE | copy passes read, no independent review |
| Visual design maturity | REJECTED (D1/D2/D3/D5 now CANDIDATE) | loop-01/comparison/COMPARISON.md |
| Arasaka reference fidelity | IN_PROGRESS | R1–R8; D3/D5 CANDIDATE, D4 open |
| 3D asset maturity | CANDIDATE | hall staging live; D4/D7 open |
| Material/lighting maturity | CANDIDATE | D5 CANDIDATE; D7 open |
| Motion maturity | REJECTED (D1/D2 now CANDIDATE) | loop-01/verification.md |
| Responsive maturity | CANDIDATE | after-frames captured, not yet reviewed; D8 open |
| Performance maturity | CANDIDATE | Lighthouse desktop 0.97 (sess.18, pre-reset build); re-measure after loops |
| Accessibility maturity | CANDIDATE | a11y 1.0 (sess.16, pre-reset build); reduced-motion after-frame captured, unreviewed |

## Unresolved critical defects
D1, D2 — implemented (0dcbd69), frame evidence positive, **UNVERIFIED** until
Step F. See QUALITY_DEFECTS.md.

## Next mandatory action
**Loop-01 Step F: adversarial review** — fresh pass attempting to REJECT using
only rendered results (after/ frames, recording/, mobile 390/430,
reduced-motion, webgl-fallback) + reference fidelity (ARASAKA_REFERENCE_MATRIX).
Then Step G decision. Only Step F evidence may move statuses to VERIFIED.
