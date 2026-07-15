// Headless-WordPress data layer for the blog.
// WordPress (nuansatranslator.wasmer.app) is the source of truth for posts;
// this module fetches them via the public REST API and normalizes them to the
// shape the blog pages render. Extra fields WordPress has no native columns
// for travel in a JSON HTML comment at the top of post content:
// <!--nuansa {...}--> (written by scripts/migrate-to-wp.mjs; optional for
// posts authored directly in WordPress).

export const WP_URL = process.env.WP_URL || "https://nuansatranslator.wasmer.app";

// ISR window: how stale the blog may be after a post is edited in WordPress.
export const WP_REVALIDATE = 600;

async function wpFetch(path) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2${path}`, {
    next: { revalidate: WP_REVALIDATE },
  });
  if (!res.ok) throw new Error(`WP API ${res.status} for ${path}`);
  return res;
}

/* ---- small HTML helpers (no DOM at build time) ---- */

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

export function decodeEntities(s = "") {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

const stripTags = (html = "") => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

function slugifyHeading(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

// Pull the <!--nuansa {...}--> meta comment out of the content (tolerating a
// wpautop-added <p> wrapper around it) and return { meta, body }.
function extractMeta(html = "") {
  const m = html.match(/(?:<p>\s*)?<!--nuansa ([\s\S]*?)-->(?:\s*<\/p>)?/);
  if (!m) return { meta: {}, body: html };
  let meta = {};
  try {
    meta = JSON.parse(m[1]);
  } catch {
    /* malformed meta: render the post anyway */
  }
  return { meta, body: html.replace(m[0], "").trim() };
}

// Ensure every <h2> has an id (WordPress-authored posts won't have them) and
// collect the table of contents.
function processHeadings(html) {
  const toc = [];
  const body = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (full, attrs, inner) => {
    const label = decodeEntities(stripTags(inner));
    let id = /id="([^"]+)"/.exec(attrs)?.[1];
    if (!id) {
      id = slugifyHeading(label) || `bagian-${toc.length + 1}`;
      attrs = `${attrs} id="${id}"`;
    }
    toc.push({ id, label });
    return `<h2${attrs}>${inner}</h2>`;
  });
  return { body, toc };
}

/* ---- normalization ---- */

function shortCrumb(category = "") {
  return (category.split("·")[1] || category).trim();
}

function normalize(wp, catName) {
  const { meta, body: rawBody } = extractMeta(wp.content?.rendered || "");
  const { body, toc } = processHeadings(rawBody);
  const h1 = decodeEntities(stripTags(wp.title?.rendered || ""));
  const description = decodeEntities(stripTags(wp.excerpt?.rendered || ""));
  const category = catName(wp.categories?.[0]);
  const faqText = (meta.faqs || []).map((f) => `${f.q} ${f.a}`).join(" ");
  const words = `${meta.lead || ""} ${stripTags(body)} ${faqText}`.split(/\s+/).filter(Boolean).length;

  return {
    slug: wp.slug,
    h1,
    seoTitle: meta.seoTitle || h1,
    description,
    keywords: meta.keywords,
    category,
    crumb: meta.crumb || shortCrumb(category),
    published: meta.published || (wp.date || "").slice(0, 10),
    updated: meta.updated || (wp.modified || "").slice(0, 10),
    ogImage: meta.ogImage,
    subtitle: meta.subtitle ?? description,
    lead: meta.lead,
    faqs: meta.faqs || [],
    cta: meta.cta,
    bodyHtml: body,
    toc,
    readMinutes: Math.max(3, Math.round(words / 200)),
  };
}

/* ---- public API ---- */

async function categoryNames() {
  const res = await wpFetch(`/categories?per_page=100&_fields=id,name`);
  const cats = await res.json();
  const map = Object.fromEntries(cats.map((c) => [c.id, decodeEntities(c.name)]));
  return (id) => map[id] || "";
}

// All published posts, newest first. Single paginated fetch — Next's data
// cache dedupes it across the pages that call this during one build/render.
export async function getAllPosts() {
  const catName = await categoryNames();
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await wpFetch(
      `/posts?per_page=100&page=${page}&orderby=date&order=desc&_fields=id,slug,title,excerpt,content,date,modified,categories`
    );
    const batch = await res.json();
    posts.push(...batch.map((p) => normalize(p, catName)));
    if (batch.length < 100) break;
  }
  // Sort by display date (meta.published may differ from the WP date).
  return posts.sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
