/* Live A2UI demos for articles. A placeholder <div data-a2ui-demo="name">
   in a page becomes a working surface rendered from Pebble's own catalogue,
   with the JSON messages that built it and a log of what the user's actions
   send back to the agent. "Replay" streams the messages again one by one. */
import { useEffect, useMemo, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { MessageProcessor } from "@a2ui/web_core/v1_0";
import { A2uiSurface } from "@a2ui/react";
import { pebbleCatalog } from "./catalog";
import schedule from "../examples/schedule.json";
import product from "../examples/product.json";
import visibility from "../examples/visibility.json";

type Example = { prompt: string; note?: string; messages: any[] };
const EXAMPLES: Record<string, Example> = { schedule, product, visibility } as any;

function useProcessor(messages: any[], step: number, onAction: (a: unknown) => void) {
  const [state, setState] = useState<{ p: MessageProcessor<any>; surfaces: any[] } | null>(null);
  useEffect(() => {
    const p = new MessageProcessor([pebbleCatalog], (a) => onAction(a));
    const sync = () => setState({ p, surfaces: Array.from(p.model.surfacesMap.values()) });
    const s1 = p.onSurfaceCreated(sync);
    const s2 = p.onSurfaceDeleted(sync);
    const errs = p.processMessagesWithErrors(messages.slice(0, step));
    if (errs.length) console.warn("A2UI demo errors", JSON.stringify(errs));
    sync();
    return () => { s1.unsubscribe(); s2.unsubscribe(); p.dispose(); };
  }, [messages, step]);
  return state;
}

export function A2uiDemo({ name }: { name: string }) {
  const ex = EXAMPLES[name];
  const [tab, setTab] = useState<"surface" | "messages">("surface");
  const [step, setStep] = useState(ex?.messages.length ?? 0);
  const [log, setLog] = useState<unknown[]>([]);
  const onAction = useCallback((a: unknown) => setLog((l) => [a, ...l].slice(0, 3)), []);
  const state = useProcessor(ex?.messages ?? [], step, onAction);
  const json = useMemo(() => JSON.stringify(ex?.messages.slice(0, step) ?? [], null, 2), [ex, step]);

  if (!ex) return null;
  const replay = () => {
    setTab("surface");
    setLog([]);
    setStep(0);
    ex.messages.forEach((_, i) => setTimeout(() => setStep(i + 1), 500 + i * 650));
  };

  return (
    <div className="pa2-demo">
      <div className="pa2-demo-bar">
        <div className="pa2-prompt"><span className="pa2-prompt-who">You</span>{ex.prompt}</div>
        <div className="pa2-tabs" role="tablist">
          <button role="tab" aria-selected={tab === "surface"} onClick={() => setTab("surface")}>Surface</button>
          <button role="tab" aria-selected={tab === "messages"} onClick={() => setTab("messages")}>Messages</button>
          <button className="pa2-replay" onClick={replay}>Replay ↻</button>
        </div>
      </div>
      <div className="pa2-demo-body">
        {tab === "surface" ? (
          <div className="pa2-surface">
            {state?.surfaces.map((s) => <A2uiSurface key={s.id} surface={s} />)}
            {step < ex.messages.length && <p className="pa2-streaming">Streaming message {step + 1} of {ex.messages.length}…</p>}
          </div>
        ) : (
          <pre className="pa2-json"><code>{json}</code></pre>
        )}
      </div>
      <div className="pa2-log">
        <span className="pa2-log-label">Sent back to the agent</span>
        {log.length ? <pre><code>{JSON.stringify(log[0], null, 2)}</code></pre> : <span className="pa2-muted pa2-small">Use the surface: actions appear here.</span>}
      </div>
    </div>
  );
}

export function mountDemos(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-a2ui-demo]").forEach((el) => {
    if (el.dataset.mounted) return;
    el.dataset.mounted = "1";
    createRoot(el).render(<A2uiDemo name={el.dataset.a2uiDemo!} />);
  });
}
