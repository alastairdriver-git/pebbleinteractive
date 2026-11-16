import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import rehypeFigures from "./src/lib/rehype-figures.mjs";

// React renderer (Grade's components are React) + Tailwind v4 via the Vite
// plugin. `noExternal` bundles @gradeui/ui AND the workspace kit through Vite
// so their .astro/JSX compile (rather than being externalised as Node ESM).
export default defineConfig({
  site: "https://www.pebbleinteractive.com",
  integrations: [react()],
  markdown: { rehypePlugins: [rehypeFigures] },
  vite: {
    plugins: [tailwindcss()],
    ssr: { noExternal: ["@gradeui/ui", "@grade/astro-kit"] },
  },
});
