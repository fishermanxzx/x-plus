export type Listener = { remove: () => void }
const addEventListenerWrap = <K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  eventType: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): Listener => {
  if (target && target.addEventListener) {
    if (
      options === undefined &&
      (eventType === 'touchstart' ||
        eventType === 'touchmove' ||
        eventType === 'wheel')
    ) {
      options = { passive: false }
    }
    target.addEventListener(eventType, listener, options)
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType, listener)
      }
    }
  }
}
export { addEventListenerWrap }
