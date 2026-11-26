---
name: chatbot-css-alignment
description: Aligned base .cbx CSS custom properties in chatbot.css with crimson/gold/ivory theme from chatConfig.ts to fix the "black dent" chat widget appearance.
metadata:
  type: project
---

Updated src/components/chatbot/chatbot.css base .cbx custom properties (lines 7-25) to match the crimson/gold/ivory theme values defined in src/components/chatbot/chatConfig.ts. The previous indigo defaults (#4f46e5, #7c3aed, #f4f5f9, #17181f, #656a7a, rgba(20,22,40,0.1), z-index 70) caused a visual mismatch — the "black dent" — when theme keys were missing from inline styles. All 8 variables now use the correct theme values: --cbx-accent-2 (#ad761e), --cbx-on-accent (#ffffff), --cbx-bg (#ffffff), --cbx-surface (#f4f2eb), --cbx-text (#141418), --cbx-muted (#5c5b66), --cbx-border (rgba(20,20,24,0.12)), --cbx-z (160).