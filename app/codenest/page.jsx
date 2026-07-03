import CodeNestHero from "@/components/CodeNestHero";

export const metadata = {
  title: "CodeNest — Launch Your Coding Career",
  description:
    "Master in-demand coding skills through hands-on projects, expert mentorship, and a career-ready curriculum built with hiring teams.",
  keywords: [
    "coding bootcamp",
    "learn to code",
    "programming courses",
    "web development bootcamp",
    "coding career",
    "software engineering course",
    "CodeNest",
  ],
  alternates: { canonical: "/codenest" },
  openGraph: {
    title: "CodeNest — Launch Your Coding Career",
    description:
      "Master in-demand coding skills through hands-on projects, expert mentorship, and a career-ready curriculum built with hiring teams.",
    url: "/codenest",
    siteName: "Nuansa Translator",
    type: "website",
  },
};

export default function CodeNestPage() {
  return <CodeNestHero />;
}
