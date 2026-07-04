import { SITE_URL } from "@/lib/site";
import { allServiceSlugs } from "@/lib/services";
import { allIndustrySlugs } from "@/lib/industries";
import { allPosts } from "@/content/blog/registry";

const now = () => new Date().toISOString();

/* ---- URL groups (one per sub-sitemap) ---- */
export function pageUrls() {
  const t = now();
  return [
    { loc: `${SITE_URL}/`, lastmod: t, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/tentang`, lastmod: t, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/kontak`, lastmod: t, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/blog`, lastmod: t, changefreq: "daily", priority: "0.8" },
  ];
}

export function postUrls() {
  return allPosts().map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    lastmod: p.updated || p.published,
    changefreq: "monthly",
    priority: "0.7",
  }));
}

export function layananUrls() {
  const t = now();
  return allServiceSlugs().map((s) => ({
    loc: `${SITE_URL}/${s}`,
    lastmod: t,
    changefreq: "monthly",
    priority: "0.9",
  }));
}

export function industriUrls() {
  const t = now();
  return allIndustrySlugs().map((s) => ({
    loc: `${SITE_URL}/${s}`,
    lastmod: t,
    changefreq: "monthly",
    priority: "0.8",
  }));
}

/* ---- sub-sitemaps referenced by the index ---- */
export function indexMaps() {
  const t = now();
  const latestPost = allPosts()[0]?.published || t;
  return [
    { loc: `${SITE_URL}/page-sitemap.xml`, lastmod: t },
    { loc: `${SITE_URL}/post-sitemap.xml`, lastmod: latestPost },
    { loc: `${SITE_URL}/layanan-sitemap.xml`, lastmod: t },
    { loc: `${SITE_URL}/industri-sitemap.xml`, lastmod: t },
  ];
}

/* ---- XML renderers ---- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const STYLE_PI = `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`;

export function renderUrlset(urls) {
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n${STYLE_PI}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function renderIndex(maps) {
  const body = maps
    .map((m) => `  <sitemap>\n    <loc>${esc(m.loc)}</loc>\n    <lastmod>${m.lastmod}</lastmod>\n  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n${STYLE_PI}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};
