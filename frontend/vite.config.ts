import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path";
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";
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
  plugins: [react(), eslintPlugin()],
  build: {
    outDir: 'dist'
  }
});
