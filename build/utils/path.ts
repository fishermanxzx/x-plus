import { resolve } from 'path'
export const projRoot = resolve(__dirname, '..', '..')
export const buildRoot = resolve(projRoot, 'build')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const xpRoot = resolve(pkgRoot, 'x-plus')
export const utilRoot = resolve(pkgRoot, 'utils')
// 根目录的dist
export const buildOutput = resolve(projRoot, 'dist')
export const xpOutput = resolve(buildOutput, 'x-plus')
export const xpPackage = resolve(xpRoot, 'package.json')
