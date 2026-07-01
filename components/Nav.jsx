"use client";

import { useState } from "react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "#", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#services", label: "Layanan" },
  { href: "#estimate", label: "Estimasi" },
  { href: "#contact", label: "Kontak" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`nav${open ? " nav--open" : ""}`}>
      <div className="wrap">
        <div className="nav__bar">
          <a href="#" className="nav__logo" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <div className="nav__mid">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
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
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn--lime nav__drawer-cta"
          onClick={() => setOpen(false)}
        >
          Hubungi Kami
        </a>
      </div>
    </nav>
  );
}
