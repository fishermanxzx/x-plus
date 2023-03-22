import { get, set } from 'lodash-unified'
import type { Arrayable } from './typescript'
import type { Entries } from 'type-fest'
export const keysOf = <T extends object>(arr: T) =>
  Object.keys(arr) as Array<keyof T>
export const entriesOf = <T extends object>(arr: T) =>
  Object.entries(arr) as Entries<T>
export { hasOwn } from '@vue/shared'
export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    set value(val: any) {
      set(obj, path, val)
    }
  }
}
