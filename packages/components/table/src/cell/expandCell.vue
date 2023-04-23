<template>
  <td
    :style="{ ...column?.positionInfo }"
    :class="[ns.e('cell'), column?.className]"
  >
    <template v-if="row?.[hasChildrenProp || '']">
      <div v-if="noData" />
      <div
        v-else-if="!isloading"
        :class="[
          ns.e('expand-icon'),
          ns.is('expanded', expandProp && row[expandProp])
        ]"
        @click="handleExpand(row || {})"
      >
        <svg
          t="1663656502019"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7068"
          width="14"
          height="14"
        >
          <path
            d="M711.6 488.624L355.2 152.976a29.36 29.36 0 0 0-42.352 0 31.408 31.408 0 0 0 0 43.552L647.76 512 312.848 827.36a31.408 31.408 0 0 0 0 43.552 29.36 29.36 0 0 0 42.352 0l356.4-335.648a36.32 36.32 0 0 0 0-46.64z"
            p-id="7069"
            fill="#333333"
          />
        </svg>
      </div>
      <div v-else :class="[ns.e('loading-icon'), ns.is('loading')]">
        <svg
          t="1663663774594"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2651"
          width="14"
          height="14"
        >
          <path
            d="M533.333333 682.666667v192h-64v-192h64z m-175.317333-72.618667l45.269333 45.269333-135.765333 135.744-45.248-45.226666 135.744-135.786667z m286.634667 0l135.744 135.765333-45.226667 45.248-135.786667-135.744 45.269334-45.269333zM330.666667 480v64h-192v-64h192z m533.333333 0v64h-192v-64h192z m-128.853333-247.061333l45.248 45.226666-135.744 135.786667-45.269334-45.269333 135.765334-135.744z m-467.626667 0l135.765333 135.744-45.269333 45.269333-135.744-135.765333 45.226667-45.248zM533.333333 149.333333v192h-64V149.333333h64z"
            p-id="2652"
            fill="#333333"
          />
        </svg>
      </div>
    </template>
  </td>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getProps } from '../table/defaults'
import type { RowData } from '../table/defaults'
import { useNamespace } from '@x-plus/hooks'
export default defineComponent({
  props: getProps([
    'column',
    'row',
    'hasChildrenProp',
    'childrenProp',
    'expandProp',
    'loadFn'
  ]),
  setup(props) {
    const isloading = ref(false)
    const noData = ref(false)
    const ns = useNamespace('table')
    const handleExpand = async (rowData: RowData) => {
      if (
        rowData[props.childrenProp!] &&
        rowData[props.childrenProp!].length !== 0
      ) {
        rowData[props.expandProp!] = !rowData[props.expandProp!]
        return
      }
      isloading.value = true
      const result = await props.loadFn(rowData)
      isloading.value = false
      if (result === false) {
        rowData[props.expandProp!] = false
        return
      }
      if (result.length == 0) {
        noData.value = true
      }
      rowData[props.childrenProp!] = result
      rowData[props.expandProp!] = true
    }
    return {
      handleExpand,
      isloading,
      noData,
      ns
    }
  }
})
</script>
