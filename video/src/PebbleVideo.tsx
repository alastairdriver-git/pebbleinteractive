import { AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C } from "./theme";
import { useLayout } from "./layout";
import { Wordmark } from "./Brand";
import { Captions } from "./Captions";
import { SceneView } from "./Scenes";
import { LEAD, FPS, sceneFrames, type VideoProps } from "./types";

/* The whole video: brand ground, header, one Sequence per scene (with its
   narration and captions), and a progress bar. */
const Fade: React.FC<{ total: number; children: React.ReactNode }> = ({ total, children }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8, total - 8, total], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const PebbleVideo: React.FC<VideoProps> = ({ scenes, voice }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const L = useLayout();
  let start = 0;
  const blob = L.portrait ? { size: 1000, right: -380, top: -260 } : { size: 760, right: -220, top: -240 };
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <div style={{ position: "absolute", width: blob.size, height: blob.size, right: blob.right, top: blob.top, borderRadius: "50%", background: C.accentSoft }} />
      <div style={{ position: "absolute", left: L.padX, top: L.header }}>
        <Wordmark size={L.portrait ? 34 : 28} />
      </div>
      {scenes.map((s, i) => {
        const v = voice[i] ?? { audio: null, duration: s.hold ?? 3, words: [] };
        const total = sceneFrames(v);
        const from = start;
        start += total;
        return (
          <Sequence key={i} from={from} durationInFrames={total} name={`${i + 1} ${s.type}`}>
            <Fade total={total}>
              <SceneView s={s} v={v} total={total} />
              <Captions words={v.words} />
            </Fade>
            {v.audio && (
              <Sequence from={Math.round(LEAD * FPS)}>
                <Html5Audio src={staticFile(v.audio)} />
              </Sequence>
            )}
          </Sequence>
        );
      })}
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 8, width: `${(frame / durationInFrames) * 100}%`, background: C.accent }} />
    </AbsoluteFill>
  );
};
