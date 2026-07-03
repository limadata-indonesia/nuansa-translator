// Shared content data used by the homepage and the nav mega menu.
export const SERVICES = [
  { n: "01", title: "Terjemahan Dokumen", desc: "Kontrak, laporan, PDF, dan dokumen teknis, diperiksa menyeluruh dari awal hingga akhir.", href: "/terjemahan-dokumen" },
  { n: "02", title: "Terjemahan Tersumpah", desc: "Terjemahan resmi, tersumpah, dan bernotaris yang diakui secara luas.", href: "/terjemahan-tersumpah" },
  { n: "03", title: "Terjemahan Situs Web", desc: "Situs terlokalisasi lengkap dengan publikasi multibahasa secara real-time.", href: "/terjemahan-website" },
  { n: "04", title: "Lokalisasi Aplikasi & Software", desc: "Antarmuka, teks, dan budaya disesuaikan agar produk Anda terasa native.", href: "/lokalisasi-software" },
  { n: "05", title: "Jasa Interpreter", desc: "Interpreter simultan, konsekutif, konferensi, dan jarak jauh.", href: "/jasa-interpreter" },
  { n: "06", title: "Terjemahan E-Learning", desc: "Materi kursus dan pelatihan terlokalisasi untuk tim global.", href: "/terjemahan-e-learning" },
];

export const INDUSTRIES = ["Hukum", "Medis", "Keuangan", "Pemasaran & Periklanan", "Pemerintahan", "Teknologi Informasi", "Teknik", "Otomotif", "Energi, Minyak & Gas", "SDM", "Game", "Fesyen", "Kosmetik", "Korporat"];

// Industries that have a dedicated landing page. Others fall back to /#services in the nav.
export const INDUSTRY_LINKS = {
  Hukum: "/penerjemah-hukum",
  Medis: "/penerjemah-medis",
  Keuangan: "/penerjemah-keuangan",
  "Pemasaran & Periklanan": "/penerjemah-pemasaran",
  Pemerintahan: "/penerjemah-pemerintahan",
  "Teknologi Informasi": "/penerjemah-teknologi",
  Teknik: "/penerjemah-teknik",
  Otomotif: "/penerjemah-otomotif",
  "Energi, Minyak & Gas": "/penerjemah-migas",
  SDM: "/penerjemah-sdm",
  Game: "/penerjemah-game",
  Fesyen: "/penerjemah-fesyen",
  Kosmetik: "/penerjemah-kosmetik",
  Korporat: "/penerjemah-korporat",
};

export function industryHref(name) {
  return INDUSTRY_LINKS[name] || "/#services";
}

export const LANGUAGES = ["Arab", "Inggris", "Mandarin", "Taiwan", "Jepang", "Korea", "Belanda", "Jerman", "Prancis", "Spanyol", "Italia", "Portugis", "Rusia", "Thailand", "Vietnam", "Turki", "Bahasa Isyarat"];

export const CLIENTS = [
  "Djarum", "Pfizer", "Novartis", "Sandoz", "Wyeth", "Unilever", "Coca-Cola", "Carrefour",
  "Apple", "Mattel", "Hasbro", "Playskool", "The Body Shop", "Vans", "Cadbury", "Ajinomoto",
  "Standard Chartered", "Rolls-Royce", "Amway", "Telkomsel", "Lion Air", "Tempo Scan Pacific",
  "B. Braun Medical", "Thomson Medical", "Ciba Vision", "Medco Energi", "Petrofac", "Technip",
  "Mandarin Oriental", "Sarinah", "Aero Wisata", "OLX Indonesia", "BPPT", "Bareskrim Mabes Polri",
  "ERIA", "Sidley Austin", "Roosdiono & Partners", "Soemadipradja & Taher", "Budidjaja & Associates",
];
