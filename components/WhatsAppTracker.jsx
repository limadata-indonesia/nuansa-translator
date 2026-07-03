"use client";

import { useEffect } from "react";

// Fires a GA4 "whatsapp_click" event whenever any wa.me link is clicked,
// anywhere on the site (floating button, CTAs, footer, service pages).
// No-ops when GA isn't loaded (e.g. local dev), so it's safe everywhere.
export default function WhatsAppTracker() {
  useEffect(() => {
    function onClick(e) {
      const link = e.target.closest && e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (!href.includes("wa.me")) return;
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_click", {
          link_url: href,
          link_text: (link.innerText || link.getAttribute("aria-label") || "").trim().slice(0, 100),
          page_path: window.location.pathname,
        });
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
