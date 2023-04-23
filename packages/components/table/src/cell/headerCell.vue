<template>
  <th
    :style="{ ...column?.positionInfo }"
    :class="[ns.e('cell'), column?.className]"
    @click="sort(column!)"
  >
    <slot
      ><span
        style="vertical-align: middle; font-weight: 500; font-size: 13px"
        >{{ column?.title }}</span
      ></slot
    >
    <XTooltip v-if="column?.tooltip" :content="column.tooltip">
      <span style="vertical-align: middle; display: inline-flex">
        <svg
          t="1663573600547"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2824"
          width="16"
          height="16"
        >
          <path
            d="M512.001023 881.247762c-203.605188 0-369.248785-165.643598-369.248785-369.248785 0-203.602118 165.643598-369.245715 369.248785-369.245716 203.602118 0 369.245715 165.643598 369.245716 369.245716 0.001023 203.604164-165.643598 369.248785-369.245716 369.248785z m0-682.736593c-172.85893 0-313.489854 140.627854-313.489854 313.486784 0 172.860976 140.630924 313.489854 313.489854 313.489854s313.486784-140.627854 313.486784-313.489854c0-172.857906-140.627854-313.486784-313.486784-313.486784z"
            p-id="2825"
            fill="#999999"
          />
          <path
            d="M512.697895 718.92684m-43.213198 0a43.213197 43.213197 0 1 0 86.426395 0 43.213197 43.213197 0 1 0-86.426395 0Z"
            p-id="2826"
            fill="#999999"
          />
          <path
            d="M511.848551 627.140367h-0.304946c-15.393595-0.163729-27.743878-12.780071-27.580148-28.173666 0.740874-69.396533 34.653241-90.798982 61.900815-107.995643 22.091134-13.939477 41.165562-25.981744 52.366671-67.357084 4.38896-16.229636-0.429789-44.7676-18.149358-67.915809-11.473309-14.996552-32.633235-32.872688-68.239174-32.872689-44.209898 0-73.249281 30.775934-82.412988 61.277622-9.41237 31.323403 3.469008 60.436464 3.598968 60.721967 6.502088 13.95892 0.452301 30.54262-13.509689 37.041637-13.967106 6.495948-30.547737 0.441045-37.041637-13.512758-0.906649-1.949398-22.053272-48.361451-6.449899-100.295264 15.105023-50.269917 62.957891-100.992135 135.815245-100.992135 45.544289 0 85.501326 19.441794 112.51968 54.743812 26.15366 34.171264 37.278022 80.93738 27.688619 116.37038-16.874319 62.361303-51.299363 84.08507-76.428694 99.94427-23.627117 14.911618-35.486212 22.396079-35.900651 61.436234-0.161682 15.294334-12.615319 27.579125-27.872814 27.579126z"
            p-id="2827"
            fill="#999999"
          />
        </svg>
      </span> </XTooltip
    ><Sort
      v-if="column?.sort"
      :sort="column.prop == currentSort?.prop ? currentSort.sort : ''"
    />
  </th>
</template>
<script lang="ts">
import { useNamespace } from '@x-plus/hooks'
import { TableColumn, getProps } from '../table/defaults'
import XTooltip from '@x-plus/components/tooltip'
import Sort from './sort.vue'
export default {
  components: {
    XTooltip,
    Sort
  },
  props: getProps(['currentSort', 'column']),
  emits: ['sort'],
  setup(props, { emit }) {
    const ns = useNamespace('table')
    const sort = (column: TableColumn) => {
      if (!column.sort) return
      emit('sort', column)
    }
    return {
      sort,
      ns
    }
  }
}
</script>
<style lang="scss" scoped></style>
