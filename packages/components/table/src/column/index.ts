import { cloneDeep } from 'lodash-unified'
import type { TableColumn, TableProps, TreeProps } from '../table/defaults'
import { addColumnClassName } from './helps'
export * from './helps'
const transformTableColumns = (props: TableProps) => {
  const columns = cloneDeep(props.columns)
  const leftColumns: TableColumn[] = []
  const normalColumns: TableColumn[] = []
  const rightColumns: TableColumn[] = []
  if (props.treeProps) {
    const expandColumn: TableColumn = {
      prop: '__x_expand',
      title: '',
      width: 24,
      fixed: 'left',
      fit: false,
      align: 'center',
      positionInfo: {},
      originWidth: 24,
      className: ''
    }
    addColumnClassName(expandColumn, expandColumn.align ?? 'left')
    addColumnClassName(expandColumn, 'fix-left')
    addColumnClassName(expandColumn, 'no-padding')
    leftColumns.push(expandColumn)
  }
  columns.forEach(column => {
    const col: TableColumn = {
      ...column,
      className: '',
      positionInfo: {},
      fit: column.fit === undefined ? true : column.fit,
      originWidth: column.width
    }
    addColumnClassName(col, col.align ?? 'left')
    if (col.sort) {
      addColumnClassName(col, 'sortable')
    }
    if (col.tooltip) {
      addColumnClassName(col, 'tooltip')
    }
    if (!column.fixed) {
      normalColumns.push(col)
    }
    if (column.fixed === 'left') {
      addColumnClassName(col, 'fix-left')
      leftColumns.push(col)
    }
    if (column.fixed === 'right') {
      addColumnClassName(col, 'fix-right')
      rightColumns.push(col)
    }
  })
  if (leftColumns.length > 0) {
    addColumnClassName(leftColumns[leftColumns.length - 1], 'left-fixed-last')
  }
  if (rightColumns.length > 0) {
    addColumnClassName(rightColumns[0], 'right-fixed-first')
  }
  const tableColumns = leftColumns.concat(normalColumns, rightColumns)
  return tableColumns
}
const transformTreeProps = (treeProps: TreeProps) => {
  let hasChildrenProp = 'hasChildren'
  let childrenProp = 'children'
  let expandProp = 'expand'
  if (treeProps) {
    hasChildrenProp = treeProps.hasChildren ?? 'hasChildren'
    childrenProp = treeProps.children ?? 'children'
    expandProp = treeProps.expand ?? 'expand'
  }
  return {
    hasChildrenProp,
    childrenProp,
    expandProp
  }
}
export { transformTableColumns, transformTreeProps }
