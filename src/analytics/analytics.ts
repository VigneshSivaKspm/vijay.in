/**
 * Optional analytics (Google Analytics 4 and/or Google Tag Manager) plus conversion and Core Web Vitals events.
 *
 * Nothing loads unless an ID is configured (VITE_GA4_ID / VITE_GTM_ID), and nothing loads when the visitor has
 * "Do Not Track" turned on. No identifiers are hard-coded here.
 *
 * Events sent (names are GA4 recommended / custom event names):
 *   page_view, contact_form_submit, email_click, phone_click, whatsapp_click, social_click, web_vitals (LCP, CLS, INP)
 */
import { getEnv } from '../config/env';

const GA4_ID = getEnv('VITE_GA4_ID');
const GTM_ID = getEnv('VITE_GTM_ID');

type Params = Record<string, string | number | boolean>;
type DataLayerWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  doNotTrack?: string;
};

const w = (): DataLayerWindow => window as DataLayerWindow;

const doNotTrack = (): boolean =>
  typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || w().doNotTrack === '1');

export const analyticsEnabled = (): boolean =>
  typeof window !== 'undefined' && Boolean(GA4_ID || GTM_ID) && !doNotTrack();

let started = false;

const addScript = (src: string) => {
  const el = document.createElement('script');
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
};

export function trackEvent(name: string, params: Params = {}): void {
  if (!started) return;
  if (GTM_ID) {
    w().dataLayer?.push({ event: name, ...params });
  } else {
    w().gtag?.('event', name, params);
  }
}

export function trackPageView(path: string, title: string): void {
  if (!started) return;
  trackEvent('page_view', { page_path: path, page_title: title, page_location: window.location.origin + path });
}

const classifyLink = (href: string): string | null => {
  if (href.startsWith('mailto:')) return 'email_click';
  if (href.startsWith('tel:')) return 'phone_click';
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\b/i.test(href) || href.startsWith('whatsapp:')) {
    return 'whatsapp_click';
  }
  if (/^https?:\/\/(www\.)?(instagram|youtube|linkedin|imdb)\.com\b/i.test(href)) return 'social_click';
  return null;
};

/** Starts analytics once (safe to call repeatedly). Call after first paint. */
export function initAnalytics(): void {
  if (started || !analyticsEnabled()) return;
  started = true;

  const win = w();
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    win.dataLayer!.push(arguments);
  };

  // Consent Mode: advertising storage is always denied; this site runs no ads.
  win.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });

  if (GTM_ID) {
    win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  } else if (GA4_ID) {
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
    win.gtag('js', new Date());
    // Page views are sent by trackPageView on every route change (single-page app).
    win.gtag('config', GA4_ID, { send_page_view: false });
  }

  // Conversion clicks: email, phone, WhatsApp and social links anywhere on the site.
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const type = classifyLink(a.getAttribute('href') || '');
      if (type) trackEvent(type, { link_url: a.getAttribute('href') || '', page_path: window.location.pathname });
    },
    { capture: true },
  );

  // Core Web Vitals from real visitors (field data), loaded lazily.
  void import('web-vitals').then(({ onLCP, onCLS, onINP }) => {
    const send = (m: { name: string; value: number; rating: string; id: string }) =>
      trackEvent('web_vitals', {
        metric_name: m.name,
        metric_value: Math.round(m.name === 'CLS' ? m.value * 1000 : m.value),
        metric_rating: m.rating,
        metric_id: m.id,
        page_path: window.location.pathname,
      });
    onLCP(send);
    onCLS(send);
    onINP(send);
  });
}
