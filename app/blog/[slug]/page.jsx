import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";
import { getPost, allSlugs } from "@/content/blog/registry";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.h1,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.h1,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "Nuansa Translator",
      locale: "id_ID",
      type: "article",
      images: [{ url: post.ogImage || "/services/isyarat.jpg", width: 1200, height: 630, alt: post.h1 }],
    },
  };
}

export default function Page({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
