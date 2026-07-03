import localFont from "next/font/local";
import "./globals.css";

// WF Visual Sans — variable font (wght 100–900), self-hosted. Powers the whole site.
const visual = localFont({
  src: "./fonts/WFVisualSansVF.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-visual",
});

export const metadata = {
  // TODO: set to the real production domain when live.
  metadataBase: new URL("https://nuansatranslator.co.id"),
  title: {
    default: "Nuansa Translator — Jasa Penerjemah & Interpreter Profesional",
    template: "%s | Nuansa Translator",
  },
  description:
    "Nuansa Translator menyediakan jasa penerjemah & interpreter profesional dari Bahasa Indonesia ke 16 bahasa — akurat, alami, dan sesuai konteks budaya. Berdiri sejak 2007.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Nuansa Translator",
    url: "/",
    title: "Nuansa Translator — Jasa Penerjemah & Interpreter Profesional",
    description:
      "Jasa penerjemah & interpreter profesional dari Bahasa Indonesia ke 16 bahasa — akurat, alami, dan sesuai konteks budaya. Berdiri sejak 2007.",
    images: [{ url: "/hero-globe.jpg", width: 1200, height: 630, alt: "Nuansa Translator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuansa Translator — Jasa Penerjemah & Interpreter Profesional",
    description: "Jasa penerjemah & interpreter profesional dari Bahasa Indonesia ke 16 bahasa.",
    images: ["/hero-globe.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={visual.variable}>
      <body>{children}</body>
    </html>
  );
}
