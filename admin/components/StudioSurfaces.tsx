"use client";
/* Renders Pebble Studio's A2UI surfaces with the Pebble catalogue, sends
   user actions to /api/actions and applies the messages that come back.
   Every message in and action out is kept in a log, shown in the A2UI
   panel: useful for checking, and for filming how the screens are made. */
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageProcessor } from "@a2ui/web_core/v1_0";
import { A2uiSurface } from "@a2ui/react";
import { pebbleCatalog } from "@pebble/a2ui";

type Entry = { dir: "in" | "out"; at: string; payload: unknown };

export default function StudioSurfaces({ initial }: { initial: unknown[] }) {
  const [surfaces, setSurfaces] = useState<any[]>([]);
  const [log, setLog] = useState<Entry[]>([]);
  const [panel, setPanel] = useState(false);
  const [error, setError] = useState("");
  const proc = useRef<MessageProcessor<any> | null>(null);

  const record = (dir: Entry["dir"], payload: unknown) =>
    setLog((l) => [{ dir, at: new Date().toLocaleTimeString("en-GB"), payload }, ...l].slice(0, 60));

  const apply = useCallback((messages: any[]) => {
    const p = proc.current!;
    // Re-creating a surface that exists (e.g. opening another item): delete it first.
    for (const m of messages) {
      const id = m?.createSurface?.surfaceId;
      if (id && p.getSurface(id)) p.processMessages([{ version: "1.0", deleteSurface: { surfaceId: id } } as any]);
    }
    const errs = p.processMessagesWithErrors(messages);
    if (errs.length) console.warn("A2UI errors", JSON.stringify(errs));
    record("in", messages);
    setSurfaces(Array.from(p.model.surfacesMap.values()));
  }, []);

  useEffect(() => {
    const p = new MessageProcessor([pebbleCatalog], async (action: any) => {
      // Saving keeps whatever the schedule is currently showing.
      if (action?.name === "save_item") {
        const view = p.getSurface("schedule")?.dataModel?.get?.("/view");
        action = { ...action, context: { ...(action.context ?? {}), view } };
      }
      record("out", action);
      setError("");
      const res = await fetch("/api/actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(action) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) return setError(body.error ?? `Something went wrong (${res.status})`);
      apply(body.messages ?? []);
    });
    proc.current = p;
    if (process.env.NODE_ENV !== "production") (window as any).__studio = p;
    const s1 = p.onSurfaceDeleted(() => setSurfaces(Array.from(p.model.surfacesMap.values())));
    apply(initial as any[]);
    return () => { s1.unsubscribe(); p.dispose(); };
  }, [initial, apply]);

  const main = surfaces.filter((s) => s.id !== "editor");
  const editor = surfaces.find((s) => s.id === "editor");

  return (
    <div className="studio-surfaces">
      {error && <p className="studio-error" role="alert">{error}</p>}
      <div className={editor ? "studio-grid with-editor" : "studio-grid"}>
        <div className="studio-main">{main.map((s) => <A2uiSurface key={s.id} surface={s} />)}</div>
        {editor && <aside className="studio-editor" aria-label="Editor"><A2uiSurface key={editor.id} surface={editor} /></aside>}
      </div>

      <button className="studio-panel-toggle" onClick={() => setPanel((v) => !v)} aria-expanded={panel}>
        {panel ? "Hide" : "Show"} A2UI messages <span>{log.length}</span>
      </button>
      {panel && (
        <section className="studio-panel" aria-label="A2UI messages">
          <header><strong>A2UI messages</strong><span>Newest first. In: agent to screen. Out: actions back to the agent.</span></header>
          <ol>
            {log.map((e, i) => (
              <li key={i} className={`dir-${e.dir}`}>
                <div className="meta"><span className="dir">{e.dir === "in" ? "In" : "Out"}</span><time>{e.at}</time></div>
                <pre><code>{JSON.stringify(e.payload, null, 2)}</code></pre>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
