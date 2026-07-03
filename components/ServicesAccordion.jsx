"use client";

import { useState } from "react";
import Image from "next/image";

export default function ServicesAccordion({ items }) {
  const [active, setActive] = useState(0);

  return (
    <div className="svcx">
      <div className="svcx__media">
        {items.map((s, i) => (
          <Image key={i} src={s.img} alt={s.title} fill sizes="(max-width: 900px) 100vw, 45vw" className={i === active ? "is-on" : ""} />
        ))}
        <div className="svcx__stats" aria-hidden="true">
          <div><b>16</b><span>Bahasa</span></div>
          <div><b>85+</b><span>Klien</span></div>
          <div><b>19+</b><span>Tahun</span></div>
        </div>
      </div>

      <div className="svcx__panel">
        <span className="pill pill--soft">Layanan Kami</span>
        <h2>Semua Layanan Bahasa dalam Satu Tempat</h2>
        <p>Dari dokumen resmi hingga lokalisasi digital — semua kebutuhan bahasa bisnis Anda ditangani oleh satu mitra tepercaya sejak 2007.</p>
        <a href="/kontak" className="btn btn--blue">Hubungi Kami</a>

        <div className="svcx__acc">
          {items.map((s, i) => {
            const open = i === active;
            return (
              <div className={`svcx__item${open ? " is-open" : ""}`} key={i}>
                <button type="button" className="svcx__q" onClick={() => setActive(i)} aria-expanded={open}>
                  {s.title}
                </button>
                <div className="svcx__a">
                  <div className="svcx__a-in">
                    <p>{s.desc}</p>
                    {s.href && <a href={s.href} className="svcx__more">Selengkapnya →</a>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
