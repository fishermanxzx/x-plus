<template>
  <div>
    <Example  :demo="formatPathDemos[path]" />
    <SourceCode :source="source" />
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'
import Example from './Example.vue'
import SourceCode from './SourceCode.vue'
export default {
  props: {
    demos: Object,
    source: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  components: {
    Example,
    SourceCode
  },
  setup(props) {
    const formatPathDemos = computed(() => {
      const demos = {}
      Object.keys(props.demos ?? {}).forEach(key => {
        demos[key.replace('../examples/', '').replace('.vue', '')] =
          props.demos?.[key].default
      })
      return demos
    })
    return {
      formatPathDemos
    }
  }
}
</script>
