/* /llms.txt: a plain-text map of the site for AI assistants and AI search
   (the llms.txt convention). Lists what Pebble does, the case studies,
   articles and products, with one-line summaries and links. */
import { getCollection } from "astro:content";
import { SITE_URL } from "../lib/seo";

export async function GET() {
  const work = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
  const articles = (await getCollection("articles")).filter((a) => !a.data.draft).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const products = (await getCollection("products")).filter((p) => p.data.status === "live").sort((a, b) => a.data.order - b.data.order);
  const line = (title: string, url: string, desc: string) => `- [${title}](${SITE_URL}${url}): ${desc}`;
  const body = `# Pebble Interactive

> Pebble Interactive is a UK design systems studio (Pebble Interactive Ltd, Brighton, founded 2012, run by Alastair Driver). We design and build design systems, prototypes and product interfaces for regulated, data-heavy products in fintech, healthcare, marketplaces and SaaS, and we make Grade, an open design system for AI prototyping.

Contact: hello@pebbleinteractive.com

Every article and product is also available as Markdown: add .md to its address.

## Case studies

${work.map((w) => line(`${w.data.client}: ${w.data.title}`, `/work/${w.id}`, w.data.intro)).join("\n")}

## Articles

${articles.map((a) => line(a.data.title, `/articles/${a.id}.md`, a.data.description)).join("\n")}

## Products

${products.map((p) => line(p.data.title, `/products/${p.id}.md`, p.data.summary)).join("\n")}

## Optional

- [All articles (RSS)](${SITE_URL}/rss.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Grade design system](https://gradeui.com)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
