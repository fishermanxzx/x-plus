<template>
  <div :class="ns.e('hover-contain')">
    <slot />
  </div>
</template>
<script lang="ts">
import { useNamespace } from '@x-plus/hooks'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'XTableHoverContain',
  setup() {
    const ns = useNamespace('table')
    return {
      ns
    }
  }
})
</script>
