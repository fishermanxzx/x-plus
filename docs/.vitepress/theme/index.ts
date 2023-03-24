import DefaultTheme from 'vitepress/theme'
import XPlus from '@yxkj/x-plus'
import Demo from '../components/Demo.vue'
import '@x-plus/theme-chalk/src/index.scss'
import '../styles/app.scss'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(XPlus)
    app.component('Demo', Demo)
  }
}
