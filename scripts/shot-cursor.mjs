// Validate the precision-cursor telemetry tag against the preview server.
// Hovers a set of interactives and captures a screenshot for each state.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://127.0.0.1:4180/kurogane/'
const OUT = 'artifacts/cursor'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })

await page.goto(BASE, { waitUntil: 'networkidle' })

const targets = [
  { name: 'nav-mark', sel: '.nav__mark' },
  { name: 'divisions-toggle', sel: '.nav__toggle' },
  { name: 'snd-toggle', sel: '.snd' },
  { name: 'seq-link', sel: 'main a[href]' },
]
for (const t of targets) {
  const el = page.locator(t.sel).first()
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(700) // let scroll reveals settle before measuring
  const box = await el.boundingBox()
  if (!box) { errors.push(`no box for ${t.sel}`); continue }
  // approach in two moves so the damped ring/tag settle on target
  await page.mouse.move(box.x - 60, box.y + box.height + 60)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 })
  await page.waitForTimeout(600)
  const tag = await page.evaluate(() => document.querySelector('.cur-tag')?.textContent ?? '')
  console.log(`${t.name}: tag="${tag}"`)
  await page.screenshot({ path: `${OUT}/${t.name}.png`, clip: { x: Math.max(0, box.x - 120), y: Math.max(0, box.y - 80), width: 480, height: 240 } })
}

// SND click refresh: label must flip COLD -> LIVE
const snd = page.locator('.snd').first()
await snd.click()
await page.waitForTimeout(300)
console.log(`snd-after-click: tag="${await page.evaluate(() => document.querySelector('.cur-tag')?.textContent ?? '')}"`)

// right-edge flip check on the divisions toggle (near viewport edge)
await page.screenshot({ path: `${OUT}/full-home.png`, fullPage: false })

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'no console/page errors')
await browser.close()
process.exit(errors.length ? 1 : 0)
