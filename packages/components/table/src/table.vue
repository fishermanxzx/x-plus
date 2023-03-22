<template>
  <div
    ref="xTable"
    v-loading="loading"
    :class="ns.b()"
  >
    <div
      ref="anchor"
      :class="ns.e('anchor')"
    />
    <div :class="ns.e('container')">
      <div
        ref="headerWrapper"
        :class="[ns.e('header'),scrollClassName]"
        :style="{ top: stickyTop + 'px' }"
      >
        <table ref="headerTable">
          <Cols :columns="tableColumns" />
          <thead :class="ns.e('thead')">
            <tr>
              <template
                v-for="(column, columnIndex) in tableColumns"
                :key="column.prop"
              >
                <HeaderCell
                  :column="column"
                  :current-sort="currentSort"
                  @sort="changeSort"
                >
                  <slot
                    :name="column.prop + 'Header'"
                    :column="column"
                    :column-index="columnIndex"
                  />
                </HeaderCell>
              </template>
            </tr>
          </thead>
        </table>
      </div>
      <div
        v-if="showSummary"
        ref="summaryWrapper"
        :class="[scrollClassName,ns.e('summary')]"
        :style="{
          top: headerWrapperHeight + stickyTop + 'px',
          position: summarySticky ? 'sticky' : 'initial',
        }"
      >
        <table ref="summaryTable">
          <Cols :columns="tableColumns" />
          <tbody :class="ns.e('tbody')">
            <tr>
              <template
                v-for="(column, columnIndex) in tableColumns"
                :key="column.prop"
              >
                <SummaryCell
                  v-model:sticky="summarySticky"
                  :column="column"
                  :index="columnIndex"
                >
                  <slot
                    :name="column.prop + 'Summary'"
                    :column="column"
                    :column-index="columnIndex"
                  />
                </SummaryCell>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        ref="bodyWrapper"
        :class="[scrollClassName,ns.e('body')]"
        @scroll.passive="bodyScrollEvent"
      >
        <table ref="bodyTable">
          <Cols :columns="tableColumns" />
          <ReloadBody
            v-if="reload"
            :columns="tableColumns"
            @reload="handleReload"
          />
          <tbody
            v-else-if="data.length != 0"
            :class="ns.e('tbody')"
          >
            <template
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
            >
              <tr>
                <template
                  v-for="column in tableColumns"
                  :key="column.prop"
                >
                  <ExpandCell
                    v-if="column.prop == '__x_expand'"
                    :children-prop="childrenProp"
                    :column="column"
                    :expand-prop="expandProp"
                    :has-children-prop="hasChildrenProp"
                    :row="row"
                    :load-fn="loadChild"
                  />
                  <BodyCell
                    v-else
                    :column="column"
                    :row="row"
                  >
                    <slot
                      :name="column.prop"
                      :row="row"
                      :row-index="rowIndex"
                    />
                  </BodyCell>
                </template>
              </tr>
              <template v-if="treeProps && row[hasChildrenProp]">
                <template
                  v-for="(childRow, childRowIndex) in row[childrenProp]"
                  :key="rowIndex + '_' + childRowIndex"
                >
                  <tr
                    v-show="row[expandProp]"
                    :class="ns.e('child-row')"
                  >
                    <template
                      v-for="column in tableColumns"
                      :key="column.prop"
                    >
                      <td
                        v-if="column.prop == '__x_expand'"
                        :class="[ns.m('cell'),column.className]"
                      />
                      <BodyCell
                        v-else
                        :column="column"
                        :row="childRow"
                      >
                        <slot
                          :name="column.prop"
                          :row="childRow"
                          :row-index="rowIndex + '_' + childRowIndex"
                        />
                      </BodyCell>
                    </template>
                  </tr>
                </template>
              </template>
            </template>
          </tbody>
          <EmptyBody
            v-else
            :columns="tableColumns"
            :empty-text="emptyText"
          />
        </table>
      </div>
      <div
        ref="scrollBar"
        :class="ns.e('scroll-bar')"
      >
        <!-- <span class="scroll-text">鼠标按住列表可左右拖动</span> -->
      </div>
      <div
        v-if="$slots.bottom"
        :class="ns.e('bottom')"
      >
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {  tableProps } from './table/defaults';
import type {SortType,CurrentSort,TableColumn,RowData,LoadResult} from './table/defaults';
import {defineComponent,nextTick,onBeforeUnmount,onMounted,reactive,ref,watch} from 'vue';
import Cols from "./cols/cols.vue"
import {EmptyBody,ReloadBody} from "./body"
import { HeaderCell,BodyCell,SummaryCell,ExpandCell } from './cell';
import {transformTableColumns} from "./column"
import { Listener } from '@x-plus/utils';
import { transformTreeProps } from './table/helps';
import useLayout from "./layout"
import { useNamespace } from '@x-plus/hooks';
export default defineComponent({
  name: 'XTable',
  components: {
    Cols,
    EmptyBody,
    ReloadBody,
    HeaderCell,
    BodyCell,
    SummaryCell,
    ExpandCell,
  },
  props:tableProps,
  emits: ["sortChange", "reload", "load"],
  setup(props, { emit }) {
    const tableColumns = ref(transformTableColumns(props));
    const ns = useNamespace('table')
    watch(
      () => props.columns,
      () => {
        tableColumns.value = transformTableColumns(props);
      },
      {
        deep: true,
      }
    );
    const {
      xTable,
      headerTable,
      headerWrapper,
      summaryTable,
      summaryWrapper,
      bodyTable,
      bodyWrapper,
      scrollBar,
      anchor,
      scrollClassName,
      bodyScrollEvent,
      addBodyWrapperEvent,
      addScrollBarEvent,
      doLayout,
      headerWrapperHeight,
      summarySticky,
      observerWidth,
    } = useLayout(tableColumns);
    const currentSort = reactive<CurrentSort>({ ...props.defaultSort });
    const sort = (prop: string, order: SortType)=>{
      currentSort.prop = prop
      currentSort.sort = order
    }
    let bodyWrapperMousedownListener: Listener|null = null;
    let scrollBarMousedownListener: Listener|null = null;
    let containerWidthListener:Listener|null = null
    onMounted(async () => {
      await nextTick();
      requestAnimationFrame(doLayout);
      containerWidthListener = observerWidth()
      bodyWrapperMousedownListener = addBodyWrapperEvent();
      scrollBarMousedownListener = addScrollBarEvent();
    });
    onBeforeUnmount(() => {
      containerWidthListener?.remove()
      bodyWrapperMousedownListener?.remove();
      scrollBarMousedownListener?.remove();
    });
    const changeSort = (column: TableColumn) => {
      if (!column.sort) return;
      if (currentSort.prop !== column.prop) {
        currentSort.prop = column.prop;
        currentSort.sort = column.sort;
        emit("sortChange", { ...currentSort });
        return;
      }
      currentSort.sort = currentSort.sort == "asc" ? "desc" : "asc";
      emit("sortChange", { ...currentSort });
    };
    const handleReload = () => {
      emit("reload");
    };
    const toView = (
      option: {
        block?: "center" | "end" | "nearest" | "start";
        inline?: "center" | "end" | "nearest" | "start";
        behavior?: "auto" | "smooth";
        offset?:{
          top: number;
        }
      } = {
        block: "start",
        behavior: "auto",
      }
    ) => {
      if (!anchor.value) return;
      if (!option.offset) {
        anchor.value.scrollIntoView(option);
        return;
      }
      anchor.value.style.top = -option.offset.top + "px";
      anchor.value.scrollIntoView(option);
      anchor.value.style.top = 0 + "px";
    };
    const { hasChildrenProp, childrenProp, expandProp } = transformTreeProps(
      props.treeProps
    );
    const loadChild = (rowData: RowData): Promise<LoadResult> => {
      return new Promise((resolve) => {
        emit("load", rowData, resolve);
      });
    };
    return {
      xTable,
      headerWrapper,
      summaryTable,
      summaryWrapper,
      headerTable,
      bodyTable,
      bodyWrapper,
      bodyScrollEvent,
      tableColumns,
      anchor,
      scrollBar,
      scrollClassName,
      currentSort,
      changeSort,
      handleReload,
      toView,
      headerWrapperHeight,
      loadChild,
      hasChildrenProp,
      childrenProp,
      expandProp,
      summarySticky,
      doLayout,
      sort,
      ns
    };
  },
})
</script>

