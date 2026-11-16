/* A2UI actions from Pebble Studio surfaces. Each action changes data (with
   the user's own session, so row-level security applies) and answers with
   A2UI messages: usually just an updateDataModel, so the screen updates in
   place. Phase 2 exposes the same operations as MCP tools. */
import { NextResponse } from "next/server";
import { currentUser, getItems, getLeads, getProducts, updateItem, updateLead, updateProduct, LEAD_STATUSES, STATUSES, type ItemStatus, type LeadStatus, type Product } from "@/lib/data";
import { itemEditor, leadEditor, leadsData, LEAD_VIEWS, productEditor, productsData, remove, scheduleData, updateData, VIEWS, type LeadView, type View } from "@/lib/surfaces";

type Action = { name?: string; context?: Record<string, unknown> };
const str = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);

export async function POST(req: Request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const action = (await req.json().catch(() => ({}))) as Action;
  const c = action.context ?? {};
  try {
    switch (action.name) {
      case "set_view": {
        const view = (VIEWS as readonly string[]).includes(str(c.view)) ? (str(c.view) as View) : "Next two weeks";
        return NextResponse.json({ messages: [updateData("schedule", scheduleData(await getItems(), view))] });
      }
      case "open_item": {
        const item = (await getItems()).find((i) => i.id === str(c.id));
        if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
        return NextResponse.json({ messages: itemEditor(item) });
      }
      case "save_item": {
        const status = str(c.status) as ItemStatus;
        const date = str(c.date);
        await updateItem(str(c.id), {
          title: str(c.title).trim() || undefined,
          status: STATUSES.includes(status) ? status : undefined,
          scheduled_for: date ? (isDate(date) ? date : undefined) : null,
        });
        const view = (VIEWS as readonly string[]).includes(str(c.view)) ? (str(c.view) as View) : undefined;
        return NextResponse.json({
          messages: [updateData("schedule", scheduleData(await getItems(), view ?? "Next two weeks")), remove("editor")],
          keepView: true,
        });
      }
      case "close_editor":
        return NextResponse.json({ messages: [remove("editor")] });
      case "open_product": {
        const p = (await getProducts()).find((x) => x.slug === str(c.slug));
        if (!p) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json({ messages: productEditor(p) });
      }
      case "save_product": {
        const price = Number(str(c.price).replace(/[^0-9.]/g, ""));
        const status = str(c.status) as Product["status"];
        const launch = str(c.launch);
        const checkout = str(c.checkout).trim();
        if (checkout && !/^https:\/\//.test(checkout)) return NextResponse.json({ error: "The checkout link must start with https://" }, { status: 400 });
        await updateProduct(str(c.slug), {
          price: Number.isFinite(price) ? price : undefined,
          status: ["draft", "coming soon", "on sale"].includes(status) ? status : undefined,
          checkout_url: checkout || null,
          launch_date: launch && isDate(launch) ? launch : null,
          launch_channel: str(c.channel) || null,
        });
        return NextResponse.json({ messages: [updateData("products", productsData(await getProducts())), remove("editor")] });
      }
      case "set_lead_view": {
        const view = (LEAD_VIEWS as readonly string[]).includes(str(c.view)) ? (str(c.view) as LeadView) : "Open";
        return NextResponse.json({ messages: [updateData("leads", leadsData(await getLeads(), view))] });
      }
      case "open_lead": {
        const lead = (await getLeads()).find((l) => l.id === str(c.id));
        if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        return NextResponse.json({ messages: leadEditor(lead) });
      }
      case "save_lead": {
        const status = str(c.status) as LeadStatus;
        await updateLead(str(c.id), {
          status: (LEAD_STATUSES as readonly string[]).includes(status) ? status : undefined,
          notes: str(c.notes).trim() || null,
        });
        const view = (LEAD_VIEWS as readonly string[]).includes(str(c.view)) ? (str(c.view) as LeadView) : "Open";
        return NextResponse.json({ messages: [updateData("leads", leadsData(await getLeads(), view)), remove("editor")] });
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${str(action.name)}` }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
