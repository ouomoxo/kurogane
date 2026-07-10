// RESET slice verification: gate frame, ignited hero, 25%/50% scroll states,
// compact hero. Usage: node scripts/shot-reset.mjs [baseURL]
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'

const BASE = process.argv[2] ?? 'http://127.0.0.1:4180/kurogane'
const OUT = 'artifacts/reset'
await mkdir(OUT, { recursive: true })
const browser = await playwright.chromium.launch({ channel: 'chrome' })
const errors = []

// 1. Gate (fresh tab = fresh sessionStorage)
const g = await browser.newPage({ viewport: { width: 1440, height: 900 } })
g.on('pageerror', (e) => errors.push(String(e)))
g.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
await g.goto(BASE + '/', { waitUntil: 'commit' })
await g.waitForTimeout(1100) // mid-readout
await g.screenshot({ path: `${OUT}/1-gate.png` })
// 2. Ignited hero, settled
await g.waitForTimeout(4600)
await g.screenshot({ path: `${OUT}/2-hero.png` })
// 3. 25% of the arc — strata opening, copy yielding
await g.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.45, behavior: 'instant' }))
await g.waitForTimeout(1400)
await g.screenshot({ path: `${OUT}/3-scroll25.png` })
// 4. 50%+ — archive open, camera pushed in, first record arriving
await g.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'instant' }))
await g.waitForTimeout(1400)
await g.screenshot({ path: `${OUT}/4-scroll50.png` })
const live = await g.locator('.hero__scene--live').count()
await g.close()

// 5. Compact hero (fresh tab → gate skipped fast for capture: pre-seed storage)
const m = await browser.newPage({ viewport: { width: 390, height: 844 } })
m.on('pageerror', (e) => errors.push(String(e)))
await m.addInitScript(() => sessionStorage.setItem('kuro-gate', '1'))
await m.goto(BASE + '/', { waitUntil: 'load' })
await m.waitForTimeout(5000)
await m.screenshot({ path: `${OUT}/5-mobile.png` })
await m.close()

await browser.close()
console.log(`live:${live === 1 ? 'yes' : 'NO'} errors:${errors.length}`)
errors.forEach((e) => console.log('ERR ' + e))
if (live !== 1 || errors.length) process.exit(1)
