// Link preview cards for articles. A URL on a line of its own in an article
// becomes a card (title, description, image). This script fetches each
// page's metadata once and saves it, so builds never depend on other sites:
//   src/data/link-previews.json   (metadata, keyed by URL)
//   public/link-previews/<name>   (og:image, or a 1200×630 screenshot of the
//                                   page when it has no image of its own)
// Run `pnpm links` (repo root) after adding a link; commit the results.
// `--refresh` re-fetches links already saved.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = join(root, "src", "data", "link-previews.json");
const imgDir = join(root, "public", "link-previews");
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const refresh = process.argv.includes("--refresh");

let data = {};
try { data = JSON.parse(await readFile(dataFile, "utf8")); } catch {}

// Collect standalone URLs from every article.
const dir = join(root, "src", "content", "articles");
const urls = new Set();
for (const f of await readdir(dir)) {
  if (!f.endsWith(".md")) continue;
  for (const line of (await readFile(join(dir, f), "utf8")).split("\n")) {
    const m = line.trim().match(/^<?(https?:\/\/[^\s>]+)>?$/);
    if (m) urls.add(m[1]);
  }
}

const decode = (s = "") => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
const meta = (html, key) => {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  return tag ? decode(tag.match(/content=["']([^"']*)["']/i)?.[1]) : undefined;
};
const slug = (u) => new URL(u).host.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-") + (new URL(u).pathname.replace(/[^a-z0-9]+/gi, "-").replace(/-+$/, "") || "");

await mkdir(imgDir, { recursive: true });
await mkdir(dirname(dataFile), { recursive: true });
for (const url of urls) {
  if (data[url] && !refresh) continue;
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (link preview; pebbleinteractive.com)" }, redirect: "follow" });
  const html = await res.text();
  const title = meta(html, "og:title") ?? decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]) ?? url;
  const description = meta(html, "og:description") ?? meta(html, "description") ?? "";
  const site = meta(html, "og:site_name") ?? new URL(url).host.replace(/^www\./, "");
  const ogImage = meta(html, "og:image") ?? meta(html, "twitter:image");
  const name = slug(url);
  let image;
  if (ogImage) {
    const src = new URL(ogImage, url).href;
    const r = await fetch(src);
    const ext = extname(new URL(src).pathname) || ".png";
    image = `/link-previews/${name}${ext}`;
    await writeFile(join(root, "public", image), Buffer.from(await r.arrayBuffer()));
  } else {
    image = `/link-previews/${name}.png`;
    await run(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630", "--force-device-scale-factor=1", "--virtual-time-budget=6000", `--screenshot=${join(root, "public", image)}`, url]);
  }
  data[url] = { url, title, description, site, image, fetched: new Date().toISOString().slice(0, 10) };
  console.log(`links: ${url} → ${title}`);
}
await writeFile(dataFile, JSON.stringify(data, null, 2) + "\n");
console.log(`links: ${Object.keys(data).length} preview(s) saved`);
