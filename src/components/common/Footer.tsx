import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { filmmaker } from '../../data/filmmaker';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, ImdbIcon } from '../ui/SocialIcons';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-cinemaBlack border-t border-ivory/5 overflow-hidden">
      {/* Large name */}
      <div className="container-wide pt-20 pb-6">
        <div className="overflow-hidden">
          <p aria-hidden="true"
            className="font-display text-[80px] md:text-[120px] lg:text-[160px] leading-none tracking-tight text-transparent select-none"
            style={{ lineHeight: 0.85, WebkitTextStroke: '1px rgba(20,20,24,0.06)' }}
          >
            {filmmaker.name}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container-wide pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3.5 mb-4 group">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/40 group-hover:border-gold transition-all duration-300 shadow-[0_0_20px_rgba(233,185,110,0.25)] shrink-0">
                <img
                  src="/logo/vk-224.webp"
                width={224}
                height={224}
                  alt={filmmaker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-ivory group-hover:text-gold transition-colors duration-300 tracking-wider leading-none">
                  VIJAY KRISHNAN
                </span>
                <span className="font-caption text-[10px] text-silver/80 tracking-[0.25em] uppercase leading-tight mt-1">
                  CEO &amp; FILM PRODUCER
                </span>
              </div>
            </Link>
            <p className="font-caption italic text-silver mt-2 text-sm leading-relaxed">
              {filmmaker.tagline}
            </p>
            <div className="flex gap-3 mt-6">
              {filmmaker.social.instagram && (
                <a href={filmmaker.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 border border-ivory/10 text-silver hover:border-gold hover:text-gold transition-all duration-300">
                  <InstagramIcon size={16} />
                </a>
              )}
              {filmmaker.social.youtube && (
                <a href={filmmaker.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 border border-ivory/10 text-silver hover:border-crimson hover:text-crimson transition-all duration-300">
                  <YoutubeIcon size={16} />
                </a>
              )}
              {filmmaker.social.linkedin && (
                <a href={filmmaker.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 border border-ivory/10 text-silver hover:border-royalBlue hover:text-royalBlue transition-all duration-300">
                  <LinkedinIcon size={16} />
                </a>
              )}
              {filmmaker.social.imdb && (
                <a href={filmmaker.social.imdb} target="_blank" rel="noopener noreferrer" aria-label="IMDb" className="p-2 border border-ivory/10 text-silver hover:border-gold hover:text-gold transition-all duration-300">
                  <ImdbIcon size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow mb-6 text-gold">Navigation</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-6 text-gold">Get in Touch</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-silver mt-1 shrink-0" />
                <a href={`mailto:${filmmaker.email}`} className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300">
                  {filmmaker.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-silver mt-1 shrink-0" />
                <a href={`tel:${filmmaker.phone.replace(/\s/g, '')}`} className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300">
                  {filmmaker.phone}
                </a>
              </div>
              {filmmaker.whatsapp && (
                <div className="flex items-start gap-3">
                  <MessageCircle size={14} className="text-silver mt-1 shrink-0" />
                  <a
                    href={`https://wa.me/${filmmaker.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-silver hover:text-ivory transition-colors duration-300"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-silver mt-1 shrink-0" />
                <span className="font-body text-sm text-silver">{filmmaker.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-wide pb-8 border-t border-ivory/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-silver/80">
          © {new Date().getFullYear()} {filmmaker.name}. All rights reserved.{' '}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-gold transition-colors">
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-body text-xs text-silver hover:text-gold transition-colors duration-300 tracking-widest uppercase group"
        >
          Back to Top
          <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
