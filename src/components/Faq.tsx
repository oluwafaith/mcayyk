"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { SectionHeading } from "./ui";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-title" id="faq" className="bg-paper-light py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          align="center"
          title={
            <>
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </>
          }
          intro="Everything you need to know about booking MC AYYK for your event."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-4" data-reveal="2">
          {site.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const contentId = `faq-content-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <div
                key={faq.q}
                className="card overflow-hidden transition-all duration-300 border border-black/5"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between p-6 text-left font-display text-lg font-bold text-ink transition-colors hover:text-gold-700"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`ml-4 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-gold-500 text-white" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-6 text-ink-muted leading-relaxed"
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
