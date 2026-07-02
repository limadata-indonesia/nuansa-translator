import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
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

export default function ServiceLanding({ data }) {
  const WA = waLink(data.waText);
  const TypesIcon = data.typesIcon;
  const related = SERVICE_LINKS.filter((s) => s.slug !== data.slug).slice(0, 4);
  const jsonLd = buildServiceJsonLd(data, LANGUAGES);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      {/* HERO */}
      <header className="hero">
        <HeroVideo className="hero__video" />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="wrap"><div className="hero__grid">
          <div>
            <span className="pill pill--dark"><MapPin size={14} strokeWidth={2.2} /> {data.location}</span>
            <h1>{data.h1[0]} <span className="accent">{data.h1[1]}</span></h1>
            <p className="lead">{data.lead}</p>
            <div className="hero__cta">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--lime">Konsultasi Gratis</a>
              <div className="hero__joined">
                <div className="stars">★★★★★</div>
                <small>{data.rating.value}/5 — dari {data.rating.count}+ perusahaan klien</small>
              </div>
            </div>
          </div>
        </div></div>
      </header>

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
        <div className="sec-head"><span className="pill pill--light">Keunggulan Kami</span><h2>{data.uspTitle}</h2></div>
        <div className="usp__grid">
          {data.usps.map(({ icon: Icon, t, d }) => (
            <div className="usp__card" key={t}><Icon size={28} strokeWidth={1.8} /><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div></section>

      {/* LOCAL MAP + EEAT CONTACT */}
      <section className="locinfo"><div className="wrap">
        <div className="sec-head" style={{ textAlign: "left", marginBottom: 32 }}>
          <span className="pill pill--light">Lokasi &amp; Kontak</span>
          <h2>Layanan di Jakarta &amp; Jabodetabek</h2>
        </div>
        <div className="locinfo__grid">
          <div className="locinfo__map">
            <iframe
              title="Peta lokasi Nuansa Translator"
              src="https://maps.google.com/maps?q=Paradise%20Serpong%20City%20Tangerang%20Selatan&z=14&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="locinfo__card">
            <h3>Nuansa Translator</h3>
            <ul className="locinfo__list">
              <li><MapPin size={18} /> <span>JL. Raya Puspiptek, Paradise Serpong City, Carara J38 No. 38, Tangerang Selatan, Banten — melayani Jabodetabek.</span></li>
              <li><Phone size={18} /> <span><a href="tel:+622175675048">021 7567 5048</a> · <a href="https://wa.me/628158738349" target="_blank" rel="noopener noreferrer">+62 815-8738-349</a></span></li>
              <li><Clock size={18} /> <span>Senin–Sabtu, 08.00–17.00 WIB · Layanan disesuaikan dengan tenggat Anda.</span></li>
              <li><Car size={18} /> <span>Akses mudah dari tol Serpong &amp; BSD; area parkir tersedia untuk kunjungan.</span></li>
            </ul>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="locinfo__gbp">Lihat profil di Google <ExternalLink size={15} /></a>
          </div>
        </div>
      </div></section>

      {/* OFFER */}
      <section className="offer"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Jenis Layanan</span><h2>{data.typesTitle}</h2></div>
        <div className="offer__grid">
          <ul className="offer__list">
            {data.types.map((t) => (
              <li key={t.n}><span className="num">{t.n}</span><div><b>{t.title}</b><p>{t.desc}</p></div></li>
            ))}
          </ul>
          <div className="offer__img" aria-hidden="true"><TypesIcon size={90} strokeWidth={1.2} /></div>
        </div>
        <div className="offer__langs">
          <span className="offer__langs-label"><Globe size={16} /> Tersedia dalam 16 bahasa:</span>
          <div className="tags">{LANGUAGES.map((l) => <a href={WA} target="_blank" rel="noopener noreferrer" key={l}>{l}</a>)}</div>
        </div>
      </div></section>

      {/* RELATED SERVICES — internal links */}
      <section className="svcinfo"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Layanan Lainnya</span><h2>Layanan Bahasa Terkait</h2></div>
        <div className="svcinfo__grid">
          {related.map(({ icon: Icon, label, slug, bg, fg }) => (
            <a className="svcinfo__card" key={slug} href={`/${slug}`}>
              <span className="svcinfo__ic" style={{ background: bg, color: fg }}><Icon size={26} strokeWidth={1.9} /></span>
              <h3>{label}</h3>
              <span className="more2">Selengkapnya →</span>
            </a>
          ))}
        </div>
      </div></section>

      {/* WHY CHOOSE US */}
      <section className="why"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Bukti Nyata</span><h2>Mengapa Klien Memilih Kami</h2></div>
        <div className="why__grid">
          <div className="why__img" aria-hidden="true"><Building2 size={96} strokeWidth={1.1} /></div>
          <div>
            <p className="intro">{data.whyIntro}</p>
            <div className="why__stats">
              {data.whyStats.map((w) => (<div key={w.s}><b>{w.b}</b><span>{w.s}</span></div>))}
            </div>
            <blockquote className="why__quote">
              <CheckCircle2 size={20} />
              <p>“{data.whyQuote.text}”</p>
              <cite>— {data.whyQuote.cite}</cite>
            </blockquote>
          </div>
        </div>
      </div></section>

      {/* TEAM */}
      <section className="team"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Tim Kami</span><h2>{data.teamTitle}</h2></div>
        <div className="team__grid">
          {data.team.map((m) => (
            <div className="team__card" key={m.name}>
              <div className="team__avatar" aria-hidden="true" />
              <b>{m.name}</b>
              <small>{m.role}</small>
              <span className={`team__tag ${m.onsite ? "team__tag--onsite" : "team__tag--remote"}`}>
                <UserCheck size={13} /> {m.tag}
              </span>
            </div>
          ))}
        </div>
      </div></section>

      {/* ARTICLE */}
      <section className="article"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Panduan</span><h2>{data.article.title}</h2></div>
        <div className="article__body" dangerouslySetInnerHTML={{ __html: data.article.html }} />
      </div></section>

      {/* FAQ */}
      <section className="faq"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">FAQ</span><h2>{data.faqTitle}</h2></div>
        <div className="faq__list">
          {data.faqs.map((f, i) => (
            <details key={i} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="cta"><div className="wrap"><div className="cta__in">
        <div className="floaties"><span /><span /><span /><span /><span /><span /></div>
        <h2 dangerouslySetInnerHTML={{ __html: data.ctaTitle }} />
        <p>{data.ctaText}</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--lime">Konsultasi Gratis</a>
      </div></div></section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
