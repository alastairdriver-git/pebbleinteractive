/* Mounts every live A2UI demo on the page ({{a2ui name}} in an article).
   Used as a client:only island so React and the catalogue only load on
   pages that have a demo. */
import { useEffect } from "react";
import { mountDemos } from "@pebble/a2ui/demo";

export default function A2uiDemoMount() {
  useEffect(() => mountDemos(), []);
  return null;
}
