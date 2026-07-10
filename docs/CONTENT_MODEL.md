# CONTENT_MODEL — PROJECT KUROGANE

All copy is centralized (no strings in scene/UI components).

## site.ts
`NAV` (9 divisions: path/label/jp/code) · `REGIONS` · `HERO` · `CLOSING` ·
`SEQUENCES` (homepage numbered arguments) · `FOOTER` (seal/established/disclaimer).

## pages.ts
One `PageData` per route. Shape:
```ts
interface PageData {
  code: string          // DIV-0X / LGL-00
  eyebrow, title, jp, lede, classification: string
  index?: { k: string; v: string }[]   // stat strip
  blocks: { label, title, body: string; note?: string }[]
}
```

## Voice rules
First-person-institutional ("We do not petition for stability. We manufacture
it."). Never markets, never explains, never apologizes. Japanese lines are
authentic and meaningful, not decorative. Numbers imply scale without claiming
precision the fiction can't support ("Classified", "Sealed", "By review").
