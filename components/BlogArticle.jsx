import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_URL, ORG_ID, orgNode, waLink } from "@/lib/site";
import { Share2, Link2, ArrowUpRight, Calendar, Clock } from "lucide-react";

/* ---- inline markdown: **bold**, *em*, [text](href) ---- */
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

function Block({ block, wa }) {
  switch (block.t) {
    case "h2":
      return <h2 id={slugifyHeading(block.text)}>{renderInline(block.text)}</h2>;
    case "p":
      return <p>{renderInline(block.text)}</p>;
    case "ul":
      return <ul>{block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>)}</ul>;
    case "ol":
      return <ol>{block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>)}</ol>;
    case "quote":
      return <blockquote className="bcontent__quote">{renderInline(block.text)}</blockquote>;
    case "figure":
      return (
        <figure className="bcontent__figure">
          <Image src={block.src} alt={block.alt || ""} width={1200} height={700} sizes="(max-width: 900px) 100vw, 720px" />
          {block.caption ? <figcaption>{renderInline(block.caption)}</figcaption> : null}
        </figure>
      );
    case "table":
      return (
        <div className="btable-wrap">
          <table className="btable">
            <thead><tr>{block.head.map((c, i) => <th key={i}>{renderInline(c)}</th>)}</tr></thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>{row.map((c, ci) => <td key={ci}>{renderInline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <aside className="bcta">
          <div>
            <h3>{block.title}</h3>
            <p>{renderInline(block.text)}</p>
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--blue">
            Konsultasi Gratis <ArrowUpRight size={16} />
          </a>
        </aside>
      );
    default:
      return null;
  }
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
    ...post.body.filter((b) => b.t === "h2").map((b) => ({ id: slugifyHeading(b.text), label: b.text })),
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

          {post.body.map((block, i) => <Block key={i} block={block} wa={wa} />)}

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
