// Assembles the GitHub Pages deploy root at build/site:
// prerendered HTML tree (emitted under the basename) + hashed assets +
// 404.html (Pages fallback for unknown paths) + .nojekyll.
import { cp, mkdir, rm, writeFile, copyFile } from 'node:fs/promises'

const CLIENT = new URL('../build/client/', import.meta.url)
const SITE = new URL('../build/site/', import.meta.url)

await rm(SITE, { recursive: true, force: true })
await mkdir(SITE, { recursive: true })
await cp(new URL('kurogane/', CLIENT), SITE, { recursive: true })
await cp(new URL('assets/', CLIENT), new URL('assets/', SITE), { recursive: true })
await copyFile(new URL('404/index.html', SITE), new URL('404.html', SITE))
await writeFile(new URL('.nojekyll', SITE), '')
console.log('deploy root ready: build/site')
