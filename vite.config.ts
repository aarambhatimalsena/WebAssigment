import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port you want the development server to listen on
    host: '0.0.0.0', // Expose the server to the network
    strictPort: true, // Ensure the server fails if the port is already in use
    proxy: {
      // Example proxy configuration
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
