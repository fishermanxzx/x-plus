// GlobalComponents for Volar
// For production
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XButton: typeof import('x-plus')['XButton']
    XConfigProvider: typeof import('x-plus')['XConfigProvider']
  }
}
export {}
