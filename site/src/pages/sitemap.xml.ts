/* Sitemap at /sitemap.xml: every public, indexable page. Drafts, unlisted
   pages (/case-studies, /og-cards) and products not yet on sale are left out. */
import { getCollection } from "astro:content";
import { SITE_URL } from "../lib/seo";

export async function GET() {
  const pages = (await getCollection("pages")).filter((p) => p.id !== "index").map((p) => `/${p.id}`);
  const work = (await getCollection("work")).map((w) => `/work/${w.id}`);
  const articles = (await getCollection("articles")).filter((a) => !a.data.draft);
  const products = (await getCollection("products")).filter((p) => p.data.status === "live");
  const urls = [
    "/",
    "/work",
    ...work,
    ...(articles.length ? ["/articles", ...articles.map((a) => `/articles/${a.id}`)] : []),
    ...(products.length ? ["/products", ...products.map((p) => `/products/${p.id}`)] : []),
    ...pages,
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${SITE_URL}${u === "/" ? "/" : u}</loc></url>`).join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
