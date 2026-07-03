import Nav from "@/components/Nav";
import TypesAccordion from "@/components/TypesAccordion";
import RelatedCarousel from "@/components/RelatedCarousel";
import ArticleReadMore from "@/components/ArticleReadMore";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { LANGUAGES } from "@/lib/data";
import { SERVICE_LINKS } from "@/lib/services";
import { waLink, buildServiceJsonLd } from "@/lib/site";
import {
  Star, Award, Users, Globe, ShieldCheck, MapPin, Phone, Clock, Car, ExternalLink,
  CheckCircle2, Building2, UserCheck,
} from "lucide-react";

const TRUST = [
  { icon: Star, b: "4.9/5", s: "Rating klien" },
  { icon: Award, b: "Sejak 2007", s: "19+ tahun" },
  { icon: Users, b: "85+", s: "Perusahaan dilayani" },
  { icon: Globe, b: "16", s: "Bahasa" },
  { icon: ShieldCheck, b: "100%", s: "Bersertifikat" },
];

const OFFER_IMG = {
  "terjemahan-dokumen": "/services/dokumen.jpg",
  "terjemahan-tersumpah": "/services/tersumpah.jpg",
  "terjemahan-website": "/services/website.jpg",
  "lokalisasi-software": "/services/software.jpg",
  "jasa-interpreter": "/services/interpreter.jpg",
  "terjemahan-e-learning": "/services/elearning.jpg",
  "juru-bahasa-isyarat": "/services/isyarat.jpg",
  "sewa-alat-interpreter": "/services/alat.jpg",
};

export default function ServiceLanding({ data }) {
  const WA = waLink(data.waText);
  const offerImg = OFFER_IMG[data.slug] || "/hero-globe.jpg";
  const related = SERVICE_LINKS.filter((s) => s.slug !== data.slug);
  const jsonLd = buildServiceJsonLd(data, LANGUAGES);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <main className="svcpage">
      {/* HERO */}
      <header className="phd"><div className="wrap"><div className="phd__grid">
        <div className="phd__eyebrow">Layanan</div>
        <div className="phd__main">
          <h1>{data.h1[0]} {data.h1[1]}</h1>
          <p>{data.lead}</p>
          <div className="phd__cta">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--blue">Konsultasi Gratis</a>
          </div>
        </div>
      </div></div></header>

      {/* TRUST */}
      <section className="trust"><div className="wrap">
        <div className="trust__row">
          {TRUST.map(({ icon: Icon, b, s }) => (
            <div className="trust__item" key={b}>
              <Icon size={26} strokeWidth={1.8} />
              <div><b>{b}</b><span>{s}</span></div>
            </div>
          ))}
        </div>
      </div></section>

      {/* USP */}
      <section className="usp"><div className="wrap">
        <h2 className="usp__h">{data.uspTitle}</h2>
        <div className="usp__grid">
          {data.usps.map(({ icon: Icon, t, d }) => (
            <div className="usp__item" key={t}>
              <span className="usp__ic"><Icon size={22} strokeWidth={1.9} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* OFFER */}
      <section className="offer"><div className="wrap">
        <div className="svcx">
          <div className="svcx__media offer__media"><img src={offerImg} alt={data.serviceName} loading="lazy" /></div>
          <div className="svcx__panel">
            <span className="pill pill--light">Jenis Layanan</span>
            <h2>{data.typesTitle}</h2>
            <TypesAccordion items={data.types} />
            <div className="offer__langs">
              <span className="offer__langs-label"><Globe size={16} /> Tersedia dalam 16 bahasa:</span>
              <div className="tags">{LANGUAGES.map((l) => <a href={WA} target="_blank" rel="noopener noreferrer" key={l}>{l}</a>)}</div>
            </div>
          </div>
        </div>
      </div></section>

      {/* RELATED SERVICES — internal links */}
      <section className="svcinfo"><div className="wrap">
        <RelatedCarousel items={related.map(({ label, slug, bg }) => ({ label, slug, bg }))} />
      </div></section>

      {/* WHY CHOOSE US — bento */}
      <section className="whyx"><div className="wrap">
        <div className="whyx__head">
          <h2>Mengapa Klien Memilih Kami</h2>
          <p>{data.whyIntro}</p>
        </div>
        <div className="whyx__grid">
          {data.whyStats.map((w, i) => (
            <div className={`whyx__tile ${["whyx__tile--blue", "whyx__tile--light", "whyx__tile--soft"][i] || "whyx__tile--light"}`} key={w.s}>
              <span className="whyx__fig">{w.b}</span>
              <span className="whyx__lbl">{w.s}</span>
            </div>
          ))}
          <div className="whyx__tile whyx__tile--light whyx__quote">
            <p>“{data.whyQuote.text}”</p>
            <cite>— {data.whyQuote.cite}</cite>
          </div>
          <div className="whyx__photo"><img src="/process-signing.jpg" alt="" aria-hidden="true" /></div>
        </div>
      </div></section>

      {/* ARTICLE */}
      <section className="article"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Panduan</span><h2>{data.article.title}</h2></div>
        <ArticleReadMore html={data.article.html} />
      </div></section>

      {/* FAQ */}
      <section className="faq2"><div className="wrap"><div className="faq2__grid">
        <div className="faq2__head"><h2>{data.faqTitle}</h2></div>
        <div className="faq2__list">
          {data.faqs.map((f, i) => (
            <details key={i}>
              <summary>{f.q}<span className="faq2__ic" aria-hidden="true" /></summary>
              <div className="faq2__a"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div></div></section>

      {/* CTA */}
      <section className="cta"><div className="wrap"><div className="cta__in">
        <div className="floaties"><span /><span /><span /><span /><span /><span /></div>
        <h2 dangerouslySetInnerHTML={{ __html: data.ctaTitle }} />
        <p>{data.ctaText}</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--lime">Konsultasi Gratis</a>
      </div></div></section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
