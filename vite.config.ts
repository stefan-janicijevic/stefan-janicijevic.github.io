import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  // 98.css ships a `@media (not(hover))` rule that lightningcss's stricter
  // parser rejects during minification, and this Vite version has no bundled
  // esbuild fallback, so CSS minification is disabled entirely.
  build: {
    cssMinify: false,
  },
})
