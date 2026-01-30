import AnsiToHtml from "ansi-to-html";

const catppuccinLatteAnsi: Record<number, string> = {
  0: "#4c4f69",
  1: "#d20f39",
  2: "#40a02b",
  3: "#df8e1d",
  4: "#1e66f5",
  5: "#8839ef",
  6: "#179299",
  7: "#5c5f77",
  8: "#7c7f93",
  9: "#e64553",
  10: "#40a02b",
  11: "#fe640b",
  12: "#7287fd",
  13: "#ea76cb",
  14: "#04a5e5",
  15: "#eff1f5",
};

const ansiToHtml = new AnsiToHtml({
  fg: "#4c4f69",
  bg: "transparent",
  escapeXML: true,
  colors: catppuccinLatteAnsi,
});

const parseColor = (value: string | null): [number, number, number] | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      const rHex = hex[0] ?? "0";
      const gHex = hex[1] ?? "0";
      const bHex = hex[2] ?? "0";
      const r = Number.parseInt(rHex + rHex, 16);
      const g = Number.parseInt(gHex + gHex, 16);
      const b = Number.parseInt(bHex + bHex, 16);
      return [r, g, b];
    }
    if (hex.length === 6) {
      const r = Number.parseInt(hex.slice(0, 2) || "00", 16);
      const g = Number.parseInt(hex.slice(2, 4) || "00", 16);
      const b = Number.parseInt(hex.slice(4, 6) || "00", 16);
      return [r, g, b];
    }
    return null;
  }
  const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!rgbMatch) return null;
  return [
    Number.parseInt(rgbMatch[1] ?? "0", 10),
    Number.parseInt(rgbMatch[2] ?? "0", 10),
    Number.parseInt(rgbMatch[3] ?? "0", 10),
  ];
};

const luminance = (rgb: [number, number, number]) => {
  const toLinear = (value: number) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  };
  const [r, g, b] = rgb;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const adjustLowContrast = (html: string): string => {
  if (typeof window === "undefined") {
    return html;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const nodes = Array.from(doc.querySelectorAll<HTMLElement>("[style]"));
  nodes.forEach((node) => {
    const bg = parseColor(node.style.backgroundColor);
    if (!bg) return;
    const bgLum = luminance(bg);
    if (bgLum > 0.28) return;
    node.style.backgroundColor = "#e6e9ef";
    node.style.color = "#4c4f69";
  });
  return doc.body.innerHTML;
};

export const renderAnsi = (text: string): string => {
  const html = ansiToHtml.toHtml(text);
  return adjustLowContrast(html);
};
