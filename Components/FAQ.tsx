"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How long does a Canadian visa application typically take?",
    a: "Processing times vary by visa type. Visitor visas can take 2–4 weeks, study and work permits 4–12 weeks, and Express Entry profiles as little as 6 months for permanent residency. We provide realistic timelines during your consultation based on your specific case.",
    category: "General",
  },
  {
    q: "Do I need an immigration consultant, or can I apply on my own?",
    a: "While self-application is possible, immigration law is complex and errors can lead to delays or refusals. A licensed RCIC (Regulated Canadian Immigration Consultant) helps you navigate the process correctly, optimize your profile, and handle correspondence with IRCC on your behalf.",
    category: "General",
  },
  {
    q: "What is Express Entry and am I eligible?",
    a: "Express Entry is Canada's main pathway for skilled worker permanent residency. It manages three federal programs: Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades. Eligibility depends on your work experience, language scores (IELTS/CELPIP/TEF), and education. We assess your CRS score and build a strategy to maximize your chances.",
    category: "Express Entry",
  },
  {
    q: "What is a CRS score and how can I improve mine?",
    a: "The Comprehensive Ranking System (CRS) score determines your place in the Express Entry pool. Factors include age, education, language proficiency, Canadian work experience, and job offers. Key ways to improve your score include retaking language tests, gaining Canadian experience, obtaining a provincial nomination (+600 pts), or securing a valid job offer.",
    category: "Express Entry",
  },
  {
    q: "Can my spouse work in Canada while I study or work there?",
    a: "Yes — through the Spousal Open Work Permit (SOWP). If you are a full-time student at a designated learning institution or hold a work permit in a skilled occupation, your spouse or common-law partner may be eligible for an open work permit allowing them to work for any employer in Canada.",
    category: "Family",
  },
  {
    q: "What documents are required for Spousal Sponsorship?",
    a: "You'll need proof of relationship (marriage certificate, photos, communication records), sponsor's proof of Canadian status and financial ability, the sponsored spouse's identity documents and passport, police clearance certificates, and medical exam results. We provide a personalized document checklist after reviewing your situation.",
    category: "Family",
  },
  {
    q: "What is an LMIA and when is it required?",
    a: "A Labour Market Impact Assessment (LMIA) is a document an employer obtains from Employment and Social Development Canada (ESDC) proving no qualified Canadian worker was available for the position. It is required for most closed work permits. Some categories, like intra-company transfers and CUSMA/USMCA workers, are LMIA-exempt.",
    category: "Work",
  },
  {
    q: "How does the Super Visa work for parents and grandparents?",
    a: "The Super Visa allows parents and grandparents of Canadian citizens or permanent residents to stay in Canada for up to 5 years per visit, with the visa valid for up to 10 years. Requirements include private Canadian medical insurance of at least $100,000, a signed letter of invitation from your child/grandchild, and proof that their household income meets the minimum threshold.",
    category: "Family",
  },
  {
    q: "Can a refugee claim be made inside Canada?",
    a: "Yes. You can make an inland refugee claim at a port of entry or within Canada if you fear persecution based on race, religion, nationality, political opinion, or membership in a particular social group. Claims are heard by the Refugee Protection Division (RPD) of the Immigration and Refugee Board. We assist with the basis of claim form, hearing preparation, and appeals.",
    category: "Protection",
  },
  {
    q: "What are the fees for your immigration services?",
    a: "Our fees vary depending on the complexity of the application and the type of service required. We provide a transparent, fixed-fee quote after the initial consultation so there are no hidden surprises. Government application fees are separate and payable directly to IRCC. Contact us to schedule a free initial consultation.",
    category: "General",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

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
        transition:
          "height 0.36s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

function FaqItem({ item, index }: { item: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        open
          ? "border-primary/40 shadow-lg shadow-primary/10 bg-white dark:bg-slate-800"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-primary/25 hover:shadow-md"
      }`}
      style={{ animation: `fadeSlideUp 0.45s ${index * 55}ms both` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        <span
          className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs font-black transition-colors duration-300 ${
            open ? "bg-primary text-white" : "bg-primary/10 text-primary"
          }`}
        >
          {index + 1}
        </span>
        <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
          {item.q}
        </span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <ExpandPanel open={open}>
        <div className="px-6 pb-6 pt-0">
          <div className="ml-11 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-dashed border-slate-200 dark:border-slate-700 pt-4">
            {item.a}
          </div>
        </div>
      </ExpandPanel>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

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
        className="py-28 bg-background-alt/40 dark:bg-slate-900"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header */}
          <div
            className="text-center mb-14"
            style={{ animation: "fadeSlideUp 0.5s both" }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full mb-5">
              <HelpCircle size={12} />
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight">
              Got{" "}
              <span className="relative inline-block">
                <span className="text-primary">Questions?</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/25 rounded-full" />
              </span>
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Answers to the most common immigration questions we receive. Don't
              see yours? Book a free consultation.
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
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/30"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-14 text-center p-8 rounded-3xl bg-primary/5 border border-primary/15"
            style={{ animation: "fadeSlideUp 0.5s 300ms both" }}
          >
            <p className="text-slate-700 dark:text-slate-200 font-bold mb-3">
              Still have questions? We're here to help.
            </p>
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
