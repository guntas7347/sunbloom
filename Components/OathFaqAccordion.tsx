"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { OathFaq } from "@/lib/firebase/oath";

interface OathFaqAccordionProps {
  initialFaqs: OathFaq[];
}

export default function OathFaqAccordion({ initialFaqs }: OathFaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {initialFaqs.map((faq, idx) => (
        <div
          key={faq.id || idx}
          className="bg-surface rounded-xl border border-outline-variant/20 overflow-hidden transition-all shadow-sm dark:bg-[#0b1329]/50"
        >
          <button
            className="w-full flex items-center justify-between p-5 font-semibold text-sm sm:text-base text-left hover:text-maple-red cursor-pointer transition-colors text-on-surface dark:text-white"
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
          >
            <span>{faq.q}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                openFaq === idx ? "rotate-180 text-maple-red" : "text-secondary"
              }`}
            />
          </button>

          <div
            style={{
              maxHeight: openFaq === idx ? "500px" : "0px",
              opacity: openFaq === idx ? 1 : 0,
              transition: "max-height 0.3s ease, opacity 0.25s ease",
            }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-xs sm:text-sm text-secondary leading-relaxed border-t border-dashed border-outline-variant/10 pt-4">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
