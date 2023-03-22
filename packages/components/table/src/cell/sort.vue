<template>
  <span :class="ns.e('sort')">
    <span
      :class="[ns.em('sort-arrow','up'),ns.is('sorted',sort == 'asc')]"
    />
    <span
      :class="[ns.em('sort-arrow','down'),ns.is('sorted',sort == 'desc')]"
    />
  </span>
</template>
<script lang="ts">
import { useNamespace } from "@x-plus/hooks";
import { PropType } from "vue";
export default {
  name:'XSort',
  props: {
    sort: {
      type: String as PropType<"asc" | "desc" | ''>,
      default: "",
    },
  },
  setup() {
    const ns = useNamespace('table')
    return {
      ns
    };
  },
};
</script>
