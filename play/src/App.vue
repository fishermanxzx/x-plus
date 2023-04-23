<template>
  <XTable :data="tableData" :columns="tableColumns" v-loading="true" />
</template>
<script lang="ts">
import { ref } from 'vue'
import type { Columns } from '@x-plus/x-plus'
export default {
  props: {},
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
        width: 400,
        title: '日期',
        fixed: 'left'
      },
      {
        prop: 'name',
        width: 600,
        title: '名字'
      },
      {
        prop: 'time',
        width: 800,
        title: '名字'
      },
      {
        prop: 'address',
        width: 400,
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
