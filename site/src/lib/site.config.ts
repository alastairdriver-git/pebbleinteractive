import type { SiteConfig, NavItem } from "@grade/astro-kit/types";

/** Fonts — clean geometric sans for a product-design studio. */
export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap";

export const SITE: SiteConfig = {
  name: "Pebble Interactive",
  tagline: "Design systems and interactive product engineering",
  email: "hello@pebbleinteractive.com",
  bookingUrl: "/contact",
  bookingLabel: "Start a project",
  theme: "pebble",
  legalLinks: [
    { label: "Privacy policy", href: "/privacy" },
  ],
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
