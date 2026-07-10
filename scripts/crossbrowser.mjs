// Cross-engine visual verification: screenshots every route in WebKit
// (Safari engine), Firefox, and system Chrome at desktop + mobile viewports
// against the local preview server. Mobile runs use full device emulation
// (isMobile/hasTouch/DPR) on WebKit (iOS Safari proxy) and Chrome (Android
// proxy); Firefox gets viewport-only since Playwright Firefox has no
// isMobile. Requires: npx playwright@1.49.1 install webkit firefox
// Usage: node scripts/crossbrowser.mjs [--engines=webkit,firefox,chrome]
import { mkdir } from 'node:fs/promises'
import * as playwright from 'playwright'

const BASE = 'http://127.0.0.1:4180/kurogane'
const OUT = 'artifacts/crossbrowser'
const ROUTES = [
  ['home', '/'],
  ['corporation', '/corporation/'],
  ['security', '/security/'],
  ['intelligence', '/intelligence/'],
  ['advanced-systems', '/advanced-systems/'],
  ['continuity', '/continuity/'],
  ['global-network', '/global-network/'],
  ['investors', '/investors/'],
  ['careers', '/careers/'],
  ['contact', '/contact/'],
  ['legal', '/legal/'],
]
const VIEWPORTS = [
  ['desktop', { viewport: { width: 1440, height: 900 } }],
  ['mobile', {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  }],
]

const engines = (process.argv.find(a => a.startsWith('--engines='))?.split('=')[1] ?? 'webkit,firefox,chrome').split(',')
await mkdir(OUT, { recursive: true })
const failures = []

for (const name of engines) {
  const engine = name === 'chrome' ? 'chromium' : name
  const browser = await playwright[engine].launch(name === 'chrome' ? { channel: 'chrome' } : {})
  for (const [vpName, ctxOpts] of VIEWPORTS) {
    // Playwright Firefox rejects isMobile; fall back to viewport-only there.
    const opts = engine === 'firefox' ? { viewport: ctxOpts.viewport } : ctxOpts
    const page = await browser.newPage(opts)
    const consoleErrors = []
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()) })
    page.on('pageerror', e => consoleErrors.push(String(e)))
    for (const [slug, path] of ROUTES) {
      consoleErrors.length = 0
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => ({ err: e }))
      if (res?.err || (res.status && res.status() >= 400)) {
        failures.push(`${name}/${vpName}/${slug}: nav failed ${res?.err ?? res.status()}`)
        continue
      }
      await page.waitForTimeout(2500) // let GSAP intros + lazy 3D settle
      await page.screenshot({ path: `${OUT}/${name}-${vpName}-${slug}.png` })
      if (consoleErrors.length) failures.push(`${name}/${vpName}/${slug}: ${consoleErrors.join(' | ')}`)
    }
    await page.close()
  }
  await browser.close()
  console.log(`${name}: done`)
}

if (failures.length) {
  console.error('FAILURES:\n' + failures.join('\n'))
  process.exit(1)
}
console.log('cross-browser pass clean: ' + engines.join(', '))
