import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: '/stena/',
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  },
  server: {
    open: true,
    port: 3000
  },
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
