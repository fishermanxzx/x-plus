<template>
  <OnlyChild>
    <slot />
  </OnlyChild>
</template>
<script lang="ts">
import OnlyChild from './onlyChild'
export default {
  name: 'XTrigger',
  components: {
    OnlyChild
  }
}
</script>
