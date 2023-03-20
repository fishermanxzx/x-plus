<template>
  <button
    :class="[
      ns.b(),
      ns.m(size),
      ns.m(type),
      ns.is('disabled', disabled),
      ns.is('plain', plain),
    ]"
    @click="handleClick"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
  </button>
</template>
<script lang="ts">
import { useNamespace } from '@x-plus/hooks'
import { defineComponent } from 'vue'
import { buttonProps } from './button'
export default defineComponent({
  name: 'XButton',
  props: buttonProps,
  emits: {
    click: (e: MouseEvent) => e instanceof MouseEvent
  },
  setup(props, { emit }) {
    const ns = useNamespace('button')
    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return
      emit('click', e)
    }
    return {
      ns,
      handleClick
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
