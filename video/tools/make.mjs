// pnpm video <slug> [--preview] : voice the script, then render every format.
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const dir = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const voiceArgs = args.filter((a) => a !== "--draft");
for (const [tool, a] of [["voice.mjs", voiceArgs], ["render.mjs", args.filter((x) => x !== "--preview")]]) {
  const r = spawnSync("node", [join(dir, tool), ...a], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
