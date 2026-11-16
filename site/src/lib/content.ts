/* Collection helpers that apply the publishing rules in one place.
   Drafts (articles with draft: true, products with status "draft") show in
   `astro dev` and on Vercel preview deploys, never in production. */
import { getCollection, type CollectionEntry } from "astro:content";

export const SHOW_DRAFTS = import.meta.env.DEV || process.env.VERCEL_ENV === "preview";

export async function getArticles(): Promise<CollectionEntry<"articles">[]> {
  return (await getCollection("articles"))
    .filter((a) => SHOW_DRAFTS || !a.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProducts(): Promise<CollectionEntry<"products">[]> {
  return (await getCollection("products"))
    .filter((p) => SHOW_DRAFTS || p.data.status !== "draft")
    .sort((a, b) => a.data.order - b.data.order);
}

/** Minutes to read, at 230 words a minute. */
export const readingTime = (body = "") =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230));

export const wordCount = (body = "") => body.split(/\s+/).filter(Boolean).length;

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const formatPrice = (price: number, currency = "USD") =>
  price === 0
    ? "Free"
    : new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-GB", { style: "currency", currency, maximumFractionDigits: price % 1 ? 2 : 0 }).format(price);

/** "$19 · £15" when a GBP price is set. */
export const formatPrices = (price: number, currency = "USD", gbp?: number) =>
  price === 0 ? "Free" : gbp ? `${formatPrice(price, currency)} · £${gbp}` : formatPrice(price, currency);
