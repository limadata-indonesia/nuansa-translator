"use client";

import { useState } from "react";

export default function TypesAccordion({ items }) {
  const [active, setActive] = useState(0);

  return (
    <div className="svcx__acc">
      {items.map((t, i) => {
        const open = i === active;
        return (
          <div className={`svcx__item${open ? " is-open" : ""}`} key={t.n || i}>
            <button type="button" className="svcx__q" onClick={() => setActive(i)} aria-expanded={open}>
              {t.title}
            </button>
            <div className="svcx__a">
              <div className="svcx__a-in"><p>{t.desc}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
