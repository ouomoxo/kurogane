// Serves build/client at http://127.0.0.1:4180/kurogane/ — mirrors the GitHub
// Pages project-subpath layout, including the 404.html fallback behavior.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'

const ROOT = new URL('../build/site', import.meta.url).pathname
const BASE = '/kurogane'
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.txt': 'text/plain',
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  let p = decodeURIComponent(url.pathname)
  if (p === '/' || p === BASE) p = BASE + '/'
  if (!p.startsWith(BASE + '/')) { res.writeHead(302, { location: BASE + '/' }); return res.end() }
  let rel = normalize(p.slice(BASE.length + 1)).replace(/^(\.\.[/\\])+/, '')
  if (rel === '' || rel.endsWith('/')) rel += 'index.html'
  let file = join(ROOT, rel)
  try {
    let body
    try { body = await readFile(file) }
    catch { body = await readFile(join(ROOT, rel, 'index.html')); file = 'index.html' }
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    const nf = await readFile(join(ROOT, '404.html')).catch(() => 'Not found')
    res.writeHead(404, { 'content-type': 'text/html' })
    res.end(nf)
  }
}).listen(4180, () => console.log('preview: http://127.0.0.1:4180/kurogane/'))
