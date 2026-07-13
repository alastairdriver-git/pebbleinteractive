import { Container, Button } from "@gradeui/ui";
import type { NavItem, SiteConfig } from "../types";

/* Generic site header. Static-rendered (no client directive) — dropdowns and the
   mega-menu are pure CSS group-hover, so zero JS ships. Driven entirely by the
   `site` config + `nav` tree passed in, so it's site-agnostic. */
export default function SiteHeader({
  site,
  nav,
  overlay = false,
}: {
  site: SiteConfig;
  nav: NavItem[];
  /** Overlay mode: transparent header sitting over a full-bleed hero, turning
      solid on scroll (toggled by the scroll script in BaseLayout via
      [data-scrolled]). Default is the solid sticky header. */
  overlay?: boolean;
}) {
  return (
    <header
      data-site-header
      className={
        overlay
          ? "gds-site-header gds-site-header--overlay fixed inset-x-0 top-0 z-40"
          : "gds-site-header sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur"
      }
    >
      <Container maxW="xl">
        <div className="flex h-20 items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-center" aria-label={site.name}>
            {site.logo ? (
              <img src={site.logo} alt={site.name} className="h-11 w-auto" />
            ) : (
              <span className="font-display text-xl">{site.name}</span>
            )}
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div key={item.label} className={`group ${item.children ? "relative" : ""}`}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  {(item.children || item.mega) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 transition-transform group-hover:rotate-180">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </a>

                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-xl border border-border bg-popover p-1.5 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <a key={child.href} href={child.href} className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}

                {item.mega && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-1 rounded-2xl border border-border bg-popover p-6 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
                      {item.mega.map((col) => (
                        <div key={col.href}>
                          <a href={col.href} className="block border-b border-border pb-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
                            {col.label}
                          </a>
                          {col.items && col.items.length > 0 && (
                            <ul className="mt-2 flex flex-col gap-0.5">
                              {col.items.map((leaf) => (
                                <li key={leaf.href}>
                                  <a href={leaf.href} className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                    {leaf.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {site.phone && (
              <a href={site.phoneHref} className="hidden text-sm font-medium text-foreground hover:text-primary md:inline">
                {site.phone}
              </a>
            )}
            {site.bookingUrl && (
              <Button asChild size="sm">
                <a href={site.bookingUrl} target="_blank" rel="noopener">
                  {site.bookingLabel ?? "Book now"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
