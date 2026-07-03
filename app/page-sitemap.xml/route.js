import { renderUrlset, pageUrls, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderUrlset(pageUrls()), { headers: XML_HEADERS });
}
