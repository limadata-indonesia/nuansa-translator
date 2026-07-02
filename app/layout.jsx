import { Plus_Jakarta_Sans, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta" });
const inter = Inter({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });
const instrument = Instrument_Serif({ subsets: ["latin"], display: "swap", weight: "400", style: "italic", variable: "--font-instrument" });

export const metadata = {
  title: "Nuansa Translator — Jasa Penerjemah & Interpreter Profesional",
  description:
    "Nuansa Translator menyediakan jasa penerjemah & interpreter profesional dari Bahasa Indonesia ke 16 bahasa — akurat, alami, dan sesuai konteks budaya. Berdiri sejak 2007.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${inter.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
