import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: Number(process?.env?.APP_CLIENT_PORT || 3001),
  },
});
