import {fileURLToPath, URL} from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        watch: {
            usePolling: true,
            interval: 100,
        },
        hmr: {
            host: '0.0.0.0',
        },
        allowedHosts: ['loanapp.test', 'localhost'],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
