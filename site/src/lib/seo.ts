/* Structured data (schema.org JSON-LD) for every page. Each page renders one
   <JsonLd> with a @graph built from these helpers; the Organization node is
   shared by id so search engines treat it as one entity across the site. */

export const SITE_URL = "https://www.pebbleinteractive.com";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

const abs = (path: string) => new URL(path, SITE_URL).href;

export const organization = () => ({
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "Pebble Interactive",
  legalName: "Pebble Interactive Ltd",
  url: SITE_URL,
  logo: abs("/logo.svg"),
  image: abs("/og.png"),
  email: "hello@pebbleinteractive.com",
  description:
    "Design systems studio. Pebble Interactive designs and builds design systems, prototypes and front-end code for fintech, healthcare and SaaS teams.",
  foundingDate: "2012-05-10",
  address: { "@type": "PostalAddress", addressLocality: "Brighton", addressCountry: "GB" },
  areaServed: "GB",
  founder: { "@id": FOUNDER_ID },
  knowsAbout: [
    "Design systems",
    "Interactive product design",
    "Prototyping",
    "Front-end engineering",
    "AI-generated prototypes",
    "Fintech",
    "Healthcare technology",
  ],
});

export const founder = () => ({
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "Alastair Driver",
  jobTitle: "Director",
  url: "https://www.alastairdriver.com",
  worksFor: { "@id": ORG_ID },
});

export const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Pebble Interactive",
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-GB",
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const webPage = (o: { path: string; name: string; description?: string; type?: string }) => ({
  "@type": o.type ?? "WebPage",
  "@id": `${abs(o.path)}#webpage`,
  url: abs(o.path),
  name: o.name,
  description: o.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  inLanguage: "en-GB",
});

type WorkData = {
  client: string;
  title: string;
  intro: string;
  category: string;
  thumb: string;
  ogImage?: string;
  year: string;
  keywords?: string[];
  testimonial?: { quote: string; name: string; role: string };
};

export const caseStudy = (slug: string, d: WorkData) => {
  const url = abs(`/work/${slug}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#casestudy`,
    url,
    name: `${d.client}: ${d.title}`,
    headline: d.title,
    description: d.intro,
    genre: d.category,
    image: abs(d.ogImage ?? d.thumb),
    dateCreated: d.year,
    keywords: d.keywords?.join(", "),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    sourceOrganization: { "@id": ORG_ID },
    about: { "@type": "Organization", name: d.client },
    inLanguage: "en-GB",
    ...(d.testimonial
      ? {
          review: {
            "@type": "Review",
            reviewBody: d.testimonial.quote,
            author: { "@type": "Person", name: d.testimonial.name, jobTitle: d.testimonial.role },
            itemReviewed: { "@id": ORG_ID },
          },
        }
      : {}),
  };
};

export const workList = (items: { slug: string; client: string; title: string }[]) => ({
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: abs(`/work/${it.slug}`),
    name: `${it.client}: ${it.title}`,
  })),
});

type ArticleData = {
  title: string;
  description: string;
  series: string;
  pubDate: Date;
  updated?: Date;
  keywords?: string[];
};

export const article = (slug: string, d: ArticleData, o: { image: string; wordCount: number; related: string[] }) => {
  const url = abs(`/articles/${slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    headline: d.title,
    description: d.description,
    image: abs(o.image),
    datePublished: d.pubDate.toISOString(),
    dateModified: (d.updated ?? d.pubDate).toISOString(),
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
    articleSection: d.series,
    keywords: d.keywords?.join(", "),
    wordCount: o.wordCount,
    inLanguage: "en-GB",
    ...(o.related.length ? { isBasedOn: o.related.map((s) => ({ "@id": `${abs(`/work/${s}`)}#casestudy` })) } : {}),
  };
};

export const articleList = (items: { slug: string; title: string }[]) => ({
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: abs(`/articles/${it.slug}`),
    name: it.title,
  })),
});

type ProductData = {
  title: string;
  summary: string;
  price: number;
  currency: string;
  status: string;
  image?: string;
  keywords?: string[];
};

/** Product with an Offer. Only for products on sale (status "live"). */
export const product = (slug: string, d: ProductData, image: string) => {
  const url = abs(`/products/${slug}`);
  return {
    "@type": "Product",
    "@id": `${url}#product`,
    url,
    name: d.title,
    description: d.summary,
    image: abs(image),
    brand: { "@id": ORG_ID },
    category: "Digital download",
    keywords: d.keywords?.join(", "),
    offers: {
      "@type": "Offer",
      url,
      price: d.price.toFixed(2),
      priceCurrency: d.currency,
      availability: "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
    },
  };
};

export const productList = (items: { slug: string; title: string }[]) => ({
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: abs(`/products/${it.slug}`),
    name: it.title,
  })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
