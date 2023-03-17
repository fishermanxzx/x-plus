// For this project development
import '@vue/runtime-core'
declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    XButton: typeof import('../packages/x-plus')['XButton']
    XConfigProvider: typeof import('../packages/x-plus')['XConfigProvider']
  }
}
