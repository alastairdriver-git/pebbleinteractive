---
name: pebble-content
description: Add or edit case studies (and, later, articles) on pebbleinteractive.com in the house structure, with a generated social thumbnail and schema.org JSON-LD. Use when asked to add a case study, write up a project for the site, add an article or blog post, update work pages, or make or refresh thumbnails / OG images / meta images.
---

# Pebble content: case studies, articles and thumbnails

The site is Astro (`site/`) on the Grade kit. Case studies are a content collection; every page carries JSON-LD; every case study (and article) gets a generated 1200×630 social thumbnail.

## Case studies

Files: `site/src/content/work/<slug>.md`. Frontmatter only, no body. The structure is fixed and enforced by the schema in `site/src/content.config.ts`; the build fails if a case study breaks it.

Every case study has, in this order:

1. **Header:** `category` (eyebrow, e.g. "Design systems · Fintech"), `title` (what Pebble did, plainly: "Design and prototyping for…"), `intro` (two sentences: who the client is, then what Pebble did), facts `client`, `sector`, `period`, `role`, and a `hero` image or video with a caption.
2. **`brief`:** the client's situation and need, in one paragraph.
3. **`workstreams`:** 2 to 4, each a short `title` and one or two sentences; an image or video is optional.
4. **`outcome`:** one or two sentences on what changed. `metrics` (up to 3) only where real figures exist.
5. **`demonstrates`:** 3 or 4 rows of capability → evidence (shown in the dark band).
6. **`testimonial`** (optional, quote exactly as given) and a `link` out.
7. Listing and SEO: `thumb` (card image, 16:10 crop from the top), `order` (lower first), `year`, `keywords`.

Copy one of the existing files as a starting point. Images go in `site/public/work/<slug>/`. Compress video with ffmpeg to 1080p (`-crf 26 -movflags +faststart`) before adding it.

### House style

- Pebble's voice: "we" and "Pebble", plain British English, sentence case.
- Short and specific. No adjectives that can't be backed up. Don't invent figures, dates or roles: use what the source material says.
- No explicit counts unless they are real results the client would stand behind.
- Client names, screenshots and quotes only with the client's agreement.

## Thumbnails (social / meta images)

Every case study's `og:image` is `/og/work/<slug>.png`, generated from its frontmatter. After adding or changing a case study (title, category, client or thumb), run from the repo root:

```bash
pnpm og
```

That builds the site, screenshots each card page (`site/src/pages/og-cards/[...slug].astro`) with local Google Chrome, and writes `site/public/og/<collection>/<slug>.png`. Commit the PNGs with the content. To change how every thumbnail looks, edit the card page; to override one, set `ogImage` in that file's frontmatter.

## Articles (when the collection exists)

Follow the same pattern as `work`: a collection in `content.config.ts`, pages under `site/src/pages/articles/`, and a branch in the og-cards `getStaticPaths` so each article gets `/og/articles/<slug>.png`. Articles use `BlogPosting` JSON-LD with the author (Alastair Driver), dates and the related case study. See the articles plan for topics and format.

## Structured data

Helpers live in `site/src/lib/seo.ts` and render through `site/src/components/JsonLd.astro` into `<head>`. Every page includes the shared `organization()` and `website()` nodes plus its own (`webPage`, `caseStudy`, `workList`, `breadcrumbs`). New page types should add a helper there rather than inline JSON.

## Before publishing

1. `pnpm build` passes (it validates every case study).
2. `pnpm og` run, and the new PNGs look right.
3. Check the page at desktop and phone width.
4. Commit and push `main`; Vercel deploys it. Check the live URL returns 200.
