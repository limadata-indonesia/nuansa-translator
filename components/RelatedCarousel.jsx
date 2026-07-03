"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function RelatedCarousel({ items }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector(".rel__card");
    const step = card ? card.offsetWidth + 16 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="rel">
      <div className="rel__head">
        <div>
          <h2>Layanan Bahasa Terkait</h2>
          <p>Jelajahi layanan bahasa lain yang mungkin Anda butuhkan untuk kebutuhan bisnis Anda.</p>
        </div>
        <div className="rel__nav">
          <button type="button" onClick={() => scroll(-1)} className="tstx__arrow" aria-label="Sebelumnya"><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => scroll(1)} className="tstx__arrow tstx__arrow--blue" aria-label="Berikutnya"><ArrowRight size={18} /></button>
        </div>
      </div>

      <div className="rel__row" ref={rowRef}>
        {items.map((it) => (
          <a className="rel__card" key={it.slug} href={`/${it.slug}`} style={{ background: `linear-gradient(155deg, ${it.bg}, #eef2f8)` }}>
            <div className="rel__body">
              <span className="rel__pill">Layanan</span>
              <h3>{it.label}</h3>
              <span className="rel__more">Selengkapnya →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
