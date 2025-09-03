import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
        '/api': 'http://localhost:3000' // Proxy API requests to the Express server: meaning requests to /api/* will be forwarded to http://localhost:3000/api/*
    }
  }
})
