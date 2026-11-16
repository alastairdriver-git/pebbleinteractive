import { useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";
import { useLayout } from "./layout";
import { LEAD, type Word } from "./types";

/* Burnt-in captions: a few words at a time, the spoken word in the accent
   colour. Timings come from ElevenLabs (exact) or are estimated (preview). */
function chunk(words: Word[], max: number) {
  const out: Word[][] = [];
  let cur: Word[] = [];
  for (const w of words) {
    cur.push(w);
    const stop = /[.!?]["”’]?$/.test(w.text) || (/[,;:—]$/.test(w.text) && cur.length >= 3) || cur.length >= max;
    if (stop) { out.push(cur); cur = []; }
  }
  if (cur.length) out.push(cur);
  return out;
}

export const Captions: React.FC<{ words: Word[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  if (!words.length) return null;
  const t = frame / fps - LEAD;
  const chunks = chunk(words, L.portrait ? 5 : 8);
  const idx = chunks.findIndex((c) => t < c[c.length - 1].end + 0.15);
  const current = idx === -1 ? null : chunks[idx];
  if (!current || t < current[0].start - 0.2) return null;
  // Highlight one word: the last one that has started.
  let active = -1;
  current.forEach((w, i) => { if (t >= w.start) active = i; });
  return (
    <div
      style={{
        position: "absolute",
        left: L.padX,
        right: L.padX,
        top: L.captions.top,
        height: L.captions.bottom - L.captions.top,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: L.size.caption,
          fontWeight: 620,
          fontVariationSettings: '"wdth" 108',
          lineHeight: 1.25,
          color: C.cream,
          textWrap: "balance",
        }}
      >
        {current.map((w, i) => (
          <span key={i} style={{ color: i === active ? C.accent : C.cream }}>
            {w.text}{" "}
          </span>
        ))}
      </p>
    </div>
  );
};
