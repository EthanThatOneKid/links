export const keyboard = (node: HTMLElement, map: any) => {
  console.log({ node, map });

  const listener = (e) => {
    console.log("LISTENER FIRED", { e });
    if (map[e.key] !== undefined) {
      map[e.key](e);
    }
  };

  node.addEventListener("keyup", listener);

  return {
    destroy() {
      node.removeEventListener("keyup", listener);
    },
  };
};
