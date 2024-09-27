import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js'
  },
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  resolve: {
    alias: {
      '@components': '/src/Components',
      '@pages': '/src/Pages',
      '@hooks': '/src/hooks',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@contexts': '/src/contexts',
    }
  },
  esbuild: {
    loader: 'jsx' // Asigna directamente 'jsx' como el loader para todos los archivos.
  },
  base: '',
})
