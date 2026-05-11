import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // When deploying to GitHub Pages under a repository sub-path,
  // set `base` to the repo name so built asset URLs are correct.
  base: '/maowa.me/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
