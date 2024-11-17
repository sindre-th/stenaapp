import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/stena/',
  server: {
    open: true,
    port: 3000
  },
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
