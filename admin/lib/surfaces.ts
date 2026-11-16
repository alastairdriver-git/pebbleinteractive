/* A2UI surfaces for Pebble Studio, protocol 1.0, built only from the Pebble
   catalogue (@pebble/a2ui). Each builder returns the messages an agent would
   send. The same builders will back the MCP server's tools, so Claude or
   ChatGPT get exactly these screens. */
import { LEAD_STATUSES, STATUSES, type Item, type Lead, type Product } from "./data";

export const CATALOG_ID = "https://www.pebbleinteractive.com/a2ui/catalog/v1.json";
type Msg = Record<string, unknown>;
const V = "1.0";
const bind = (path: string) => ({ "@path": path });

export const create = (surfaceId: string, components: Msg[], data: unknown): Msg[] => [
  { version: V, createSurface: { surfaceId, catalogId: CATALOG_ID } },
  { version: V, updateComponents: { surfaceId, components } },
  { version: V, updateDataModel: { surfaceId, path: "/", value: data } },
];
export const updateData = (surfaceId: string, data: unknown): Msg => ({ version: V, updateDataModel: { surfaceId, path: "/", value: data } });
export const remove = (surfaceId: string): Msg => ({ version: V, deleteSurface: { surfaceId } });

/* ── Schedule ───────────────────────────────────────────── */
export const VIEWS = ["Next two weeks", "Needs me", "Ideas", "Everything"] as const;
export type View = (typeof VIEWS)[number];

const TODAY = () => new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
const day = (iso: string) => new Date(iso + "T00:00:00Z");
const fmtDay = (iso: string | null) =>
  iso ? day(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }) : "No date";
const monday = (d: Date) => {
  const m = new Date(d);
  m.setUTCDate(m.getUTCDate() - ((m.getUTCDay() + 6) % 7));
  return m;
};

function filterItems(items: Item[], view: View) {
  const today = TODAY();
  const in14 = new Date(today);
  in14.setUTCDate(in14.getUTCDate() + 14);
  switch (view) {
    case "Next two weeks":
      return items.filter((i) => i.scheduled_for && day(i.scheduled_for) >= today && day(i.scheduled_for) < in14);
    case "Needs me":
      return items.filter((i) => i.status === "needs review" || i.status === "draft");
    case "Ideas":
      return items.filter((i) => i.status === "idea");
    default:
      return items;
  }
}

export function scheduleData(items: Item[], view: View) {
  const shown = filterItems(items, view).sort((a, b) => (a.scheduled_for ?? "9").localeCompare(b.scheduled_for ?? "9"));
  const weeks = new Map<string, { label: string; hint: string; items: unknown[] }>();
  for (const i of shown) {
    const key = i.scheduled_for ? monday(day(i.scheduled_for)).toISOString().slice(0, 10) : "none";
    if (!weeks.has(key)) {
      const label = key === "none" ? "Unscheduled" : `Week of ${fmtDay(key).replace(/^\w+ /, "")}`;
      weeks.set(key, { label, hint: "", items: [] });
    }
    weeks.get(key)!.items.push({ id: i.id, kind: i.kind, title: i.title, date: fmtDay(i.scheduled_for), status: i.status });
  }
  for (const w of weeks.values()) w.hint = `${w.items.length} ${w.items.length === 1 ? "item" : "items"}`;

  const today = TODAY();
  const in7 = new Date(today);
  in7.setUTCDate(in7.getUTCDate() + 7);
  const thisWeek = items.filter((i) => i.scheduled_for && day(i.scheduled_for) >= today && day(i.scheduled_for) < in7 && i.status !== "published").length;
  return {
    view,
    empty: shown.length ? "" : "Nothing here.",
    counts: {
      week: String(thisWeek),
      review: String(items.filter((i) => i.status === "needs review").length),
      published: String(items.filter((i) => i.status === "published").length),
      ideas: String(items.filter((i) => i.status === "idea").length),
    },
    weeks: [...weeks.values()],
  };
}

