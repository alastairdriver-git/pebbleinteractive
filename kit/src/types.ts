/* Shared types for the Grade × Astro kit. A site is described entirely by data:
   a SiteConfig (brand + contact + chrome) and a NAV tree. The engine renders
   from these — no per-site component code needed for the chrome. */

export type NavLeaf = { label: string; href: string };
export type NavColumn = NavLeaf & { items?: NavLeaf[] };
export type NavItem = {
  label: string;
  href: string;
  children?: NavLeaf[]; // simple dropdown
  mega?: NavColumn[]; // multi-column tree
};

export type HoursRow = { day: string; time: string };
export type Accreditation = { src: string; alt: string };

export interface SiteConfig {
  name: string;
  /** Registered legal entity for the footer © line (falls back to name). */
  legalName?: string;
  tagline?: string;
  logo?: string; // header logo src
  logoFooter?: string; // footer logo src (defaults to logo)
  phone?: string;
  phoneHref?: string;
  email?: string;
  address?: string;
  bookingUrl?: string;
  bookingLabel?: string; // CTA label, defaults to "Book now"
  voucherUrl?: string;
  newsletterUrl?: string;
  mapUrl?: string;
  instagram?: string;
  facebook?: string;
  accreditations?: Accreditation[];
  hours?: HoursRow[];
  /** footer legal links (privacy, terms, etc.) */
  legalLinks?: NavLeaf[];
  /** default data-grade-theme id for the site */
  theme?: string;
}
