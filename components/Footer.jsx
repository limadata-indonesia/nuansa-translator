import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="foot" id="contact"><div className="wrap">
      <div className="foot__top">
        <div>
          <div className="foot__logo"><Logo light /></div>
          <p className="blurb">Jasa penerjemah &amp; interpreter profesional untuk bisnis — akurat, alami, dan sesuai konteks budaya.</p>
          <ul className="foot__contact">
            <li>
              <span aria-hidden="true">📍</span>
              <span>JL. Raya Puspiptek, Paradise Serpong City, Kawasan Adventures, Carara J38 No. 38, Tangerang Selatan, Banten — Indonesia</span>
            </li>
            <li>
              <span aria-hidden="true">📞</span>
              <a href="tel:+622175675048">021 7567 5048</a>
            </li>
            <li>
              <span aria-hidden="true">💬</span>
              <a href="https://wa.me/628158738349" target="_blank" rel="noopener noreferrer">+62 815-8738-349</a>
            </li>
            <li>
              <span aria-hidden="true">✉️</span>
              <a href="mailto:nuansa_translator@yahoo.com">nuansa_translator@yahoo.com</a>
            </li>
          </ul>
        </div>
        <div className="foot__col"><h4>Perusahaan</h4><a href="/#about">Tentang</a><a href="/#services">Layanan</a><a href="/#clients">Klien</a><a href="/kontak">Kontak</a></div>
        <div className="foot__col"><h4>Layanan</h4><a href="/#services">Terjemahan Dokumen</a><a href="/#services">Lokalisasi</a><a href="/#services">Tersumpah</a><a href="/jasa-interpreter">Interpreter</a></div>
        <div className="foot__col"><h4>Langganan</h4><p className="blurb">Dapatkan tips bahasa &amp; lokalisasi di email Anda.</p>
          <form className="foot__sub"><input type="email" placeholder="Masukkan email Anda" aria-label="Email" /><button type="button" className="btn btn--lime">Langganan</button></form>
        </div>
      </div>
      <div className="foot__bar"><span>© 2026 Nuansa Translator. Seluruh hak cipta dilindungi.</span><span>Privasi · Ketentuan</span></div>
    </div></footer>
  );
}
