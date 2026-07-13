import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// React renderer (Grade's components are React) + Tailwind v4 via the Vite
// plugin. `noExternal` bundles @gradeui/ui AND the workspace kit through Vite
// so their .astro/JSX compile (rather than being externalised as Node ESM).
export default defineConfig({
  site: "https://www.pebbleinteractive.com",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: { noExternal: ["@gradeui/ui", "@grade/astro-kit"] },
  },
});
