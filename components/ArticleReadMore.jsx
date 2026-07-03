"use client";

import { useState } from "react";

export default function ArticleReadMore({ html }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`article__collapse${open ? " is-open" : ""}`}>
      <div className="article__clip">
        <div className="article__body" dangerouslySetInnerHTML={{ __html: html }} />
        {!open && <div className="article__fade" aria-hidden="true" />}
      </div>
      <button type="button" className="btn btn--soft article__toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "Tutup" : "Baca Selengkapnya"}
      </button>
    </div>
  );
}
