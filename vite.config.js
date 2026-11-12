import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /boxcars-car-dealer/ — the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
