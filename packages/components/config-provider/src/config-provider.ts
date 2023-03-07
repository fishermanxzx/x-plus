import { defaultConfig, mergeConfig } from '@x-plus/hooks'
import { defineComponent, renderSlot } from 'vue'

export default defineComponent({
  name: 'XConfigProvider',
  props: {
    namespace: {
      type: String,
      default: defaultConfig.namespace
    }
  },
  setup(props, { slots }) {
    mergeConfig(props)
    return () => renderSlot(slots, 'default')
  }
})
