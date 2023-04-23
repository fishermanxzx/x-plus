<template>
  <tbody class="x-table-tbody">
    <tr>
      <template v-for="column in leftColumns" :key="column.prop">
        <td :style="{ ...column.positionInfo }" :class="column.className" />
      </template>
      <template v-for="(column, index) in normalColumns" :key="column.prop">
        <td
          v-if="index == 0"
          :style="{ ...column.positionInfo }"
          :class="column.className"
          :colspan="column.length"
        >
          {{ emptyText }}
        </td>
      </template>
      <template v-for="column in rightColumns" :key="column.prop">
        <td :style="{ ...column.positionInfo }" :class="column.className" />
      </template>
    </tr>
  </tbody>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getProps } from '../table/defaults'
export default defineComponent({
  name: 'XEmptyBody',
  props: getProps(['columns', 'emptyText']),
  setup(props) {
    const leftColumns = computed(() => {
      return props.columns.filter(column => column.fixed == 'left')
    })
    const normalColumns = computed(() => {
      return props.columns.filter(column => !column.fixed)
    })
    const rightColumns = computed(() => {
      return props.columns.filter(column => column.fixed == 'right')
    })
    return {
      leftColumns,
      normalColumns,
      rightColumns
    }
  }
})
</script>
