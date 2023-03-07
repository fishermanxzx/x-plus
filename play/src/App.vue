<template>
  <div>
    <XConfigProvider namespace="s">
      <XButton
        disabled
        @click="click"
      >
        disable
      </XButton>
      <XButton
        loading
        @click="click"
      >
        isas
      </XButton>
    </XConfigProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const click = e => {
      console.log(12, e)
    }
    return {
      click
    }
  }
})
</script>
<style scoped></style>
