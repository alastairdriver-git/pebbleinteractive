// Generate social thumbnails: screenshot every built /og-cards/<slug>/ page
// into public/og/<slug>.png (1200×630). Run with `pnpm og` from the repo root
// (it builds first), then commit the PNGs. Needs Google Chrome installed locally.
import { createServer } from "node:http";
import { readFile, mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const out = join(root, "public", "og");
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

const slugs = await cards(join(dist, "og-cards"));
for (const slug of slugs) {
  const file = join(out, `${slug}.png`);
  await mkdir(dirname(file), { recursive: true });
  await run(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--window-size=1200,630", "--force-device-scale-factor=1",
    "--virtual-time-budget=6000",
    `--screenshot=${file}`,
    `http://127.0.0.1:${port}/og-cards/${slug}/`,
  ]);
  console.log(`og: public/og/${slug}.png`);
}
server.close();
console.log(`og: ${slugs.length} thumbnail(s) written`);
