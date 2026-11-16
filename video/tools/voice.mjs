// Narration for a video script: one audio file per scene, plus word timings
// for captions. Usage: node tools/voice.mjs <slug> [--preview]
//
// Voices:
//  - ElevenLabs (Ali's cloned voice) when ELEVENLABS_API_KEY and
//    ELEVENLABS_VOICE_ID are set in video/.env AND the script says
//    `approved: true`. The clone never voices an unapproved script.
//  - Otherwise, or with --preview, the macOS "Daniel" voice: free, local,
//    for checking timing and layout before spending credits.
//
// Audio is cached by text, so editing one scene only re-voices that scene.
// Output: public/audio/<slug>/manifest.json + one MP3 per scene.
import { readFile, writeFile, mkdir, access, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import YAML from "yaml";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
try { process.loadEnvFile(join(root, ".env")); } catch {}

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const forcePreview = args.includes("--preview");
if (!slug) {
  console.error("Usage: node tools/voice.mjs <slug> [--preview]");
  process.exit(1);
}

const script = YAML.parse(await readFile(join(root, "scripts", `${slug}.yaml`), "utf8"));
const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID;
const MODEL = process.env.ELEVENLABS_MODEL ?? "eleven_multilingual_v2";

let mode = "preview";
if (!forcePreview && KEY && VOICE) {
  if (script.approved === true) mode = "elevenlabs";
  else {
    console.error(
      `voice: "${slug}" isn't approved. Read the script, set "approved: true" in scripts/${slug}.yaml, then run again.\n` +
        `       (Use --preview for the free local voice in the meantime.)`,
    );
    process.exit(1);
  }
}
if (mode === "preview") console.log(`voice: preview voice (macOS Daniel)${KEY ? "" : ", no ElevenLabs key in video/.env"}`);
else console.log(`voice: ElevenLabs voice ${VOICE}, model ${MODEL}`);

const outDir = join(root, "public", "audio", slug);
await mkdir(outDir, { recursive: true });
const exists = (p) => access(p).then(() => true, () => false);

const duration = async (file) =>
  Number((await run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file])).stdout.trim());

/** Words from ElevenLabs character alignment. */
function wordsFromAlignment(a) {
  const words = [];
  let cur = null;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) { if (cur) words.push(cur); cur = null; return; }
    if (!cur) cur = { text: "", start: a.character_start_times_seconds[i], end: 0 };
    cur.text += ch;
    cur.end = a.character_end_times_seconds[i];
  });
  if (cur) words.push(cur);
  return words;
}

/** Estimated word timings (preview voice): spread by word length. */
function estimateWords(text, total) {
  const parts = text.split(/\s+/).filter(Boolean);
  const weight = (w) => w.length + 2 + (/[.,;:!?]$/.test(w) ? 4 : 0);
  const sum = parts.reduce((n, w) => n + weight(w), 0);
  let t = 0;
  return parts.map((w) => {
    const d = (weight(w) / sum) * total;
    const word = { text: w, start: t, end: t + d * 0.9 };
    t += d;
    return word;
  });
}

async function elevenlabs(text, mp3) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": KEY, "content-type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.1, use_speaker_boost: true },
      }),
    },
  );
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  await writeFile(mp3, Buffer.from(json.audio_base64, "base64"));
  return wordsFromAlignment(json.alignment);
}

async function preview(text, mp3) {
  const aiff = mp3.replace(/\.mp3$/, ".aiff");
  await run("say", ["-v", "Daniel", "-r", "185", "-o", aiff, text]);
  await run("ffmpeg", ["-y", "-loglevel", "error", "-i", aiff, "-ar", "44100", "-b:a", "128k", mp3]);
  await rm(aiff);
  return null; // timings estimated after we know the duration
}

const scenes = [];
for (const [i, scene] of script.scenes.entries()) {
  if (!scene.say) { scenes.push({ audio: null, duration: scene.hold ?? 3, words: [] }); continue; }
  const text = scene.say.trim().replace(/\s+/g, " ");
  const hash = createHash("sha1").update(`${mode}|${VOICE ?? ""}|${MODEL}|${text}`).digest("hex").slice(0, 10);
  const name = `${String(i + 1).padStart(2, "0")}-${mode}-${hash}`;
  const mp3 = join(outDir, `${name}.mp3`);
  const timing = join(outDir, `${name}.json`);
  if (!(await exists(mp3)) || !(await exists(timing))) {
    process.stdout.write(`voice: scene ${i + 1} … `);
    const words = mode === "elevenlabs" ? await elevenlabs(text, mp3) : await preview(text, mp3);
    const d = await duration(mp3);
    await writeFile(timing, JSON.stringify({ duration: d, words: words ?? estimateWords(text, d) }));
    console.log(`${d.toFixed(1)}s`);
  }
  const t = JSON.parse(await readFile(timing, "utf8"));
  scenes.push({ audio: `audio/${slug}/${name}.mp3`, duration: t.duration, words: t.words });
}

await writeFile(join(outDir, "manifest.json"), JSON.stringify({ slug, mode, scenes }, null, 1));
const total = scenes.reduce((n, s) => n + s.duration, 0);
console.log(`voice: ${scenes.length} scenes, ${total.toFixed(0)}s of narration (${mode})`);
