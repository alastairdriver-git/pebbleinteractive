/* Demo data for development only (STUDIO_DEMO=1): the same items and
   products the Supabase project was seeded with on 16 November 2026. */
import type { Lead, Item, Product } from "./data";

type Row = [Item["kind"], string, string | null, Item["status"], string, string | null, string?];
const A = "AI in the design process", D = "Design systems in practice", C = "Curating AI output";

const rows: Row[] = [
  ["article", "A2UI and the future of interfaces", A, "published", "2026-11-16", "a2ui-and-the-future-of-interfaces"],
  ["article", "Why AI prototyping needs a design system", A, "published", "2026-11-16", "why-ai-prototyping-needs-a-design-system"],
  ["article", "Real data in prototypes changes the conversation", A, "published", "2026-11-16", "real-data-in-prototypes"],
  ["article", "From prototype to real iOS and Android apps", D, "published", "2026-11-16", "from-prototype-to-real-ios-and-android-apps"],
  ["article", "The designer as editor", C, "published", "2026-11-16", "the-designer-as-editor"],
  ["article", "One token foundation, three platforms", D, "published", "2026-11-16", "one-token-foundation-three-platforms"],
  ["article", "Prototypes reviewed like code", D, "published", "2026-11-16", "prototypes-reviewed-like-code"],
  ["article", "Design system docs for people and AI agents", A, "published", "2026-11-16", "design-system-docs-for-people-and-ai-agents"],
  ["social", "A2UI and the future of interfaces", A, "scheduled", "2026-11-17", null],
  ["short", "Why AI prototyping needs a design system", A, "needs review", "2026-11-18", null],
  ["social", "Real data in prototypes changes the conversation", A, "approved", "2026-11-19", null],
  ["newsletter", "Systemised, issue 1", "Newsletter", "draft", "2026-11-20", null, "Needs the Substack publication set up first."],
  ["launch", "Design system health check (free)", "Products", "idea", "2026-11-23", null, "Lead magnet for subscribers."],
  ["social", "Prototypes reviewed like code", D, "draft", "2026-11-24", null],
  ["short", "How Pebble's content engine works", "Building in public", "draft", "2026-11-25", null, "Showcase video rendered; needs Ali's voice once the ElevenLabs key is added."],
  ["social", "Why AI prototyping needs a design system", A, "draft", "2026-11-26", null],
  ["article", "Your product inside Claude and ChatGPT", A, "idea", "2026-11-30", null],
  ["social", "The designer as editor", C, "draft", "2026-12-01", null],
  ["launch", "Supplier-ready policy pack", "Products", "idea", "2026-12-01", null],
  ["short", "Real data in prototypes changes the conversation", A, "idea", "2026-12-02", null],
  ["social", "One token foundation, three platforms", D, "draft", "2026-12-03", null],
  ["newsletter", "Systemised, issue 2", "Newsletter", "idea", "2026-12-04", null],
  ["article", "Official Figma MCP vs Figma Console MCP: what we use each for", A, "idea", "2026-12-07", null],
  ["social", "Design system docs for people and AI agents", A, "draft", "2026-12-08", null],
  ["short", "A2UI and the future of interfaces", A, "idea", "2026-12-09", null],
  ["social", "From prototype to real iOS and Android apps", D, "draft", "2026-12-10", null],
  ["article", "Changing the engine mid-flight", D, "idea", "2026-12-14", null],
  ["launch", "Case study kit", "Products", "idea", "2026-12-15", null],
  ["article", "Right-to-left is a token problem, not a translation problem", D, "idea", "2026-12-21", null],
  ["article", "The designer who codes the component", D, "idea", "2027-01-04", null],
  ["article", "Tone rules an AI can follow", C, "idea", "2027-01-11", null],
  ["article", "Plain words in regulated flows", C, "idea", "2027-01-18", null],
  ["article", "Chatbot dark patterns: which ones a design system can block", "Ethics and trust", "idea", "2027-01-25", null],
  ["article", "Why we built Grade", D, "idea", "2027-02-01", null],
  ["article", "One design system, SwiftUI and Jetpack Compose", D, "idea", "2027-02-08", null],
  ["article", "How I run Pebble's content with my own MCP framework", "Building in public", "idea", "2027-02-15", null],
  ["article", "Building an admin where the agent draws the screens", "Building in public", "idea", "2027-02-22", null],
];

