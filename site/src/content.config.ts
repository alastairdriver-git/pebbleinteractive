import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { corePageSchema } from "@grade/astro-kit/content";

/* Pebble Interactive is a services studio — the generic core schema covers the
   info pages. Case studies live in their own `work` collection, rendered by
   src/pages/work/[slug].astro and listed (by `order`) on /work. */
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    client: z.string(),
    /** Headline for the case study (H1). */
    title: z.string(),
    /** Eyebrow, e.g. "Design systems · Fintech". */
    category: z.string(),
    /** Standfirst under the title; also the meta description. */
    intro: z.string(),
    sector: z.string(),
    role: z.string(),
    period: z.string().optional(),
    /** Card and social image (16:9 works best). */
    thumb: z.string(),
    ogImage: z.string().optional(),
    /** Optional hero media under the header. */
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroVideo: z.string().optional(),
    heroPoster: z.string().optional(),
    testimonial: z
      .object({ quote: z.string(), name: z.string(), role: z.string() })
      .optional(),
    link: z.object({ label: z.string(), href: z.string() }).optional(),
    /** Lower comes first on /work and the homepage. */
    order: z.number(),
    /** Year the work is dated to, for structured data. */
    year: z.string(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: corePageSchema,
  }),
  work,
};
