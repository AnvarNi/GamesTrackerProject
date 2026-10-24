import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            '/api': process.env.SERVER_URL || 'http://localhost:4200'
        }
    }
})