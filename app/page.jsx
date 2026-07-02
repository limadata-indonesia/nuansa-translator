import PriceCalculator from "@/components/PriceCalculator";
import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SERVICES, INDUSTRIES, LANGUAGES, CLIENTS } from "@/lib/data";
const TESTIMONIALS = [
  { quote: "Nuansa menangani dokumen tersumpah kami dengan sempurna dan selesai lebih cepat dari tenggat. Sangat profesional.", name: "Andini Pratama", role: "Manajer Legal & Kepatuhan" },
  { quote: "Kami butuh terjemahan tersumpah untuk berkas pengadilan — akurat, dilegalisasi dengan benar, dan tanpa repot.", name: "Budi Santoso", role: "Pengacara Korporat" },
  { quote: "Interpreter mereka membuat negosiasi multinasional kami berjalan mulus. Setiap nuansa tersampaikan dengan jelas.", name: "Sari Wijaya", role: "Kepala Pengembangan Bisnis" },
  { quote: "Manual, kontrak, sertifikat — apa pun yang kami kirim, kembali rapi dan presisi.", name: "Rizky Hamdani", role: "Direktur Operasional" },
  { quote: "Cepat, rahasia terjaga, dan andal. Nuansa telah menjadi mitra terjemahan kami selama bertahun-tahun.", name: "Maya Lestari", role: "Manajer SDM" },
  { quote: "Kontrol kualitasnya nyata — setiap dokumen diperiksa tata bahasa, makna, dan ejaan sebelum diserahkan.", name: "Dimas Aryo", role: "Kepala Pemasaran" },
  { quote: "Dari Mandarin hingga Arab, mereka mencakup bahasa yang benar-benar dibutuhkan bisnis kami.", name: "Putri Anggraini", role: "Manajer Ekspor" },
  { quote: "Terjemahan tersumpah dan legalisasi kedutaan ditangani dalam satu tempat. Sangat menghemat waktu.", name: "Fajar Nugroho", role: "Manajer Keuangan" },
  { quote: "Penerjemah profesional yang memahami konteks. Hasilnya terbaca alami, bukan seperti mesin.", name: "Intan Permata", role: "Manajer Komunikasi" },
];
const T_COLS = [
  { items: [0, 3, 6], dir: "up", dur: 34 },
  { items: [1, 4, 7], dir: "down", dur: 42 },
  { items: [2, 5, 8], dir: "up", dur: 38 },
];
function TCard({ t }) {
  return (
    <div className="tcard">
      <div className="who"><span /><div><b>{t.name}</b><small>{t.role}</small></div></div>
      <q>{t.quote}</q>
      <div className="stars">★★★★★</div>
    </div>
  );
}
const FAQS = [
  { q: "Bahasa apa saja yang Anda terjemahkan?", a: "Kami menerjemahkan dari Bahasa Indonesia ke 16 bahasa — termasuk Inggris, Arab, Mandarin, Jepang, Korea, dan lainnya — ditangani oleh penerjemah native, serta menyediakan interpreter bahasa isyarat." },
  { q: "Berapa lama waktu pengerjaannya?", a: "Sebagian besar dokumen standar selesai dalam 3–4 hari kerja. Tersedia layanan kilat satu hari (biaya 2×). Proyek besar dijadwalkan dengan tenggat yang jelas di awal." },
  { q: "Apakah terjemahan Anda tersumpah/resmi?", a: "Ya — kami menyediakan terjemahan resmi dan tersumpah, serta layanan legalisasi di Notaris, Kemenkumham, dan Kemenlu RI, hingga legalisasi di kedutaan negara terkait." },
  { q: "Format berkas apa yang diterima?", a: "PDF, Word, Excel, PowerPoint, dan format umum lainnya. Softcopy dapat dikirim via email atau WhatsApp; hardcopy dapat dijemput gratis untuk area Jakarta." },
  { q: "Bisakah saya mendapat penawaran sebelum mulai?", a: "Tentu. Kirimkan dokumen dan bahasa tujuan Anda, dan kami akan memberikan penawaran yang transparan tanpa kewajiban." },
];

