import { handleFocusEvent, handleKeyupEvent } from './nagivation'

export function listenKeyboardEvents() {
  window.addEventListener('keydown', handleKeyupEvent)
}

export function removeKeyboardEvents() {
  window.removeEventListener('keydown', handleKeyupEvent)
}

export function listenFocusEvent() {
  window.addEventListener('focusin', handleFocusEvent)
}

export function removeFocusEvent() {
  window.removeEventListener('focusin', handleFocusEvent)
}
