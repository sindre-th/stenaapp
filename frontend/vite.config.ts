import react from "@vitejs/plugin-react"
import path from "path";
import {defineConfig} from "vite"
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";
// https://vite.dev/config/
export default defineConfig({
  base: '/stena/',
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@forms': path.resolve(__dirname, 'src/forms'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@svg': path.resolve(__dirname, 'src/svg'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
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
