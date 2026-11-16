/* Carousel slides for a product, from its brief. Used by src/pages/carousel-cards. */
export type Slide =
  | { kind: "hook"; pill: string; title: string }
  | { kind: "problem"; text: string; label?: string }
  | { kind: "point"; icon: string; title: string; body: string }
  | { kind: "outcomes"; items: string[]; label?: string }
  | { kind: "inside"; items: { icon: string; title: string }[] }
  | { kind: "cta"; title: string; price: string; url: string }
  | { kind: "read"; title: string; url: string };

export function slidesFor(p: any): (Slide & { cw: string })[] {
  const d = p.data;
  const price = d.status === "live" ? (d.price === 0 ? "Free" : `$${d.price}`) : "Coming soon";
  const s: Slide[] = [{ kind: "hook", pill: d.format, title: d.headline ?? d.title }];
  if (d.problem) s.push({ kind: "problem", text: d.problem });
  if (d.outcomes.length) s.push({ kind: "outcomes", items: d.outcomes.slice(0, 4) });
  for (const h of d.highlights.slice(0, 4)) s.push({ kind: "point", icon: h.icon, title: h.title, body: h.body });
  const inside = d.inside.length ? d.inside : d.includes.slice(0, 5).map((t: string) => ({ icon: "Check", title: t }));
  s.push({ kind: "inside", items: inside.slice(0, 5) });
  s.push({ kind: "cta", title: d.title, price, url: `pebbleinteractive.com/products/${p.id}` });
  // Colourways from @pebble/brand, varied across the carousel.
  let n = 0;
  return s.map((x) => ({
    ...x,
    cw: x.kind === "hook" ? "ink" : x.kind === "problem" || x.kind === "inside" ? "cream" : x.kind === "outcomes" || x.kind === "cta" ? "pink" : n++ % 2 ? "ink" : "mint",
  }));
}


/** Carousel for a case study: client and title, the brief, each work
    stream, what it demonstrates, then "read the case study". */
export function slidesForWork(w: any): (Slide & { cw: string })[] {
  const d = w.data;
  const icons = ["Compass", "Layers", "Code", "Sparkles"];
  const s: Slide[] = [{ kind: "hook", pill: d.category, title: `${d.client}: ${d.title}` }];
  s.push({ kind: "problem", text: d.brief, label: "The brief" });
  d.workstreams.forEach((ws: any, i: number) => s.push({ kind: "point", icon: icons[i % icons.length], title: ws.title, body: ws.body }));
  s.push({ kind: "outcomes", items: d.demonstrates.map((x: any) => x.skill), label: "What this demonstrates" });
  s.push({ kind: "read", title: d.client, url: `pebbleinteractive.com/work/${w.id}` });
  let n = 0;
  return s.map((x) => ({
    ...x,
    cw: x.kind === "hook" ? "ink" : x.kind === "problem" ? "cream" : x.kind === "outcomes" || x.kind === "read" ? "pink" : n++ % 2 ? "ink" : "mint",
  }));
}
