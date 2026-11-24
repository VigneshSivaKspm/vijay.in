import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { filmmaker } from '../data/filmmaker';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, ImdbIcon } from '../components/ui/SocialIcons';
import SectionHeading from '../components/ui/SectionHeading';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  message: string;
}

const initialForm: FormData = {
  fullName: '',
  email: '',
  company: '',
  message: '',
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // There is no server to receive this form, so hand the message to the visitor's own email app,
  // addressed to the real contact address. Nothing is claimed as "sent" until they send it.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Message from ${formData.fullName}${formData.company ? ` (${formData.company})` : ''}`;
    const body = `${formData.message}

— ${formData.fullName}
${formData.email}`;
    window.location.href = `mailto:${filmmaker.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSubmitted(false);
  };

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[75vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 75% 30%, #FF304F18 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 20% 70%, #8B5CF618 0%, transparent 50%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-crimson/50 shadow-[0_0_12px_rgba(255,48,79,0.25)] shrink-0">
              <img
                src="/logo/vk-224.webp"
                width={224}
                height={224}
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-crimson" />
              <p className="eyebrow text-crimson">Direct Dialogue</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            GREAT CINEMA<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,48,79,0.8)' }}>
              STARTS HERE.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-ivory/10 pt-8 items-end">
            <p className="md:col-span-8 body-text text-lg text-ivory/90 leading-relaxed">
              Have a project, a partnership idea or a question? Send a message and start the conversation.
            </p>
            <div className="md:col-span-4 flex md:justify-end">
              <span className="font-display text-xs tracking-widest text-silver/60 uppercase">
                CHENNAI • INDIA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Form & Production Office Info ─────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Direct Contact Details */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_20px_rgba(233,185,110,0.25)] bg-cinemaBlack shrink-0">
                    <img
                      src="/logo/vk-224.webp"
                width={224}
                height={224}
                      alt="S Vijay Krishnan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="eyebrow text-crimson block mb-1">Get in touch</span>
                    <span className="font-display text-xl text-ivory tracking-wider">S VIJAY KRISHNAN</span>
                  </div>
                </div>
                <SectionHeading
                  eyebrow="Reach Out Directly"
                  heading="CONTACT DETAILS"
                  accentColor="#FF304F"
                  className="mb-8"
                />
                <p className="body-text text-base leading-relaxed mb-8">
                  The easiest way to reach S Vijay Krishnan is by email or through the form.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-6">
                <div className="p-6 bg-graphite border border-ivory/10 flex items-start gap-4">
                  <div className="p-3 bg-cinemaBlack text-crimson rounded-full shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="eyebrow text-[10px] text-silver/60 uppercase mb-1">Electronic Inquiries</p>
                    <a
                      href={`mailto:${filmmaker.email}`}
                      className="font-display text-xl text-ivory hover:text-gold transition-colors block"
                    >
                      {filmmaker.email}
                    </a>
                                      </div>
                </div>

                <div className="p-6 bg-graphite border border-ivory/10 flex items-start gap-4">
                  <div className="p-3 bg-cinemaBlack text-teal rounded-full shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="eyebrow text-[10px] text-silver/60 uppercase mb-1">Based in</p>
                    <p className="font-display text-xl text-ivory">{filmmaker.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels — only profiles that are configured */}
              {Object.values(filmmaker.social).some(Boolean) && (
                <div className="pt-6 border-t border-ivory/10">
                  <p className="eyebrow text-gold mb-4">Official Channels</p>
                  <div className="flex gap-3">
                    {filmmaker.social.instagram && (
                      <a href={filmmaker.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 border border-ivory/10 text-silver hover:border-gold hover:text-gold transition-all duration-300" aria-label="Instagram">
                        <InstagramIcon size={18} />
                      </a>
                    )}
                    {filmmaker.social.youtube && (
                      <a href={filmmaker.social.youtube} target="_blank" rel="noopener noreferrer" className="p-3 border border-ivory/10 text-silver hover:border-crimson hover:text-crimson transition-all duration-300" aria-label="YouTube">
                        <YoutubeIcon size={18} />
                      </a>
                    )}
                    {filmmaker.social.linkedin && (
                      <a href={filmmaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 border border-ivory/10 text-silver hover:border-royalBlue hover:text-royalBlue transition-all duration-300" aria-label="LinkedIn">
                        <LinkedinIcon size={18} />
                      </a>
                    )}
                    {filmmaker.social.imdb && (
                      <a href={filmmaker.social.imdb} target="_blank" rel="noopener noreferrer" className="p-3 border border-ivory/10 text-silver hover:border-gold hover:text-gold transition-all duration-300" aria-label="IMDb Profile">
                        <ImdbIcon size={18} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Message form (opens the visitor's email app) */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-12 bg-graphite border border-ivory/10 relative">
                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 text-teal border border-teal/30">
                      <CheckCircle size={32} />
                    </div>
                    <p className="eyebrow text-teal mb-2">One more step</p>
                    <h3 className="font-display text-4xl text-ivory mb-4">
                      CHECK YOUR EMAIL APP
                    </h3>
                    <p className="body-text text-base max-w-md mx-auto mb-8">
                      Thanks, <strong className="text-ivory">{formData.fullName}</strong>. Your email app should have opened with your message ready. Press send there to deliver it. If nothing opened, write to{' '}
                      <a href={`mailto:${filmmaker.email}`} className="text-gold hover:underline">{filmmaker.email}</a>.
                    </p>
                    <button onClick={handleReset} className="btn-secondary text-xs">
                      Write Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <p className="eyebrow text-gold mb-1">Say hello</p>
                      <h3 className="font-display text-3xl text-ivory mb-6">SEND A MESSAGE</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">Your Full Name *</label>
                        <input id="fullName" type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">Email Address *</label>
                        <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">Company (Optional)</label>
                      <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">Message *</label>
                      <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors resize-none" />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary justify-center text-sm py-5 font-bold tracking-widest uppercase transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        COMPOSE EMAIL <Send size={16} />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
