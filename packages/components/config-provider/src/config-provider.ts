import { config, mergeConfig } from '@x-plus/hooks'
import { defineComponent, renderSlot } from 'vue'
import type { PropType } from 'vue'
import type { Language } from '@x-plus/locale'
export default defineComponent({
  name: 'XConfigProvider',
  props: {
    namespace: {
      type: String,
      default: config.namespace
    },
    locale: {
      type: Object as PropType<Language>,
      default: config.locale
    }
  },
  setup(props, { slots }) {
    mergeConfig(props)
    return () => renderSlot(slots, 'default')
  }
})
