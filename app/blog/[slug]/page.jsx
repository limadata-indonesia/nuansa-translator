import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";
import { getAllPosts, getPostBySlug, WP_REVALIDATE } from "@/lib/wp";

export const revalidate = WP_REVALIDATE;
// Posts published in WordPress after the last build still get rendered.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
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

export default async function Page({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
