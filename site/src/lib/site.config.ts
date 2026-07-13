import type { SiteConfig, NavItem } from "@grade/astro-kit/types";

/** Fonts — Mona Sans as a full variable font: width axis 75–125,
    weight axis 200–900, so headings can go wide + fat via
    font-variation-settings without extra font files. */
export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&display=swap";

export const SITE: SiteConfig = {
  name: "Pebble Interactive",
  tagline: "Design systems and interactive product engineering",
  email: "hello@pebbleinteractive.com",
  theme: "pebble",
};

export const NAV: NavItem[] = [];
