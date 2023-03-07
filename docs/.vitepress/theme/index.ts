import DefaultTheme from 'vitepress/theme'
import XPlus from '../../../packages/x-plus/index'
import '@x-plus/theme-chalk/src/index.scss'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(XPlus)
  }
}
