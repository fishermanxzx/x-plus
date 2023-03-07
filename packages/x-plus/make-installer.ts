import { App } from 'vue'
import type { Plugin } from 'vue'
export default {}
export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach(component => app.use(component))
  }
  return {
    install
  }
}
