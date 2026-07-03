import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { allPosts } from "@/content/blog/registry";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "Panduan, tips, dan wawasan seputar penerjemahan, juru bahasa isyarat, interpreter, dan aksesibilitas dari Nuansa Translator.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso) {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

export default function BlogIndex() {
  const posts = allPosts();
  return (
    <>
      <Nav />
      <header className="bhero"><div className="wrap">
        <span className="bhero__crumb">Blog · Nuansa Translator</span>
        <div className="bhero__text">
          <h1>Wawasan bahasa &amp; aksesibilitas</h1>
          <p>Panduan praktis seputar penerjemahan, juru bahasa isyarat, interpreter, dan menyelenggarakan layanan yang inklusif.</p>
        </div>
      </div></header>

      <section className="bloglist"><div className="wrap">
        <div className="bloglist__grid">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="postcard">
              <span className="postcard__cat">{p.category}</span>
              <h2 className="postcard__title">{p.h1}</h2>
              {p.subtitle ? <p className="postcard__desc">{p.subtitle}</p> : null}
              <span className="postcard__foot">
                <span>{formatDate(p.published)}</span>
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div></section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
