const CITIES = [
  "Jakarta", "Tangerang", "Tangerang Selatan", "Bogor", "Depok", "Bekasi",
  "Bandung", "Surabaya", "Semarang", "Yogyakarta", "Solo", "Malang",
  "Medan", "Palembang", "Pekanbaru", "Batam", "Padang", "Bandar Lampung",
  "Makassar", "Denpasar", "Balikpapan", "Samarinda", "Banjarmasin",
  "Pontianak", "Manado", "Cirebon",
];

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "https://wa.me/628158738349" },
];

export default function Footer() {
  return (
    <footer className="foot" id="contact"><div className="wrap">
      {/* top: CTA + social */}
      <div className="foot__hero">
        <div className="foot__hero-l">
          <p>Bergabunglah dengan bisnis yang menembus pasar global melalui terjemahan yang akurat, alami, dan sesuai konteks budaya.</p>
          <a href="/kontak" className="btn btn--blue">Hubungi Kami</a>
        </div>
        <div className="foot__hero-r">
          <span className="foot__follow">Ikuti kami</span>
          <div className="foot__social">
            {SOCIAL.map(({ label, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* cities */}
      <div className="foot__cities">
        <h4>Melayani Klien di Seluruh Indonesia</h4>
        <div className="foot__cities-list">
          {CITIES.map((c) => <a key={c} href="#">Penerjemah {c}</a>)}
        </div>
      </div>

      {/* wordmark + columns */}
      <div className="foot__main">
        <h2 className="foot__wordmark">Nuansa<br />Translator</h2>
        <div className="foot__cols">
          <div className="foot__col">
            <h4>Perusahaan</h4>
            <a href="/tentang">Tentang</a>
            <a href="/#services">Layanan</a>
            <a href="/#clients">Klien</a>
            <a href="/kontak">Kontak</a>
          </div>
          <div className="foot__col">
            <h4>Kontak</h4>
            <p>JL. Raya Puspiptek, Paradise Serpong City, Carara J38 No. 38, Tangerang Selatan, Banten</p>
            <p>Senin–Sabtu, 08.00–17.00 WIB</p>
            <a href="tel:+622175675048">021 7567 5048</a>
            <a href="https://wa.me/628158738349" target="_blank" rel="noopener noreferrer">+62 815-8738-349</a>
          </div>
        </div>
      </div>

      <div className="foot__bar">
        <span>© 2026 Nuansa Translator. Seluruh hak cipta dilindungi.</span>
        <span>Privasi · Ketentuan</span>
      </div>
    </div></footer>
  );
}
