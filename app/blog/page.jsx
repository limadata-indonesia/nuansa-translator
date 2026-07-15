import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getAllPosts, WP_REVALIDATE } from "@/lib/wp";
import { waLink } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const revalidate = WP_REVALIDATE;

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
  ["Panduan · Alat Interpreter", "Alat Interpreter"],
  ["Layanan · Alat Interpreter", "Sewa Alat Interpreter"],
  ["Perangkat · Alat Interpreter", "Perangkat Interpreter"],
  ["Jenis Acara · Alat Interpreter", "Jenis Acara"],
  ["Industri · Alat Interpreter", "Industri Interpreter"],
  ["Biaya · Alat Interpreter", "Biaya Sewa"],
  ["Teknologi · Alat Interpreter", "Teknologi Interpreter"],
  ["Lokasi · Alat Interpreter", "Lokasi Sewa"],
  ["FAQ · Alat Interpreter", "FAQ Alat Interpreter"],
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
      <span className="acard__meta">{p.readMinutes} menit baca · {fmt(p.published)}</span>
    </Link>
  );
}

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const featuredSlugs = ["apa-itu-juru-bahasa-isyarat", "apa-itu-alat-interpreter", "berapa-tarif-juru-bahasa-isyarat"];
  const featured = featuredSlugs.map((s) => posts.find((p) => p.slug === s)).filter(Boolean);
  const featuredSet = new Set(featuredSlugs);
  const rest = posts.filter((p) => !featuredSet.has(p.slug));
  const known = new Set(CATS.map(([k]) => k));
  // Categories created later in WordPress get their own section at the end,
  // so new posts never silently disappear from the index.
  const extra = [...new Set(rest.map((p) => p.category))].filter((c) => c && !known.has(c));
  const groups = [
    ...CATS.map(([key, label]) => ({ label, key })),
    ...extra.map((key) => ({ label: shortLabel(key), key })),
  ]
    .map(({ key, label }) => ({
      label,
      id: catId(label),
      posts: rest.filter((p) => p.category === key),
    }))
    .filter((g) => g.posts.length);

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
