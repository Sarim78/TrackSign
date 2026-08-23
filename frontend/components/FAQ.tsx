"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    question: "What types of contracts does TrackSign review?",
    answer:
      "Any freelance or agency contract — client service agreements, statements of work, NDAs, master service agreements, and subcontractor agreements. If it's a PDF with legal terms, TrackSign can review it.",
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
    question: "What's the difference between Free and Pro?",
    answer:
      "Free gives you one contract review with severity ratings and summary flags. Pro gives you unlimited reviews, full plain-English explanations, fairer version suggestions, and saved review history.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No lock-in, no cancellation fees. You can cancel your Pro subscription at any time from your dashboard.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  function toggle(index: number) {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <div className="mt-12 space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openItems.includes(index);

        return (
          <ScrollReveal key={faq.question} delay={index * 60}>
            <div
              className={`rounded-xl border border-stone-200 bg-transparent transition-all duration-200 hover:bg-white ${
                isOpen ? "bg-white shadow-sm" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="pr-6 text-base font-medium text-stone-800">
                  {faq.question}
                </span>
                <span
                  className={`text-stone-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ∨
                </span>
              </button>
              {isOpen ? (
                <p className="px-6 pb-4 pt-3 text-sm leading-relaxed text-stone-500">
                  {faq.answer}
                </p>
              ) : null}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
