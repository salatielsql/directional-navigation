import {
  listenKeyboardEvents,
  removeKeyboardEvents,
  listenFocusEvent,
  removeFocusEvent,
} from "./event-listeners";
import {
  focusInitialElement,
  initManagedDirectionalSection,
} from "./initializations";
import { handleFocusElement as focus } from "./nagivation";
import { dispatchDestroyEvent, dispatchInitEvent } from "./events";

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
  focus,
};

export default DirectionalNavigation;
