import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { allPosts, getPost } from "@/content/blog/registry";
import { waLink } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "Panduan, tips, dan wawasan seputar penerjemahan, juru bahasa isyarat, interpreter, dan aksesibilitas dari Nuansa Translator.",
  alternates: { canonical: "/blog" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
function fmt(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
function readTime(p) {
  let t = p.lead || "";
  (p.body || []).forEach((b) => {
    if (b.text) t += " " + b.text;
    if (b.items) t += " " + b.items.join(" ");
    if (b.rows) t += " " + b.rows.flat().join(" ");
    if (b.title) t += " " + b.title;
  });
  (p.faqs || []).forEach((f) => (t += " " + f.q + " " + f.a));
  const w = t.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(w / 200));
}

const CATS = [
  ["Panduan · Juru Bahasa Isyarat", "Panduan"],
  ["Layanan · Juru Bahasa Isyarat", "Layanan"],
  ["Bisnis · Juru Bahasa Isyarat", "Bisnis & Korporat"],
  ["Sektor Publik · Juru Bahasa Isyarat", "Sektor Publik"],
  ["Pendidikan · Juru Bahasa Isyarat", "Pendidikan"],
  ["Biaya · Juru Bahasa Isyarat", "Biaya & Tarif"],
  ["Lokasi · Juru Bahasa Isyarat", "Lokasi"],
  ["Aksesibilitas", "Aksesibilitas"],
  ["FAQ · Juru Bahasa Isyarat", "FAQ"],
  ["Panduan · Terjemahan Tersumpah", "Terjemahan Tersumpah"],
];
const SHORT = Object.fromEntries(CATS.map(([k, l]) => [k, l]));
const shortLabel = (c) => SHORT[c] || (c || "").split("·")[0].trim();
const catId = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Card({ p, cls = "" }) {
  return (
    <Link href={`/blog/${p.slug}`} className={`acard ${cls}`.trim()}>
      <span className="acard__cat">{shortLabel(p.category)}</span>
      <h3 className="acard__title">{p.h1}</h3>
      {p.subtitle ? <p className="acard__desc">{p.subtitle}</p> : null}
      <span className="acard__meta">{readTime(p)} menit baca · {fmt(p.published)}</span>
    </Link>
  );
}

export default function BlogIndex() {
  const posts = allPosts();
  const featuredSlugs = ["apa-itu-juru-bahasa-isyarat", "bisindo-vs-sibi-perbedaan", "berapa-tarif-juru-bahasa-isyarat"];
  const featured = featuredSlugs.map(getPost).filter(Boolean);
  const featuredSet = new Set(featuredSlugs);
  const rest = posts.filter((p) => !featuredSet.has(p.slug));
  const groups = CATS.map(([key, label]) => ({
    label,
    id: catId(label),
    posts: rest.filter((p) => p.category === key),
  })).filter((g) => g.posts.length);

  const [lead, ...side] = featured;
  const wa = waLink("Halo Nuansa, saya ingin berkonsultasi mengenai layanan penerjemahan.");
  const half = Math.ceil(groups.length / 2);

  return (
    <>
      <Nav />

      <div className="blogx"><div className="wrap">
        {/* header + category tabs */}
        <div className="blogx__head">
          <span className="blogx__crumb">Blog</span>
          <h1 className="blogx__title">Wawasan bahasa &amp; aksesibilitas</h1>
          <nav className="blogx__tabs" aria-label="Kategori">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`}>{g.label}</a>
            ))}
          </nav>
        </div>

        {/* featured */}
        {lead ? (
          <div className="feat">
            <Card p={lead} cls="feat__lead" />
            <div className="feat__side">
              {side.map((p) => <Card key={p.slug} p={p} />)}
            </div>
          </div>
        ) : null}

        {/* promo banner */}
        <aside className="blogx__promo">
          <div>
            <h2>Butuh jasa penerjemah atau juru bahasa isyarat?</h2>
            <p>Konsultasi gratis dengan tim Nuansa Translator — penerjemah tersumpah, interpreter, dan juru bahasa isyarat profesional.</p>
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="blogx__promo-btn">Konsultasi Gratis <ArrowRight size={16} /></a>
        </aside>

        {/* category sections */}
        {groups.map((g, i) => (
          <div key={g.id}>
            <section id={g.id} className="catsec">
              <div className="catsec__head">
                <h2>{g.label}</h2>
                <span className="catsec__count">{g.posts.length} artikel</span>
              </div>
              <div className="cardgrid">
                {g.posts.map((p) => <Card key={p.slug} p={p} />)}
              </div>
            </section>

            {i === half - 1 ? (
              <aside className="blogx__news">
                <div>
                  <span className="blogx__news-eyebrow">Newsletter</span>
                  <h2>Dapatkan tips bahasa &amp; aksesibilitas</h2>
                  <p>Panduan penerjemahan dan lokalisasi langsung ke email Anda.</p>
                </div>
                <form className="blogx__news-form">
                  <input type="email" placeholder="Alamat email Anda" aria-label="Email" />
                  <button type="button">Langganan</button>
                </form>
              </aside>
            ) : null}
          </div>
        ))}
      </div></div>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
