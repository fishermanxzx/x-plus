import { rollup } from 'rollup'
import Vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { xpRoot, excludeFiles, pkgRoot } from '../utils'
import { generateExternal, writeBundles } from '../utils'
import { XPlusAlias } from '../plugins/x-plus-alias'
import { buildConfigEntries, target } from '../utils'

import type { OutputOptions } from 'rollup'

export const modules = async () => {
  const input = excludeFiles(
    await glob('**/*.{ts,vue}', {
      cwd: pkgRoot,
      absolute: true, //绝对路径
      onlyFiles: true
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      XPlusAlias(),
      Vue({
        isProduction: false
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts'
        }
      })
    ],
    external: await generateExternal({ full: false }),
    treeshake: false
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: xpRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}
