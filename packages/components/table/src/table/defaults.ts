import { generateProps } from '@x-plus/utils'
import { ExtractPropTypes, PropType } from 'vue'
type SortType = 'asc' | 'desc'
interface Column {
  type?: 'selection'
  prop: string
  title: string
  sort?: SortType
  width: number
  fixed?: 'left' | 'right'
  fit?: boolean
  align?: 'left' | 'center' | 'right'
  tooltip?: string
  [key: string]: any
}
type Columns = Column[]
interface TableColumn extends Column {
  positionInfo: {
    position?: 'sticky'
    left?: string
    right?: string
  }
  originWidth: number
  className: string
}
type TableColumns = TableColumn[]
type Sort = {
  prop: string
  sort: SortType
}
type CurrentSort = Sort
type RowData = Record<string, any>
type TreeProps =
  | {
      hasChildren: string
      children: string
      expand: string
    }
  | undefined
type DefaultSort = Sort
type LoadResult = RowData[] | false
const tableProps = {
  columns: {
    type: Array as PropType<Columns>,
    default: () => []
  },
  data: {
    type: Array as PropType<RowData[]>,
    default: () => []
  },
  defaultSort: {
    type: Object as PropType<DefaultSort>,
    default: () => ({
      prop: '',
      sort: ''
    })
  },
  loading: {
    type: Boolean,
    default: false
  },
  reload: {
    type: Boolean,
    default: false
  },
  stickyTop: {
    type: Number,
    default: 0
  },
  showSummary: {
    type: Boolean,
    default: false
  },
  treeProps: {
    type: Object as PropType<TreeProps>
  },
  lazy: {
    type: Boolean,
    default: false
  },
  emptyText: String
}
const extraProps = {
  column: Object as PropType<TableColumn>,
  row: Object as RowData,
  hasChildrenProp: String,
  childrenProp: String,
  expandProp: String,
  loadFn: {
    type: Function as PropType<(rowData: RowData) => Promise<LoadResult>>,
    default: (rowData: RowData) => Promise.resolve([])
  },
  currentSort: Object as PropType<CurrentSort>,
  index: Number,
  sticky: {
    type: Boolean,
    default: true
  }
}
type ExtraProps = ExtractPropTypes<typeof extraProps>
type TableProps = ExtractPropTypes<typeof tableProps>
const getProps = <T extends Array<keyof ExtraProps | keyof TableProps>>(
  props: T
) => {
  return generateProps({ ...tableProps, ...extraProps }, props)
}
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
  Sort,
  ExtraProps,
  TableColumns
}
export { tableProps, getProps }
