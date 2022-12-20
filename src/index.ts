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
import { handleFocusElement } from "./nagivation";
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
  focus: handleFocusElement,
};

export default DirectionalNavigation;
