import { getPackageDependencies } from './pkg'
import { xpPackage } from './path'
import type { OutputOptions, RollupBuild } from 'rollup'

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(xpPackage)
  return (id: string) => {
    const fullDeps = !options.full ? ['@vue', ...dependencies] : []
    const packages = [...fullDeps, ...peerDependencies]
    return [...new Set(packages)].some(
      pkg => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
