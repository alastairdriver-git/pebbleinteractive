/* Markdown version of every product page at /products/<slug>.md, for AI
   agents and AI search. */
import { getProducts, formatPrices } from "../../lib/content";
import { SITE_URL } from "../../lib/seo";

export async function getStaticPaths() {
  return (await getProducts()).filter((p) => p.data.status !== "draft").map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export async function GET({ props }: { props: { entry: any } }) {
  const { entry } = props;
  const d = entry.data;
  const url = `${SITE_URL}/products/${entry.id}`;
  const price = d.status === "live" ? formatPrices(d.price, d.currency, d.priceGbp) : "Coming soon";
  const list = (xs: string[]) => xs.map((x) => `- ${x}`).join("\n");
  const md = `# ${d.title}

> ${d.summary}

Format: ${d.format}. Price: ${price}. ${d.price === 0 && d.downloadUrl ? `Free download: ${SITE_URL}${d.downloadUrl}` : `Buy: ${url}`}
Source: ${url}

${d.problem ? `## The problem\n\n${d.problem}\n\n` : ""}${d.outcomes.length ? `## What you'll be able to do\n\n${list(d.outcomes)}\n\n` : ""}## What's included

${list(d.includes)}

## Who it's for

${d.forWho}

${String(entry.body ?? "").trim()}
${d.faqs.length ? `\n## Questions\n\n${d.faqs.map((f: any) => `### ${f.q}\n\n${f.a}`).join("\n\n")}\n` : ""}`;
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
