import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    XButton: typeof import('../packages/x-plus')['XButton']
    XConfigProvider: typeof import('../packages/x-plus')['XConfigProvider']
  }
}
