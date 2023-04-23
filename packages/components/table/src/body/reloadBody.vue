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
          :colspan="normalColumns.length"
        >
          数据加载失败，请重试
          <svg
            t="1663150098153"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2367"
            width="14"
            height="14"
            @click="handleClickReload"
          >
            <path
              class="path"
              d="M257.6 462.4c28.8 1.6 43.2-11.2 43.2-36.8 0-25.6-17.6-43.2-43.2-43.2H150.4C201.6 208 358.4 84.8 542.4 84.8c187.2 0 348.8 128 395.2 310.4 4.8 20.8 30.4 38.4 51.2 30.4 20.8-4.8 38.4-30.4 30.4-51.2C958.4 153.6 763.2 0 537.6 0 337.6 0 163.2 123.2 80 305.6v-92.8c0-22.4-9.6-43.2-35.2-43.2S1.6 187.2 0 212.8v200c1.6 30.4 25.6 51.2 57.6 49.6h200zM966.4 590.4H779.2c-12.8 0-27.2 3.2-36.8 11.2-11.2 8-19.2 20.8-19.2 36.8 0 20.8 19.2 32 43.2 32h105.6c-59.2 163.2-208 265.6-374.4 265.6-174.4 0-326.4-110.4-382.4-280-8-20.8-30.4-33.6-56-25.6-20.8 8-33.6 30.4-25.6 56C104 888 286.4 1024 499.2 1024c187.2 0 352-105.6 444.8-272v97.6c1.6 24 9.6 43.2 35.2 43.2s43.2-17.6 44.8-43.2V649.6c-1.6-28.8-27.2-54.4-57.6-59.2z"
              p-id="2368"
              fill="#fe5705"
            />
          </svg>
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
  props: getProps(['columns']),
  emits: ['reload'],
  setup(props, { emit }) {
    const leftColumns = computed(() => {
      return props.columns.filter(column => column.fixed == 'left')
    })
    const normalColumns = computed(() => {
      return props.columns.filter(column => !column.fixed)
    })
    const rightColumns = computed(() => {
      return props.columns.filter(column => column.fixed == 'right')
    })
    const handleClickReload = () => {
      emit('reload')
    }
    return {
      leftColumns,
      normalColumns,
      rightColumns,
      handleClickReload
    }
  }
})
</script>
<style lang="scss" scoped>
// @import "../../style/tr.scss";
// @import "../../style/body.scss";
// @import "../../style/common.scss";
// tr {
//   td {
//     height: 80px;
//     color: #333;
//     text-align: center !important;
//     svg {
//       vertical-align: top;
//       cursor: pointer;
//       .path {
//         fill: $main-color;
//       }
//     }
//   }
// }
</style>
