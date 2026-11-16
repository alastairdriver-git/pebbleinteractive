"use client";
/* The A2UI renderer uses browser custom elements, so it only runs in the
   browser. Pages pass the initial A2UI messages (built on the server). */
import dynamic from "next/dynamic";

const StudioSurfaces = dynamic(() => import("./StudioSurfaces"), {
  ssr: false,
  loading: () => <div className="studio-loading" aria-busy="true">Loading…</div>,
});

export default function Surfaces({ initial }: { initial: unknown[] }) {
  return <StudioSurfaces initial={initial} />;
}
