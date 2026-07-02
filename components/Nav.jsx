"use client";

import { useState, useRef } from "react";
import Logo from "@/components/Logo";
import { SERVICES, INDUSTRIES, LANGUAGES } from "@/lib/data";

const LINKS = [
  { href: "#", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#services", label: "Layanan", mega: true },
  { href: "#estimate", label: "Estimasi" },
  { href: "#contact", label: "Kontak" },
];

export default function Nav() {
  const [open, setOpen] = useState(false); // mobile drawer
  const [mega, setMega] = useState(false); // desktop mega menu
  const megaTimer = useRef(null);

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), 180);
  };

  return (
    <nav className={`nav${open ? " nav--open" : ""}`}>
      <div className="wrap">
        <div className="nav__bar">
          <a href="#" className="nav__logo" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <div className="nav__mid">
            {LINKS.map((l) =>
              l.mega ? (
                <div
                  key={l.label}
                  className={`nav__has-mega${mega ? " is-open" : ""}`}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <a href={l.href} className="nav__mega-trigger" aria-expanded={mega} aria-haspopup="true">
                    {l.label}
                    <svg className="nav__caret" viewBox="0 0 12 8" width="11" height="8" aria-hidden="true">
                      <path d="M1 1.5L6 6l5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <div className="mega" role="menu" onClick={() => setMega(false)}>
                    <div className="mega__col">
                      <h4 className="mega__title">Layanan</h4>
                      <ul>
                        {SERVICES.map((s) => (
                          <li key={s.title}><a href="#services">{s.title}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div className="mega__col">
                      <h4 className="mega__title">Berdasarkan Industri</h4>
                      <ul className="mega__grid">
                        {INDUSTRIES.map((i) => (
                          <li key={i}><a href="#services">{i}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div className="mega__col">
                      <h4 className="mega__title">Berdasarkan Bahasa</h4>
                      <ul className="mega__grid">
                        {LANGUAGES.map((lang) => (
                          <li key={lang}><a href="#services">{lang}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              )
            )}
          </div>
          <a href="#contact" className="btn btn--lime nav__cta">
            Hubungi Kami
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__drawer">
        <a href="#" onClick={() => setOpen(false)}>Beranda</a>
        <a href="#about" onClick={() => setOpen(false)}>Tentang</a>
        <a href="#services" onClick={() => setOpen(false)}>Layanan</a>
        <div className="nav__drawer-sub">
          <span className="nav__drawer-label">Industri</span>
          <div className="nav__drawer-tags">
            {INDUSTRIES.map((i) => (
              <a key={i} href="#services" onClick={() => setOpen(false)}>{i}</a>
            ))}
          </div>
          <span className="nav__drawer-label">Bahasa</span>
          <div className="nav__drawer-tags">
            {LANGUAGES.map((lang) => (
              <a key={lang} href="#services" onClick={() => setOpen(false)}>{lang}</a>
            ))}
          </div>
        </div>
        <a href="#estimate" onClick={() => setOpen(false)}>Estimasi</a>
        <a href="#contact" onClick={() => setOpen(false)}>Kontak</a>
        <a href="#contact" className="btn btn--lime nav__drawer-cta" onClick={() => setOpen(false)}>
          Hubungi Kami
        </a>
      </div>
    </nav>
  );
}
