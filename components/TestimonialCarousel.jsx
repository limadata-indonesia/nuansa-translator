"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const GRADS = [
  "linear-gradient(160deg,#2a90e0,#0b2942)",
  "linear-gradient(160deg,#1f7fc4,#0a2338)",
  "linear-gradient(160deg,#38a9f5,#123f68)",
  "linear-gradient(160deg,#1f6fbf,#0b2942)",
  "linear-gradient(160deg,#2f97e0,#0c2c47)",
];

const initials = (name) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export default function TestimonialCarousel({ items }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector(".tcard2");
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="tstx2">
      <div className="tstx2__head">
        <div>
          <span className="pill pill--soft">Kata Klien</span>
          <h2>Apa Kata Klien Kami</h2>
        </div>
        <div className="tstx2__nav">
          <button type="button" onClick={() => scroll(-1)} className="tstx__arrow" aria-label="Sebelumnya"><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => scroll(1)} className="tstx__arrow tstx__arrow--blue" aria-label="Berikutnya"><ArrowRight size={18} /></button>
        </div>
      </div>

      <div className="tstx2__row" ref={rowRef}>
        {items.map((t, i) => (
          <article className="tcard2" key={i} style={{ backgroundImage: GRADS[i % GRADS.length] }}>
            <span className="tcard2__mono" aria-hidden="true">{initials(t.name)}</span>
            <span className="tcard2__tag">{t.tag}</span>
            <div className="tcard2__body">
              <div className="tcard2__metric">{t.metric}</div>
              <div className="tcard2__cap">{t.metricCap}</div>
              <p className="tcard2__quote">“{t.quote}”</p>
              <div className="tcard2__who"><b>{t.name}</b><small>{t.role}</small></div>
            </div>
            <span className="tcard2__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
          </article>
        ))}
      </div>
    </div>
  );
}
