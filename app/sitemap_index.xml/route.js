import { renderIndex, indexMaps, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderIndex(indexMaps()), { headers: XML_HEADERS });
}
