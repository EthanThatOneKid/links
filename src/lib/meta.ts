// Thank you, https://simpleicons.org
export const getSvgUriFromUrl = (url: string): string => {
  try {
    const { host } = new URL(url);
    const subdomainsAndExtension = host.split(".");
    const name = subdomainsAndExtension[subdomainsAndExtension.length - 2];
    return `https://simpleicons.org/icons/${name}.svg`;
  } catch {}
};

// Thank you, https://iconsvg.xyz
export const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
