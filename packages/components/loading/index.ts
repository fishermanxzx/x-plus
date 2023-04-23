import { vLoading } from './src/loading'
import type { App } from 'vue'
// installer and everything in all
const XLoading = {
  install(app: App) {
    app.directive('loading', vLoading)
  }
}

export default XLoading
export { XLoading, vLoading }
