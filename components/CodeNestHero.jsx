"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const HLS_SRC = "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";
const NAV_LINKS = ["PROJECTS", "BLOG", "ABOUT", "RESUME"];

export default function CodeNestHero() {
  const videoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls;

    // Safari / iOS play HLS natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: false });
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
        }
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <section className="cn">
      {/* Background video */}
      <video
        ref={videoRef}
        className="cn__video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Overlays */}
      <div className="cn__overlay-left" aria-hidden="true" />
      <div className="cn__overlay-bottom" aria-hidden="true" />

      {/* Vertical grid lines (desktop) */}
      <div className="cn__grid" aria-hidden="true">
        <span style={{ left: "25%" }} />
        <span style={{ left: "50%" }} />
        <span style={{ left: "75%" }} />
      </div>

      {/* Central glow */}
      <svg className="cn__glow" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="cnGlowBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="25" />
          </filter>
          <linearGradient id="cnGlowFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0e5f4f" />
            <stop offset="50%" stopColor="#22d3b0" />
            <stop offset="100%" stopColor="#0e5f4f" />
          </linearGradient>
        </defs>
        <ellipse cx="600" cy="130" rx="430" ry="95" fill="url(#cnGlowFill)" filter="url(#cnGlowBlur)" opacity="0.35" />
      </svg>

      {/* Header */}
      <header className="cn-nav">
        <div className="cn-nav__in">
          <a href="#" className="cn-logo" aria-label="CodeNest home">
            CodeNest
          </a>

          <nav className="cn-nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </nav>

          <button
            type="button"
            className="cn-nav__burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div className={`cn-mobile${menuOpen ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <button
          type="button"
          className="cn-mobile__close"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} strokeWidth={1.75} />
        </button>
        <nav className="cn-mobile__links" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </nav>
      </div>

      {/* Hero content */}
      <div className="cn__content">
        {/* Liquid glass card */}
        <div className="cn-glass">
          <span className="cn-glass__tag">[ 2025 ]</span>
          <p className="cn-glass__title">
            Taught by <em>Industry</em> Professionals
          </p>
          <span className="cn-glass__desc">
            Learn directly from engineers shipping at scale.
          </span>
        </div>

        <p className="cn-eyebrow">Career-Ready Curriculum</p>

        <h1 className="cn-title">
          Launch Your Coding Career<span className="cn-title__dot">.</span>
        </h1>

        <p className="cn-desc">
          Master in-demand coding skills through hands-on projects, expert mentorship,
          and a curriculum built with hiring teams — so you graduate ready to ship.
        </p>

        <a href="#" className="cn-cta">
          Get Started
          <ArrowRight size={18} strokeWidth={2.25} />
        </a>
      </div>
    </section>
  );
}
