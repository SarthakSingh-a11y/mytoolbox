import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vercel serves this directory (see vercel.json). Keep in sync.
    outDir: 'dist',
  },
})
