/** Reads a computed CSS value from an element or its nearest ancestor. */
export function getClosestCssVariable(element: Element, property: string): string | null {
  const view = element.ownerDocument.defaultView;
  if (!view) {
    return null;
  }

  let current: Element | null = element;
  while (current) {
    const value = view.getComputedStyle(current).getPropertyValue(property).trim();
    if (value) {
      return value;
    }
    current = current.parentElement;
  }

  const rootValue = view.getComputedStyle(element.ownerDocument.documentElement).getPropertyValue(property).trim();
  return rootValue || null;
}