export function scheduleSurface(items: Item[], view: View = "Next two weeks"): Msg[] {
  return create(
    "schedule",
    [
      { id: "root", component: "Card", eyebrow: "Pebble Studio", title: "Content schedule", children: ["stats", "filter", "empty", "weeks"] },
      { id: "stats", component: "Row", children: ["sWeek", "sReview", "sPublished", "sIdeas"] },
      { id: "sWeek", component: "Stat", label: "Due in 7 days", value: bind("/counts/week") },
      { id: "sReview", component: "Stat", label: "Needs you", value: bind("/counts/review") },
      { id: "sPublished", component: "Stat", label: "Published", value: bind("/counts/published") },
      { id: "sIdeas", component: "Stat", label: "Ideas", value: bind("/counts/ideas") },
      { id: "filter", component: "Choice", label: "Show", options: [...VIEWS], value: bind("/view"),
        action: { event: { name: "set_view", context: { view: bind("/view") } } } },
      { id: "empty", component: "Text", tone: "muted", text: bind("/empty") },
      { id: "weeks", component: "Column", gap: "lg", children: { componentId: "week", path: "/weeks" } },
      { id: "week", component: "Section", title: bind("label"), hint: bind("hint"), children: { componentId: "item", path: "items" } },
      { id: "item", component: "ContentItem", kind: bind("kind"), title: bind("title"), date: bind("date"), status: bind("status"),
        action: { event: { name: "open_item", context: { id: bind("id") } } } },
    ],
    scheduleData(items, view),
  );
}

const KIND_LABEL: Record<string, string> = { article: "Article", social: "LinkedIn post", short: "Short video", video: "Video", newsletter: "Newsletter", launch: "Product launch" };

export function itemEditor(item: Item): Msg[] {
  const components: Msg[] = [
    { id: "root", component: "Card", eyebrow: KIND_LABEL[item.kind] ?? item.kind, title: "Edit", children: ["title", "status", "date", "meta", "notes", "link", "actions"] },
    { id: "title", component: "TextField", label: "Title", value: bind("/item/title") },
    { id: "status", component: "Choice", label: "Status", options: STATUSES, value: bind("/item/status") },
    { id: "date", component: "DateField", label: "Date", value: bind("/item/date") },
    { id: "meta", component: "Text", tone: "muted", text: bind("/item/meta") },
    { id: "notes", component: "Text", text: bind("/item/notes") },
    { id: "link", component: "Link", label: "Open", href: bind("/item/url") },
    { id: "actions", component: "Row", justify: "end", children: ["cancel", "save"] },
    { id: "cancel", component: "Button", label: "Close", variant: "ghost", action: { event: { name: "close_editor", context: { surface: "editor" } } } },
    { id: "save", component: "Button", label: "Save", variant: "primary",
      action: { event: { name: "save_item", context: { id: bind("/item/id"), title: bind("/item/title"), status: bind("/item/status"), date: bind("/item/date") } } } },
  ];
  return create("editor", components, {
    item: {
      id: item.id,
      title: item.title,
      status: item.status,
      date: item.scheduled_for ?? "",
      meta: [item.channel, item.series].filter(Boolean).join(" · "),
      notes: item.notes ?? "",
      url: item.url ?? "",
    },
  });
}

