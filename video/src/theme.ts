import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/* Pebble brand tokens, matching the site and the social cards. */
export const C = {
  ink: "oklch(0.245 0.045 220)",
  inkRaised: "oklch(0.3 0.04 220)",
  cream: "oklch(0.965 0.006 85)",
  muted: "oklch(0.965 0.006 85 / 0.72)",
  accent: "oklch(0.82 0.09 195)",
  accentSoft: "oklch(0.82 0.09 195 / 0.14)",
};

export const FONT = "Mona Sans";
loadFont({ family: FONT, url: staticFile("fonts/MonaSans.woff2"), weight: "200 900" });

export const heading = (size: number) => ({
  fontFamily: FONT,
  fontSize: size,
  fontWeight: 650,
  fontVariationSettings: '"wdth" 115',
  letterSpacing: "-0.025em",
  lineHeight: 1.06,
  textWrap: "balance" as const,
});

export const eyebrow = (size: number) => ({
  fontFamily: FONT,
  fontSize: size,
  fontWeight: 600,
  fontVariationSettings: '"wdth" 115',
  letterSpacing: "-0.005em",
  color: C.accent,
});
