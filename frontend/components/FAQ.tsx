/**
 * FAQ — accordion of common product questions on the landing page.
 *
 * Route: /#faq
 */

"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What types of contracts does TrackSign review?",
    answer:
      "Any freelance or agency contract. Client service agreements, statements of work, NDAs, master service agreements, and subcontractor agreements. If it's a PDF with legal terms, TrackSign can review it.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. TrackSign flags terms that are worth reviewing with a qualified lawyer. It does not provide legal advice, legal opinions, or attorney-client privilege.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "TrackSign uses a structured risk checklist specific to freelance contracts, so the AI is guided to look for specific patterns rather than guessing. That said, always have a lawyer review anything you're unsure about.",
  },
  {
    question: "Is my contract stored on your servers?",
    answer:
      "Your contract text is stored securely so you can access your review history. We never share your documents with third parties.",
  },
  {
    question: "What is the difference between Free and Pro?",
    answer:
      "Free gives you one contract review with severity ratings and summary flags. Pro gives you unlimited reviews, full plain-English explanations, fairer version suggestions, and saved review history.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No lock-in, no cancellation fees. You can cancel your Pro subscription at any time from your dashboard.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ borderBottom: "1px solid #2a2722" }}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question} style={{ borderTop: "1px solid #2a2722" }}>
            <button
              type="button"
              id={`faq-question-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="pr-4 text-sm font-medium md:pr-6 md:text-base">{faq.question}</span>
              <span
                className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                style={{ color: "#666" }}
                aria-hidden="true"
              >
                &gt;
              </span>
            </button>
            {isOpen ? (
              <p
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="pb-4 pt-3 text-sm leading-relaxed text-[#999]"
              >
                {faq.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
