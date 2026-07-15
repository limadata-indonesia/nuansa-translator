/**
 * One-time migration: push all posts in content/blog into the headless
 * WordPress instance (see lib/wp.js for how the site consumes them).
 *
 * Run with:  WP_USER=... WP_APP_PASSWORD=... npx tsx scripts/migrate-to-wp.mjs
 *
 * Idempotent — reruns update existing posts (matched by slug) in place.
 *
 * Per-post extras that WordPress has no native fields for (seoTitle, subtitle,
 * lead, crumb, ogImage, keywords, updated, faqs, cta) are embedded as a JSON
 * HTML comment at the top of the post content: <!--nuansa {...}-->.
 * The body blocks are converted to the exact HTML BlogArticle.jsx used to
 * render, classes included, so the visual output is unchanged.
 */
import { allPosts } from "../content/blog/registry.js";
import { waLink } from "../lib/site.js";

const WP_URL = process.env.WP_URL || "https://nuansatranslator.wasmer.app";
const USER = process.env.WP_USER;
const PASS = process.env.WP_APP_PASSWORD;

if (!USER || !PASS) {
  console.error("Set WP_USER and WP_APP_PASSWORD env vars (wp-admin > Users > Profile > Application Passwords).");
  process.exit(1);
}

const AUTH = "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64");

async function api(path, { method = "GET", body } = {}, attempt = 1) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2${path}`, {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).catch((e) => ({ ok: false, status: 0, text: async () => String(e) }));
  if (!res.ok) {
    const detail = await res.text();
    if (attempt < 3 && (res.status === 0 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return api(path, { method, body }, attempt + 1);
    }
    throw new Error(`${method} ${path} -> ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

/* ---- block -> HTML conversion (mirrors the old BlogArticle.jsx renderer) ---- */

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// **bold**, *em*, [text](href) -> HTML (same grammar as the old renderInline)
function inline(text = "") {
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(\*([^*]+)\*)/g;
  let out = "", last = 0, m;
  while ((m = re.exec(text)) !== null) {
    out += esc(text.slice(last, m.index));
    if (m[1]) out += `<strong>${esc(m[2])}</strong>`;
    else if (m[3]) out += `<a href="${esc(m[5])}">${esc(m[4])}</a>`;
    else if (m[6]) out += `<em>${esc(m[7])}</em>`;
    last = re.lastIndex;
  }
  return out + esc(text.slice(last));
}

function slugifyHeading(text = "") {
  return text
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

const ARROW_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

function blockHtml(block, wa) {
  switch (block.t) {
    case "h2":
      return `<h2 id="${slugifyHeading(block.text)}">${inline(block.text)}</h2>`;
    case "p":
      return `<p>${inline(block.text)}</p>`;
    case "ul":
      return `<ul>${block.items.map((it) => `<li>${inline(it)}</li>`).join("")}</ul>`;
    case "ol":
      return `<ol>${block.items.map((it) => `<li>${inline(it)}</li>`).join("")}</ol>`;
    case "quote":
      return `<blockquote class="bcontent__quote">${inline(block.text)}</blockquote>`;
    case "figure":
      return `<figure class="bcontent__figure"><img src="${esc(block.src)}" alt="${esc(block.alt || "")}" />${
        block.caption ? `<figcaption>${inline(block.caption)}</figcaption>` : ""
      }</figure>`;
    case "table":
      return `<div class="btable-wrap"><table class="btable"><thead><tr>${block.head
        .map((c) => `<th>${inline(c)}</th>`)
        .join("")}</tr></thead><tbody>${block.rows
        .map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`;
    case "cta":
      return `<aside class="bcta"><div><h3>${esc(block.title)}</h3><p>${inline(
        block.text
      )}</p></div><a href="${esc(wa)}" target="_blank" rel="noopener noreferrer" class="btn btn--blue">Konsultasi Gratis ${ARROW_SVG}</a></aside>`;
    default:
      throw new Error(`Unknown block type: ${block.t}`);
  }
}

function postContent(p) {
  const wa = waLink(p.cta?.waText || `Halo Nuansa, saya ingin berkonsultasi tentang ${p.h1}.`);
  const meta = {
    // Display date. Kept here because WP turns future-dated posts into
    // scheduled (hidden) ones, so the WP date is capped at yesterday instead.
    published: p.published,
    seoTitle: p.seoTitle,
    subtitle: p.subtitle,
    lead: p.lead,
    crumb: p.crumb,
    ogImage: p.ogImage,
    keywords: p.keywords,
    updated: p.updated,
    faqs: p.faqs,
    cta: p.cta,
  };
  // "--" is illegal inside an HTML comment; escape it within the JSON string.
  const json = JSON.stringify(meta).replace(/--/g, "\\u002d\\u002d");
  const body = p.body.map((b) => blockHtml(b, wa)).join("\n");
  return `<!--nuansa ${json}-->\n${body}`;
}

/* ---- push ---- */

const posts = allPosts();
console.log(`Migrating ${posts.length} posts to ${WP_URL}`);

// Categories: one WP category per distinct post.category, same exact name.
const wanted = [...new Set(posts.map((p) => p.category))];
const existing = await api(`/categories?per_page=100`);
const catId = Object.fromEntries(existing.map((c) => [c.name, c.id]));
for (const name of wanted) {
  if (!catId[name]) {
    const c = await api(`/categories`, { method: "POST", body: { name } });
    catId[name] = c.id;
    console.log(`  + category "${name}" (#${c.id})`);
  }
}

// A future date would make WP schedule (hide) the post; cap at yesterday.
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

let created = 0, updated = 0;
for (const [i, p] of posts.entries()) {
  const wpDate = p.published > yesterday ? yesterday : p.published;
  const payload = {
    title: p.h1,
    slug: p.slug,
    status: "publish",
    // Minute offset keeps a stable, unique order for same-day posts.
    date: `${wpDate}T08:${String(i % 60).padStart(2, "0")}:00`,
    excerpt: p.description || "",
    content: postContent(p),
    categories: [catId[p.category]],
  };
  const found = await api(`/posts?slug=${encodeURIComponent(p.slug)}&status=any&_fields=id,slug`);
  if (found.length) {
    await api(`/posts/${found[0].id}`, { method: "POST", body: payload });
    updated++;
  } else {
    await api(`/posts`, { method: "POST", body: payload });
    created++;
  }
  process.stdout.write(`\r  ${i + 1}/${posts.length} ${p.slug.padEnd(60).slice(0, 60)}`);
}
console.log(`\nDone: ${created} created, ${updated} updated.`);

// Remove the stock "Hello world!" post if it is still around.
const hello = await api(`/posts?slug=hello-world&status=any&_fields=id`);
if (hello.length) {
  await api(`/posts/${hello[0].id}?force=true`, { method: "DELETE" });
  console.log(`Deleted stock "hello-world" post.`);
}

// Verify: every local slug must resolve on WP.
const remote = new Set();
for (let page = 1; ; page++) {
  const batch = await api(`/posts?per_page=100&page=${page}&_fields=slug`);
  batch.forEach((p) => remote.add(p.slug));
  if (batch.length < 100) break;
}
const missing = posts.filter((p) => !remote.has(p.slug)).map((p) => p.slug);
if (missing.length) {
  console.error(`MISSING on WP: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`Verified: all ${posts.length} slugs live on WP (${remote.size} total posts).`);
