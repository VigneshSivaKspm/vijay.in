/**
 * Frequently asked questions about S Vijay Krishnan.
 * Used for the visible FAQ on /about AND the FAQPage structured data, so both always match.
 * Only verified facts. Never add an answer that is not true.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: 'Who is S Vijay Krishnan?',
    answer:
      'S Vijay Krishnan is the CEO of Youpeak Tech, a role he has held since 2023. From 2021 to 2023 he worked in film as a co-producer and chairman.',
  },
  {
    question: 'What is S Vijay Krishnan’s current role?',
    answer: 'He is the Chief Executive Officer (CEO) of Youpeak Tech, since 2023.',
  },
  {
    question: 'What did S Vijay Krishnan do before becoming CEO?',
    answer: 'From 2021 to 2023 he was a film co-producer and chairman.',
  },
  {
    question: 'What is S Vijay Krishnan launching in 2027?',
    answer:
      'A new movie is set to launch in 2027. No title, cast or release date has been announced yet. Updates will appear on this website.',
  },
  {
    question: 'Where is S Vijay Krishnan based?',
    answer: 'He is based in Chennai, Tamil Nadu, India.',
  },
  {
    question: 'How can I contact S Vijay Krishnan?',
    answer:
      'Use the contact page on this website. The message form opens your email app with the message addressed to his contact email, and the email address is also listed there.',
  },
];
