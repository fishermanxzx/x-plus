import { series } from 'gulp'
import { withTaskName, run, runBuildTask } from './utils'
export default series(
  withTaskName('clean', async () => run('pnpm run clean')),
  runBuildTask('themeChalk'),
  runBuildTask('modules'),
  runBuildTask('fullBundle'),
  runBuildTask('typesDefinitions')
)
export * from './tasks'
