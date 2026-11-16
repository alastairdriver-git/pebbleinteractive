// Builds dist/tokens.css (CSS variables plus .cw-<name> colourway classes)
// and dist/tokens.js (the same values for JS: Remotion, cards, scripts).
import { readFile, writeFile, mkdir } from "node:fs/promises";
const t = JSON.parse(await readFile(new URL("./tokens.json", import.meta.url), "utf8"));
const resolve = (v) => (typeof v === "string" ? v.replace(/\{([^}]+)\}/g, (_, path) => path.split(".").reduce((o, k) => o[k], t).$value) : v);

const color = Object.fromEntries(Object.entries(t.color).map(([k, v]) => [k, v.$value]));
const colourways = Object.fromEntries(
  Object.entries(t.colourway).filter(([k]) => !k.startsWith("$")).map(([name, roles]) => [name, Object.fromEntries(Object.entries(roles).map(([r, v]) => [r, resolve(v)]))]),
);
const font = { family: t.font.family.$value, headingWidth: t.font["heading-width"].$value, headingWeight: t.font["heading-weight"].$value, headingTracking: t.font["heading-tracking"].$value };

let css = "/* Generated from tokens.json by build.mjs. Do not edit. */\n:root {\n";
for (const [k, v] of Object.entries(color)) css += `  --pb-${k}: ${v};\n`;
css += `  --pb-font: ${font.family};\n  --pb-heading-width: ${font.headingWidth};\n  --pb-heading-weight: ${font.headingWeight};\n  --pb-heading-tracking: ${font.headingTracking};\n`;
css += `  --pb-radius: ${t.radius.base.$value};\n}\n\n`;
css += "/* Colourways: set on any container; children read --cw-* */\n";
for (const [name, roles] of Object.entries(colourways)) {
  css += `.cw-${name} {\n` + Object.entries(roles).map(([r, v]) => `  --cw-${r}: ${v};`).join("\n") + "\n  background: var(--cw-ground);\n  color: var(--cw-text);\n}\n";
}
await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
await writeFile(new URL("./dist/tokens.css", import.meta.url), css);
await writeFile(new URL("./dist/tokens.js", import.meta.url), `// Generated from tokens.json. Do not edit.\nexport const color = ${JSON.stringify(color, null, 2)};\nexport const colourways = ${JSON.stringify(colourways, null, 2)};\nexport const font = ${JSON.stringify(font, null, 2)};\n`);
console.log(`brand: ${Object.keys(color).length} colours, ${Object.keys(colourways).length} colourways`);
