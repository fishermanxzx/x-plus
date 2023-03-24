import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import { docRoot, projRoot } from '../../../build/utils/path'
import type { Plugin } from 'vite'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>
const componentsMatch = /components\/.*\.md/
export function MarkdownTransform(): Plugin {
  return {
    name: 'x-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!componentsMatch.test(id)) return
      const componentId = path.basename(id, '.md')
      const append = `
      export default {
        setup(){
          const demos = import.meta.globEager('../examples/${componentId}/*.vue')
          console.log(demos)
          console.log(import.meta.glob('../examples/${componentId}/*.vue'))
          return {
             demos,
          }
        }
      }
      `
      return combineScriptSetup(code, append)
    }
  }
}

const combineScriptSetup = (code: string, append: string) =>
  `<script>
  ${append}
</script>\n
` + code
