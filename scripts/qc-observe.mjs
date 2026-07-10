// QC LOOP STEP A — OBSERVE. Captures the required viewport/scroll/interaction
// matrix from the DEPLOYED site into artifacts/review/<loop>/<stage>/.
// Usage: node scripts/qc-observe.mjs <loopDir> <stage> [baseURL]
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'

const [, , LOOP = 'loop-01', STAGE = 'before', BASE = 'https://ouomoxo.github.io/kurogane'] = process.argv
const OUT = `artifacts/review/${LOOP}/${STAGE}`
await mkdir(OUT, { recursive: true })
await mkdir(`artifacts/review/${LOOP}/recording`, { recursive: true })
const browser = await playwright.chromium.launch({ channel: 'chrome' })
const errors = []
const netfail = []

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

// ── Desktop viewports at rest ──
for (const [w, h] of [[2560, 1440], [1920, 1080]]) {
  const p = await browser.newPage({ viewport: { width: w, height: h } })
  p.on('pageerror', (e) => errors.push(`${w}: ${e}`))
  await p.addInitScript(() => sessionStorage.setItem('kuro-gate', '1'))
  await p.goto(BASE + '/', { waitUntil: 'load' })
  await p.waitForTimeout(6000)
  await shot(p, `desktop-${w}-settled`)
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.12))
  await p.waitForTimeout(1200)
  await shot(p, `desktop-${w}-scroll`)
  await p.close()
}

// ── 1440×900: full scroll-state series + interaction states + video ──
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: `artifacts/review/${LOOP}/recording`, size: { width: 1440, height: 900 } },
})
const page = await ctx.newPage()
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('requestfailed', (r) => netfail.push(r.url()))
await page.goto(BASE + '/', { waitUntil: 'commit' })
await page.waitForTimeout(1000)
await shot(page, 'ix-access-gate')            // initial access state
await page.waitForTimeout(1400)
await shot(page, 'ix-auth-activation')        // gate opening / ignition beginning
await page.waitForTimeout(4500)
await shot(page, 'scroll-00')                 // ignited hero, settled
const H = await page.evaluate(() => window.innerHeight)
for (const pct of [15, 30, 50]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), (H * 1.6 * pct) / 100 * 2)
  await page.waitForTimeout(1300)
  await shot(page, `scroll-${pct}`)
}
// first major transition (copy yielded, camera pushed) & first system reveal (Record 001)
await page.evaluate((h) => window.scrollTo({ top: h * 0.75, behavior: 'instant' }), H)
await page.waitForTimeout(1300)
await shot(page, 'state-transition')
await page.evaluate((h) => window.scrollTo({ top: h * 1.15, behavior: 'instant' }), H)
await page.waitForTimeout(1300)
await shot(page, 'state-reveal')
// navigation state (divisions overlay)
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(600)
await page.click('button.nav__toggle')
await page.waitForTimeout(900)
await shot(page, 'ix-navigation')
await page.close()
await ctx.close()

// ── Mobile ──
for (const [w, h] of [[430, 932], [390, 844]]) {
  const p = await browser.newPage({ viewport: { width: w, height: h } })
  p.on('pageerror', (e) => errors.push(`m${w}: ${e}`))
  await p.addInitScript(() => sessionStorage.setItem('kuro-gate', '1'))
  await p.goto(BASE + '/', { waitUntil: 'load' })
  await p.waitForTimeout(6000)
  await shot(p, `mobile-${w}-settled`)
  await p.evaluate(() => window.scrollTo(0, window.innerHeight * 0.8))
  await p.waitForTimeout(1200)
  await shot(p, `mobile-${w}-scroll50`)
  await p.close()
}

// ── Reduced motion ──
const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const rp = await rm.newPage()
rp.on('pageerror', (e) => errors.push('rm: ' + e))
await rp.goto(BASE + '/', { waitUntil: 'load' })
await rp.waitForTimeout(4000)
await rp.screenshot({ path: `${OUT}/ix-reduced-motion.png` })
await rm.close()

// ── WebGL fallback ──
const nogl = await playwright.chromium.launch({ channel: 'chrome', args: ['--disable-3d-apis'] })
const np = await nogl.newPage({ viewport: { width: 1440, height: 900 } })
np.on('pageerror', (e) => errors.push('nogl: ' + e))
await np.addInitScript(() => sessionStorage.setItem('kuro-gate', '1'))
await np.goto(BASE + '/', { waitUntil: 'load' })
await np.waitForTimeout(3500)
await np.screenshot({ path: `${OUT}/ix-webgl-fallback.png` })
await nogl.close()

await browser.close()
console.log(`captures done → ${OUT}; pageerrors:${errors.length} netfail:${netfail.length}`)
errors.slice(0, 5).forEach((e) => console.log('ERR', e))
netfail.slice(0, 5).forEach((u) => console.log('NETFAIL', u))
