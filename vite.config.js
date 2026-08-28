import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración general de Vite para la aplicación React

export default defineConfig({
  plugins: [react()],
  // Configuración del servidor de desarrollo local
  server: {
    port: 3000,
    open: true
  },
  // Configuración del servidor de producción y despliegue (Railway / Cloud)
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    allowedHosts: true
  }
});
