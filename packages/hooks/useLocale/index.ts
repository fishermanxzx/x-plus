import { Language, TranslatePair } from '@x-plus/locale'
import { useGlobalConfig } from '../useGlobalConfig'
import { get } from 'lodash-unified'
export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export const buildTranslator =
  (locale: Language): Translator =>
  (path, option) =>
    translate(path, option, locale.x)

export const translate = (
  path: string,
  option: undefined | TranslatorOption,
  locale: TranslatePair
): string =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  )

const useLocale = () => {
  const locale = useGlobalConfig('locale')
  return {
    t: buildTranslator(locale),
    lang: locale.name
  }
}
export { useLocale }
