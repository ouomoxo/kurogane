// P1 direction matrix: for each direction (a/b/c) capture desktop hero,
// 25% scroll, 50% scroll, mid-ignition transition frame, and mobile hero —
// 15 frames, all staged in the shared hall.
// Usage: node scripts/shot-proto.mjs [baseURL]
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'

const BASE = process.argv[2] ?? 'http://127.0.0.1:4180/kurogane'
const OUT = 'artifacts/p1/matrix'
await mkdir(OUT, { recursive: true })
const browser = await playwright.chromium.launch({ channel: 'chrome' })
const errors = []

function wire(p) {
  p.on('pageerror', (e) => errors.push(String(e)))
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
}

for (const v of ['a', 'b', 'c']) {
  // desktop: transition (mid-ignition) then settled hero on the same load
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  wire(d)
  await d.goto(`${BASE}/proto?v=${v}&f=0`, { waitUntil: 'load' })
  await d.waitForTimeout(1500) // lazy chunk + ignition under way
  await d.screenshot({ path: `${OUT}/${v}-4-transition.png` })
  await d.waitForTimeout(3500) // sweep complete, settled
  await d.screenshot({ path: `${OUT}/${v}-1-hero.png` })
  for (const [f, name] of [[0.25, '2-scroll25'], [0.5, '3-scroll50']]) {
    await d.goto(`${BASE}/proto?v=${v}&f=${f}`, { waitUntil: 'load' })
    await d.waitForTimeout(4500)
    await d.screenshot({ path: `${OUT}/${v}-${name}.png` })
  }
  await d.close()

  // mobile hero
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } })
  wire(m)
  await m.goto(`${BASE}/proto?v=${v}&f=0`, { waitUntil: 'load' })
  await m.waitForTimeout(5000)
  await m.screenshot({ path: `${OUT}/${v}-5-mobile.png` })
  await m.close()
}

await browser.close()
console.log(`errors:${errors.length}`)
errors.forEach((e) => console.log('ERR ' + e))
if (errors.length) process.exit(1)