export default function Home() {
  return (
    <>
      {/* NAV */}
      <Nav />

      {/* HERO */}
      <header className="hero">
        <HeroVideo className="hero__video" />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="wrap"><div className="hero__grid">
        <div>
          <span className="pill pill--dark">Penerjemah Profesional</span>
          <h1>Jasa Penerjemah &amp;<br />Interpreter <span className="accent">Profesional</span></h1>
          <p className="lead">Mitra penerjemah profesional untuk bisnis Anda — hasil terjemahan yang akurat, alami, dan sesuai konteks budaya, dikerjakan oleh penerjemah bersertifikat.</p>
          <div className="hero__cta">
            <a href="#estimate" className="btn btn--lime">Kalkulator Harga</a>
            <div className="hero__joined">
              <div className="avatars"><span /><span /><span /><span /></div>
              <small>Dipercaya 85+ perusahaan sejak 2007</small>
            </div>
          </div>
        </div>
      </div></div></header>

      {/* CLIENTS MARQUEE */}
      <section className="logos" id="clients" aria-label="Klien kami">
        <p className="logos__label">Dipercaya perusahaan terkemuka sejak 2007</p>
        <div className="logos__marquee">
          <div className="logos__track">
            {CLIENTS.map((c) => <span key={c} className="logos__item">{c}</span>)}
            {CLIENTS.map((c) => <span key={c + "-dup"} className="logos__item" aria-hidden="true">{c}</span>)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="about"><div className="wrap"><div className="stats__in">
        <h2>Mitra Tepercaya Sejak 2007</h2>
        <div className="stat"><b>16<i></i></b><strong>Bahasa</strong><p>Penerjemahan &amp; interpreter profesional dalam 16 bahasa, termasuk bahasa isyarat.</p></div>
        <div className="stat"><b>19<i>+</i></b><strong>Tahun Pengalaman</strong><p>Kantor penerjemah &amp; interpreter bersertifikat, berdiri sejak 2007.</p></div>
        <div className="stat"><b>100<i>%</i></b><strong>Kerahasiaan</strong><p>Setiap dokumen ditangani dengan kerahasiaan penuh.</p></div>
      </div></div></section>


      {/* PRICE CALCULATOR */}
      <PriceCalculator />

      {/* PROCESS */}
      <section className="process"><div className="wrap"><div className="process__grid">
        <div>
          <span className="pill pill--dark">Proses Kami</span>
          <h2>Cara <span className="accent">Kerjanya</span></h2>
          <p className="intro">Menembus pasar global itu mudah. Kirim dokumen Anda, biarkan penerjemah kami bekerja, dan terima hasil terjemahan siap pakai.</p>
          <div className="process__photo"><img src="/process-signing.jpg" alt="Penandatanganan dokumen terjemahan tersumpah" /></div>
        </div>
        <div>
          <div className="steps">
            <div className="step"><div className="num">01</div><div><h4>Kirim Dokumen Anda</h4><p>Bagikan dokumen, situs web, atau media Anda dan sebutkan bahasa yang dibutuhkan.</p></div></div>
            <div className="step"><div className="num">02</div><div><h4>Kami Terjemahkan &amp; Periksa</h4><p>Penerjemah native menerjemahkan, lalu ahli kedua memeriksa setiap kata demi akurasi.</p></div></div>
            <div className="step"><div className="num">03</div><div><h4>Terima &amp; Sempurnakan</h4><p>Terima hasil siap pakai, dengan revisi hingga setiap detail sempurna.</p></div></div>
          </div>
          <a href="#contact" className="more">Mulai Sekarang →</a>
        </div>
      </div></div></section>

      {/* SERVICES */}
      <section className="services" id="services"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Layanan Kami</span><h2>Semua Layanan Bahasa dalam Satu Tempat</h2></div>
        <div className="svc-cards">
          {SERVICES.map((s) => (
            <div className="svc" key={s.n}><div className="n">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
          ))}
        </div>
        <div className="sgroup"><h3>Berdasarkan Industri<span>Keahlian sesuai bidang</span></h3>
          <div className="tags">{INDUSTRIES.map((i) => <a href="#contact" key={i}>{i}</a>)}</div>
        </div>
        <div className="sgroup"><h3>Berdasarkan Bahasa<span>Dari Bahasa Indonesia ke 16 bahasa</span></h3>
          <div className="tags">{LANGUAGES.map((l) => <a href="#contact" key={l}>{l}</a>)}</div>
        </div>
      </div></section>

      {/* FAQ */}
      <section className="faq"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">FAQ</span><h2>Pertanyaan Umum, Jawaban Cepat</h2></div>
        <div className="faq__list">
          {FAQS.map((f, i) => (
            <details key={i} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </div></section>

      {/* TESTIMONIALS — marquee wall */}
      <section className="tst"><div className="wrap">
        <div className="sec-head"><span className="pill pill--light">Testimoni</span><h2>Apa Kata Klien Kami</h2></div>
      </div>
        <div className="tst__wall">
          <div className="tst__cols">
            {T_COLS.map((col, ci) => {
              const cards = col.items.map((i) => TESTIMONIALS[i]);
              const loop = [...cards, ...cards];
              return (
                <div key={ci} className={`tcol tcol--${ci + 1}`}>
                  <div className="tcol-track" style={{ animation: `tcol-${col.dir} ${col.dur}s linear infinite` }}>
                    {loop.map((t, i) => <TCard key={i} t={t} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta"><div className="wrap"><div className="cta__in">
        <div className="floaties"><span /><span /><span /><span /><span /><span /></div>
        <h2>Mulai perjalanan terjemahan<br />Anda hari ini!</h2>
        <p>Bergabunglah dengan ribuan bisnis yang menjangkau audiens global melalui terjemahan yang jelas, akurat, dan sesuai budaya.</p>
        <a href="#contact" className="btn btn--lime">Minta Penawaran</a>
      </div></div></section>

      {/* FOOTER */}
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
          <div className="foot__col"><h4>Perusahaan</h4><a href="#about">Tentang</a><a href="#services">Layanan</a><a href="#clients">Klien</a><a href="#contact">Kontak</a></div>
          <div className="foot__col"><h4>Layanan</h4><a href="#services">Terjemahan Dokumen</a><a href="#services">Lokalisasi</a><a href="#services">Tersumpah</a><a href="#services">Interpreter</a></div>
          <div className="foot__col"><h4>Langganan</h4><p className="blurb">Dapatkan tips bahasa &amp; lokalisasi di email Anda.</p>
            <form className="foot__sub"><input type="email" placeholder="Masukkan email Anda" aria-label="Email" /><button type="button" className="btn btn--lime">Langganan</button></form>
          </div>
        </div>
        <div className="foot__bar"><span>© 2026 Nuansa Translator. Seluruh hak cipta dilindungi.</span><span>Privasi · Ketentuan</span></div>
      </div></footer>

      <FloatingWhatsApp />
    </>
  );
}
