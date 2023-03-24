<template>
  <XTable
    :data="tableData"
    :columns="tableColumns"
    :show-summary="true"
    :sticky-top="64"
  >
    <template #nameSummary="{ column, columnIndex }">
      {{ summary[column.prop] }}{{ columnIndex }}
    </template>
  </XTable>
</template>
<script lang="ts">
import { ref } from 'vue';
import type {Columns} from '@yxkj/x-plus';
export default {
setup() {
  const summary = {
    name:'名字汇总'
  }
  const tableData = ref([
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Aom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Com",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Dom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ]);
    const tableColumns: Columns = [
      {
        prop: "date",
        width: 200,
        title: "日期",
      },
      {
        prop: "name",
        width: 200,
        title: "名字",
      },
      {
        prop: "address",
        width: 200,
        title: "地址",
      },
    ];

    return {
      tableData,
      tableColumns,
      summary
    };
  },
};
</script>
