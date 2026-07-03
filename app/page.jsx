import Image from "next/image";
import PriceCalculator from "@/components/PriceCalculator";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ServicesAccordion from "@/components/ServicesAccordion";
import { SERVICES, CLIENTS, LANGUAGES } from "@/lib/data";
import { SITE_URL, ORG_ID, orgNode, AREA_SERVED } from "@/lib/site";

const SVC_IMG = ["/services/dokumen.jpg", "/services/tersumpah.jpg", "/services/website.jpg", "/services/software.jpg", "/services/interpreter.jpg", "/services/elearning.jpg", "/services/isyarat.jpg", "/services/alat.jpg"];
const SERVICES_IMG = SERVICES.map((s, i) => ({ ...s, img: SVC_IMG[i] }));

const HERO_CARDS = [
  { title: "Sewa Alat Interpreter", desc: "Booth, headset, tour guide, dan teknisi untuk konferensi simultan.", href: "/sewa-alat-interpreter", img: "/services/alat.jpg" },
  { title: "Jasa Interpreter", tag: "POPULER", desc: "Simultan, konsekutif, hingga daring dalam 16 bahasa.", href: "/jasa-interpreter", img: "/services/interpreter.jpg" },
  { title: "Juru Bahasa Isyarat", desc: "SIBI & BISINDO untuk acara, siaran, hukum, medis, dan pendidikan.", href: "/juru-bahasa-isyarat", img: "/services/isyarat.jpg" },
];

const FAQS = [
  { q: "Bahasa apa saja yang Anda terjemahkan?", a: "Kami menerjemahkan dari Bahasa Indonesia ke 16 bahasa — termasuk Inggris, Arab, Mandarin, Jepang, Korea, dan lainnya — ditangani oleh penerjemah native, serta menyediakan interpreter bahasa isyarat." },
  { q: "Berapa lama waktu pengerjaannya?", a: "Sebagian besar dokumen standar selesai dalam 3–4 hari kerja. Tersedia layanan kilat satu hari (biaya 2×). Proyek besar dijadwalkan dengan tenggat yang jelas di awal." },
  { q: "Apakah terjemahan Anda tersumpah/resmi?", a: "Ya — kami menyediakan terjemahan resmi dan tersumpah, serta layanan legalisasi di Notaris, Kemenkumham, dan Kemenlu RI, hingga legalisasi di kedutaan negara terkait." },
  { q: "Format berkas apa yang diterima?", a: "PDF, Word, Excel, PowerPoint, dan format umum lainnya. Softcopy dapat dikirim via email atau WhatsApp; hardcopy dapat dijemput gratis untuk area Jakarta." },
  { q: "Bisakah saya mendapat penawaran sebelum mulai?", a: "Tentu. Kirimkan dokumen dan bahasa tujuan Anda, dan kami akan memberikan penawaran yang transparan tanpa kewajiban." },
];

