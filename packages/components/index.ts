export * from './button'
export * from './config-provider'
declare module 'vue' {
  export interface GlobalComponents {
    XButton: typeof import('./button/index')['XButton']
    XConfigProvider: typeof import('./config-provider/index')['XConfigProvider']
  }
}
