import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // Importa el adaptador
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'server', // O 'hybrid' si algunas páginas son estáticas
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Cancionero Letras y Acordes',
          short_name: 'Cancionero',
          description: 'Tu colección personal de letras y acordes.',
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/icono.svg',
              sizes: '192x192', // SVG scales, but providing a size is good practice for manifest validation in some tools
              type: 'image/svg+xml'
            },
            {
              src: '/icono.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        },
        workbox: {
          navigateFallback: '/404',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
        },
        devOptions: {
          enabled: true,
          navigateFallbackAllowlist: [/^\/$/],
          type: 'module',
        },
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
});

