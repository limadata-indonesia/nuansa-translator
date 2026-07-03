import { renderUrlset, layananUrls, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderUrlset(layananUrls()), { headers: XML_HEADERS });
}