const TESTIMONIALS = [
  { metric: "48 jam", metricCap: "dokumen tersumpah selesai", tag: "Legal", quote: "Nuansa menangani dokumen tersumpah kami dengan sempurna dan selesai lebih cepat dari tenggat. Sangat profesional.", name: "Andini Pratama", role: "Manajer Legal & Kepatuhan" },
  { metric: "100%", metricCap: "berkas pengadilan diterima", tag: "Hukum", quote: "Kami butuh terjemahan tersumpah untuk berkas pengadilan — akurat, dilegalisasi dengan benar, dan tanpa repot.", name: "Budi Santoso", role: "Pengacara Korporat" },
  { metric: "12+", metricCap: "negosiasi lintas negara didampingi", tag: "Bisnis", quote: "Interpreter mereka membuat negosiasi multinasional kami berjalan mulus. Setiap nuansa tersampaikan dengan jelas.", name: "Sari Wijaya", role: "Kepala Pengembangan Bisnis" },
  { metric: "0", metricCap: "revisi saat serah terima", tag: "Operasional", quote: "Manual, kontrak, sertifikat — apa pun yang kami kirim, kembali rapi dan presisi.", name: "Rizky Hamdani", role: "Direktur Operasional" },
  { metric: "7 tahun", metricCap: "menjadi mitra terjemahan kami", tag: "SDM", quote: "Cepat, rahasia terjaga, dan andal. Nuansa telah menjadi mitra terjemahan kami selama bertahun-tahun.", name: "Maya Lestari", role: "Manajer SDM" },
  { metric: "3 lapis", metricCap: "kontrol kualitas per dokumen", tag: "Pemasaran", quote: "Kontrol kualitasnya nyata — setiap dokumen diperiksa tata bahasa, makna, dan ejaan sebelum diserahkan.", name: "Dimas Aryo", role: "Kepala Pemasaran" },
  { metric: "16", metricCap: "bahasa untuk pasar ekspor", tag: "Ekspor", quote: "Dari Mandarin hingga Arab, mereka mencakup bahasa yang benar-benar dibutuhkan bisnis kami.", name: "Putri Anggraini", role: "Manajer Ekspor" },
  { metric: "1 pintu", metricCap: "tersumpah + legalisasi kedutaan", tag: "Keuangan", quote: "Terjemahan tersumpah dan legalisasi kedutaan ditangani dalam satu tempat. Sangat menghemat waktu.", name: "Fajar Nugroho", role: "Manajer Keuangan" },
  { metric: "100%", metricCap: "hasil terbaca alami", tag: "Komunikasi", quote: "Penerjemah profesional yang memahami konteks. Hasilnya terbaca alami, bukan seperti mesin.", name: "Intan Permata", role: "Manajer Komunikasi" },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Nuansa Translator", inLanguage: "id-ID", publisher: { "@id": ORG_ID } },
    orgNode(),
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      serviceType: "Jasa Penerjemah",
      name: "Jasa Penerjemah & Interpreter — Nuansa Translator",
      url: SITE_URL,
      description:
        "Jasa penerjemah profesional, tersumpah, dan interpreter di Jakarta & Jabodetabek — terjemahan dokumen, tersumpah, situs web, lokalisasi software, e-learning, dan interpreter dalam 16 bahasa sejak 2007.",
      provider: { "@id": ORG_ID },
      areaServed: AREA_SERVED,
      availableLanguage: LANGUAGES.map((l) => ({ "@type": "Language", name: l })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Bahasa",
        itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.desc } })),
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#layanan`,
      name: "Layanan Nuansa Translator",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "SiteNavigationElement",
        position: i + 1,
        name: s.title,
        url: `${SITE_URL}${s.href}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Jasa Penerjemah Profesional Jakarta | Nuansa Translator",
      inLanguage: "id-ID",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": ORG_ID },
      primaryImageOfPage: `${SITE_URL}/hero-globe.jpg`,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Nav />

      <main className="home">
        {/* HERO */}
        <header className="hero2">
          <div className="wrap">
            <div className="hero2__head">
              <h1>Jasa Penerjemah &amp; Interpreter Profesional</h1>
              <p>Akurat, alami, dan sesuai konteks budaya — menjaga setiap nuansa. Dipercaya 85+ perusahaan di Jakarta &amp; Jabodetabek sejak 2007.</p>
            </div>
            <div className="hero2__cards">
              {HERO_CARDS.map((c) => (
                <a className="hero2__card" href={c.href} key={c.title}>
                  <div className="hero2__card-txt">
                    <h3>{c.title}{c.tag && <span className="hero2__tag">{c.tag}</span>}</h3>
                    <p>{c.desc}</p>
                  </div>
                  <div className="hero2__card-img"><Image src={c.img} alt="" fill sizes="112px" aria-hidden="true" /></div>
                </a>
              ))}
            </div>
            <p className="hero2__cta">Mulai proyek Anda hari ini. Konsultasi gratis. <a href="#estimate">Hitung Estimasi Harga →</a></p>
          </div>
        </header>

        {/* CLIENTS MARQUEE */}
        <section className="logos" id="clients" aria-label="Klien kami">
          <p className="logos__label">Dipercaya perusahaan terkemuka sejak 2007</p>
          <div className="logos__marquee">
            <div className="logos__track">
              {CLIENTS.map((c) => <span key={c} className="logos__item">{c}</span>)}
              {CLIENTS.map((c) => <span key={c + "-dup"} className="logos__item" aria-hidden="true">{c}</span>)}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats" id="about"><div className="wrap"><div className="stats__in">
          <h2>Mitra Tepercaya Sejak 2007</h2>
          <div className="stat"><b>16<i></i></b><strong>Bahasa</strong><p>Penerjemahan &amp; interpreter profesional dalam 16 bahasa, termasuk bahasa isyarat.</p></div>
          <div className="stat"><b>19<i>+</i></b><strong>Tahun Pengalaman</strong><p>Kantor penerjemah &amp; interpreter bersertifikat, berdiri sejak 2007.</p></div>
          <div className="stat"><b>100<i>%</i></b><strong>Kerahasiaan</strong><p>Setiap dokumen ditangani dengan kerahasiaan penuh.</p></div>
        </div></div></section>

        {/* PRICE CALCULATOR */}
        <section className="pricing">
          <PriceCalculator />
        </section>

        {/* SERVICES */}
        <section className="services" id="services"><div className="wrap">
          <ServicesAccordion items={SERVICES_IMG} />
        </div></section>

        {/* TESTIMONIAL CAROUSEL */}
        <section className="tstx"><div className="wrap">
          <TestimonialCarousel items={TESTIMONIALS} />
        </div></section>

        {/* FAQ */}
        <section className="faq2"><div className="wrap"><div className="faq2__grid">
          <div className="faq2__head"><h2>Pertanyaan yang<br />Sering Diajukan</h2></div>
          <div className="faq2__list">
            {FAQS.map((f, i) => (
              <details key={i}>
                <summary>{f.q}<span className="faq2__ic" aria-hidden="true" /></summary>
                <div className="faq2__a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div></div></section>

        {/* GET STARTED CTA */}
        <section className="ctaf"><div className="wrap"><div className="ctaf__grid">
          <div className="ctaf__left">
            <h2>Konsultasi Gratis,<br />Tanpa Kewajiban</h2>
            <div className="ctaf__btns">
              <a href="/kontak" className="btn btn--blue">Konsultasi Gratis</a>
              <a href="#estimate" className="btn btn--soft">Hitung Estimasi</a>
            </div>
          </div>
          <div className="ctaf__right">
            <p>Kirim dokumen atau kebutuhan bahasa Anda, dan kami berikan penawaran yang transparan tanpa kewajiban — dikerjakan penerjemah bersertifikat, dipercaya 85+ perusahaan sejak 2007.</p>
          </div>
        </div></div></section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
