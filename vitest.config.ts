import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],

  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'c8' // or 'istanbul'
    }
  }
})
