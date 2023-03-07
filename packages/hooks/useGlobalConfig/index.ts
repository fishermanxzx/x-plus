const defaultNamespace = 'x'
const defaultConfig = {
  namespace: defaultNamespace
}
type Config = typeof defaultConfig
type ConfigProps = keyof typeof defaultConfig
const useGlobalConfig = (prop: ConfigProps) => {
  return defaultConfig[prop]
}
const mergeConfig = (newConfig: Config) => {
  Object.assign(defaultConfig, newConfig)
}
export { useGlobalConfig, defaultConfig, mergeConfig }
