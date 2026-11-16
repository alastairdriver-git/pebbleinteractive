import type { SiteConfig, NavItem } from "@grade/astro-kit/types";

/** Fonts — Mona Sans as a full variable font: width axis 75–125,
    weight axis 200–900, so headings can go wide + fat via
    font-variation-settings without extra font files. */
export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&display=swap";

export const SITE: SiteConfig = {
  name: "Pebble Interactive",
  legalName: "Pebble Interactive Ltd",
  logo: "/logo.svg",
  tagline: "Design systems and interactive product engineering",
  email: "hello@pebbleinteractive.com",
  theme: "pebble",
};

export const NAV: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Articles", href: "/articles" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

/** Article byline. */
export const AUTHOR = {
  name: "Alastair Driver",
  role: "Director, Pebble Interactive",
  url: "https://www.alastairdriver.com",
};

/** Newsletter. Set `url` to the Substack publication (e.g.
    "https://systemised.substack.com") and every subscribe block goes live.
    While it's empty, subscribe blocks don't render. */
export const NEWSLETTER = {
  name: "Systemised",
  promise: "Design systems and AI, from work that shipped. Every two weeks.",
  url: "",
};
