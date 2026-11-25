import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Navbar from './components/navigation/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import FilmGrain from './components/cinematic/FilmGrain';
import Preloader from './components/cinematic/Preloader';
import PageTransition from './components/cinematic/PageTransition';
import ChatAssistant from './components/chatbot/ChatAssistant';
import { SiteMetricsProvider, useSiteMetrics } from './context/SiteMetricsContext';
import { useSeo } from './seo/useSeo';
import { shouldShowPreloader, markPreloaderShown } from './seo/preloaderPolicy';
import { initAnalytics, trackPageView } from './analytics/analytics';

// Pages are bundled together (the whole site is ~40 KB of page code): no extra request when a visitor lands on a deep link.

gsap.registerPlugin(ScrollTrigger);

function AppInner() {
  const location = useLocation();
  const { trackActivity } = useSiteMetrics();
  const isFirstRouteRef = useRef(true);
  useSeo(location.pathname);

  // Analytics (only active when VITE_GA4_ID or VITE_GTM_ID is set): start after first paint, then report each route.
  useEffect(() => {
    const idle = window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (idle.requestIdleCallback) {
      const id = idle.requestIdleCallback(initAnalytics);
      return () => idle.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(initAnalytics, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    trackPageView(location.pathname, document.title);
    if (isFirstRouteRef.current) {
      isFirstRouteRef.current = false;
      return;
    }
    trackActivity('page_view', { page_path: location.pathname });
  }, [location.pathname, trackActivity]);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:bg-ivory focus:px-4 focus:py-2 focus:text-cinemaBlack"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </PageTransition>
      <Footer />
      <ChatAssistant />
    </>
  );
}

function App() {
  // Preloader is a first-visit flourish only: skipped for crawlers/audits and for returning
  // visitors, so it never delays LCP for search engines or repeat users (Core Web Vitals).
  const [loading, setLoading] = useState(shouldShowPreloader);

  useEffect(() => {
    // Initialize Lenis smooth scroll with natural, responsive cubic easing
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out: responsive start, constant deceleration, no sluggish drag
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    (window as unknown as { __lenis: unknown }).__lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      (window as unknown as { __lenis?: unknown }).__lenis = undefined;
    };
  }, []);

  const handlePreloaderComplete = () => {
    markPreloaderShown();
    setLoading(false);
  };

  return (
    <>
      <FilmGrain />
      <CustomCursor />
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <SiteMetricsProvider>
          <BrowserRouter>
            <AppInner />
          </BrowserRouter>
        </SiteMetricsProvider>
      </div>
    </>
  );
}

export default App;
