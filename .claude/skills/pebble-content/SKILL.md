---
name: pebble-content
description: Add or edit case studies, articles and digital products on pebbleinteractive.com in the house structure, with a generated social thumbnail and schema.org JSON-LD. Use when asked to add a case study, write up a project for the site, write or publish an article or blog post, add or launch a product, set up the newsletter form, update work pages, or make or refresh thumbnails / OG images / meta images.
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

Every case study, article and product gets a generated `og:image` at `/og/<collection>/<slug>.png` (cards without an image use a text-only layout). After adding or changing one, run from the repo root:

```bash
pnpm og
```

That builds the site, screenshots each card page (`site/src/pages/og-cards/[...slug].astro`) with local Google Chrome, and writes `site/public/og/<collection>/<slug>.png`. Commit the PNGs with the content. To change how every thumbnail looks, edit the card page; to override one, set `ogImage` in that file's frontmatter.

## Articles

Files: `site/src/content/articles/<slug>.md`, Markdown body plus frontmatter (schema in `content.config.ts`): `title`, `description` (the standfirst and meta description), `series` (one of four), `pubDate`, optional `updated`, `draft`, `related` (case study slugs), `products` (product slugs), optional `image`, `keywords`.

- **Drafts:** `draft` defaults to true. Drafts show in `pnpm dev` and on Vercel preview deploys (push a branch other than `main`), never in production. To publish, an edited article gets `draft: false` and a real `pubDate`.
- **Writing:** one idea, 800 to 1,500 words, drawn from a real case study and linking to it. British English, plain, first person plural for Pebble's work. No invented facts or figures: only what the case study or Ali says. No client confidential detail. Avoid em dashes.
- **Byline:** `AUTHOR` in `site/src/lib/site.config.ts` (Alastair Driver). JSON-LD is `BlogPosting` with the author, dates, word count and `isBasedOn` the related case studies.
- **Feed:** `/rss.xml` lists published articles (use it for Substack, Medium and dev.to imports, with the canonical URL set to pebbleinteractive.com).
- The homepage shows the latest three published articles; the section is hidden until one is published.
- Topics and running order: the content plan (articles 5, 6, 9, 1, 7, 2 first).

### Visuals in articles

Every article should have 2 to 4 visuals. All of these go in the Markdown on a line of their own:

- **Images:** `![Alt text](/path.png "Caption")`. Start the caption with `wide:` to break out of the reading column. MP4s work the same way (looping, muted). Use real case study media from `site/public/work/`; no stock or invented UI.
- **Diagram cards:** branded 1600×1000 PNGs from `site/src/content/figures/<article-slug>.yaml` (types: checklist, steps, comparison, flow, fanout, grid, statement; `tone: dark|light`; in a statement title, `*text*` is highlighted). Quote any list item containing a comma. Run `pnpm og` (or `pnpm og -- figures`), then embed `/figures/<article>/<id>.png`. Card content must come from the article itself.
- **Link cards:** a bare URL on its own line becomes a preview card. Run `pnpm links` to fetch and save the metadata (`site/src/data/link-previews.json`) and image (`site/public/link-previews/`); pages without an og:image get a screenshot.
- **Live A2UI demos:** `{{a2ui name}}` renders a real surface from Pebble's catalogue (`a2ui/`, package `@pebble/a2ui`) using `a2ui/examples/<name>.json`, with a Messages tab, Replay and an action log. Messages are protocol 1.0: data bindings are `{"@path": "/x"}` (not `{"path"}`, which validates but never resolves); template child lists stay `{"componentId": "...", "path": "/list"}`. Enum props can't be bound; use DynamicString. Test the demo in the browser before publishing.

Typography: articles use `.article-prose` (centred 44rem column, lead paragraph, pink markers). Pink (`--pink`) is a fill colour only, never small text on the light background.

## Products

Files: `site/src/content/products/<slug>.md`, frontmatter plus a short Markdown body. `status` is `draft` (hidden in production), `soon` (listed as coming soon, noindex) or `live`. A live product needs `checkoutUrl` (the Lemon Squeezy checkout link) or, if `price: 0`, a `downloadUrl`; the build fails otherwise. Live products get `Product` + `Offer` JSON-LD and the Lemon Squeezy overlay checkout. Never put client IP (screens, specs, data) in a product.

/products is noindex and not linked until a product is live.

## Newsletter

`NEWSLETTER` in `site/src/lib/site.config.ts`. Set `url` to the Substack publication URL and the subscribe block (`components/Subscribe.astro`) appears on articles, products and /articles. It posts straight to Substack, no script. While `url` is empty it renders nothing.

## Structured data

Helpers live in `site/src/lib/seo.ts` and render through `site/src/components/JsonLd.astro` into `<head>`. Every page includes the shared `organization()` and `website()` nodes plus its own (`webPage`, `caseStudy`, `workList`, `breadcrumbs`). New page types should add a helper there rather than inline JSON.

## Before publishing

1. `pnpm build` passes (it validates every case study, article and product).
2. `pnpm og` run, and the new PNGs look right.
3. Check the page at desktop and phone width.
4. Commit and push `main`; Vercel deploys it. Check the live URL returns 200.
