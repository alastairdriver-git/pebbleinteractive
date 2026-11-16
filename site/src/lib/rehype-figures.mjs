/* Markdown images become figures. In an article, write
     ![Alt text](/path.png "Caption")          → figure with caption
     ![Alt text](/path.png "wide: Caption")    → figure that breaks out of the column
     ![Alt text](/clip.mp4 "Caption")          → looping muted video
   An image alone in its paragraph is unwrapped from the <p>. */
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

export default function rehypeFigures() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((c) => {
        if (c.type === "element" && c.tagName === "p") {
          const kids = c.children.filter((k) => !blank(k));
          if (kids.length === 1 && isImg(kids[0])) return toFigure(kids[0]);
        }
        walk(c);
        return c;
      });
    };
    walk(tree);
  };
}
