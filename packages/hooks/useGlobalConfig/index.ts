import { Language, zhCn } from '@x-plus/locale'
const defaultNamespace = 'x'
const config = {
  namespace: defaultNamespace,
  locale: zhCn as Language
}
type Config = typeof config
type ConfigProps = keyof typeof config
const useGlobalConfig = <T extends ConfigProps>(prop: T): Config[T] => {
  return config[prop]
}
const mergeConfig = (newConfig: Config) => {
  Object.assign(config, newConfig)
}
export { useGlobalConfig, config, mergeConfig }
