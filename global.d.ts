// GlobalComponents for Volar
// For production
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XButton: typeof import('@yxkj/x-plus')['XButton']
    XConfigProvider: typeof import('@yxkj/x-plus')['XConfigProvider']
  }
}
export {}
