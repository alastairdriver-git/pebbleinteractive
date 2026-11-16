/* Pebble's A2UI catalogue, protocol 1.0.
   Every component an agent may place on a Pebble surface is declared here:
   its API (a zod schema, which becomes catalog.json for the agent) and its
   React implementation, built from Grade. Agents can only use what's listed.
   Keep components few, clearly named and self-describing. */
import { z } from "zod";
import { Catalog, CommonSchemas } from "@a2ui/web_core/v1_0";
import { createComponentImplementation } from "@a2ui/react";
import { Badge as GBadge, Button as GButton, Card as GCard } from "@gradeui/ui";

export const CATALOG_ID = "https://www.pebbleinteractive.com/a2ui/catalog/v1.json";

const S = CommonSchemas;
const api = <T extends z.ZodRawShape>(name: string, description: string, shape: T) => ({
  name,
  schema: z.object(shape).describe(description),
});

/** Render a ChildList however the binder hands it over. */
const kids = (children: unknown, buildChild: (id: string, basePath?: string) => React.ReactNode) =>
  ((children as any[]) ?? []).map((c, i) =>
    typeof c === "string" ? <span key={c} style={{ display: "contents" }}>{buildChild(c)}</span>
      : <span key={(c.id ?? c.componentId ?? i) + String(c.basePath ?? i)} style={{ display: "contents" }}>{buildChild(c.id ?? c.componentId, c.basePath)}</span>,
  );

const gap = { sm: "gap-2", md: "gap-4", lg: "gap-6" } as const;

/* ── Layout ─────────────────────────────────────────────── */
const CardApi = api("Card", "A surface panel with an optional eyebrow and title. The usual root of a surface.", {
  eyebrow: S.DynamicString.optional(),
  title: S.DynamicString.optional(),
  children: S.ChildList,
});
const Card = createComponentImplementation(CardApi, ({ props, buildChild }) => (
  <GCard className="pa2-card">
    {(props.eyebrow || props.title) && (
      <div className="pa2-card-head">
        {props.eyebrow && <span className="pa2-eyebrow">{props.eyebrow}</span>}
        {props.title && <h3 className="pa2-title">{props.title}</h3>}
      </div>
    )}
    <div className="pa2-stack gap-4">{kids(props.children, buildChild)}</div>
  </GCard>
));

const ColumnApi = api("Column", "Stacks children vertically.", {
  gap: z.enum(["sm", "md", "lg"]).optional(),
  children: S.ChildList,
});
const Column = createComponentImplementation(ColumnApi, ({ props, buildChild }) => (
  <div className={`pa2-stack ${gap[props.gap ?? "md"]}`}>{kids(props.children, buildChild)}</div>
));

const RowApi = api("Row", "Places children side by side, wrapping on narrow screens.", {
  justify: z.enum(["start", "between", "end"]).optional(),
  children: S.ChildList,
});
const Row = createComponentImplementation(RowApi, ({ props, buildChild }) => (
  <div className={`pa2-row pa2-justify-${props.justify ?? "start"}`}>{kids(props.children, buildChild)}</div>
));

/* ── Content ────────────────────────────────────────────── */
const HeadingApi = api("Heading", "A section heading inside a surface.", { text: S.DynamicString });
const Heading = createComponentImplementation(HeadingApi, ({ props }) => <h4 className="pa2-heading">{props.text}</h4>);

const TextApi = api("Text", "A short paragraph. Use tone 'muted' for secondary information.", {
  text: S.DynamicString,
  tone: z.enum(["default", "muted"]).optional(),
});
const Text = createComponentImplementation(TextApi, ({ props }) => (
  <p className={props.tone === "muted" ? "pa2-text pa2-muted" : "pa2-text"}>{props.text}</p>
));

const badgeVariant = { neutral: "secondary", accent: "info-soft", pink: "highlight", success: "success-soft", warning: "warning-soft" } as const;
const BadgeApi = api("Badge", "A short status label.", {
  text: S.DynamicString,
  tone: z.enum(["neutral", "accent", "pink", "success", "warning"]).optional(),
});
const Badge = createComponentImplementation(BadgeApi, ({ props }) => (
  <GBadge variant={badgeVariant[props.tone ?? "neutral"] as any} className={`pa2-badge pa2-badge-${props.tone ?? "neutral"}`}>{props.text}</GBadge>
));

const StatApi = api("Stat", "A single number with a label, for summaries.", {
  label: S.DynamicString,
  value: S.DynamicString,
  hint: S.DynamicString.optional(),
});
const Stat = createComponentImplementation(StatApi, ({ props }) => (
  <div className="pa2-stat"><span className="pa2-stat-value">{props.value}</span><span className="pa2-stat-label">{props.label}</span>{props.hint && <span className="pa2-muted pa2-small">{props.hint}</span>}</div>
));

