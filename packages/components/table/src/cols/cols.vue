<template>
  <colgroup>
    <template
      v-for="column in columns"
      :key="column.prop"
    >
      <col :width="column.width">
    </template>
  </colgroup>
</template>
<script lang="ts">
import { tableProps } from "../table/defaults";
import { defineComponent } from "vue";
export default defineComponent({
  name:"XCols",
  props: {
    columns: tableProps.columns,
  },
  setup() {
    return {
    };
  },
});
</script>
