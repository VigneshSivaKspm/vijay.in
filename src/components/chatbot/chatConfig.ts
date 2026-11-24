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
    '--cbx-accent': '#e5213f',
    '--cbx-accent-2': '#c42d9a',
    '--cbx-on-accent': '#ffffff',
    '--cbx-head-bg': '#0d0d12',
    '--cbx-head-text': '#f5f0e8',
    '--cbx-chip': '#e9b96e',
    '--cbx-launcher-bg': 'linear-gradient(135deg, #ff304f, #f542a7)',
    '--cbx-launcher-text': '#ffffff',
    '--cbx-link': '#e9b96e',
    '--cbx-bg': '#0f0f14',
    '--cbx-surface': '#1b1b23',
    '--cbx-text': '#f5f0e8',
    '--cbx-muted': '#a7a5af',
    '--cbx-border': 'rgba(245, 240, 232, 0.13)',
    '--cbx-user-bg': 'linear-gradient(135deg, #e5213f, #c42d9a)',
    '--cbx-bot-bg': 'rgba(255, 255, 255, 0.055)',
    '--cbx-shadow': '0 30px 80px -20px rgba(0, 0, 0, 0.85), 0 10px 40px -12px rgba(255, 48, 79, 0.3)',
    '--cbx-font': 'Manrope, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    '--cbx-right': '1.25rem',
    '--cbx-bottom': '1.25rem',
    // above the navbar (100) and scroll bar (150); below the mobile menu (200), page transition (9000) and preloader
    '--cbx-z': '160',
  },
};
