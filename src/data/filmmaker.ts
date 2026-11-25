import { getEnv } from '../config/env';

/**
 * Verified facts only. Do not add awards, film titles, statistics or quotes here unless they are real.
 * Career milestones live in ./timeline.ts.
 */
export const filmmaker = {
  name: "S VIJAY KRISHNAN",
  nameShort: "S VIJAY KRISHNAN",
  monogram: "VK",
  logo: "/logo/apple-touch-icon.png",
  logoHighRes: "/logo/android-chrome-512x512.png",
  tagline: "Crafting Stories That Live Beyond the Screen.",
  roles: ["CEO", "PRODUCER", "CHAIRMAN"],
  /** Company he currently leads. */
  company: "Youpeak Tech",
  jobTitle: "Chief Executive Officer",
  bio: "S Vijay Krishnan is the CEO of Youpeak Tech, a role he has held since 2023. From 2021 to 2023 he worked in film as a co-producer and chairman. In 2027 he launches his next movie.",
  location: "Chennai, Tamil Nadu, India",
  email: getEnv('VITE_CONTACT_EMAIL', 'contact@vijaykrishnan.in'),
  /** Shown and linked with tel:. VITE_CONTACT_PHONE overrides it. */
  phone: getEnv('VITE_CONTACT_PHONE', '+91 90876 15708'),
  /** Digits only with country code, e.g. 919087615708. VITE_WHATSAPP_NUMBER overrides it. */
  whatsapp: getEnv('VITE_WHATSAPP_NUMBER', '919087615708').replace(/\D/g, ''),
  /** Social profiles are empty until real URLs are set in .env (VITE_SOCIAL_*). Empty ones are hidden. */
  social: {
    instagram: getEnv('VITE_SOCIAL_INSTAGRAM'),
    youtube: getEnv('VITE_SOCIAL_YOUTUBE'),
    imdb: getEnv('VITE_SOCIAL_IMDB'),
    linkedin: getEnv('VITE_SOCIAL_LINKEDIN'),
  },
};

/** Social profile URLs that are actually configured. */
export const socialUrls = (): string[] => Object.values(filmmaker.social).filter(Boolean);
