import type { TableColumn } from '../table/defaults'

const setColumnPositionInfo = (
  positonInfo: {
    location: 'left' | 'right'
    nextWidth: number
  },
  nextColumn: TableColumn
) => {
  if (nextColumn.fixed == positonInfo.location) {
    nextColumn.positionInfo.position = 'sticky'
    nextColumn.positionInfo[positonInfo.location] = positonInfo.nextWidth + 'px'
    positonInfo.nextWidth += nextColumn.width
  }
  return positonInfo
}
const addColumnClassName = (column: TableColumn, className: string) => {
  if (column.className == '') {
    column.className = className
    return
  }
  column.className += ` ${className}`
}
const forceScroll = (
  scrollLeft: number,
  target: HTMLDivElement | ((left: number) => void) | undefined
) => {
  if (!target) {
    return
  }
  if (typeof target === 'function') {
    target(scrollLeft)
    return
  }
  if (target.scrollLeft !== scrollLeft) {
    target.scrollLeft = scrollLeft
  }
}

export { setColumnPositionInfo, addColumnClassName, forceScroll }
