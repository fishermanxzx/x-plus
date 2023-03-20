import type { ProjectManifest } from '@pnpm/types'
export const PKG_PREFIX = '@x-plus'
export const PKG_NAME = '@yxkj/x-plus'
export const PKG_CAMELCASE_NAME = 'XPlus'
export const PKG_CAMELCASE_LOCAL_NAME = 'XPlusLocale'
export const PKG_BRAND_NAME = 'X Plus'
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}
