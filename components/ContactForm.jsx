"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { waLink } from "@/lib/site";

const SERVICE_OPTIONS = [
  "Terjemahan Dokumen",
  "Terjemahan Tersumpah",
  "Terjemahan Situs Web",
  "Lokalisasi Software",
  "Jasa Interpreter",
  "Terjemahan E-Learning",
  "Lainnya",
];

export default function ContactForm() {
  const [f, setF] = useState({ nama: "", kontak: "", layanan: SERVICE_OPTIONS[0], pesan: "" });
  const on = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const text =
      `Halo Nuansa Translator, saya ingin bertanya.\n\n` +
      `Nama: ${f.nama}\n` +
      `Kontak: ${f.kontak}\n` +
      `Layanan: ${f.layanan}\n\n` +
      `Pesan:\n${f.pesan}`;
    window.open(waLink(text), "_blank", "noopener");
  };

  return (
    <form className="cform" onSubmit={submit}>
      <label>
        Nama
        <input type="text" value={f.nama} onChange={on("nama")} placeholder="Nama Anda" required />
      </label>
      <label>
        Email / No. WhatsApp
        <input type="text" value={f.kontak} onChange={on("kontak")} placeholder="Agar kami bisa membalas" required />
      </label>
      <label>
        Layanan yang dibutuhkan
        <select value={f.layanan} onChange={on("layanan")}>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>
        Pesan
        <textarea value={f.pesan} onChange={on("pesan")} placeholder="Ceritakan kebutuhan Anda — bahasa, jenis dokumen/acara, dan tenggat waktu." required />
      </label>
      <button type="submit" className="btn btn--lime">
        Kirim via WhatsApp <Send size={16} strokeWidth={2.2} />
      </button>
      <p className="cform__note">Tombol akan membuka WhatsApp dengan pesan Anda yang sudah terisi. Kami balas pada jam kerja.</p>
    </form>
  );
}
