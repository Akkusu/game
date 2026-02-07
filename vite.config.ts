import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    // Para GitHub Pages: base debe ser '/nombre-repo/'. El workflow define VITE_BASE_PATH.
    base: process.env.VITE_BASE_PATH ?? '/',
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
