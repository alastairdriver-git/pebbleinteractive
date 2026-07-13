import { z } from "astro:content";

/* Content schema = generic CORE + optional DOMAIN PACKS.

   A site composes the pack it needs and wires its own glob loader (so the base
   path stays relative to that site):

     import { defineCollection } from "astro:content";
     import { glob } from "astro/loaders";
     import { clinicPageSchema } from "@grade/astro-kit/content";   // or portfolioPageSchema / corePageSchema
     export const collections = {
       pages: defineCollection({
         loader: glob({ pattern: "(markdown glob)", base: "./src/content/pages" }),
         schema: clinicPageSchema,
       }),
     };

   The renderer (PageBody) feature-detects optional fields, so a site only pays
   for the fields its pack adds. Nothing clinic- or portfolio-specific lives in
   the core. */

export const teamMember = z.object({
  name: z.string(),
  role: z.string(),
  photo: z.string(),
  bio: z.string(),
});

export const pricingTier = z.object({
  name: z.string(),
  price: z.string(),
  cadence: z.string().default("/month"),
  featured: z.boolean().default(false),
  signupUrl: z.string().optional(),
  perks: z.array(z.string()),
});

/* ---- SECTION BLOCKS: a page can be an ordered stack of typed sections.
   Each maps to a Grade composition in Sections.astro. This is the "marketing
   blocks" layer — the recurring layouts (media+text, KPIs, feature grid, CTA)
   that every site needs and that Grade has no components for yet. ---- */
const sectionAction = z.object({ label: z.string(), href: z.string().default("#") });

export const pageSection = z.discriminatedUnion("type", [
  // image + text (set reverse:true for text + image)
  z.object({
    type: z.literal("mediaText"),
    eyebrow: z.string().optional(),
    title: z.string(),
    body: z.string().optional(),
    media: z.string().optional(), // image URL; falls back to a MediaSurface placeholder
    mediaHint: z.string().default("landscape"),
    reverse: z.boolean().default(false),
    action: sectionAction.optional(),
    tone: z.enum(["default", "muted", "dark"]).default("default"),
  }),
  // KPI / stat strip
  z.object({
    type: z.literal("kpis"),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    items: z.array(z.object({ figure: z.string(), label: z.string() })),
    tone: z.enum(["default", "muted", "dark"]).default("muted"),
  }),
  // feature / sub-service grid (optionally with media thumbnails)
  z.object({
    type: z.literal("featureGrid"),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    columns: z.number().default(3),
    items: z.array(
      z.object({ title: z.string(), body: z.string().optional(), media: z.boolean().default(false) }),
    ),
    tone: z.enum(["default", "muted", "dark"]).default("default"),
  }),
  // CTA band
  z.object({
    type: z.literal("cta"),
    title: z.string(),
    body: z.string().optional(),
    action: sectionAction.optional(),
    tone: z.enum(["light", "dark", "accent"]).default("dark"),
  }),
  // free-form prose
  z.object({ type: z.literal("richText"), title: z.string().optional(), body: z.string() }),
]);

/* ---- CORE: universal across any content-driven site ---- */
export const corePageSchema = z.object({
  title: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  /** generic page role; drives the layout branch in PageBody */
  kind: z.enum(["home", "index", "detail", "info", "contact"]).default("info"),
  banner: z.string().optional().default(""),
  images: z.array(z.string()).optional().default([]),
  intro: z.string().optional(),
  /** detail-page lede (one-line summary under the title) */
  lede: z.string().optional(),
  /** sub-services / "what's included" — rendered as a card grid on detail pages */
  includes: z.array(z.string()).optional(),
  /** ordered stack of typed section blocks; when present, rendered instead of prose */
  sections: z.array(pageSection).optional(),
  /** grouping for index pages + card thumbnail for detail pages */
  group: z.string().optional(),
  thumb: z.string().optional(),
  // people (team/about) — common enough to be core
  team: z.array(teamMember).optional(),
  // pricing/membership — common enough to be core
  tiers: z.array(pricingTier).optional(),
  termsUrl: z.string().optional(),
  // contact
  phone: z.string().optional(),
  emergencyPhone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  mapEmbed: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

/* ---- DOMAIN PACKS: merge onto the core per site ---- */

/** Clinic / treatments: the duration/results/longevity/frequency spec bar. */
export const clinicPack = z.object({
  stats: z
    .object({
      duration: z.string().optional(),
      results: z.string().optional(),
      longevity: z.string().optional(),
      frequency: z.string().optional(),
    })
    .optional(),
});

/** Portfolio / case studies. */
export const portfolioPack = z.object({
  role: z.string().optional(),
  year: z.string().optional(),
  client: z.string().optional(),
  stack: z.array(z.string()).optional(),
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

export const clinicPageSchema = corePageSchema.merge(clinicPack);
export const portfolioPageSchema = corePageSchema.merge(portfolioPack);

export type CorePageData = z.infer<typeof corePageSchema>;
export type ClinicPageData = z.infer<typeof clinicPageSchema>;
export type PortfolioPageData = z.infer<typeof portfolioPageSchema>;
