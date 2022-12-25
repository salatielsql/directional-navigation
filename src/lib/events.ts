import { DID_FOCUS_EVENT, LIB_DESTROYED_EVENT, LIB_INITIALIZED_EVENT } from '../constants'

export function dispatchFocusEvent($el: HTMLElement) {
  const event = new CustomEvent(DID_FOCUS_EVENT, {
    bubbles: true,
    detail: { element: $el },
  })

  $el.dispatchEvent(event)
}

export function dispatchInitEvent() {
  const event = new CustomEvent(LIB_INITIALIZED_EVENT, {
    bubbles: true,
  })

  window.dispatchEvent(event)
}

export function dispatchDestroyEvent() {
  const event = new CustomEvent(LIB_DESTROYED_EVENT, {
    bubbles: true,
  })

  window.dispatchEvent(event)
}
