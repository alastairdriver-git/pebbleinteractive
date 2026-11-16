import { C, FONT } from "./theme";

export const PebbleMark: React.FC<{ size: number; color?: string; cut?: string }> = ({ size, color = C.accent, cut = C.ink }) => (
  <svg viewBox="0 0 125 102" width={size} height={(size * 102) / 125} aria-hidden>
    <path fill={color} d="M60 2 C95 -3 122 18 124 48 C126 78 100 100 62 101 C26 102 -2 82 0 50 C2 20 28 7 60 2 Z" />
    <rect x="-20" y="58" width="180" height="12" fill={cut} transform="rotate(-7 62 64)" />
  </svg>
);

export const Wordmark: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.5 }}>
    <PebbleMark size={size * 1.7} />
    <span style={{ fontFamily: FONT, fontSize: size, fontWeight: 650, fontVariationSettings: '"wdth" 110', color: C.cream }}>
      Pebble Interactive
    </span>
  </div>
);
