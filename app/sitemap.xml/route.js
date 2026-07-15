import { renderIndex, indexMaps, XML_HEADERS } from "@/lib/sitemaps";
import { WP_REVALIDATE } from "@/lib/wp";

export const dynamic = "force-static";
export const revalidate = WP_REVALIDATE;

export async function GET() {
  return new Response(renderIndex(await indexMaps()), { headers: XML_HEADERS });
}
