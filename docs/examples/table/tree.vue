<template>
  <XTable
    :data="tableData"
    :columns="tableColumns"
    :tree-props="treeProps"
    :sticky-top="64"
    @load="load"
  />
</template>
<script lang="ts">
import { ref } from 'vue'
import type { Columns, LoadResult, RowData } from '@yxkj/x-plus'
export default {
  setup() {
    const tableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        hasChildren: true
      },
      {
        date: '2016-05-02',
        name: 'Aom',
        address: 'No. 189, Grove St, Los Angeles',
        hasChildren: true,
        children: [
          {
            date: '2016-05-02',
            name: 'Aom-child',
            address: 'No. 189, Grove St, Los Angeles'
          }
        ],
        expand: true
      },
      {
        date: '2016-05-04',
        name: 'Com',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Dom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const tableColumns: Columns = [
      {
        prop: 'date',
        width: 200,
        title: '日期'
      },
      {
        prop: 'name',
        width: 200,
        title: '名字'
      },
      {
        prop: 'address',
        width: 200,
        title: '地址'
      }
    ]
    const treeProps = {
      children: 'children',
      hasChildren: 'hasChildren'
    }
    const load = (rowData: RowData, resolve: (result: LoadResult) => void) => {
      console.log(rowData)
      setTimeout(
        () =>
          resolve([
            {
              date: '2016-05-01',
              name: 'Tom-child',
              address: 'No. 189, Grove St, Los Angeles'
            }
          ]),
        2000
      )
    }

    return {
      tableData,
      tableColumns,
      treeProps,
      load
    }
  }
}
</script>
