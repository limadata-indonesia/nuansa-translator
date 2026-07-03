import { renderUrlset, industriUrls, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderUrlset(industriUrls()), { headers: XML_HEADERS });
}
