/**
 * Single source of truth for all SEO output.
 *
 * This module is framework-free (no React / DOM) on purpose: it is imported by
 *  - the runtime <SEO /> component (keeps <head> correct on client navigation), and
 *  - the build-time Vite plugin (pre-renders per-route HTML, sitemap.xml, 404.html).
 * Both therefore always agree.
 */
import { getEnv } from '../config/env';
import { filmmaker, socialUrls } from '../data/filmmaker';
import { timeline } from '../data/timeline';

// ─── Site constants ──────────────────────────────────────────────────────────
export const SITE = {
  url: getEnv('VITE_SITE_URL', 'https://vijaykrishnan.in').replace(/\/+$/, ''),
  name: 'S Vijay Krishnan',
  title: 'S Vijay Krishnan — CEO of Youpeak Tech & Film Producer',
  company: 'Youpeak Tech',
  lang: 'en-IN',
  locale: 'en_IN',
  themeColor: '#08080B',
  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'S Vijay Krishnan — CEO of Youpeak Tech and film producer',
  /**
   * Bump when site content meaningfully changes. Used as <lastmod> in sitemap.xml.
   * (Google ignores lastmod when it is always "today", so keep this honest.)
   */
  lastModified: '2026-11-24',
} as const;

export const abs = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  if (path === '/' || path === '') return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
};

const ID = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
  org: `${SITE.url}/#organization`,
};

// ─── Route model ─────────────────────────────────────────────────────────────
export interface Crumb {
  name: string;
  path: string;
}

export interface RouteSeo {
  /** Canonical path, no trailing slash (except "/"). */
  path: string;
  title: string;
  description: string;
  /** Visible H1 equivalent used for the static fallback content. */
  heading: string;
  ogType: 'website' | 'profile' | 'video.movie';
  image: string;
  imageAlt: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  noindex?: boolean;
  breadcrumbs: Crumb[];
  /** Page-specific JSON-LD nodes (the global Person/WebSite/Organization graph is added separately). */
  schema: Record<string, unknown>[];
  /** Plain-text/HTML-safe static content for crawlers that don't run JavaScript. */
  body: { paragraphs: string[]; list?: { title: string; items: { text: string; href?: string }[] }[] };
}

const home: Crumb = { name: 'Home', path: '/' };

const ownerRef = { '@id': ID.person };

const page = (
  path: string,
  type: string,
  name: string,
  extra: Record<string, unknown> = {},
): Record<string, unknown> => ({
  '@type': type,
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name,
  isPartOf: { '@id': ID.website },
  inLanguage: SITE.lang,
  ...extra,
});

const timelineList = timeline.map((t) => ({
  text: `${t.period}: ${t.subtitle}${t.organisation ? `, ${t.organisation}` : ''}`,
}));

