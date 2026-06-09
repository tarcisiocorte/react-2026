import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      data: fileURLToPath(new URL('./src/data', import.meta.url)),
      domain: fileURLToPath(new URL('./src/domain', import.meta.url))
    }
  }
})
