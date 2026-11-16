import Surfaces from "@/components/Surfaces";
import { getItems } from "@/lib/data";
import { scheduleSurface } from "@/lib/surfaces";

export const metadata = { title: "Schedule · Pebble Studio" };

export default async function Schedule() {
  return <Surfaces initial={scheduleSurface(await getItems())} />;
}
