import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

// Absolute base: prerendered nested routes (e.g. /security/index.html) need
// absolute asset URLs; the site is served from the /kurogane/ project subpath.
export default defineConfig({
  base: '/kurogane/',
  plugins: [reactRouter()],
  build: { target: 'es2020', chunkSizeWarningLimit: 1800 },
})
