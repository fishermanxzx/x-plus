<template>
  <XTable :data="tableData" :columns="tableColumns" :sticky-top="63" />
</template>
<script lang="ts">
import { ref } from 'vue'
import type { Columns } from '@yxkj/x-plus'
export default {
  setup() {
    const tableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const tableColumns: Columns = [
      {
        prop: 'date',
        width: 200,
        title: '日期',
        align: 'center'
      },
      {
        prop: 'name',
        width: 200,
        title: '名字',
        fit: false
      },
      {
        prop: 'address',
        width: 200,
        title: '地址'
      }
    ]

    return {
      tableData,
      tableColumns
    }
  }
}
</script>