export const ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: 'S Vijay Krishnan — CEO of Youpeak Tech & Film Producer',
    description:
      'Official website of S Vijay Krishnan, CEO of Youpeak Tech and film producer. His journey from film co-producer and chairman to CEO, and his new movie launching in 2027.',
    heading: 'S Vijay Krishnan — CEO of Youpeak Tech & Film Producer',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'weekly',
    priority: 1.0,
    breadcrumbs: [home],
    schema: [
      page('/', 'WebPage', 'S Vijay Krishnan — CEO of Youpeak Tech & Film Producer', {
        about: ownerRef,
        primaryImageOfPage: { '@type': 'ImageObject', url: abs(SITE.ogImage) },
      }),
    ],
    body: {
      paragraphs: [filmmaker.tagline, filmmaker.bio],
      list: [{ title: 'Journey', items: timelineList }],
    },
  },
  {
    path: '/about',
    title: 'About S Vijay Krishnan — CEO of Youpeak Tech',
    description:
      'About S Vijay Krishnan: CEO of Youpeak Tech since 2023, film co-producer and chairman from 2021 to 2023, and launching a new movie in 2027.',
    heading: 'About S Vijay Krishnan',
    ogType: 'profile',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.9,
    breadcrumbs: [home, { name: 'About', path: '/about' }],
    schema: [page('/about', 'ProfilePage', 'About S Vijay Krishnan', { mainEntity: ownerRef, dateModified: SITE.lastModified })],
    body: {
      paragraphs: [filmmaker.bio],
      list: [{ title: 'Career timeline', items: timelineList }],
    },
  },
  {
    path: '/gallery',
    title: 'Gallery — Photos of S Vijay Krishnan',
    description: 'Photos of S Vijay Krishnan as CEO of Youpeak Tech, film chairman and producer.',
    heading: 'Photo Gallery',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.6,
    breadcrumbs: [home, { name: 'Gallery', path: '/gallery' }],
    schema: [page('/gallery', 'ImageGallery', 'Photo Gallery — S Vijay Krishnan', { about: ownerRef })],
    body: { paragraphs: ['Photographs of S Vijay Krishnan across his career as producer, chairman and CEO.'] },
  },
  {
    path: '/contact',
    title: 'Contact S Vijay Krishnan',
    description:
      'Get in touch with S Vijay Krishnan, CEO of Youpeak Tech and film producer, for partnerships, press and enquiries.',
    heading: 'Contact S Vijay Krishnan',
    ogType: 'website',
    image: SITE.ogImage,
    imageAlt: SITE.ogImageAlt,
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumbs: [home, { name: 'Contact', path: '/contact' }],
    schema: [page('/contact', 'ContactPage', 'Contact S Vijay Krishnan', { about: ownerRef })],
    body: {
      paragraphs: [`Based in ${filmmaker.location}.`, `Email: ${filmmaker.email}`],
    },
  },
];

/** Served with HTTP 404 by the host; must never be indexed. */
export const NOT_FOUND_ROUTE: RouteSeo = {
  path: '/404',
  title: 'Page Not Found | S Vijay Krishnan',
  description: 'The page you are looking for does not exist. Return to the official website of S Vijay Krishnan.',
  heading: 'Page Not Found',
  ogType: 'website',
  image: SITE.ogImage,
  imageAlt: SITE.ogImageAlt,
  changefreq: 'yearly',
  priority: 0,
  noindex: true,
  breadcrumbs: [],
  schema: [],
  body: {
    paragraphs: ['The page you are looking for does not exist.'],
    list: [{ title: 'Explore', items: [{ text: 'Home', href: '/' }, { text: 'About', href: '/about' }, { text: 'Contact', href: '/contact' }] }],
  },
};

export const getRoute = (pathname: string): RouteSeo | undefined => {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return ROUTES.find((r) => r.path === p);
};

// ─── Global JSON-LD graph (Person + Organization + WebSite) ──────────────────
export const globalGraph = (): Record<string, unknown> => {
  const sameAs = socialUrls();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': ID.person,
        name: SITE.name,
        url: abs('/'),
        description: filmmaker.bio,
        jobTitle: filmmaker.jobTitle,
        nationality: { '@type': 'Country', name: 'India' },
        homeLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
        },
        worksFor: { '@id': ID.org },
        ...(sameAs.length ? { sameAs } : {}),
        mainEntityOfPage: abs('/about'),
      },
      {
        '@type': 'Organization',
        '@id': ID.org,
        name: SITE.company,
        member: ownerRef,
      },
      {
        '@type': 'WebSite',
        '@id': ID.website,
        url: abs('/'),
        name: SITE.name,
        alternateName: ['vijaykrishnan.in'],
        description: 'Official website of S Vijay Krishnan, CEO of Youpeak Tech and film producer.',
        inLanguage: SITE.lang,
        publisher: ownerRef,
      },
    ],
  };
};

// ─── Head model ──────────────────────────────────────────────────────────────
export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  /** Stable key → data-seo attribute; lets the runtime upsert instead of duplicate. */
  key: string;
  attrs: Record<string, string>;
  /** Inner text for script tags. */
  text?: string;
}

export interface HeadModel {
  title: string;
  tags: HeadTag[];
}

