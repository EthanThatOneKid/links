type KeyboardHandler = (KeyboardEvent) => void;

export const keyboard = (
  node: HTMLElement,
  map: Record<string, KeyboardHandler>
) => {
  const listener = (event: KeyboardEvent) => {
    if (map[event.key] !== undefined) {
      map[event.key](event);
    }
  };
  node.addEventListener("keyup", listener);
  return {
    destroy() {
      node.removeEventListener("keyup", listener);
    },
  };
};
