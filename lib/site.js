// Central site constants + structured-data builder shared by all service pages.

// TODO: set to the real production domain when live.
export const SITE_URL = "https://nuansatranslator.co.id";
export const ORG_ID = `${SITE_URL}/#organization`;

export const ORG = {
  name: "Nuansa Translator",
  telephone: "+62-21-7567-5048",
  whatsapp: "628158738349",
  email: "nuansa_translator@yahoo.com",
  address: {
    streetAddress: "JL. Raya Puspiptek, Paradise Serpong City, Carara J38 No. 38",
    addressLocality: "Tangerang Selatan",
    addressRegion: "Banten",
    postalCode: "15314",
    addressCountry: "ID",
  },
  geo: { latitude: -6.3487, longitude: 106.662 },
};

export function waLink(text) {
  return `https://wa.me/${ORG.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const AREA_SERVED = [
  { "@type": "City", name: "Jakarta" },
  { "@type": "Place", name: "Jabodetabek" },
];

// Shared Organization node (ProfessionalService + LocalBusiness) reused across pages.
export function orgNode() {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": ORG_ID,
    name: ORG.name,
    url: SITE_URL,
    image: `${SITE_URL}/hero-globe.jpg`,
    telephone: ORG.telephone,
    email: ORG.email,
    priceRange: "$$",
    foundingDate: "2007",
    description:
      "Kantor penerjemah dan interpreter profesional bersertifikat di Jakarta & Jabodetabek, melayani 16 bahasa sejak 2007.",
    address: { "@type": "PostalAddress", ...ORG.address },
    geo: { "@type": "GeoCoordinates", ...ORG.geo },
    areaServed: AREA_SERVED,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "17:00" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "85", bestRating: "5", worstRating: "1" },
  };
}

// Full Next.js metadata (title, description, canonical, Open Graph, Twitter)
// for a service landing page, derived from its content.
export function buildMetadata(data) {
  const url = `/${data.slug}`;
  return {
    // meta.title already ends with "| Nuansa Translator" — absolute avoids the layout template re-appending it.
    title: { absolute: data.meta.title },
    description: data.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: ORG.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: "/hero-globe.jpg", width: 1200, height: 630, alt: data.serviceName }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: ["/hero-globe.jpg"],
    },
  };
}

// Builds a multi-schema JSON-LD @graph for a service landing page.
export function buildServiceJsonLd(data, languages) {
  const pageUrl = `${SITE_URL}/${data.slug}`;
  const areaServed = AREA_SERVED;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: ORG.name,
        inLanguage: "id-ID",
        publisher: { "@id": ORG_ID },
      },
      orgNode(),
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        serviceType: data.serviceType,
        name: data.serviceName,
        url: pageUrl,
        description: data.serviceDesc,
        provider: { "@id": ORG_ID },
        areaServed,
        availableLanguage: languages.map((l) => ({ "@type": "Language", name: l })),
        // aggregateRating intentionally omitted here: Google review snippets are not
        // supported on Service, and produce "Invalid object type for field". The rating
        // lives on the ProfessionalService/LocalBusiness node above (a supported type).
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: data.typesTitle,
          itemListElement: data.types.map((t) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: t.title, description: t.desc },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: data.breadcrumb, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: data.meta.title,
        inLanguage: "id-ID",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}/#service` },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      },
    ],
  };
}
