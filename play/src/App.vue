<template>
  <div>
    <XConfigProvider
      namespace="s"
      :locale="en"
    >
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
import en from '@x-plus/locale/lang/en'
export default defineComponent({
  setup() {
    const click = e => {
      console.log(12, e)
    }
    return {
      click,
      en
    }
  }
})
</script>
<style scoped></style>
