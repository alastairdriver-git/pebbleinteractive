import type { NextConfig } from "next";

const config: NextConfig = {
  // The Pebble A2UI catalogue is shipped as TypeScript source from the workspace.
  transpilePackages: ["@pebble/a2ui"],
};
export default config;
