import { ref, reactive, Ref, watch, nextTick } from 'vue'
import { TableColumn } from './table/defaults'
import { forceScroll, setColumnPositionInfo } from './column'
import { addEventListenerWrap } from '@x-plus/utils'
import type { Listener } from '@x-plus/utils'
const useLayout = (tableColumns: Ref<TableColumn[]>) => {
  const xTable = ref<HTMLDivElement>()
  const headerTable = ref<HTMLTableElement>()
  const headerWrapper = ref<HTMLDivElement>()
  const summaryTable = ref<HTMLTableElement>()
  const summaryWrapper = ref<HTMLDivElement>()
  const bodyTable = ref<HTMLTableElement>()
  const bodyWrapper = ref<HTMLDivElement>()
  const scrollBar = ref<HTMLDivElement>()
  const anchor = ref<HTMLDivElement>()
  const scrollClassName = ref('')
  const leftColumnsWidth = ref(0)
  const percentage = ref(0)
  const headerWrapperHeight = ref(0)
  const summarySticky = ref(true)
  const scrollBarInfo = reactive({
    barWidth: 0,
    clientWidth: 0,
    scrollLeft: 0
  })
  const updateWidthInfo = () => {
    if (!bodyWrapper.value) return
    const { clientWidth, scrollWidth } = bodyWrapper.value
    const { leftWidth, fixedWidth } = tableColumns.value.reduce(
      (result, col) => {
        if (col.fixed) {
          result.fixedWidth += col.width
        }
        if (col.fixed == 'left') {
          result.leftWidth += col.width
        }
        return result
      },
      {
        leftWidth: 0,
        fixedWidth: 0
      }
    )
    leftColumnsWidth.value = leftWidth
    scrollBarInfo.clientWidth =
      scrollWidth > clientWidth ? clientWidth - fixedWidth : 0
    scrollBarInfo.barWidth =
      (clientWidth / scrollWidth) * scrollBarInfo.clientWidth
    percentage.value = scrollBarInfo.clientWidth / scrollWidth
  }
  const setScrollBarScrollLeft = (scrollLeft: number) => {
    scrollLeft = scrollLeft * percentage.value
    scrollBarInfo.scrollLeft = scrollLeft
    scrollLeft += leftColumnsWidth.value
    scrollBar.value &&
      (scrollBar.value.style.transform = `translateX(${scrollLeft}px)`)
  }
  const setBodyWrapperScrollLeft = (scrollLeft: number) => {
    if (!bodyWrapper.value) return
    bodyWrapper.value.scrollLeft = scrollLeft
  }
  const setBodyWrapperClassName = () => {
    if (!bodyWrapper.value) return
    const { clientWidth, scrollWidth, scrollLeft } = bodyWrapper.value
    if (clientWidth == scrollWidth) {
      scrollClassName.value = ''
      return
    }
    if (scrollLeft == 0) {
      scrollClassName.value = 'is-scrolling-left'
      return
    }
    if (scrollLeft + clientWidth == scrollWidth) {
      scrollClassName.value = 'is-scrolling-right'
      return
    }
    scrollClassName.value = 'is-scrolling-middle'
  }

  const onScroll = (currentTarget: HTMLElement, scrollLeft?: number) => {
    const mergedScrollLeft =
      typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft
    forceScroll(mergedScrollLeft, headerWrapper.value)
    forceScroll(mergedScrollLeft, summaryWrapper.value)
    forceScroll(mergedScrollLeft, setBodyWrapperScrollLeft)
    forceScroll(mergedScrollLeft, setScrollBarScrollLeft)
    setBodyWrapperClassName()
  }
  const bodyScrollEvent = (e: Event) => {
    e.target && onScroll(e.target as HTMLElement)
  }
  const updateTableWidth = () => {
    const tableWidth = tableColumns.value.reduce((tableWidth, nextCol) => {
      tableWidth += nextCol.width
      return tableWidth
    }, 0)
    headerTable.value && (headerTable.value.style.width = tableWidth + 'px')
    summaryTable.value && (summaryTable.value.style.width = tableWidth + 'px')
    bodyTable.value && (bodyTable.value.style.width = tableWidth + 'px')
  }
  const updateColumnsWidth = () => {
    if (!bodyWrapper.value) return
    const { columnsOriginWidth, fitColumnsNumber } = tableColumns.value.reduce(
      (result, nextCol) => {
        result.columnsOriginWidth += nextCol.originWidth
        if (nextCol.fit) {
          result.fitColumnsNumber += 1
        }
        return result
      },
      {
        columnsOriginWidth: 0,
        fitColumnsNumber: 0
      }
    )
    const clientWidth = bodyWrapper.value.clientWidth
    if (columnsOriginWidth >= clientWidth || fitColumnsNumber == 0) {
      tableColumns.value.forEach(col => {
        col.width = col.originWidth
      })
      return
    }
    // 剩余宽度
    const remainingWidth = clientWidth - columnsOriginWidth
    // 精确小数点后两位
    const deltaWidth =
      Math.floor((remainingWidth / fitColumnsNumber) * 100) / 100
    tableColumns.value.forEach(col => {
      col.width = col.fit ? col.originWidth + deltaWidth : col.originWidth
    })
  }
  const updateWidth = () => {
    updateColumnsWidth()
    updateTableWidth()
  }
  const updateHeaderWrapperHeight = () => {
    if (!headerWrapper.value) return
    headerWrapperHeight.value = headerWrapper.value.clientHeight
  }
  const updateHeight = () => {
    updateHeaderWrapperHeight()
  }
  const updateColumnPositionInfo = () => {
    tableColumns.value.reduce(setColumnPositionInfo, {
      location: 'left',
      nextWidth: 0
    })
    tableColumns.value.reduceRight(setColumnPositionInfo, {
      location: 'right',
      nextWidth: 0
    })
  }
  const setScrollBarBgColor = (color: string) => {
    scrollBar.value && (scrollBar.value.style.backgroundColor = color)
  }
  const initScrollBar = () => {
    if (!scrollBar.value || !bodyWrapper.value) return
    const { barWidth } = scrollBarInfo
    scrollBar.value.style.width = barWidth + 'px'
    scrollBarInfo.scrollLeft = bodyWrapper.value.scrollLeft * percentage.value
    scrollBar.value.style.transform = `translateX(${
      leftColumnsWidth.value + scrollBarInfo.scrollLeft
    }px)`
    if (barWidth == 0) {
      scrollBar.value.style.visibility = 'hidden'
      return
    }
    scrollBar.value.style.visibility = 'visible'
  }
  const addBodyWrapperEvent = () => {
    let bodyWrapperMousedownListener: Listener | null = null
    if (bodyWrapper.value) {
      bodyWrapperMousedownListener = addEventListenerWrap(
        bodyWrapper.value,
        'mousedown',
        e => {
          if (e.button !== 0) return
          if (e.ctrlKey) return
          // 阻止默认行为会导致弹窗跳动，不阻止会导致拖动时选中，在table.scss中添加不能选中样式即可
          // e.preventDefault();
          setScrollBarBgColor('#999')
          let firstPageX = e.pageX
          if (!bodyWrapper.value) return
          const { scrollWidth, clientWidth } = bodyWrapper.value
          const move = (e: MouseEvent) => {
            if (!bodyWrapper.value) return
            let scrollLeft =
              bodyWrapper.value.scrollLeft - (e.pageX - firstPageX)
            firstPageX = e.pageX
            if (scrollLeft <= 0) {
              scrollLeft = 0
            }
            if (scrollLeft >= scrollWidth - clientWidth) {
              scrollLeft = scrollWidth - clientWidth
            }
            onScroll(bodyWrapper.value, scrollLeft)
          }
          document.addEventListener('mousemove', move)
          document.onmouseup = () => {
            setScrollBarBgColor('#ccc')
            document.removeEventListener('mousemove', move)
          }
        }
      )
    }
    return bodyWrapperMousedownListener
  }
  const addScrollBarEvent = () => {
    let scrollBarMousedownListener: Listener | null = null
    if (scrollBar.value) {
      scrollBarMousedownListener = addEventListenerWrap(
        scrollBar.value,
        'mousedown',
        e => {
          if (e.button !== 0) return
          if (e.ctrlKey) return
          setScrollBarBgColor('#999')
          const delta = e.pageX - scrollBarInfo.scrollLeft
          const move = (e: MouseEvent) => {
            if (!scrollBar.value) return
            const { barWidth, clientWidth } = scrollBarInfo
            let left = e.pageX - delta
            if (left <= 0) {
              left = 0
            }
            if (left + barWidth >= clientWidth) {
              left = clientWidth - barWidth
            }
            const scrollLeft = left / percentage.value
            onScroll(scrollBar.value, scrollLeft)
          }
          document.addEventListener('mousemove', move)
          document.addEventListener('mouseup', () => {
            setScrollBarBgColor('#ccc')
            document.removeEventListener('mousemove', move)
          })
        }
      )
    }

    return scrollBarMousedownListener
  }

  watch(
    () => tableColumns.value,
    () => {
      doLayout()
    }
  )

  const doLayout = async () => {
    updateWidth()
    updateColumnPositionInfo()
    await nextTick()
    updateHeight()
    updateWidthInfo()
    setBodyWrapperClassName()
    initScrollBar()
  }
  const observerWidth = () => {
    if (!xTable.value) return null
    let oldWidth: number | null = xTable.value.clientWidth
    let widthObserver: ResizeObserver | null = new ResizeObserver(
      resizeObserverEntry => {
        const newWidth = resizeObserverEntry[0].contentRect.width
        if (oldWidth === newWidth) return
        oldWidth = newWidth
        doLayout()
      }
    )
    widthObserver.observe(xTable.value)
    return {
      remove: () => {
        if (!widthObserver) return
        if (!xTable.value) return
        widthObserver.unobserve(xTable.value)
        widthObserver = null
        oldWidth = null
      }
    }
  }
  return {
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
    xTable,
    headerWrapperHeight,
    summarySticky,
    observerWidth
  }
}
export default useLayout
