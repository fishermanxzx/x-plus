import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@x-plus/x-plus': `${resolve(__dirname, '../packages/x-plus')}`
    }
  }
})