export const buildHead = (r: RouteSeo): HeadModel => {
  const url = abs(r.path === '/404' ? '/' : r.path);
  const img = abs(r.image);
  const isDefaultImage = r.image === SITE.ogImage;
  const tags: HeadTag[] = [
    { tag: 'meta', key: 'description', attrs: { name: 'description', content: r.description } },
    {
      tag: 'meta',
      key: 'robots',
      attrs: {
        name: 'robots',
        content: r.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    },
  ];

  // Search-console ownership tokens (optional; set in .env / Vercel env vars)
  const google = getEnv('VITE_GOOGLE_SITE_VERIFICATION');
  const bing = getEnv('VITE_BING_SITE_VERIFICATION');
  if (google) tags.push({ tag: 'meta', key: 'google-site-verification', attrs: { name: 'google-site-verification', content: google } });
  if (bing) tags.push({ tag: 'meta', key: 'msvalidate.01', attrs: { name: 'msvalidate.01', content: bing } });

  if (!r.noindex) {
    tags.push(
      { tag: 'link', key: 'canonical', attrs: { rel: 'canonical', href: url } },
      { tag: 'link', key: 'hreflang-en-in', attrs: { rel: 'alternate', hreflang: 'en-IN', href: url } },
      { tag: 'link', key: 'hreflang-x-default', attrs: { rel: 'alternate', hreflang: 'x-default', href: url } },
    );
  }

  tags.push(
    { tag: 'meta', key: 'og:type', attrs: { property: 'og:type', content: r.ogType } },
    { tag: 'meta', key: 'og:site_name', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', key: 'og:locale', attrs: { property: 'og:locale', content: SITE.locale } },
    { tag: 'meta', key: 'og:url', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', key: 'og:title', attrs: { property: 'og:title', content: r.title } },
    { tag: 'meta', key: 'og:description', attrs: { property: 'og:description', content: r.description } },
    { tag: 'meta', key: 'og:image', attrs: { property: 'og:image', content: img } },
    { tag: 'meta', key: 'og:image:alt', attrs: { property: 'og:image:alt', content: r.imageAlt } },
    { tag: 'meta', key: 'twitter:card', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', key: 'twitter:title', attrs: { name: 'twitter:title', content: r.title } },
    { tag: 'meta', key: 'twitter:description', attrs: { name: 'twitter:description', content: r.description } },
    { tag: 'meta', key: 'twitter:image', attrs: { name: 'twitter:image', content: img } },
    { tag: 'meta', key: 'twitter:image:alt', attrs: { name: 'twitter:image:alt', content: r.imageAlt } },
  );

  if (isDefaultImage) {
    tags.push(
      { tag: 'meta', key: 'og:image:type', attrs: { property: 'og:image:type', content: 'image/jpeg' } },
      { tag: 'meta', key: 'og:image:width', attrs: { property: 'og:image:width', content: String(SITE.ogImageWidth) } },
      { tag: 'meta', key: 'og:image:height', attrs: { property: 'og:image:height', content: String(SITE.ogImageHeight) } },
    );
  } else {
    tags.push(
      { tag: 'meta', key: 'og:image:width', attrs: { property: 'og:image:width', content: '1200' } },
      { tag: 'meta', key: 'og:image:height', attrs: { property: 'og:image:height', content: '630' } },
    );
  }

  if (r.ogType === 'profile') {
    tags.push(
      { tag: 'meta', key: 'profile:first_name', attrs: { property: 'profile:first_name', content: 'S Vijay' } },
      { tag: 'meta', key: 'profile:last_name', attrs: { property: 'profile:last_name', content: 'Krishnan' } },
    );
  }

  const nodes: Record<string, unknown>[] = [...r.schema];
  if (r.breadcrumbs.length > 1) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: r.breadcrumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: abs(c.path),
      })),
    });
  }
  if (nodes.length) {
    tags.push({
      tag: 'script',
      key: 'jsonld-page',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }),
    });
  }

  return { title: r.title, tags };
};

// ─── Sitemap ─────────────────────────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const buildSitemap = (): string => {
  const urls = ROUTES.map((r) =>
    [
      '  <url>',
      `    <loc>${esc(abs(r.path))}</loc>`,
      `    <lastmod>${SITE.lastModified}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n'),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
};
