/* Markdown images become figures. In an article, write
     ![Alt text](/path.png "Caption")          → figure with caption
     ![Alt text](/path.png "wide: Caption")    → figure that breaks out of the column
     ![Alt text](/clip.mp4 "Caption")          → looping muted video
   An image alone in its paragraph is unwrapped from the <p>.

   {{a2ui name}} on a line of its own becomes a live A2UI demo, rendered in
   the browser from Pebble's catalogue (package @pebble/a2ui, examples/<name>.json).

   A URL on a line of its own becomes a link preview card, using the
   metadata saved by `pnpm links` in src/data/link-previews.json. A URL
   that hasn't been fetched yet stays a plain link. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function loadPreviews() {
  try {
    return JSON.parse(readFileSync(fileURLToPath(new URL("../data/link-previews.json", import.meta.url)), "utf8"));
  } catch {
    return {};
  }
}

const el = (tagName, properties, children = []) => ({ type: "element", tagName, properties, children });
const text = (value) => ({ type: "text", value });

function toLinkCard(p) {
  return el("a", { href: p.url, className: ["link-card"], target: "_blank", rel: "noopener" }, [
    el("span", { className: ["link-card-media"] }, [el("img", { src: p.image, alt: "", loading: "lazy", decoding: "async" })]),
    el("span", { className: ["link-card-body"] }, [
      el("span", { className: ["link-card-site"] }, [text(p.site)]),
      el("strong", { className: ["link-card-title"] }, [text(p.title)]),
      p.description ? el("span", { className: ["link-card-desc"] }, [text(p.description)]) : text(""),
      el("span", { className: ["link-card-url"] }, [text(new URL(p.url).host.replace(/^www\./, "") + " ↗")]),
    ]),
  ]);
}
const isImg = (n) => n && n.type === "element" && n.tagName === "img";
const blank = (n) => n.type === "text" && !n.value.trim();

function toFigure(img) {
  const p = img.properties || {};
  let caption = typeof p.title === "string" ? p.title : "";
  let wide = false;
  if (caption.startsWith("wide:")) { wide = true; caption = caption.slice(5).trim(); }
  const src = String(p.src || "");
  const media = /\.(mp4|webm)$/i.test(src)
    ? { type: "element", tagName: "video", properties: { src, autoplay: true, muted: true, loop: true, playsinline: true, "aria-label": p.alt || "" }, children: [] }
    : { type: "element", tagName: "img", properties: { src, alt: p.alt || "", loading: "lazy", decoding: "async" }, children: [] };
  const children = [media];
  if (caption) children.push({ type: "element", tagName: "figcaption", properties: {}, children: [{ type: "text", value: caption }] });
  return { type: "element", tagName: "figure", properties: wide ? { className: ["wide"] } : {}, children };
}

const textOf = (n) => (n.type === "text" ? n.value : (n.children || []).map(textOf).join(""));

export default function rehypeFigures() {
  return (tree) => {
    const previews = loadPreviews();
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((c) => {
        if (c.type === "element" && c.tagName === "p") {
          const kids = c.children.filter((k) => !blank(k));
          if (kids.length === 1 && isImg(kids[0])) return toFigure(kids[0]);
          const demo = textOf(c).trim().match(/^\{\{a2ui ([a-z0-9-]+)\}\}$/);
          if (demo) {
            return el("div", { className: ["a2ui-demo-slot"], dataA2uiDemo: demo[1] }, [
              el("p", { className: ["pa2-fallback"] }, [text("Loading a live A2UI surface…")]),
            ]);
          }
          const a = kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "a" ? kids[0] : null;
          if (a) {
            const href = String(a.properties?.href || "");
            if (textOf(a).trim() === href && previews[href]) return toLinkCard(previews[href]);
          }
        }
        walk(c);
        return c;
      });
    };
    walk(tree);
  };
}
