/* RSS feed of published articles at /rss.xml (handy for Substack imports,
   Medium, dev.to and feed readers). */
import { getCollection } from "astro:content";
import { SITE_URL } from "../lib/seo";
import { AUTHOR } from "../lib/site.config";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const items = (await getCollection("articles"))
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Pebble Interactive articles</title>
<link>${SITE_URL}/articles</link>
<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
<description>Design systems, AI in the design process and editing AI output, from Pebble Interactive.</description>
<language>en-gb</language>
${items
  .map((a) => {
    const url = `${SITE_URL}/articles/${a.id}`;
    return `<item>
<title>${esc(a.data.title)}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<pubDate>${a.data.pubDate.toUTCString()}</pubDate>
<description>${esc(a.data.description)}</description>
<category>${esc(a.data.series)}</category>
<author>hello@pebbleinteractive.com (${esc(AUTHOR.name)})</author>
</item>`;
  })
  .join("\n")}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
