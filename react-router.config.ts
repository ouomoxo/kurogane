import type { Config } from '@react-router/dev/config'

// SPA mode (no server runtime) + build-time prerendering: every fixed route
// ships as its own index.html, so direct access / refresh on GitHub Pages works
// without hash URLs or rewrite rules. Decision D-008.
export default {
  appDirectory: 'src',
  ssr: false,
  basename: '/kurogane/',
  prerender: [
    '/',
    '/corporation',
    '/security',
    '/intelligence',
    '/advanced-systems',
    '/continuity',
    '/global-network',
    '/investors',
    '/careers',
    '/contact',
    '/legal',
    '/404',
  ],
} satisfies Config
