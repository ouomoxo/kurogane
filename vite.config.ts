import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base: the production build must run from a project subpath
// (GitHub Pages /project-kurogane/) or any static host without rewrites.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2020', chunkSizeWarningLimit: 1800 },
})
