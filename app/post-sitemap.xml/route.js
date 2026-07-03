import { renderUrlset, postUrls, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderUrlset(postUrls()), { headers: XML_HEADERS });
}
