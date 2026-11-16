// Render a voiced script to video. Usage:
//   node tools/render.mjs <slug> [--only short,wide,audio] [--still <seconds>]
// Needs public/audio/<slug>/manifest.json from tools/voice.mjs.
// Writes out/<slug>-short.mp4 (9:16), out/<slug>-wide.mp4 (16:9) and
// out/<slug>-narration.mp3; --still renders one frame of each shape as PNG.
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import YAML from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sitePublic = join(root, "..", "site", "public");
const args = process.argv.slice(2);
const slug = args.find((a, i) => !a.startsWith("--") && !["--only", "--still"].includes(args[i - 1]));
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const only = (opt("--only") ?? "short,wide,audio").split(",");
const still = opt("--still");
if (!slug) {
  console.error("Usage: node tools/render.mjs <slug> [--only short,wide,audio] [--still <seconds>]");
  process.exit(1);
}

const script = YAML.parse(await readFile(join(root, "scripts", `${slug}.yaml`), "utf8"));
let manifest;
try {
  manifest = JSON.parse(await readFile(join(root, "public", "audio", slug, "manifest.json"), "utf8"));
} catch {
  console.error(`render: no narration yet. Run: node tools/voice.mjs ${slug}`);
  process.exit(1);
}
if (manifest.scenes.length !== script.scenes.length) {
  console.error("render: the script has changed since it was voiced. Run tools/voice.mjs again.");
  process.exit(1);
}

// Copy the images and videos the script uses into public/site/. A src is
// looked up in video/assets first (video-only media), then the site's public/.
const { access } = await import("node:fs/promises");
for (const s of script.scenes) {
  if (!s.src) continue;
  const to = join(root, "public", "site", s.src);
  await mkdir(dirname(to), { recursive: true });
  const candidates = [join(root, "assets", s.src), join(sitePublic, s.src)];
  let from;
  for (const c of candidates) if (await access(c).then(() => true, () => false)) { from = c; break; }
  if (!from) { console.error(`render: can't find ${s.src} in video/assets or site/public`); process.exit(1); }
  await copyFile(from, to);
}

const out = join(root, "out");
await mkdir(out, { recursive: true });
const propsFile = join(out, `${slug}.props.json`);
await writeFile(
  propsFile,
  JSON.stringify({
    meta: { title: script.title, eyebrow: script.eyebrow, url: script.url },
    scenes: script.scenes,
    voice: manifest.scenes,
    mode: manifest.mode,
  }),
);

const sh = (cmd, a) =>
  new Promise((ok, fail) => {
    const p = spawn(cmd, a, { cwd: root, stdio: "inherit" });
    p.on("exit", (c) => (c === 0 ? ok() : fail(new Error(`${cmd} exited ${c}`))));
  });
const remotion = join(root, "node_modules", ".bin", "remotion");

const shapes = [["short", "Short"], ["wide", "Wide"]].filter(([k]) => only.includes(k));
for (const [key, id] of shapes) {
  if (still !== undefined) {
    const frame = Math.round(Number(still) * 30);
    await sh(remotion, ["still", "src/index.ts", id, join(out, `${slug}-${key}-${still}s.png`), `--props=${propsFile}`, `--frame=${frame}`, "--log=error"]);
  } else {
    await sh(remotion, ["render", "src/index.ts", id, join(out, `${slug}-${key}.mp4`), `--props=${propsFile}`, "--codec=h264", "--crf=20", "--log=error"]);
    console.log(`render: out/${slug}-${key}.mp4`);
  }
}

// Audio only: the scenes' narration joined with short pauses.
if (only.includes("audio") && still === undefined) {
  const files = manifest.scenes.filter((s) => s.audio).map((s) => join(root, "public", s.audio));
  const inputs = files.flatMap((f) => ["-i", f]);
  const pause = "anullsrc=r=44100:cl=mono";
  const filter =
    files.map((_, i) => `[${i}:a]aresample=44100,aformat=channel_layouts=mono[a${i}]`).join(";") + ";" +
    files.map((_, i) => `${pause},atrim=0:0.6[p${i}]`).join(";") + ";" +
    files.map((_, i) => `[a${i}][p${i}]`).join("") + `concat=n=${files.length * 2}:v=0:a=1[out]`;
  await sh("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", filter, "-map", "[out]", "-b:a", "128k", join(out, `${slug}-narration.mp3`)]);
  console.log(`render: out/${slug}-narration.mp3`);
}
