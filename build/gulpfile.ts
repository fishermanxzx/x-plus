import { parallel, series } from 'gulp'
import type { TaskFunction } from 'gulp'
import {
  withTaskName,
  run,
  runBuildTask,
  xpPackage,
  xpOutput,
  projRoot,
  buildOutput,
  buildConfig,
  Module
} from './utils'
import { copyFile } from 'fs/promises'
import { copy } from 'fs-extra'
import path from 'path'
export const copyFiles = () =>
  Promise.all([
    copyFile(xpPackage, path.join(xpOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(xpOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(xpOutput, 'global.d.ts')
    )
  ])

export const copyTypesDefinitions: TaskFunction = done => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path)
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export default series(
  withTaskName('clean', async () => run('pnpm run clean')),
  parallel(
    runBuildTask('themeChalk'),
    runBuildTask('modules'),
    runBuildTask('fullBundle'),
    runBuildTask('typesDefinitions')
  ),
  parallel(copyTypesDefinitions, copyFiles)
)
export * from './tasks'
