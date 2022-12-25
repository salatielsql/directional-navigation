import { DIRECTION_NAVIGATE_ATTR, PARENT_SECTION_ATTR } from '../constants'
import { Directions } from './types'

export function qs(selector: string): HTMLElement | null {
  return document.querySelector(selector)
}

export function all(selector: string): NodeList {
  return document.querySelectorAll(selector)
}

export function focusElement($el?: HTMLElement | null) {
  if (!$el) return console.error('unable to focus element', $el)

  if (typeof $el.focus === 'function') {
    $el.focus()
  }
}

export function getFocusedElement() {
  return document.activeElement as HTMLElement | null
}

export function getParentSectionId($el: Element) {
  return $el.getAttribute(PARENT_SECTION_ATTR)
}

export function getNextElementFromDirection(
  $el: Element,
  direction: Directions
): HTMLElement | null {
  const directionAttribute = DIRECTION_NAVIGATE_ATTR.replace('{direction}', direction)

  const nextElementSelector = $el.getAttribute(directionAttribute)

  if (nextElementSelector) {
    return qs(nextElementSelector)
  }

  return null
}
