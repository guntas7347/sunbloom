"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { FAQItem } from "@/lib/firebase/faq";

function formatCategory(cat: string): string {
  if (!cat) return "General";
  return cat
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ExpandPanel({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [children]);

  return (
    <div
      style={{
        height: open ? height : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "height 0.36s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

function FaqItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl border transition-all duration-300 select-none ${
        open
          ? "border-maple-red/40 shadow-lg shadow-maple-red/5 bg-surface-container-high"
          : "border-outline-variant/10 bg-surface-container-low hover:border-maple-red/25 hover:shadow-md"
      }`}
      style={{ animation: `fadeSlideUp 0.45s ${index * 55}ms both` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        <span
          className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors duration-300 ${
            open ? "bg-maple-red text-white" : "bg-primary-container/30 text-maple-red"
          }`}
        >
          {index + 1}
        </span>
        <span className="flex-1 text-sm font-bold text-on-surface leading-snug">
          {item.question}
        </span>
        <span
          className={`material-symbols-outlined shrink-0 text-secondary transition-transform duration-300 ${
            open ? "rotate-180 text-maple-red" : ""
          }`}
        >
          keyboard_arrow_down
        </span>
      </button>
      <ExpandPanel open={open}>
        <div className="px-6 pb-6 pt-0">
          <div className="text-sm text-secondary leading-relaxed border-t border-dashed border-outline-variant/20 pt-4 pl-11">
            {item.answer}
          </div>
        </div>
      </ExpandPanel>
    </div>
  );
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => (f.category || "general") === activeCategory);

  const CATEGORIES = [
    "All",
    ...Array.from(new Set(faqs.map((f) => f.category || "general"))),
  ];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="faq"
        className="py-20 bg-surface text-left"
      >
        <div className="max-w-3xl mx-auto px-6">
          {/* header */}
          <div
            className="text-center mb-14"
            style={{ animation: "fadeSlideUp 0.5s both" }}
          >
            <span className="inline-flex items-center gap-2 bg-primary-container/30 text-on-primary-container text-xs font-bold px-4 py-2 rounded-full mb-5 border border-primary-container/50">
              <HelpCircle size={12} className="text-maple-red" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold font-headline-md text-on-surface leading-tight">
              Got <span className="text-maple-red">Questions?</span>
            </h2>
            <p className="mt-3 text-secondary max-w-md mx-auto text-sm leading-relaxed">
              Answers to the most common Canadian immigration questions. If you don't see yours, feel free to request a consultation.
            </p>
          </div>

          {/* category filter pills */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-10"
            style={{ animation: "fadeSlideUp 0.5s 80ms both" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-maple-red text-white border-maple-red shadow-md shadow-maple-red/20"
                    : "bg-surface-container-low text-secondary border-outline-variant/15 hover:border-maple-red/40"
                }`}
              >
                {formatCategory(cat)}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div className="space-y-4">
            {filtered.map((item, i) => (
              <FaqItem key={item.id || item.question} item={item} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-14 text-center p-8 rounded-2xl bg-primary-container/10 border border-maple-red/15"
            style={{ animation: "fadeSlideUp 0.5s 300ms both" }}
          >
            <p className="text-on-surface font-bold mb-4">
              Still have questions? We're here to help you navigate your case.
            </p>
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 gradient-maple text-white px-7 py-3 rounded-lg font-bold text-sm shadow-md hover:scale-95 active:scale-90 transition-all duration-200"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
