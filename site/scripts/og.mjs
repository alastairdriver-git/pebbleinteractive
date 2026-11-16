// Generate images from built card pages, then commit the PNGs:
//  - social thumbnails: /og-cards/<slug>/     → public/og/<slug>.png      (1200×630)
//  - article diagrams:  /figure-cards/<slug>/ → public/figures/<slug>.png (1600×1000)
// Run with `pnpm og` from the repo root (it builds first). Needs Google Chrome.
// `pnpm og -- figures` or `-- og` renders just one set.
import { createServer } from "node:http";
import { readFile, mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SETS = [
  { name: "og", dir: "og-cards", out: join(root, "public", "og"), size: "1200,630" },
  { name: "figures", dir: "figure-cards", out: join(root, "public", "figures"), size: "1600,1000" },
  { name: "carousels", dir: "carousel-cards", out: join(root, "public", "carousels"), size: "1080,1350" },
];
const only = process.argv.slice(2).find((a) => SETS.some((s) => s.name === a));
const CHROME =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

// Tiny static server over dist/, so absolute image paths (/work/...) resolve.
const server = createServer(async (req, res) => {
  let p = join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, "index.html");
    res.writeHead(200, { "content-type": types[extname(p)] ?? "application/octet-stream" });
    res.end(await readFile(p));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

// Find every card page: dist/og-cards/**/index.html
async function cards(dir, prefix = "") {
  const found = [];
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    if ((await stat(full)).isDirectory()) found.push(...(await cards(full, prefix ? `${prefix}/${name}` : name)));
    else if (name === "index.html" && prefix) found.push(prefix);
  }
  return found;
}

let total = 0;
for (const set of SETS) {
  if (only && set.name !== only) continue;
  let slugs = [];
  try { slugs = await cards(join(dist, set.dir)); } catch { continue; }
  for (const slug of slugs) {
    // A carousel's "/all" page becomes one multi-page PDF (LinkedIn document post).
    if (slug.endsWith("/all")) {
      const pdf = join(set.out, `${slug.slice(0, -4)}.pdf`);
      await mkdir(dirname(pdf), { recursive: true });
      await run(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=8000", `--print-to-pdf=${pdf}`, `http://127.0.0.1:${port}/${set.dir}/${slug}/`]);
      console.log(`og: public/${set.name}/${slug.slice(0, -4)}.pdf`);
      total++;
      continue;
    }
    const file = join(set.out, `${slug}.png`);
    await mkdir(dirname(file), { recursive: true });
    await run(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      `--window-size=${set.size}`, "--force-device-scale-factor=1",
      "--virtual-time-budget=6000",
      `--screenshot=${file}`,
      `http://127.0.0.1:${port}/${set.dir}/${slug}/`,
    ]);
    console.log(`og: public/${set.name}/${slug}.png`);
    total++;
  }
}
server.close();
console.log(`og: ${total} image(s) written`);
