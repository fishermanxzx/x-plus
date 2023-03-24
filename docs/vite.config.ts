import { defineConfig } from 'vite'
import { resolve } from 'path'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'
export default defineConfig({
  resolve: {
    alias: {
      '@yxkj/x-plus': `${resolve(__dirname, '../packages/x-plus/index.ts')}`
    }
  },
  plugins: [MarkdownTransform()]
})