/* ── Actions and inputs ─────────────────────────────────── */
const ButtonApi = api("Button", "Sends an action back to the agent. Use one primary button per surface.", {
  label: S.DynamicString,
  variant: z.enum(["primary", "secondary", "ghost"]).optional(),
  action: S.Action,
});
const Button = createComponentImplementation(ButtonApi, ({ props }) => (
  <GButton
    size="md"
    variant={props.variant === "secondary" ? "outline" : props.variant === "ghost" ? "ghost" : "default"}
    className={props.variant === "primary" || !props.variant ? "pa2-primary" : undefined}
    onClick={() => (props.action as any)?.()}
  >
    {props.label}
  </GButton>
));

const DateFieldApi = api("DateField", "A labelled date input, bound to the data model.", {
  label: S.DynamicString,
  value: S.DynamicString,
});
const DateField = createComponentImplementation(DateFieldApi, ({ props }) => (
  <label className="pa2-field">
    <span className="pa2-field-label">{props.label}</span>
    <input type="date" value={props.value ?? ""} onChange={(e) => (props as any).setValue?.(e.target.value)} />
  </label>
));

const ChoiceApi = api("Choice", "Pick one option from a short list, bound to the data model.", {
  label: S.DynamicString,
  options: z.array(z.string()),
  value: S.DynamicString,
});
const Choice = createComponentImplementation(ChoiceApi, ({ props }) => (
  <div className="pa2-field">
    <span className="pa2-field-label">{props.label}</span>
    <div className="pa2-chips" role="radiogroup" aria-label={props.label}>
      {props.options.map((o: string) => (
        <button type="button" role="radio" aria-checked={props.value === o} key={o} className={props.value === o ? "pa2-chip on" : "pa2-chip"} onClick={() => (props as any).setValue?.(o)}>{o}</button>
      ))}
    </div>
  </div>
));

/* ── Pebble domain components ───────────────────────────── */
const KIND = { article: "Article", social: "LinkedIn post", short: "Short video", video: "Video", newsletter: "Newsletter", launch: "Product launch" } as const;
const STATUS_TONE: Record<string, string> = { idea: "neutral", draft: "neutral", "needs review": "pink", approved: "success", scheduled: "accent", published: "success" };

const ContentItemApi = api("ContentItem", "One piece of planned content: its kind, title, date and status. Optionally an action to open it.", {
  kind: S.DynamicString.describe("REF:#/$defs/DynamicString|One of: article, social, short, video, newsletter, launch"),
  title: S.DynamicString,
  date: S.DynamicString,
  status: S.DynamicString.describe("REF:#/$defs/DynamicString|One of: idea, draft, needs review, approved, scheduled, published"),
  action: S.Action.optional(),
});
const ContentItem = createComponentImplementation(ContentItemApi, ({ props }) => {
  const status = String(props.status ?? "");
  const kind = String(props.kind ?? "") as keyof typeof KIND;
  const tone = STATUS_TONE[status] ?? "neutral";
  const Tag: any = props.action ? "button" : "div";
  return (
    <Tag type={props.action ? "button" : undefined} className="pa2-item" onClick={props.action ? () => (props.action as any)() : undefined}>
      <span className={`pa2-kind pa2-kind-${kind}`}>{KIND[kind] ?? kind}</span>
      <span className="pa2-item-title">{props.title}</span>
      <span className="pa2-item-meta">
        <span className="pa2-muted pa2-small">{props.date}</span>
        <GBadge variant={badgeVariant[tone as keyof typeof badgeVariant] as any} className={`pa2-badge pa2-badge-${tone}`}>{status}</GBadge>
      </span>
    </Tag>
  );
});

const ProductCardApi = api("ProductCard", "A Pebble digital product with its price and status.", {
  title: S.DynamicString,
  summary: S.DynamicString,
  price: S.DynamicString,
  status: z.enum(["draft", "coming soon", "on sale"]),
});
const ProductCard = createComponentImplementation(ProductCardApi, ({ props }) => (
  <div className="pa2-product">
    <div className="pa2-row pa2-justify-between">
      <span className="pa2-eyebrow">Product</span>
      <GBadge variant={(props.status === "on sale" ? "success-soft" : "highlight") as any} className={`pa2-badge ${props.status === "on sale" ? "pa2-badge-success" : "pa2-badge-pink"}`}>{props.status}</GBadge>
    </div>
    <h4 className="pa2-title">{props.title}</h4>
    <p className="pa2-text pa2-muted">{props.summary}</p>
    <span className="pa2-price">{props.price}</span>
  </div>
));

export const apis = [CardApi, ColumnApi, RowApi, HeadingApi, TextApi, BadgeApi, StatApi, ButtonApi, DateFieldApi, ChoiceApi, ContentItemApi, ProductCardApi];

export const pebbleCatalog = new Catalog(
  CATALOG_ID,
  "1.0",
  [Card, Column, Row, Heading, Text, Badge, Stat, Button, DateField, Choice, ContentItem, ProductCard] as any,
  [],
);
