import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Asegúrate de importar desde aquí

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Y usar el plugin aquí
  ],
})