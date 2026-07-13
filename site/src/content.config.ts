import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { corePageSchema } from "@grade/astro-kit/content";

/* Pebble Interactive is a services studio — the generic core schema covers it.
   If case studies land later, merge `portfolioPack` here. */
export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: corePageSchema,
  }),
};
