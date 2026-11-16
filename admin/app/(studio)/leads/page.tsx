import Surfaces from "@/components/Surfaces";
import { getLeads } from "@/lib/data";
import { leadsSurface } from "@/lib/surfaces";

export const metadata = { title: "Leads · Pebble Studio" };

export default async function Leads() {
  return <Surfaces initial={leadsSurface(await getLeads())} />;
}
