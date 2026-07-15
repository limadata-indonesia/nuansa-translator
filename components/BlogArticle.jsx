import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_URL, ORG_ID, orgNode, waLink } from "@/lib/site";
import { Share2, Link2, Calendar, Clock } from "lucide-react";

/* ---- inline markdown: **bold**, *em*, [text](href) ----
   Still used for meta fields (lead, FAQ answers) that travel as raw text. */
function renderInline(text = "") {
  const parts = [];
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(\*([^*]+)\*)/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k++}>{m[2]}</strong>);
    else if (m[3]) parts.push(<a key={k++} href={m[5]}>{m[4]}</a>);
    else if (m[6]) parts.push(<em key={k++}>{m[7]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function formatDate(iso) {
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

export default function BlogArticle({ post }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const wa = waLink(post.cta?.waText || `Halo Nuansa, saya ingin berkonsultasi tentang ${post.h1}.`);

  const toc = [
    ...post.toc,
    ...(post.faqs?.length ? [{ id: "faq", label: "Pertanyaan umum (FAQ)" }] : []),
  ];

  const graph = [
    orgNode(),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.h1,
      description: post.description,
      image: `${SITE_URL}${post.ogImage || "/services/isyarat.jpg"}`,
      datePublished: post.published,
      dateModified: post.updated || post.published,
      inLanguage: "id-ID",
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: url,
    },
    ...(post.faqs?.length
      ? [{
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }]
      : []),
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />
      <Nav />

      <header className="bhero"><div className="wrap">
        <span className="bhero__crumb">Blog · {post.crumb}</span>
        <div className="bhero__text">
          <h1>{post.h1}</h1>
          {post.subtitle ? <p>{post.subtitle}</p> : null}
        </div>
      </div></header>

      <section className="bbody"><div className="wrap"><div className="bbody__grid">
        <aside className="baside">
          <div className="baside__author">
            <span className="baside__avatar" aria-hidden="true" />
            <div>
              <b>Redaksi Nuansa</b>
              <small>Tim Konten Nuansa Translator</small>
            </div>
          </div>

          {toc.length ? (
            <div className="baside__toc">
              <h4>Daftar Isi</h4>
              <ul>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ul>
            </div>
          ) : null}

          <div className="baside__sub">
            <h4>Dapatkan tips bahasa</h4>
            <p>Panduan penerjemahan & aksesibilitas langsung ke email Anda.</p>
            <form className="baside__form">
              <input type="email" placeholder="Alamat email Anda" aria-label="Email" />
              <button type="button" className="btn btn--blue">Langganan</button>
            </form>
          </div>

          <div className="baside__share">
            <span>Bagikan</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(post.h1 + " " + url)}`} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke WhatsApp"><Share2 size={16} /></a>
            <a href={url} aria-label="Salin tautan"><Link2 size={16} /></a>
          </div>
        </aside>

        <article className="bcontent">
          {post.lead ? <p className="bcontent__lead">{renderInline(post.lead)}</p> : null}

          <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

          {post.faqs?.length ? (
            <>
              <h2 id="faq">Pertanyaan yang sering diajukan</h2>
              <div className="bfaq">
                {post.faqs.map((f, i) => (
                  <div className="bfaq__item" key={i}>
                    <h3>{f.q}</h3>
                    <p>{renderInline(f.a)}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          <div className="bmeta">
            <div><span className="bmeta__k"><Calendar size={14} /> Terakhir diperbarui</span><span>{formatDate(post.updated || post.published)}</span></div>
            <div><span className="bmeta__k"><Clock size={14} /> Kategori</span><span>{post.category}</span></div>
          </div>
        </article>
      </div></div></section>

      <section className="ctaf"><div className="wrap"><div className="ctaf__grid">
        <div className="ctaf__left">
          <h2 dangerouslySetInnerHTML={{ __html: post.cta?.h2 || "Butuh bantuan bahasa<br />profesional?" }} />
          <div className="ctaf__btns">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--blue">Konsultasi Gratis</a>
            <a href={post.cta?.learnMoreHref || "/juru-bahasa-isyarat"} className="btn btn--soft">{post.cta?.learnMoreLabel || "Pelajari Layanan"}</a>
          </div>
        </div>
        <div className="ctaf__right">
          <p>{post.cta?.blurb || "Konsultasi gratis dan penawaran transparan tanpa kewajiban — dipercaya sejak 2007."}</p>
        </div>
      </div></div></section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
