<template>
  <td
    :style="{ ...column?.positionInfo }"
    :class="[ns.e('cell'),column?.className]"
  >
    <slot>
      {{
        row?.[column?.prop||'']
      }}
    </slot>
  </td>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {getProps} from "../table/defaults";
import { useNamespace } from "@x-plus/hooks";

export default defineComponent({
  props: getProps(['column','row']),
  setup() {
    const ns = useNamespace('table')
    return {
      ns
    }
  },
});
</script>

