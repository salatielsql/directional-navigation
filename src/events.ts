export function dispatchFocusEvent($el: HTMLElement) {
  const event = new CustomEvent("navigation-did-focus", {
    bubbles: true,
    detail: { element: $el },
  });

  $el.dispatchEvent(event);
}
