import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_URL, ORG_ID, orgNode, waLink } from "@/lib/site";
import {
  MapPin, Award, Users, Globe, Building2, ShieldCheck, Clock, Sparkles, UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Tentang Kami — Perjalanan Nuansa Translator Sejak 2007",
  description:
    "Kisah Nuansa Translator: kantor penerjemah & interpreter di Jakarta & Jabodetabek sejak 2007. Perjalanan kami dari terjemahan dokumen hingga melayani 85+ perusahaan dalam 16 bahasa.",
  keywords: [
    "tentang Nuansa Translator",
    "profil perusahaan penerjemah",
    "kantor penerjemah Jakarta",
    "sejarah Nuansa Translator",
    "jasa penerjemah terpercaya",
    "penerjemah profesional Jabodetabek",
    "Nuansa Translator",
  ],
  alternates: { canonical: "/tentang" },
  openGraph: {
    title: "Tentang Nuansa Translator",
    description: "Perjalanan kami sejak 2007 melayani 85+ perusahaan dalam 16 bahasa di Jakarta & Jabodetabek.",
    url: "/tentang",
    siteName: "Nuansa Translator",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/hero-globe.jpg", width: 1200, height: 630, alt: "Nuansa Translator" }],
  },
};

const WA = waLink("Halo Nuansa, saya ingin tahu lebih lanjut tentang layanan Anda.");

const STATS = [
  { icon: Award, b: "Sejak 2007", s: "19+ tahun pengalaman" },
  { icon: Users, b: "85+", s: "Perusahaan dilayani" },
  { icon: Globe, b: "16", s: "Bahasa aktif" },
  { icon: Building2, b: "14", s: "Industri spesialis" },
];

// Company milestones — chronological. type "major" renders a large lime year-disc.
const MILESTONES = [
  { type: "major", year: "2007", cap: "Awal perjalanan", title: "Nuansa Translator berdiri", desc: "Berawal dari sebuah kantor kecil di Tangerang Selatan, kami mulai melayani terjemahan dokumen bisnis dan pribadi untuk klien di Jabodetabek." },
  { year: "2009", title: "Klien korporat pertama", desc: "Mendampingi perusahaan menembus pasar lintas negara — memperkuat pasangan bahasa inti: Inggris, Mandarin, dan Jepang." },
  { year: "2011", title: "Layanan penerjemah tersumpah", desc: "Menghadirkan terjemahan tersumpah ber-SK Kemenkumham beserta pengurusan legalisasi berjenjang hingga kedutaan." },
  { type: "major", year: "2013", cap: "Babak baru", title: "Divisi interpreter dibuka", desc: "Meluncurkan layanan interpreter simultan dan konsekutif untuk konferensi, negosiasi bisnis, dan acara resmi.", img: "/process-signing.jpg", imgAlt: "Penandatanganan kesepakatan bisnis" },
  { year: "2015", title: "16 bahasa aktif", desc: "Jaringan penerjemah spesialis per bidang berkembang hingga 16 bahasa, dari Arab dan Korea hingga bahasa isyarat." },
  { type: "major", year: "2017", cap: "Satu dekade", title: "Melangkah ke era digital", desc: "Menambah layanan lokalisasi situs web dan software agar produk klien terasa native di setiap pasar." },
  { year: "2019", title: "Terjemahan e-learning & multimedia", desc: "Melengkapi layanan dengan subtitle, voice-over, dan lokalisasi modul pelatihan untuk tim yang tersebar global." },
  { year: "2021", title: "Layanan daring penuh", desc: "Menghadirkan interpreter jarak jauh (RSI) dan alur kerja terjemahan daring, menjangkau klien di mana pun berada." },
  { type: "major", year: "2023", cap: "Tonggak kepercayaan", title: "Dipercaya 85+ perusahaan", desc: "Memperdalam spesialisasi di 14 industri — dari hukum, medis, dan migas hingga keuangan dan korporat.", img: "/hero-globe.jpg", imgAlt: "Jangkauan global Nuansa Translator" },
  { year: "2026", title: "Halaman layanan & industri khusus", desc: "Meluncurkan halaman layanan dan industri terkurasi agar setiap klien menemukan solusi bahasa yang tepat dengan cepat." },
  { type: "lead", cap: "Hari ini", title: "Dipandu tim yang berkomitmen pada mutu", desc: "Nuansa hari ini dijalankan oleh tim manajemen berpengalaman yang menjaga tiga prinsip: akurasi, kerahasiaan, dan ketepatan waktu di setiap proyek." },
];

