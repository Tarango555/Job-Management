import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:8080', // Adjusted to backend port
        changeOrigin: true, // This helps with cross-origin issues
      }
    }
  }
})

