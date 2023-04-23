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
        address: 'No. 189, Grove St, Los Angeles',
        time: '16:00'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        time: '16:00'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        time: '16:00'
      }
    ])
    const tableColumns: Columns = [
      {
        prop: 'date',
        width: 100,
        title: '日期',
        fixed: 'left'
      },
      {
        prop: 'name',
        width: 250,
        title: '名字'
      },
      {
        prop: 'time',
        width: 250,
        title: '时间'
      },
      {
        prop: 'address',
        width: 200,
        title: '地址',
        fixed: 'right'
      }
    ]

    return {
      tableData,
      tableColumns
    }
  }
}
</script>
