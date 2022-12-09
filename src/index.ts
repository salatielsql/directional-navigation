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

function init() {
  console.log("evt:init!");
  listenFocusEvent();
  listenKeyboardEvents();
  initManagedDirectionalSection();
  focusInitialElement();
}

function destroy() {
  console.log("evt:destroy!");
  removeFocusEvent();
  removeKeyboardEvents();
}

const DirectionalNavigation = {
  init,
  destroy,
};

export default DirectionalNavigation;
