<template>
  <XTable
    :data="tableData"
    :columns="tableColumns"
    :default-sort="defaultSort"
    :sticky-top="64"
    @sort-change="handleSort"
  />
</template>
<script lang="ts">
import { ref } from 'vue';
import type {Columns, Sort, SortType} from '@yxkj/x-plus';
export default {
setup() {
    const tableData = ref([
    {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      }
    ]);
    const tableColumns:Columns = [
    {
            prop:"date",
            width:200,
            title:"日期",
        },
        {
            prop:"name",
            width:200,
            title:"名字",
        },
        {
            prop:"address",
            width:200,
            title:"地址",
            sort:'asc'
        }
    ];
    const defaultSort:Sort = {
        prop:"date",
        sort:'asc'
    }
    const handleSort = (sort:{prop:string,sort:SortType})=>{
        //请求接口
        console.log(sort)
    }
    return {
      tableData,
      tableColumns,
      defaultSort,
      handleSort
    };
  },
};
</script>
