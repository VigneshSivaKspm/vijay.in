import React from 'react';
import { ArrowRight } from 'lucide-react';
import { filmmaker } from '../data/filmmaker';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import CareerTimeline from '../components/sections/CareerTimeline';
import Picture from '../components/ui/Picture';

const About: React.FC = () => {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[70vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 30%, #E9B96E18 0%, transparent 60%), radial-gradient(circle at 20% 70%, #FF304F15 0%, transparent 60%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/40 shadow-[0_0_12px_rgba(233,185,110,0.2)] shrink-0">
              <img src="/logo/vk-224.webp"
                width={224}
                height={224} alt="Vijay Krishnan" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-gold" />
              <p className="eyebrow text-gold">About</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            S VIJAY<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(233,185,110,0.8)' }}>
              KRISHNAN.
            </span>
          </h1>

          <div className="border-t border-ivory/10 pt-8">
            <p className="font-editorial text-2xl md:text-3xl text-ivory font-light italic leading-snug max-w-3xl">
              {filmmaker.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Portrait & Biography ─────────────────────────────────── */}
      <section className="section-padding bg-charcoal relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-ivory/10">
                <Picture
                  src="/ceo/ceo-01.jpg"
                  alt="S Vijay Krishnan, CEO of Youpeak Tech"
                  widths={[480, 800, 1000]}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  width={1000}
                  height={1094}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinemaBlack/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="eyebrow text-gold block mb-1">{filmmaker.jobTitle}</span>
                  <p className="font-body text-xs text-silver">{filmmaker.company}</p>
                </div>
                <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/60" />
                <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/60" />
                <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/60" />
                <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/60" />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="The Person"
                heading="CEO. PRODUCER. CHAIRMAN."
                accentColor="#E9B96E"
                className="mb-8"
              />

              <p className="body-text text-lg leading-relaxed mb-6 text-ivory/90">{filmmaker.bio}</p>
              <p className="font-caption italic text-silver text-base mb-10">{filmmaker.location}</p>

              <div className="flex flex-wrap gap-4">
                <MagneticButton href="/gallery" variant="primary">
                  View Gallery <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Career Timeline ──────────────────────────────────────── */}
      <CareerTimeline />
    </>
  );
};

export default About;
