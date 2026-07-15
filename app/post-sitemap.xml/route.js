import { renderUrlset, postUrls, XML_HEADERS } from "@/lib/sitemaps";
import { WP_REVALIDATE } from "@/lib/wp";

export const dynamic = "force-static";
export const revalidate = WP_REVALIDATE;

export async function GET() {
  return new Response(renderUrlset(await postUrls()), { headers: XML_HEADERS });
}
