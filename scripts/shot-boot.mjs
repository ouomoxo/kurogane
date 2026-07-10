// First-paint choreography check: captures the hero boot sequence mid-stagger
// and settled, plus the canvas crossfade. Usage: node scripts/shot-boot.mjs [baseURL]
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'

const BASE = process.argv[2] ?? 'http://127.0.0.1:4180/kurogane'
const OUT = 'artifacts/boot'

await mkdir(OUT, { recursive: true })
const browser = await playwright.chromium.launch({ channel: 'chrome' })
const errors = []

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

// Slow the animations 4x via CDP so fixed-delay screenshots land inside the
// stagger deterministically instead of racing real time.
const cdp = await page.context().newCDPSession(page)
await cdp.send('Animation.enable')
await cdp.send('Animation.setPlaybackRate', { playbackRate: 0.25 })

await page.goto(BASE + '/', { waitUntil: 'commit', timeout: 30000 })
await page.waitForTimeout(1600) // ≈0.4s real time — title entering, lede still hidden
await page.screenshot({ path: `${OUT}/boot-early.png` })
await page.waitForTimeout(3200) // ≈1.2s — meta arriving, scene crossfading
await page.screenshot({ path: `${OUT}/boot-mid.png` })
await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 })
await page.waitForTimeout(5000) // fully settled, temple live
await page.screenshot({ path: `${OUT}/boot-settled.png` })
const live = await page.locator('.hero__scene--live').count()
await page.close()

// Compact settled state
const m = await browser.newPage({ viewport: { width: 390, height: 844 } })
m.on('pageerror', (e) => errors.push(String(e)))
await m.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 })
await m.waitForTimeout(5000)
await m.screenshot({ path: `${OUT}/boot-390.png` })
await m.close()

await browser.close()
console.log(`scene live: ${live === 1 ? 'yes' : 'NO'}; errors: ${errors.length}`)
errors.forEach((e) => console.log('ERR ' + e))
if (live !== 1 || errors.length) process.exit(1)
console.log('done: ' + OUT)
