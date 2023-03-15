import path from 'path'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import { xpOutput, themeRoot } from '../utils'
import { copyFile, mkdir } from 'fs/promises'
// 当前文件夹的dist
const distFolder = path.resolve(themeRoot, 'dist')
// 根目录下的dist/x-plus/theme-chalk
const distBundle = path.resolve(xpOutput, 'theme-chalk')

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noXPrefixFile = /(index|base|display)/
  return src(path.resolve(themeRoot, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(
      rename(path => {
        if (!noXPrefixFile.test(path.basename)) {
          path.basename = `x-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

/**
 * Build dark Css Vars
 * @returns
 */

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */

export function copyThemeChalkSource() {
  return src(path.resolve(themeRoot, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}
export const copyFullStyle = async () => {
  await mkdir(path.resolve(xpOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(xpOutput, 'theme-chalk/index.css'),
    path.resolve(xpOutput, 'dist/index.css')
  )
}

export const build = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, copyThemeChalkBundle)
)
export const themeChalk = series(build, copyFullStyle)
