<template>
  <div v-if="visible" :class="ns.b()">
    <div :class="ns.e('spinner')">
      <svg :class="ns.e('spinner-circle')" viewBox="25 25 50 50">
        <circle
          :class="ns.e('spinner-path')"
          cx="50"
          cy="50"
          r="20"
          fill="none"
        ></circle>
      </svg>
      <p :class="ns.e('text')">Loading</p>
    </div>
  </div>
</template>
<script lang="ts">
import { useNamespace } from '@x-plus/hooks'
import { ref } from 'vue'
export default {
  name: 'XLoading',
  setup() {
    const ns = useNamespace('loading')
    const visible = ref(false)
    const hidden = () => {
      visible.value = false
    }
    const show = () => {
      visible.value = true
    }
    return {
      visible,
      hidden,
      show,
      ns
    }
  }
}
</script>
