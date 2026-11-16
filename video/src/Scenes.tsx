import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, heading, eyebrow } from "./theme";
import { useLayout, rise, ease } from "./layout";
import { PebbleMark } from "./Brand";
import { LEAD, type Scene, type Voiced } from "./types";

/* One component per scene type. Each fills the content region for its
   shape (portrait or landscape) and animates in on its own timeline. */

const Region: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => {
  const L = useLayout();
  return (
    <div
      style={{
        position: "absolute",
        left: L.padX,
        right: L.padX,
        top: L.content.top,
        height: L.content.bottom - L.content.top,
        display: "flex",
        flexDirection: "column",
        justifyContent: center ? "center" : "flex-start",
        gap: L.portrait ? 36 : 28,
      }}
    >
      {children}
    </div>
  );
};

const Title: React.FC<{ s: Scene }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  return (
    <Region center>
      {s.eyebrow && <div style={{ ...eyebrow(L.size.small), ...rise(f, fps, 2) }}>{s.eyebrow}</div>}
      {s.kicker && <div style={{ fontFamily: FONT, fontSize: L.size.small * 1.3, fontWeight: 600, color: C.muted, ...rise(f, fps, 6) }}>{s.kicker}</div>}
      <h1 style={{ ...heading(L.size.hero), margin: 0, color: C.cream, maxWidth: L.portrait ? "100%" : "80%", ...rise(f, fps, 10) }}>{s.title}</h1>
    </Region>
  );
};

const Points: React.FC<{ s: Scene; v: Voiced }> = ({ s, v }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const pts = s.points ?? [];
  // Reveal points across the narration, the first one straight away.
  const at = (i: number) => Math.round((LEAD + (i / Math.max(pts.length, 1)) * v.duration * 0.8) * fps);
  return (
    <Region center>
      {s.heading && <h2 style={{ ...heading(L.size.h2), margin: 0, color: C.cream, ...rise(f, fps, 2) }}>{s.heading}</h2>}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: L.portrait ? 30 : 22 }}>
        {pts.map((p, i) => (
          <li key={i} style={{ display: "flex", gap: 26, alignItems: "baseline", fontFamily: FONT, fontSize: L.size.body, fontWeight: 520, lineHeight: 1.25, color: C.cream, ...rise(f, fps, at(i)) }}>
            <span style={{ flex: "none", width: L.size.body * 0.36, height: L.size.body * 0.36, borderRadius: 999, background: C.accent, transform: "translateY(-0.12em)" }} />
            <span style={{ textWrap: "balance" }}>{p}</span>
          </li>
        ))}
      </ul>
    </Region>
  );
};

const Media: React.FC<{ s: Scene; total: number }> = ({ s, total }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const src = staticFile(`site${s.src}`);
  const isVideo = /\.(mp4|webm|mov)$/i.test(s.src ?? "");
  const zoom = ease(f, [0, total], [1, 1.07]);
  // Portrait: a wide screenshot can't fill a tall frame without losing most
  // of it, so use a shorter frame and drift slowly from the left edge.
  const pan = L.portrait ? ease(f, [0, total], [0, 45]) : 0;
  const avail = (L.content.bottom - L.content.top) - (s.caption ? (L.portrait ? 110 : 70) : 0);
  const frameH = L.portrait ? Math.min(avail, (L.width - L.padX * 2) * 0.82) : avail;
  const style: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: `${pan}% 0%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${pan}% 0%`,
  };
  return (
    <Region center={L.portrait}>
      <div style={{ height: frameH, flex: "none", borderRadius: 28, overflow: "hidden", background: C.inkRaised, boxShadow: "0 30px 80px oklch(0 0 0 / 0.35)", ...rise(f, fps, 2) }}>
        {isVideo ? <OffthreadVideo src={src} muted style={style} /> : <Img src={src} style={style} />}
      </div>
      {s.caption && <p style={{ margin: 0, fontFamily: FONT, fontSize: L.size.small * 1.15, color: C.muted, textWrap: "balance", ...rise(f, fps, 10) }}>{s.caption}</p>}
    </Region>
  );
};

const Quote: React.FC<{ s: Scene }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  return (
    <Region center>
      <div style={{ ...heading(L.size.hero * 1.6), color: C.accent, lineHeight: 0.6, height: L.size.hero * 0.6, ...rise(f, fps, 0) }}>“</div>
      <blockquote style={{ ...heading(L.size.h2), margin: 0, color: C.cream, fontWeight: 560, ...rise(f, fps, 6) }}>{s.quote}</blockquote>
      {s.attribution && <div style={{ fontFamily: FONT, fontSize: L.size.small * 1.2, color: C.muted, ...rise(f, fps, 14) }}>{s.attribution}</div>}
    </Region>
  );
};

const Statement: React.FC<{ s: Scene }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  return (
    <Region center>
      <h2 style={{ ...heading(L.size.hero), margin: 0, color: C.cream, ...rise(f, fps, 4) }}>{s.text}</h2>
    </Region>
  );
};

const End: React.FC<{ s: Scene }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  return (
    <Region center>
      <div style={rise(f, fps, 0)}><PebbleMark size={L.portrait ? 200 : 150} /></div>
      <h2 style={{ ...heading(L.size.h2), margin: 0, color: C.cream, ...rise(f, fps, 6) }}>{s.cta ?? "Read the full article"}</h2>
      {s.url && <div style={{ fontFamily: FONT, fontSize: L.size.body * 0.9, fontWeight: 600, fontVariationSettings: '"wdth" 110', color: C.accent, ...rise(f, fps, 12) }}>{s.url}</div>}
    </Region>
  );
};

export const SceneView: React.FC<{ s: Scene; v: Voiced; total: number }> = ({ s, v, total }) => {
  switch (s.type) {
    case "title": return <Title s={s} />;
    case "points": return <Points s={s} v={v} />;
    case "media": return <Media s={s} total={total} />;
    case "quote": return <Quote s={s} />;
    case "statement": return <Statement s={s} />;
    case "end": return <End s={s} />;
    default: return <AbsoluteFill />;
  }
};
