// Wordmark recreated in the site style: "Nuansa Translator" with a blue globe
// replacing the "o" — a nod to the original flag-globe logo.
export default function Logo({ light = false }) {
  return (
    <span className={`brand${light ? " brand--light" : ""}`}>
      Nuansa&nbsp;Translat
      <span className="brand__globe" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#38a9f5" />
          <g fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
            <ellipse cx="12" cy="12" rx="5" ry="11" />
            <line x1="1.6" y1="12" x2="22.4" y2="12" />
            <line x1="3.6" y1="6.2" x2="20.4" y2="6.2" />
            <line x1="3.6" y1="17.8" x2="20.4" y2="17.8" />
          </g>
        </svg>
      </span>
      r
    </span>
  );
}