const CHANNEL: Record<Item["kind"], string> = {
  article: "pebbleinteractive.com", social: "LinkedIn", short: "LinkedIn, YouTube Shorts", video: "YouTube", newsletter: "Substack", launch: "Newsletter, then LinkedIn",
};

export const demoItems: Item[] = rows.map(([kind, title, series, status, date, slug, notes], i) => ({
  id: `demo-${i + 1}`,
  kind,
  title,
  series,
  source: slug,
  channel: CHANNEL[kind],
  status,
  scheduled_for: date,
  url: kind === "article" && status === "published" && slug ? `https://www.pebbleinteractive.com/articles/${slug}` : null,
  parent_id: null,
  notes: notes ?? null,
}));

export const demoProducts: Product[] = [
  { id: "demo-p1", slug: "design-system-health-check", title: "Design system health check", summary: "A one-page checklist to see where your design system is strong, where it's drifting, and what to fix first.", price: 0, currency: "USD", status: "coming soon", checkout_url: null, format: "One-page PDF checklist", sort: 0, sales: 0, revenue: 0, launch_date: null, launch_channel: null },
  { id: "demo-p2", slug: "supplier-ready-policy-pack", title: "Supplier-ready policy pack", summary: "Eighteen plain-English company policies and a guide to answering procurement due diligence forms.", price: 19, currency: "USD", status: "coming soon", checkout_url: null, format: "PDF and editable Word files", sort: 1, sales: 0, revenue: 0, launch_date: null, launch_channel: null },
  { id: "demo-p3", slug: "case-study-kit", title: "Case study kit", summary: "A one-page case study template and a structure guide, so every project you write up reads clearly and prints well.", price: 15, currency: "USD", status: "coming soon", checkout_url: null, format: "HTML template, PDF guide", sort: 2, sales: 0, revenue: 0, launch_date: null, launch_channel: null },
];

/* Sample leads for demo mode only. Made-up people and companies. */
const ago = (days: number) => new Date(Date.now() - days * 86400000).toISOString();
export const demoLeads: Lead[] = [
  { id: "demo-l1", created_at: ago(0), status: "new", name: "Sam Example", email: "sam@example.com", role: "Head of Design", company: "Example Bank (sample)", website: "https://example.com", company_size: "201 to 1,000", services: ["Design system audit", "Accessibility"], has_design_system: "Yes, but it needs work", engagement: "A project", budget: "£25k to £50k", timeline: "1 to 3 months", message: "Our design system has drifted across three products and we fail contrast in dark mode. We'd like an audit and a plan.", heard_from: "LinkedIn", notes: null },
  { id: "demo-l2", created_at: ago(2), status: "call booked", name: "Jo Sample", email: "jo@example.org", role: "CTO", company: "Sample Health (sample)", website: "https://example.org", company_size: "51 to 200", services: ["MCP and AI tooling", "Design tokens"], has_design_system: "Starting one", engagement: "A monthly retainer", budget: "£5k to £10k a month", timeline: "In the next month", message: "We want our engineers' AI tools to use our components properly.", heard_from: "Article: Figma MCP vs Figma Console MCP", notes: "Call Thursday 2pm" },
  { id: "demo-l3", created_at: ago(9), status: "proposal sent", name: "Alex Placeholder", email: "alex@example.net", role: "Product Director", company: "Placeholder SaaS (sample)", website: "https://example.net", company_size: "11 to 50", services: ["A2UI and agent interfaces", "Component library"], has_design_system: "Yes, mature", engagement: "A project", budget: "£10k to £25k", timeline: "3 to 6 months", message: null, heard_from: "Search", notes: null },
  { id: "demo-l4", created_at: ago(20), status: "not a fit", name: "Pat Test", email: "pat@example.com", role: null, company: null, website: null, company_size: "Just me", services: ["Something else"], has_design_system: "No", engagement: "Not sure yet", budget: "Under £10k", timeline: "Just exploring", message: "Can you build my wedding website?", heard_from: null, notes: null },
];
