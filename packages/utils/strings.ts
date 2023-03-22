import { capitalize as toCapitalize } from '@vue/shared'
export {
  camelize,
  hyphenate,
  hyphenate as kebabCase // alias
} from '@vue/shared'

export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

export const capitalize = <T extends string>(str: T) =>
  toCapitalize(str) as Capitalize<T>
