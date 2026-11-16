---
name: pebble-video
description: Make branded narrated videos (9:16 shorts, 16:9 explainers, audio-only) for Pebble Interactive from an article, case study or topic, using Remotion and Ali's ElevenLabs voice. Use when asked to make, script, voice, render or update a video, short, reel, explainer, narrated article or product walkthrough.
---

# Pebble video pipeline

`video/` is a standalone package (not in the pnpm workspace, so Vercel never installs it). Install once with `cd video && pnpm install --ignore-workspace`. Needs local Google Chrome (Remotion downloads its own headless shell) and ffmpeg.

```
scripts/<slug>.yaml  →  tools/voice.mjs  →  public/audio/<slug>/ (MP3 per scene + word timings)
                     →  tools/render.mjs →  out/<slug>-short.mp4 (1080×1920)
                                            out/<slug>-wide.mp4  (1920×1080)
                                            out/<slug>-narration.mp3
```

## Making a video

1. **Write the script** at `video/scripts/<slug>.yaml` (copy an existing one). Top level: `title`, `eyebrow`, `url`, `approved: false`, `scenes`. Each scene has a `type`, its on-screen fields, and `say` (the narration).
   - `title`: `eyebrow`, `kicker`, `title`
   - `statement`: `text` (one big line)
   - `points`: `heading`, `points[]` (3 or 4, a few words each; they reveal as the narration runs)
   - `media`: `src` (a path under `site/public/`, or under `video/assets/` for video-only media), `caption`
   - `quote`: `quote`, `attribution`
   - `end`: `cta`, `url`
2. **Preview** with the free local voice: `pnpm video <slug> --preview`. Check frames quickly with `node tools/render.mjs <slug> --still <seconds>` and read the PNGs in `out/`.
3. **Ali approves the script.** Only then set `approved: true`. `voice.mjs` refuses to use the ElevenLabs voice on an unapproved script. Never set `approved: true` yourself.
4. **Final render:** `pnpm video <slug>`. Audio is cached per scene by its text, so editing one scene only re-voices that scene.
5. Watch the result (or check stills across the timeline) before handing it over.

## Writing scripts

- A short is 45 to 90 seconds: 6 to 8 scenes, about 130 to 220 spoken words. One idea per scene.
- Write `say` for the ear: short sentences, no brackets, spell out awkward things ("pebbleinteractive dot com"). On-screen text is a summary of the narration, never the same sentence.
- Same rules as articles: British English, nothing invented, no client detail beyond the published case studies.
- End on the article or product the video supports.

## Voice

`video/.env` (git-ignored, Ali creates it; never ask for the key in chat):

```
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=...
```

Without it, or with `--preview`, narration uses the macOS "Daniel" voice and caption timings are estimated. With it, timings come from ElevenLabs and are exact. Say in each published video's description that the narration is an AI version of Ali's voice.

## Changing the look

Brand tokens and type: `src/theme.ts`. Regions and sizes per shape: `src/layout.ts`. Scenes: `src/Scenes.tsx`. Captions: `src/Captions.tsx`. `pnpm studio` opens Remotion Studio for live editing. Keep it matching the site and the social cards.
