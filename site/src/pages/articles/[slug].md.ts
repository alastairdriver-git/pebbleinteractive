/* Markdown version of every article at /articles/<slug>.md, for AI agents
   and AI search. Same content as the page, as plain text. */
import { getArticles } from "../../lib/content";
import { SITE_URL } from "../../lib/seo";
import { AUTHOR } from "../../lib/site.config";

export async function getStaticPaths() {
  return (await getArticles()).filter((a) => !a.data.draft).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export async function GET({ props }: { props: { entry: any } }) {
  const { entry } = props;
  const d = entry.data;
  const url = `${SITE_URL}/articles/${entry.id}`;
  const body = String(entry.body ?? "")
    // Diagram cards and images keep their alt text and caption; make paths absolute.
    .replace(/\]\(\//g, `](${SITE_URL}/`)
    // Live A2UI demos only work on the page itself.
    .replace(/^\{\{a2ui ([a-z0-9-]+)\}\}$/gm, `(Live A2UI demo "$1": see ${url})`);
  const md = `# ${d.title}

> ${d.description}

By ${AUTHOR.name}, ${AUTHOR.role}. Published ${d.pubDate.toISOString().slice(0, 10)}. Series: ${d.series}.
Source: ${url}

${body.trim()}
`;
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
