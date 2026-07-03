import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_URL, ORG_ID, orgNode } from "@/lib/site";
import { MapPin, Phone, MessageCircle, Mail, Clock, Car } from "lucide-react";

export const metadata = {
  title: "Hubungi Kami — Kontak Jakarta",
  description:
    "Hubungi Nuansa Translator untuk jasa penerjemah & interpreter di Jakarta & Jabodetabek — telepon, WhatsApp, email, alamat kantor, dan jam operasional.",
  keywords: [
    "kontak Nuansa Translator",
    "hubungi jasa penerjemah",
    "alamat penerjemah Jakarta",
    "nomor WhatsApp penerjemah",
    "jasa penerjemah Tangerang Selatan",
    "konsultasi penerjemah gratis",
    "Nuansa Translator",
  ],
  alternates: { canonical: "/kontak" },
  openGraph: {
    title: "Hubungi Kami — Nuansa Translator",
    description: "Telepon, WhatsApp, email, dan alamat kantor Nuansa Translator di Jakarta & Jabodetabek.",
    url: "/kontak",
    siteName: "Nuansa Translator",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/hero-globe.jpg", width: 1200, height: 630, alt: "Nuansa Translator" }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nuansa Translator",
      inLanguage: "id-ID",
      publisher: { "@id": ORG_ID },
    },
    orgNode(),
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/kontak#webpage`,
      url: `${SITE_URL}/kontak`,
      name: "Hubungi Kami — Nuansa Translator",
      inLanguage: "id-ID",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": ORG_ID },
      breadcrumb: { "@id": `${SITE_URL}/kontak#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/kontak#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Kontak", item: `${SITE_URL}/kontak` },
      ],
    },
  ],
};

export default function KontakPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Nav />

      <main className="contactpage">
      {/* PAGE HEADER */}
      <header className="phd"><div className="wrap"><div className="phd__grid">
        <div className="phd__eyebrow">Kontak</div>
        <div className="phd__main">
          <h1>Hubungi Kami</h1>
          <p>Ada dokumen untuk diterjemahkan atau butuh interpreter? Tim kami siap membantu dengan penawaran yang jelas dan tanpa kewajiban. Hubungi kami melalui kanal di bawah ini.</p>
          <div className="phd__cta"><a href="https://wa.me/628158738349" target="_blank" rel="noopener noreferrer" className="btn btn--blue">WhatsApp Kami</a></div>
        </div>
      </div></div></header>

      {/* CONTACT */}
      <section className="contact"><div className="wrap">
        <div className="contact__grid">
          <div className="contact__info">
            <h2>Informasi Kontak</h2>
            <ul className="contact__list">
              <li><MapPin size={19} /> <span>JL. Raya Puspiptek, Paradise Serpong City, Kawasan Adventures, Carara J38 No. 38, Tangerang Selatan, Banten — Indonesia</span></li>
              <li><Phone size={19} /> <span>Telepon / Fax: <a href="tel:+622175675048">021 7567 5048</a></span></li>
              <li><MessageCircle size={19} /> <span>WhatsApp: <a href="https://wa.me/628158738349" target="_blank" rel="noopener noreferrer">+62 815-8738-349</a></span></li>
              <li><Mail size={19} /> <span>Email: <a href="mailto:nuansa_translator@yahoo.com">nuansa_translator@yahoo.com</a></span></li>
              <li><Clock size={19} /> <span>Senin–Sabtu, 08.00–17.00 WIB</span></li>
              <li><Car size={19} /> <span>Akses mudah dari tol Serpong &amp; BSD; area parkir tersedia. Penjemputan dokumen gratis untuk area Jakarta.</span></li>
            </ul>
            <div className="contact__map">
              <iframe
                title="Peta lokasi Nuansa Translator"
                src="https://maps.google.com/maps?q=Paradise%20Serpong%20City%20Tangerang%20Selatan&z=14&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="contact__form">
            <h2>Kirim Pesan</h2>
            <ContactForm />
          </div>
        </div>
      </div></section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
