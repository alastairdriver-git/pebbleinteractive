/* Data access for Pebble Studio. Reads and writes go through Supabase with
   the signed-in user's session, so row-level security applies to every call
   (only Ali's account is a studio member).

   Demo mode (development only, STUDIO_DEMO=1) serves an in-memory copy of
   the seed data so the screens can be built and checked without signing in.
   It can never switch on in production. */
import { createClient } from "./supabase";
import { demoItems, demoLeads, demoProducts } from "./fixtures";

export type ItemKind = "article" | "social" | "short" | "video" | "newsletter" | "launch";
export type ItemStatus = "idea" | "draft" | "needs review" | "approved" | "scheduled" | "published";
export const STATUSES: ItemStatus[] = ["idea", "draft", "needs review", "approved", "scheduled", "published"];

export type Item = {
  id: string;
  kind: ItemKind;
  title: string;
  series: string | null;
  source: string | null;
  channel: string | null;
  status: ItemStatus;
  scheduled_for: string | null;
  url: string | null;
  parent_id: string | null;
  notes: string | null;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  price: number;
  currency: string;
  status: "draft" | "coming soon" | "on sale";
  checkout_url: string | null;
  format: string | null;
  sort: number;
  sales: number;
  revenue: number;
  launch_date: string | null;
  launch_channel: string | null;
};

export const LEAD_STATUSES = ["new", "contacted", "call booked", "proposal sent", "won", "lost", "not a fit"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type Lead = {
  id: string;
  created_at: string;
  status: LeadStatus;
  name: string;
  email: string;
  role: string | null;
  company: string | null;
  website: string | null;
  company_size: string | null;
  services: string[];
  has_design_system: string | null;
  engagement: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  heard_from: string | null;
  notes: string | null;
};

export const isDemo = () => process.env.NODE_ENV !== "production" && process.env.STUDIO_DEMO === "1";

// Demo store lives for the life of the dev server process.
const g = globalThis as unknown as { __studioDemo?: { items: Item[]; products: Product[]; leads: Lead[] } };
const demo = () => (g.__studioDemo ??= { items: structuredClone(demoItems), products: structuredClone(demoProducts), leads: structuredClone(demoLeads) });

const ITEM_COLUMNS = "id, kind, title, series, source, channel, status, scheduled_for, url, parent_id, notes";
const PRODUCT_COLUMNS = "id, slug, title, summary, price, currency, status, checkout_url, format, sort, sales, revenue, launch_date, launch_channel";

export async function getItems(): Promise<Item[]> {
  if (isDemo()) return demo().items;
  const db = await createClient();
  const { data, error } = await db.from("items").select(ITEM_COLUMNS).order("scheduled_for", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Item[];
}

export async function updateItem(id: string, patch: Partial<Pick<Item, "title" | "status" | "scheduled_for" | "notes">>) {
  if (isDemo()) {
    const it = demo().items.find((i) => i.id === id);
    if (it) Object.assign(it, patch);
    return;
  }
  const db = await createClient();
  const { error } = await db.from("items").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getProducts(): Promise<Product[]> {
  if (isDemo()) return demo().products;
  const db = await createClient();
  const { data, error } = await db.from("products").select(PRODUCT_COLUMNS).order("sort", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((p: any) => ({ ...p, price: Number(p.price), revenue: Number(p.revenue) })) as Product[];
}

export async function updateProduct(slug: string, patch: Partial<Pick<Product, "price" | "status" | "checkout_url" | "launch_date" | "launch_channel">>) {
  if (isDemo()) {
    const p = demo().products.find((x) => x.slug === slug);
    if (p) Object.assign(p, patch);
    return;
  }
  const db = await createClient();
  const { error } = await db.from("products").update(patch).eq("slug", slug);
  if (error) throw new Error(error.message);
}

const LEAD_COLUMNS = "id, created_at, status, name, email, role, company, website, company_size, services, has_design_system, engagement, budget, timeline, message, heard_from, notes";

export async function getLeads(): Promise<Lead[]> {
  if (isDemo()) return demo().leads;
  const db = await createClient();
  const { data, error } = await db.from("leads").select(LEAD_COLUMNS).order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Lead[];
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "notes">>) {
  if (isDemo()) {
    const l = demo().leads.find((x) => x.id === id);
    if (l) Object.assign(l, patch);
    return;
  }
  const db = await createClient();
  const { error } = await db.from("leads").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

/** The signed-in studio user, or null. Demo mode reports a demo user. */
export async function currentUser(): Promise<{ email: string } | null> {
  if (isDemo()) return { email: "demo (development only)" };
  const db = await createClient();
  const { data } = await db.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  return email && email === process.env.STUDIO_EMAIL?.toLowerCase() ? { email } : null;
}
