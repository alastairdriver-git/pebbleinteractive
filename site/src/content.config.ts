import { defineCollection, z } from "astro:content";
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

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: corePageSchema,
  }),
  work,
};
