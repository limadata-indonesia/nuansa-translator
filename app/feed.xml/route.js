import { SITE_URL } from "@/lib/site";
import { getAllPosts, WP_REVALIDATE } from "@/lib/wp";

export const dynamic = "force-static";
export const revalidate = WP_REVALIDATE;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const rfc822 = (iso) => new Date(`${iso}T00:00:00Z`).toUTCString();

export async function GET() {
  const posts = (await getAllPosts()).slice(0, 40);
  const latest = posts[0]?.published || "2026-01-01";

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.h1)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.updated || p.published)}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.description || p.subtitle || "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nuansa Translator — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Panduan, tips, dan wawasan seputar penerjemahan, juru bahasa isyarat, interpreter, dan aksesibilitas dari Nuansa Translator.</description>
    <language>id-ID</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
