<template>
  <div>
    <component :is="demo" v-if="demo"/>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    demo: {
      type: Object,
      required: true
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
