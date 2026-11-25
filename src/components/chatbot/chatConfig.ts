export interface ChatConfig {
  siteKey: string;
  apiPath?: string;
  name: string;
  subtitle: string;
  avatar?: string;
  greeting: string;
  teaser?: string;
  placeholder?: string;
  disclaimer?: string;
  suggestions?: string[];
  actions?: { label: string; href: string }[];
  /** CSS custom properties (see chatbot.css) that colour the widget. */
  theme?: Record<string, string>;
}

/** Everything site-specific about the chat widget. The knowledge the AI answers from lives in api/_chatKnowledge.ts. */
export const chatConfig: ChatConfig = {
  siteKey: 'vijay-krishnan',
  apiPath: '/api/chat',
  name: 'VK ASSISTANT',
  subtitle: 'Online · Ask about Vijay & his work',
  avatar: '/logo/apple-touch-icon.png',
  greeting:
    'Welcome 🎬 I’m the **S Vijay Krishnan** website assistant.\n\nAsk me about his career, what he is working on, or how to get in touch.',
  teaser: 'Curious about Vijay’s journey? Ask me 🎬',
  placeholder: 'Ask about his career, the 2027 movie…',
  disclaimer: 'AI assistant · answers may be imperfect. For anything else, please get in touch directly.',
  suggestions: [
    'What does he do?',
    'What is coming in 2027?',
    'Where is he based?',
    'How can I get in touch?',
  ],
  actions: [
    { label: '🧭 About', href: '/about' },
    { label: '✉ Contact', href: '/contact' },
  ],
  theme: {
    '--cbx-accent': '#d91a3c',
    '--cbx-accent-2': '#ad761e',
    '--cbx-on-accent': '#ffffff',
    '--cbx-head-bg': '#faf9f6',
    '--cbx-head-text': '#141418',
    '--cbx-chip': '#ad761e',
    '--cbx-launcher-bg': 'linear-gradient(135deg, #d91a3c, #ad761e)',
    '--cbx-launcher-text': '#ffffff',
    '--cbx-link': '#d91a3c',
    '--cbx-bg': '#ffffff',
    '--cbx-surface': '#f4f2eb',
    '--cbx-text': '#141418',
    '--cbx-muted': '#5c5b66',
    '--cbx-border': 'rgba(20, 20, 24, 0.12)',
    '--cbx-user-bg': 'linear-gradient(135deg, #d91a3c, #ad761e)',
    '--cbx-bot-bg': '#f2f0ea',
    '--cbx-shadow': '0 20px 60px -15px rgba(20, 20, 24, 0.15), 0 8px 24px -8px rgba(0, 0, 0, 0.08)',
    '--cbx-font': 'Manrope, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    '--cbx-right': '1.25rem',
    '--cbx-bottom': '1.25rem',
    // above the navbar (100) and scroll bar (150); below the mobile menu (200), page transition (9000) and preloader
    '--cbx-z': '160',
  },
};