const VALUES = [
  { icon: ShieldCheck, t: "Akurasi & Kerahasiaan", d: "Setiap dokumen ditangani penerjemah manusia yang memahami konteks, dengan kerahasiaan penuh dan NDA bila diperlukan." },
  { icon: Clock, t: "Tepat Waktu", d: "Estimasi jelas sejak awal dan komitmen pada tenggat — termasuk opsi layanan ekspres untuk kebutuhan mendesak." },
  { icon: Sparkles, t: "Kualitas Berlapis", d: "Proses proofreading oleh personel berbeda dan glosarium per klien menjaga mutu tetap konsisten dari proyek ke proyek." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Nuansa Translator", inLanguage: "id-ID", publisher: { "@id": ORG_ID } },
    orgNode(),
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/tentang#webpage`,
      url: `${SITE_URL}/tentang`,
      name: "Tentang Nuansa Translator",
      inLanguage: "id-ID",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": ORG_ID },
      breadcrumb: { "@id": `${SITE_URL}/tentang#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/tentang#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Tentang", item: `${SITE_URL}/tentang` },
      ],
    },
  ],
};

export default function TentangPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Nav />

      <main className="about">
      {/* PAGE HEADER */}
      <header className="phd"><div className="wrap"><div className="phd__grid">
        <div className="phd__eyebrow">Tentang</div>
        <div className="phd__main">
          <h1>Menerjemahkan Setiap Nuansa Sejak 2007</h1>
          <p>Nuansa Translator adalah kantor penerjemah dan interpreter profesional bersertifikat di Jakarta &amp; Jabodetabek. Selama lebih dari sembilan belas tahun, kami membantu perusahaan, firma hukum, dan individu menembus batas bahasa dengan akurat dan tepat konteks.</p>
          <div className="phd__cta"><a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--blue">Konsultasi Gratis</a></div>
        </div>
      </div></div></header>

      {/* INTRO STATS */}
      <section className="about-intro"><div className="wrap">
        <div className="about-intro__grid">
          <div className="about-intro__lead">
            <span className="pill pill--light">Tentang Kami</span>
            <h2>Bukan sekadar mengganti kata, tapi menjaga makna.</h2>
            <p>Kami percaya setiap terjemahan yang baik lahir dari pemahaman — terhadap bahasa, budaya, dan tujuan dokumen Anda. Karena itu setiap proyek dikerjakan penerjemah manusia yang menguasai bidangnya, melewati proofreading berlapis, dan dijaga kerahasiaannya dari awal hingga akhir.</p>
            <p>Dari terjemahan dokumen dan penerjemah tersumpah hingga interpreter, lokalisasi, dan e-learning, kami tumbuh menjadi mitra bahasa yang dipercaya lebih dari 85 perusahaan di berbagai industri.</p>
          </div>
          <div className="about-stats">
            {STATS.map(({ icon: Icon, b, s }) => (
              <div className="about-stats__card" key={b}>
                <Icon size={24} strokeWidth={1.8} />
                <b>{b}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div></section>

      {/* MILESTONE TIMELINE */}
      <section className="milestones"><div className="wrap">
        <div className="sec-head" style={{ textAlign: "left", marginBottom: 44 }}>
          <span className="pill pill--light">Perjalanan Kami</span>
          <h2>Tonggak Perjalanan Nuansa</h2>
        </div>

        <div className="tl">
          <span className="tl__dots" aria-hidden="true" />
          {MILESTONES.map((m, i) => {
            const isMajor = m.type === "major";
            const isLead = m.type === "lead";
            return (
              <div className={`tl__item${isMajor ? " tl__item--major" : ""}${isLead ? " tl__item--lead" : ""}`} key={i}>
                {isLead ? (
                  <span className="tl__node tl__node--avatar" aria-hidden="true"><UserCheck size={26} strokeWidth={1.9} /></span>
                ) : isMajor ? (
                  <span className="tl__node tl__node--major"><b>{m.year}</b></span>
                ) : (
                  <span className="tl__node" aria-hidden="true" />
                )}

                <div className="tl__body">
                  {m.cap && <span className="tl__cap">{m.cap}</span>}
                  {!isMajor && !isLead && <span className="tl__year">{m.year}</span>}
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>

                {m.img && (
                  <div className="tl__photo" aria-hidden="true">
                    <img src={m.img} alt={m.imgAlt || ""} loading="lazy" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div></section>

      {/* VALUES */}
      <section className="values"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Prinsip Kami</span><h2>Nilai yang Kami Pegang</h2></div>
        <div className="values__grid">
          {VALUES.map(({ icon: Icon, t, d }) => (
            <div className="values__card" key={t}><Icon size={28} strokeWidth={1.8} /><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="cta"><div className="wrap"><div className="cta__in">
        <div className="floaties"><span /><span /><span /><span /><span /><span /></div>
        <h2>Mari mulai proyek<br />bahasa Anda bersama kami</h2>
        <p>Punya dokumen untuk diterjemahkan atau butuh interpreter? Konsultasikan kebutuhan Anda hari ini — gratis dan tanpa kewajiban.</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--lime">Konsultasi Gratis</a>
      </div></div></section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
