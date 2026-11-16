import { useVideoConfig, spring, interpolate, Easing } from "remotion";

/* Regions for each shape. Portrait (9:16) stacks content above captions;
   landscape (16:9) puts captions along the bottom. */
export function useLayout() {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return portrait
    ? { portrait, width, height, padX: 84, header: 92, content: { top: 300, bottom: 1400 }, captions: { top: 1480, bottom: 1760 }, size: { hero: 104, h2: 76, body: 56, caption: 60, small: 30 } }
    : { portrait, width, height, padX: 128, header: 64, content: { top: 190, bottom: 810 }, captions: { top: 850, bottom: 990 }, size: { hero: 96, h2: 68, body: 46, caption: 46, small: 26 } };
}

/** Fade and rise in, starting `delay` frames into the scene. */
export function rise(frame: number, fps: number, delay = 0) {
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 22 });
  return { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [28, 0])}px)` };
}

export const ease = (frame: number, range: [number, number], out: [number, number]) =>
  interpolate(frame, range, out, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
