<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue" v-html="decoded" />
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'
export default {
  props: {
    source: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const decoded = computed(() => {
      return decodeURIComponent(props.source)
    })
    return {
      decoded
    }
  }
}
</script>

<style scoped lang="scss">
</style>
