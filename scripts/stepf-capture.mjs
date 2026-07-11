// Step F evidence capture: fine-grained scroll sweep on deployed site (1440x900)
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'
const BASE = 'https://ouomoxo.github.io/kurogane'
const OUT = 'artifacts/review/loop-01/stepf'
await mkdir(OUT, { recursive: true })
const browser = await playwright.chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
await page.addInitScript(() => sessionStorage.setItem('kuro-gate', '1'))
await page.goto(BASE + '/', { waitUntil: 'load' })
await page.waitForTimeout(6000)
const H = await page.evaluate(() => window.innerHeight)
// same scroll basis as qc-observe: y = H*1.6*pct/100*2
for (const pct of [5, 8, 10, 12, 14, 18, 22, 26, 35, 42]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), (H * 1.6 * pct) / 100 * 2)
  await page.waitForTimeout(1300)
  await page.screenshot({ path: `${OUT}/sweep-${String(pct).padStart(2,'0')}.png` })
}
console.log('pageerrors:', errors.length, errors.slice(0,3))
await browser.close()
