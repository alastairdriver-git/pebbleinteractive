import Surfaces from "@/components/Surfaces";
import { getProducts } from "@/lib/data";
import { productsSurface } from "@/lib/surfaces";

export const metadata = { title: "Products · Pebble Studio" };

export default async function Products() {
  return <Surfaces initial={productsSurface(await getProducts())} />;
}
