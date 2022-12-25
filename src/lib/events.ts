export function dispatchFocusEvent($el: HTMLElement) {
  const event = new CustomEvent("dn:did-focus", {
    bubbles: true,
    detail: { element: $el },
  });

  $el.dispatchEvent(event);
}

export function dispatchInitEvent() {
  const event = new CustomEvent("dn:initialized", {
    bubbles: true,
  });

  window.dispatchEvent(event);
}

export function dispatchDestroyEvent() {
  const event = new CustomEvent("dn:destroyed", {
    bubbles: true,
  });

  window.dispatchEvent(event);
}
