import { withInstall } from '@x-plus/utils'
import Table from './src/table.vue'
import HoverContain from './src/hoverContain/hoverContain.vue'
export const XTable = withInstall(Table)
export const XTableHoverContain = withInstall(HoverContain)
export default XTable
export type {
  Column,
  Columns,
  TableColumn,
  SortType,
  CurrentSort,
  DefaultSort,
  TreeProps,
  TableProps,
  RowData,
  LoadResult,
  Sort
} from './src/table/defaults'
export type TableInstance = InstanceType<typeof Table>
