import { SECTION_ID_ATTR } from "./constants";

import { getSection, ManagedDirectionalSection } from "./sections";

import { Directions, KeyCodes } from "./types";

import {
  focusElement,
  getFocusedElement,
  getNextElementFromDirection,
} from "./dom";
import { dispatchFocusEvent } from "./events";

export function handleFocusElement($el?: HTMLElement | null) {
  if (!$el)
    return console.error(
      "[handleFocusElement]: unable to handle navigation focus",
      $el
    );

  focusElement($el);

  const section = ManagedDirectionalSection.getElementSection($el);
  const childrenIndex = ManagedDirectionalSection.getElementChildrenIndex($el);

  if (section && childrenIndex) {
    section.setCurrentFocusedChildrenIndex(childrenIndex);
  }

  dispatchFocusEvent($el);
}

function handleKeyboardNavigation(
  keyPressed: Directions,
  $focusedEl: HTMLElement
) {
  const section = ManagedDirectionalSection.getElementSection($focusedEl);

  if (section) {
    return section.focusFromKeyPressed(keyPressed);
  }

  const navigateTo = getNextElementFromDirection($focusedEl, keyPressed);

  handleFocusElement(navigateTo);
}

export function handleKeyupEvent(event: KeyboardEvent) {
  const $focusedEl = getFocusedElement();

  if (!$focusedEl) return;

  let keyPressed: Directions;

  switch (event.keyCode) {
    case KeyCodes.UP:
      keyPressed = Directions.UP;
      break;

    case KeyCodes.DOWN:
      keyPressed = Directions.DOWN;
      break;

    case KeyCodes.RIGHT:
      keyPressed = Directions.RIGHT;
      break;

    case KeyCodes.LEFT:
      keyPressed = Directions.LEFT;
      break;

    default:
      return;
  }

  if (keyPressed) {
    event.preventDefault();

    handleKeyboardNavigation(keyPressed, $focusedEl);
  }
}

export function handleFocusEvent(event: FocusEvent) {
  const target = event.target as HTMLElement;
  const focusTargetSectionId = target.getAttribute(SECTION_ID_ATTR);

  if (focusTargetSectionId) {
    const section = getSection(focusTargetSectionId);

    if (section) {
      section.focusLastFocusedElement();
    }
  }
}