/* ── Products ───────────────────────────────────────────── */
const money = (n: number, cur = "USD") =>
  n === 0 ? "Free" : new Intl.NumberFormat(cur === "USD" ? "en-US" : "en-GB", { style: "currency", currency: cur, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);

export function productsData(products: Product[]) {
  return {
    counts: {
      onSale: String(products.filter((p) => p.status === "on sale").length),
      soon: String(products.filter((p) => p.status === "coming soon").length),
      revenue: money(products.reduce((n, p) => n + p.revenue, 0)).replace("Free", "$0"),
    },
    products: products.map((p) => ({ slug: p.slug, title: p.title, summary: p.summary ?? "", price: money(p.price, p.currency), status: p.status })),
  };
}

export function productsSurface(products: Product[]): Msg[] {
  return create(
    "products",
    [
      { id: "root", component: "Card", eyebrow: "Pebble Studio", title: "Products", children: ["stats", "list", "note"] },
      { id: "stats", component: "Row", children: ["sSale", "sSoon", "sRevenue"] },
      { id: "sSale", component: "Stat", label: "On sale", value: bind("/counts/onSale") },
      { id: "sSoon", component: "Stat", label: "Coming soon", value: bind("/counts/soon") },
      { id: "sRevenue", component: "Stat", label: "Revenue", value: bind("/counts/revenue") },
      { id: "list", component: "Column", gap: "md", children: { componentId: "product", path: "/products" } },
      { id: "product", component: "ProductCard", title: bind("title"), summary: bind("summary"), price: bind("price"), status: bind("status"),
        action: { event: { name: "open_product", context: { slug: bind("slug") } } } },
      { id: "note", component: "Text", tone: "muted", text: "The website still reads products from the site repository. Publishing changes from here comes next." },
    ],
    productsData(products),
  );
}

export function productEditor(p: Product): Msg[] {
  return create(
    "editor",
    [
      { id: "root", component: "Card", eyebrow: "Product", title: bind("/p/title"), children: ["price", "status", "checkout", "launch", "channel", "actions"] },
      { id: "price", component: "TextField", label: "Price (USD)", value: bind("/p/price") },
      { id: "status", component: "Choice", label: "Status", options: ["draft", "coming soon", "on sale"], value: bind("/p/status") },
      { id: "checkout", component: "TextField", label: "Polar checkout link", placeholder: "https://…", value: bind("/p/checkout") },
      { id: "launch", component: "DateField", label: "Launch date", value: bind("/p/launch") },
      { id: "channel", component: "Choice", label: "Announce first on", options: ["Newsletter", "LinkedIn", "Both"], value: bind("/p/channel") },
      { id: "actions", component: "Row", justify: "end", children: ["cancel", "save"] },
      { id: "cancel", component: "Button", label: "Close", variant: "ghost", action: { event: { name: "close_editor", context: { surface: "editor" } } } },
      { id: "save", component: "Button", label: "Save", variant: "primary",
        action: { event: { name: "save_product", context: { slug: bind("/p/slug"), price: bind("/p/price"), status: bind("/p/status"), checkout: bind("/p/checkout"), launch: bind("/p/launch"), channel: bind("/p/channel") } } } },
    ],
    { p: { slug: p.slug, title: p.title, price: String(p.price), status: p.status, checkout: p.checkout_url ?? "", launch: p.launch_date ?? "", channel: p.launch_channel ?? "Newsletter" } },
  );
}

/* ── Leads ──────────────────────────────────────────────── */
export const LEAD_VIEWS = ["Open", "New", "Won", "Everything"] as const;
export type LeadView = (typeof LEAD_VIEWS)[number];
const OPEN: string[] = ["new", "contacted", "call booked", "proposal sent"];
const LEAD_TONE: Record<string, string> = { new: "pink", contacted: "accent", "call booked": "accent", "proposal sent": "accent", won: "success", lost: "neutral", "not a fit": "neutral" };
const ago = (iso: string) => {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return d <= 0 ? "Today" : d === 1 ? "Yesterday" : d < 7 ? `${d} days ago` : new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

export function leadsData(leads: Lead[], view: LeadView = "Open") {
  const shown = leads.filter((l) => view === "Everything" ? true : view === "Open" ? OPEN.includes(l.status) : view === "New" ? l.status === "new" : l.status === "won");
  const monthStart = new Date(); monthStart.setUTCDate(1); monthStart.setUTCHours(0, 0, 0, 0);
  return {
    view,
    empty: shown.length ? "" : leads.length ? "Nothing in this view." : "No enquiries yet. They arrive here from pebbleinteractive.com/contact.",
    counts: {
      new: String(leads.filter((l) => l.status === "new").length),
      open: String(leads.filter((l) => OPEN.includes(l.status)).length),
      month: String(leads.filter((l) => new Date(l.created_at) >= monthStart).length),
      won: String(leads.filter((l) => l.status === "won").length),
    },
    leads: shown.map((l) => ({
      id: l.id,
      title: l.company ? `${l.company} · ${l.name}` : l.name,
      detail: [ago(l.created_at), l.budget, l.services.slice(0, 2).join(", ")].filter(Boolean).join(" · "),
      tag: l.status,
      tone: LEAD_TONE[l.status] ?? "neutral",
    })),
  };
}

export function leadsSurface(leads: Lead[], view: LeadView = "Open"): Msg[] {
  return create(
    "leads",
    [
      { id: "root", component: "Card", eyebrow: "Pebble Studio", title: "Leads", children: ["stats", "filter", "empty", "list"] },
      { id: "stats", component: "Row", children: ["sNew", "sOpen", "sMonth", "sWon"] },
      { id: "sNew", component: "Stat", label: "New", value: bind("/counts/new") },
      { id: "sOpen", component: "Stat", label: "In progress", value: bind("/counts/open") },
      { id: "sMonth", component: "Stat", label: "This month", value: bind("/counts/month") },
      { id: "sWon", component: "Stat", label: "Won", value: bind("/counts/won") },
      { id: "filter", component: "Choice", label: "Show", options: [...LEAD_VIEWS], value: bind("/view"),
        action: { event: { name: "set_lead_view", context: { view: bind("/view") } } } },
      { id: "empty", component: "Text", tone: "muted", text: bind("/empty") },
      { id: "list", component: "Column", gap: "sm", children: { componentId: "lead", path: "/leads" } },
      { id: "lead", component: "ListItem", title: bind("title"), detail: bind("detail"), tag: bind("tag"), tone: bind("tone"),
        action: { event: { name: "open_lead", context: { id: bind("id") } } } },
    ],
    leadsData(leads, view),
  );
}

export function leadEditor(l: Lead): Msg[] {
  const facts: [string, string | null][] = [
    ["Role", l.role], ["Website", l.website], ["Company size", l.company_size],
    ["Looking for", l.services.join(", ") || null], ["Design system", l.has_design_system],
    ["How", [l.engagement, l.budget].filter(Boolean).join(", ") || null], ["When", l.timeline],
    ["Heard about us", l.heard_from], ["Received", new Date(l.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })],
  ];
  const shown = facts.filter(([, v]) => v);
  const subject = encodeURIComponent(`Re: your enquiry to Pebble Interactive`);
  return create(
    "editor",
    [
      { id: "root", component: "Card", eyebrow: bind("/l/company"), title: bind("/l/name"), children: ["reply", "facts", "message", "status", "notes", "actions"] },
      { id: "reply", component: "Link", label: bind("/l/replyLabel"), href: bind("/l/mailto") },
      { id: "facts", component: "Column", gap: "sm", children: { componentId: "fact", path: "/l/facts" } },
      { id: "fact", component: "MetricRow", label: bind("k"), value: bind("v"), status: "plain" },
      { id: "message", component: "Text", text: bind("/l/message") },
      { id: "status", component: "Choice", label: "Status", options: [...LEAD_STATUSES], value: bind("/l/status") },
      { id: "notes", component: "TextField", label: "Notes", placeholder: "Call booked, next step…", value: bind("/l/notes") },
      { id: "actions", component: "Row", justify: "end", children: ["cancel", "save"] },
      { id: "cancel", component: "Button", label: "Close", variant: "ghost", action: { event: { name: "close_editor", context: { surface: "editor" } } } },
      { id: "save", component: "Button", label: "Save", variant: "primary",
        action: { event: { name: "save_lead", context: { id: bind("/l/id"), status: bind("/l/status"), notes: bind("/l/notes") } } } },
    ],
    { l: {
      id: l.id, name: l.name, company: l.company ?? "Lead", status: l.status, notes: l.notes ?? "",
      message: l.message ?? "No message.", replyLabel: `Reply to ${l.email}`, mailto: `mailto:${l.email}?subject=${subject}`,
      facts: shown.map(([k, v]) => ({ k, v })),
    } },
  );
}
