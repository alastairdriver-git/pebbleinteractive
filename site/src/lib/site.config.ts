import type { SiteConfig, NavItem } from "@grade/astro-kit/types";

/** Fonts — Mona Sans (GitHub's variable sans, on Google Fonts). */
export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700&display=swap";

export const SITE: SiteConfig = {
  name: "Pebble Interactive",
  tagline: "Design systems and interactive product engineering",
  email: "hello@pebbleinteractive.com",
  theme: "pebble",
};

export const NAV: NavItem[] = [];
