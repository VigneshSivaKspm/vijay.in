import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Eye } from 'lucide-react';
import { filmmaker } from '../data/filmmaker';
import MagneticButton from '../components/ui/MagneticButton';
import PortraitSlider from '../components/ui/PortraitSlider';
import CareerTimeline from '../components/sections/CareerTimeline';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import { useSiteMetrics } from '../context/SiteMetricsContext';
import { portraits } from '../data/portraits';

gsap.registerPlugin(ScrollTrigger);

// ─── Film Corner Markers ─────────────────────────────────────────────────────
const FrameCorners: React.FC = () => (
  <>
    <span className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-ivory/30" />
    <span className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-ivory/30" />
    <span className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-ivory/30" />
    <span className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-ivory/30" />
  </>
);

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const { visitsCount, isLive } = useSiteMetrics();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((p) => (p + 1) % filmmaker.roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !bgRef.current) return;

    // Parallax background
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(bgRef.current, { y: self.progress * 150 });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cinemaBlack"
    >
      {/* Background with animated gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(124,58,237,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(217,26,60,0.05) 0%, transparent 50%), linear-gradient(180deg, #FAF9F6 0%, #F2F0EA 50%, #FAF9F6 100%)',
        }}
      />

      {/* Animated geometric overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,20,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,24,0.12) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Film numbering */}
      <div className="absolute top-24 right-8 md:right-20 flex items-center gap-3 opacity-30">
        <span className="font-display text-xs tracking-widest text-silver">01</span>
        <span className="w-12 h-px bg-silver" />
        <span className="font-display text-xs tracking-widest text-silver">HOME</span>
      </div>

      <FrameCorners />

      {/* Content */}
      <div className="relative z-10 container-wide pt-28 pb-20 animate-fade-up motion-reduce:animate-none">
        {/* Top header row: Eyebrow + Modern Total Visits Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="eyebrow text-silver/80">
            YOUPEAK TECH&nbsp;&nbsp;•&nbsp;&nbsp;FILM
          </p>

          <div className="inline-flex items-center gap-4 px-4 py-2.5 rounded-xl bg-charcoal/80 backdrop-blur-md border border-ivory/10 shadow-[0_8px_30px_rgba(20,20,24,0.06)] self-start sm:self-auto">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 text-gold shrink-0">
              <Eye size={18} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
                <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-silver">
                  Website Total Visits
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <AnimatedNumber
                  value={visitsCount}
                  className="font-display text-2xl md:text-3xl tracking-wide text-ivory leading-none"
                />
                <span className="font-caption italic text-xs text-silver/80">
                  {isLive ? 'Live' : 'Tracked'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main name */}
        <h1 className="font-display text-[70px] sm:text-[90px] md:text-[130px] lg:text-[160px] xl:text-[200px] leading-none tracking-tight mb-8 md:mb-12">
          <span className="block overflow-hidden mb-4 text-ivory">S VIJAY</span>
          <span className="block overflow-hidden">
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(20,20,24,0.65)' }}>
              KRISHNAN
            </span>
          </span>
          <span className="sr-only"> — CEO of Youpeak Tech and film producer, based in Chennai, India</span>
        </h1>

        {/* Roles */}
        <div ref={rolesRef} className="flex flex-wrap gap-4 mb-8">
          {filmmaker.roles.map((role, i) => (
            <span
              key={role}
              className={`font-body text-sm font-semibold tracking-[0.3em] uppercase transition-colors duration-500 ${
                i === currentRole ? 'text-gold' : 'text-silver/40'
              }`}
            >
              {role}{i < filmmaker.roles.length - 1 && <span className="ml-4 text-silver/20">·</span>}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="font-caption italic text-silver text-xl md:text-2xl mb-10 max-w-lg">
          "{filmmaker.tagline}"
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/about" variant="primary" data-cursor="EXPLORE">
            Explore the Journey
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href="/contact" variant="secondary" data-cursor="CONNECT">
            Get in Touch
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-silver">Scroll</span>
        <ChevronDown size={16} className="text-silver animate-bounce" />
      </div>
    </section>
  );
};

// ─── Vision Section ───────────────────────────────────────────────────────────
const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="section-padding bg-charcoal overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Large display text */}
          <div>
            <p className="eyebrow mb-6 text-crimson">THE VISION</p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-ivory mb-6">
              NOT JUST<br />FILMS.
            </h2>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(173,118,30,0.85)' }}>
                UNFORGETTABLE
              </span>
            </h2>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-ivory mt-2">
              EXPERIENCES.
            </h2>
          </div>

          {/* Right: Text + CTA */}
          <div className="lg:pt-24">
            <p className="body-text text-lg md:text-xl mb-8 leading-relaxed">
              Every project begins with a question: what does this story demand from its audience?
            </p>
            <p className="body-text mb-10">
              From the boardroom to the film set, the commitment stays the same: build things that last.
            </p>
            <MagneticButton href="/about" variant="ghost">
              Read the Story
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Bio Preview Section ─────────────────────────────────────────────────────
const BioPreview: React.FC = () => {
  return (
    <section className="section-padding bg-cinemaBlack overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait slideshow */}
          <div className="relative">
            {/* Large background name */}
            <div
              className="absolute -top-10 -left-6 font-display text-[80px] md:text-[120px] text-ivory/5 leading-none select-none"
              style={{ lineHeight: 1 }}
            >
              VK
            </div>

            <PortraitSlider images={portraits} caption="S Vijay Krishnan" subcaption="CEO • Producer • Chennai" />
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_15px_rgba(233,185,110,0.25)] bg-cinemaBlack shrink-0">
                <img
                  src="/logo/vk-224.webp"
                width={224}
                height={224}
                  alt="Vijay Krishnan"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="eyebrow text-gold">CEO • PRODUCER • CHAIRMAN</p>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-ivory leading-none mb-8">
              S VIJAY<br />KRISHNAN
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="body-text text-lg leading-relaxed mb-6">
              {filmmaker.bio}
            </p>
            <p className="font-caption italic text-silver text-base mb-10">
              {filmmaker.location}
            </p>
            <MagneticButton href="/about" variant="primary">
              Read the Story
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="/gallery" variant="ghost" className="ml-6">
              View Gallery
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Creative Philosophy Section ──────────────────────────────────────────────
const PhilosophySection: React.FC = () => {
  const words = ['IMAGINE.', 'CREATE.', 'CAPTURE.', 'INSPIRE.'];
  const colors = ['#7C3AED', '#D91A3C', '#AD761E', '#0D9488'];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="section-padding relative overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(180deg, #FAF9F6 0%, #F2F0EA 50%, #FAF9F6 100%)',
        minHeight: '70vh',
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${colors[active]}08, transparent)`,
        }}
      />

      <div className="container-wide relative z-10 text-center">
        <p className="eyebrow mb-8 text-silver">Creative Philosophy</p>
        <div className="flex flex-col items-center gap-4">
          {words.map((word, i) => (
            <div
              key={word}
              className="overflow-hidden"
            >
              <span
                className="block font-display text-6xl md:text-8xl lg:text-[120px] leading-none transition-all duration-700"
                style={{
                  color: active === i ? colors[i] : 'rgba(20,20,24,0.08)',
                  transform: active === i ? 'translateY(0)' : 'translateY(10px)',
                  fontSize: active === i ? undefined : undefined,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTASection: React.FC = () => {
  return (
    <section className="section-padding bg-cinemaBlack relative overflow-hidden">
      {/* Animated gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #D91A3C 0deg, #7C3AED 90deg, #AD761E 180deg, #0D9488 270deg, #D91A3C 360deg)',
          filter: 'blur(60px)',
          transform: 'scale(1.5)',
        }}
      />

      <div className="container-wide relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/50 shadow-[0_0_35px_rgba(233,185,110,0.3)] bg-cinemaBlack">
            <img
              src="/logo/vk-224.webp"
                width={224}
                height={224}
              alt="Vijay Krishnan Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="eyebrow mb-6 text-silver">GET IN TOUCH</p>
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl text-ivory leading-none mb-8">
          LET'S CREATE<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(173,118,30,0.85)' }}>
            SOMETHING
          </span>
          <br />UNFORGETTABLE.
        </h2>
        <p className="body-text max-w-lg mx-auto mb-12">
          Whether you have a project, a partnership or a question — the conversation starts with a simple hello.
        </p>
        <MagneticButton href="/contact" variant="primary" className="text-sm px-10 py-5">
          Start the Conversation
          <ArrowRight size={16} />
        </MagneticButton>
      </div>
    </section>
  );
};

// ─── Full Home Page ───────────────────────────────────────────────────────────
const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <VisionSection />
      <BioPreview />
      <CareerTimeline />
      <PhilosophySection />
      <CTASection />
    </div>
  );
};

export default Home;
