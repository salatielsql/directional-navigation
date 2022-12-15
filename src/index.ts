import {
  listenKeyboardEvents,
  removeKeyboardEvents,
  listenFocusEvent,
  removeFocusEvent,
} from "./event-listeners";
import { dispatchDestroyEvent, dispatchInitEvent } from "./events";

import {
  focusInitialElement,
  initManagedDirectionalSection,
} from "./initializations";

function init() {
  listenFocusEvent();
  listenKeyboardEvents();
  initManagedDirectionalSection();
  focusInitialElement();

  dispatchInitEvent();
}

function destroy() {
  removeFocusEvent();
  removeKeyboardEvents();

  dispatchDestroyEvent();
}

const DirectionalNavigation = {
  init,
  destroy,
};

export default DirectionalNavigation;
