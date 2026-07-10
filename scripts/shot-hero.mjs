// One-off hero composition check: screenshots / at a few viewports against
// a running server. Usage: node scripts/shot-hero.mjs [baseURL] [tag]
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'

const BASE = process.argv[2] ?? 'http://127.0.0.1:4180/kurogane'
const TAG = process.argv[3] ?? 'iter'
const OUT = 'artifacts/hero-comp'
const VIEWPORTS = [
  ['1440', { width: 1440, height: 900 }],
  ['1920', { width: 1920, height: 1080 }],
  ['390', { width: 390, height: 844 }],
]

await mkdir(OUT, { recursive: true })
const browser = await playwright.chromium.launch({ channel: 'chrome' })
for (const [name, viewport] of VIEWPORTS) {
  const page = await browser.newPage({ viewport })
  await page.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 })
  await page.waitForTimeout(4000)
  await page.screenshot({ path: `${OUT}/${TAG}-${name}.png` })
  await page.close()
}
await browser.close()
console.log('done: ' + OUT)
