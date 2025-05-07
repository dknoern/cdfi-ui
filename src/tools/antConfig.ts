export const getGlobalPopupContainer = (
  node: HTMLElement,
): (Node & ParentNode) | null => (node ? node.parentNode : document.body);

export const getPopupContainer = (node: HTMLElement): HTMLElement =>
  document.body;
