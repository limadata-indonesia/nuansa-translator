"use client";
import { useState } from "react";

// Tarif per halaman hasil (IDR) dari profil Nuansa Translator.
// Tarif berlaku sama untuk kedua arah (Bahasa Indonesia ⇄ bahasa terkait).
const LANGS = [
  { name: "Inggris", unsworn: 40000, sworn: 75000 },
  { name: "Arab", unsworn: 200000, sworn: 250000 },
  { name: "Mandarin", unsworn: 200000, sworn: 250000 },
  { name: "Jepang", unsworn: 200000, sworn: 450000 },
  { name: "Belanda", unsworn: 200000, sworn: 350000 },
  { name: "Prancis", unsworn: 200000, sworn: 300000 },
  { name: "Jerman", unsworn: 200000, sworn: 300000 },
  { name: "Spanyol", unsworn: 250000, sworn: null },
  { name: "Italia", unsworn: 250000, sworn: null },
  { name: "Portugis", unsworn: 250000, sworn: null },
  { name: "Rusia", unsworn: 300000, sworn: null },
  { name: "Taiwan", unsworn: 200000, sworn: 250000 },
  { name: "Thailand", unsworn: 300000, sworn: null },
  { name: "Korea", unsworn: 250000, sworn: null },
  { name: "Vietnam", unsworn: 300000, sworn: null },
  { name: "Turki", unsworn: 300000, sworn: null },
];

// Hasil distandarkan ke A4 / Courier New / 12pt / spasi ganda,
// sehingga dokumen sumber yang lebih padat menghasilkan lebih banyak halaman hasil.
const FORMATS = [
  { key: "double", label: "Sudah spasi ganda / margin lebar", mult: 1.0 },
  { key: "standard", label: "Standar — A4, spasi 1,5, 12pt", mult: 1.35 },
  { key: "dense", label: "Padat — spasi tunggal / font kecil", mult: 1.8 },
];

const fmt = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export default function PriceCalculator() {
  const [langIdx, setLangIdx] = useState(0);
  const [dir, setDir] = useState("id2x"); // id2x: dari Bhs Indonesia · x2id: ke Bhs Indonesia
  const [type, setType] = useState("unsworn");
  const [pages, setPages] = useState(5);
  const [fmtIdx, setFmtIdx] = useState(1);
  const [urgent, setUrgent] = useState(false);

  const lang = LANGS[langIdx];
  const pairLabel = dir === "id2x"
    ? `Bahasa Indonesia → ${lang.name}`
    : `${lang.name} → Bahasa Indonesia`;
  const swornAvail = lang.sworn != null;
  const effType = type === "sworn" && swornAvail ? "sworn" : "unsworn";
  const perPage = effType === "sworn" ? lang.sworn : lang.unsworn;
  const mult = FORMATS[fmtIdx].mult;
  const p = Math.max(1, Number(pages) || 0);
  const resultPages = Math.max(1, Math.ceil(p * mult));
  const total = resultPages * perPage * (urgent ? 2 : 1);

  return (
    <section className="calc" id="estimate"><div className="wrap">
      <div className="sec-head">
        <span className="pill pill--light">Estimasi Harga</span>
        <h2>Estimasi Biaya Terjemahan Anda</h2>
        <p>Dapatkan perkiraan biaya secara instan. Harga final dikonfirmasi berdasarkan dokumen asli Anda.</p>
      </div>

      <div className="calc__grid">
        <div className="calc__form">
          <label className="calc__field">
            <span>Arah terjemahan</span>
            <select value={dir} onChange={(e) => setDir(e.target.value)}>
              <option value="id2x">Dari Bahasa Indonesia</option>
              <option value="x2id">Ke Bahasa Indonesia</option>
            </select>
          </label>

          <label className="calc__field">
            <span>{dir === "id2x" ? "Bahasa tujuan" : "Bahasa sumber"}</span>
            <select value={langIdx} onChange={(e) => setLangIdx(+e.target.value)}>
              {LANGS.map((l, i) => <option key={l.name} value={i}>{l.name}</option>)}
            </select>
            <small className="calc__note">Tarif sama untuk kedua arah (mis. Indonesia ⇄ {lang.name}).</small>
          </label>

          <div className="calc__field">
            <span>Jenis layanan</span>
            <div className="calc__seg">
              <button type="button" className={effType === "unsworn" ? "on" : ""} onClick={() => setType("unsworn")}>Reguler</button>
              <button type="button" className={effType === "sworn" ? "on" : ""} onClick={() => setType("sworn")} disabled={!swornAvail}>Tersumpah</button>
            </div>
            {!swornAvail && <small className="calc__note">Terjemahan tersumpah tidak tersedia untuk bahasa {lang.name} — tarif reguler diterapkan.</small>}
          </div>

          <label className="calc__field">
            <span>Jumlah halaman</span>
            <input type="number" min="1" value={pages} onChange={(e) => setPages(e.target.value)} />
          </label>

          <label className="calc__field">
            <span>Format dokumen sumber</span>
            <select value={fmtIdx} onChange={(e) => setFmtIdx(+e.target.value)}>
              {FORMATS.map((f, i) => <option key={f.key} value={i}>{f.label}</option>)}
            </select>
          </label>

          <label className="calc__check">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            Kilat — layanan satu hari (×2)
          </label>
        </div>

        <div className="calc__result">
          <span className="calc__rlabel">Perkiraan total</span>
          <div className="calc__total">{fmt(total)}</div>
          <ul className="calc__break">
            <li><span>Pasangan bahasa</span><b>{pairLabel}</b></li>
            <li><span>Tarif per halaman hasil</span><b>{fmt(perPage)}</b></li>
            <li><span>Perkiraan halaman hasil</span><b>{resultPages}</b></li>
            <li><span>Layanan</span><b>{effType === "sworn" ? "Tersumpah" : "Reguler"}</b></li>
            {urgent && <li><span>Biaya kilat</span><b>×2</b></li>}
          </ul>
          <a href="#contact" className="btn btn--lime">Minta Penawaran Resmi</a>
          <p className="calc__disc">Hanya estimasi. Halaman hasil diformat A4, Courier New, 12pt, spasi ganda; jumlah halaman dan harga final dikonfirmasi dari dokumen Anda. Harga dapat berubah sewaktu-waktu.</p>
        </div>
      </div>
    </div></section>
  );
}
