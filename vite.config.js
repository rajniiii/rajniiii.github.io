import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If you deploy this as YOUR-USERNAME.github.io (a root user site), keep base as '/'.
// If you deploy this as a PROJECT page (e.g. github.com/YOUR-USERNAME/portfolio),
// change base to '/portfolio/' (matching your repo name exactly, with slashes).
export default defineConfig({
  base: '/',
  plugins: [react()],
})