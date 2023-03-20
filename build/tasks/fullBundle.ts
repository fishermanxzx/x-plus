import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import Vue from '@vitejs/plugin-vue'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import glob from 'fast-glob'
import { camelCase, upperFirst } from 'lodash'
import {
  PKG_BRAND_NAME,
  PKG_CAMELCASE_LOCAL_NAME,
  PKG_CAMELCASE_NAME
} from '../utils/pkg'
import { xpOutput, xpRoot, localeRoot } from '../utils/path'
import { XPlusAlias } from '../plugins/x-plus-alias'
import {
  formatBundleFilename,
  generateExternal,
  withTaskName,
  writeBundles
} from '../utils'
import { target } from '../utils/build-info'
import type { Plugin } from 'rollup'
const banner = `/*! ${PKG_BRAND_NAME} */\n`
async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    XPlusAlias(),
    Vue({
      isProduction: true
    }) as Plugin,
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        '.vue': 'ts'
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      treeShaking: true,
      legalComments: 'eof'
    })
  ]
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true
      })
    )
  }

  const bundle = await rollup({
    input: path.resolve(xpRoot, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }),
    treeshake: true
  })
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        xpOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue'
      },
      sourcemap: minify,
      banner
    },
    {
      format: 'esm',
      file: path.resolve(
        xpOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner
    }
  ])
}

async function buildFullLocale(minify: boolean) {
  const files = await glob(`**/*.ts`, {
    cwd: path.resolve(localeRoot, 'lang'),
    absolute: true
  })
  return Promise.all(
    files.map(async file => {
      const filename = path.basename(file, '.ts')
      const name = upperFirst(camelCase(filename))
      const bundle = await rollup({
        input: file,
        plugins: [
          esbuild({
            minify,
            sourceMap: minify,
            target
          })
        ]
      })
      await writeBundles(bundle, [
        {
          format: 'umd',
          file: path.resolve(
            xpOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'js')
          ),
          exports: 'default',
          name: `${PKG_CAMELCASE_LOCAL_NAME}${name}`,
          sourcemap: minify,
          banner
        },
        {
          format: 'esm',
          file: path.resolve(
            xpOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'mjs')
          ),
          sourcemap: minify,
          banner
        }
      ])
    })
  )
}

export const buildFull = (minify: boolean) => async () =>
  Promise.all([buildFullEntry(minify), buildFullLocale(minify)])

export const fullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
