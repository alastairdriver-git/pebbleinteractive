import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { corePageSchema } from "@grade/astro-kit/content";

/* Pebble Interactive is a services studio — the generic core schema covers the
   info pages. Case studies live in their own `work` collection, rendered by
   src/pages/work/[slug].astro and listed (by `order`) on /work.

   Every case study has the same structure, enforced here (modelled on the
   Glint and BrightLocal one-pagers):
     header (eyebrow, title, standfirst, facts, hero)
     → the brief → what we did (2–4 work streams) → outcome (+ metrics)
     → what this demonstrates → testimonial (optional) → link */
const media = {
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  video: z.string().optional(),
  poster: z.string().optional(),
  caption: z.string().optional(),
};

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    // Header
    client: z.string(),
    title: z.string(),
    category: z.string(),
    intro: z.string(),
    sector: z.string(),
    role: z.string(),
    period: z.string(),
    hero: z.object(media),
    // Body
    brief: z.string(),
    workstreams: z
      .array(z.object({ title: z.string(), body: z.string(), ...media }))
      .min(2)
      .max(4),
    outcome: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(3).optional(),
    demonstrates: z.array(z.object({ skill: z.string(), evidence: z.string() })).min(3).max(4),
    testimonial: z.object({ quote: z.string(), name: z.string(), role: z.string() }).optional(),
    link: z.object({ label: z.string(), href: z.string() }),
    // Listing and SEO
    thumb: z.string(),
    ogImage: z.string().optional(),
    order: z.number(),
    year: z.string(),
    keywords: z.array(z.string()).default([]),
  }),
});

/* Articles: Markdown with a body. `draft` defaults to true so nothing goes out
   until it has been edited and the flag is flipped to false. Drafts render in
   `astro dev` and on Vercel preview deploys, never in production. */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // standfirst, also the meta description
    series: z.enum([
      "Design systems in practice",
      "AI in the design process",
      "Curating AI output",
      "Ethics and trust",
    ]),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    related: z.array(reference("work")).default([]), // case studies it draws on
    products: z.array(reference("products")).default([]), // products to mention at the end
    image: z.string().optional(), // optional hero image, also used on the thumbnail
    imageAlt: z.string().optional(),
    ogImage: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

/* Digital products sold through a merchant of record (Lemon Squeezy).
   status: draft (hidden in production) → soon (listed, no checkout)
   → live (needs checkoutUrl, or price 0 for a free download). */
const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(), // one sentence for cards and meta
      price: z.number(), // in `currency`; 0 = free
      currency: z.string().default("USD"),
      status: z.enum(["draft", "soon", "live"]).default("draft"),
      checkoutUrl: z.string().url().optional(), // Lemon Squeezy checkout link
      downloadUrl: z.string().optional(), // free products: direct file
      format: z.string(), // e.g. "PDF and editable Word files"
      includes: z.array(z.string()).min(1),
      forWho: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      sample: z.object({ label: z.string(), href: z.string() }).optional(),
      order: z.number(),
      keywords: z.array(z.string()).default([]),
    })
    .refine((p) => p.status !== "live" || p.checkoutUrl || (p.price === 0 && p.downloadUrl), {
      message: "A live product needs a checkoutUrl (or, if free, a downloadUrl)",
    }),
});

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: corePageSchema,
  }),
  work,
  articles,
  products,
};
