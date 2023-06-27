import { Directive, createApp, App } from 'vue'
import XLoading from './loading.vue'
import { useNamespace } from '@x-plus/hooks'
const INSTANCE_KEY = Symbol('XLoading')
const parentClass = useNamespace('loading').e('parent')
export interface LoadingParent extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: InstanceType<typeof XLoading>
    instanceApp: App
  }
}
const setLoading = (el: LoadingParent, isLoading: boolean) => {
  if (isLoading) {
    el.classList.add(parentClass)
    el[INSTANCE_KEY]?.instance.show()
    return
  }
  el.classList.remove(parentClass)
  el[INSTANCE_KEY]?.instance.hidden()
}
const createInstance = (el: LoadingParent) => {
  const LoadingApp = createApp(XLoading)
  const loadingInstance = LoadingApp.mount(
    document.createElement('div')
  ) as InstanceType<typeof XLoading>
  el[INSTANCE_KEY] = {
    instance: loadingInstance,
    instanceApp: LoadingApp
  }
  el.appendChild(loadingInstance.$el)
}
const vLoading: Directive<LoadingParent, boolean> = {
  mounted(el, binding) {
    createInstance(el)
    const isLoading = binding.value
    setLoading(el, isLoading)
  },
  updated(el, binding) {
    const isLoading = binding.value
    setLoading(el, isLoading)
  },
  beforeUnmount(el) {
    el[INSTANCE_KEY]?.instanceApp.unmount()
    delete el[INSTANCE_KEY]
  }
}

export default vLoading
