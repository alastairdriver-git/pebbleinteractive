export type Word = { text: string; start: number; end: number };
export type Voiced = { audio: string | null; duration: number; words: Word[] };

export type Scene = {
  type: "title" | "points" | "media" | "quote" | "statement" | "end";
  say?: string;
  hold?: number; // seconds, for scenes with no narration
  // title
  eyebrow?: string;
  title?: string;
  kicker?: string;
  // points
  heading?: string;
  points?: string[];
  // media
  src?: string; // path under the site's public folder, e.g. /work/glint/gl-wallets.png
  caption?: string;
  // quote / statement
  quote?: string;
  attribution?: string;
  text?: string;
  // end
  cta?: string;
  url?: string;
};

export type VideoProps = {
  meta: { title: string; eyebrow?: string; url?: string };
  scenes: Scene[];
  voice: Voiced[];
  mode: "elevenlabs" | "preview";
};

export const FPS = 30;
export const LEAD = 0.35; // seconds of silence before each scene's narration
export const TAIL = 0.55; // after it
export const sceneFrames = (v: Voiced) => Math.round((LEAD + v.duration + TAIL) * FPS);
