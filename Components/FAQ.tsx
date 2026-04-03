"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What services does Sunbloom Immigration provide?",
    a: "Sunbloom Immigration offers comprehensive Canadian immigration support, including temporary visas, permanent residency pathways, citizenship applications, and assistance with refusals, appeals, and protection cases.",
    category: "Services",
  },
  {
    q: "Who manages my immigration file?",
    a: "Your case is handled by a licensed Regulated Canadian Immigration Consultant (RCIC) who oversees your application, provides advice, and communicates with immigration authorities on your behalf.",
    category: "General",
  },
  {
    q: "How can I begin my application with Sunbloom Immigration?",
    a: "Start by booking a consultation where your profile, eligibility, and suitable immigration options are evaluated before proceeding with the application.",
    category: "Process",
  },
  {
    q: "Can Sunbloom Immigration assist after a refusal?",
    a: "Yes. Refusal reasons are analyzed in detail, and guidance is provided on reapplying, requesting reconsideration, or exploring alternative pathways.",
    category: "Support",
  },
  {
    q: "Is my personal data kept secure?",
    a: "All client information is handled with strict confidentiality in line with professional and privacy regulations.",
    category: "Privacy",
  },
  {
    q: "How do I choose the right immigration program?",
    a: "Program selection depends on factors such as education, work experience, language scores, and long-term goals. A detailed assessment identifies the most suitable pathway.",
    category: "General",
  },
  {
    q: "How long does the immigration process usually take?",
    a: "Timelines differ based on application type and government processing. Each case varies, and estimates are provided after reviewing your situation.",
    category: "General",
  },
  {
    q: "What documents are typically needed for immigration applications?",
    a: "Standard requirements include passports, academic records, employment proof, language test results, financial evidence, and identity documents, depending on the program.",
    category: "Documents",
  },
  {
    q: "Can I extend my stay in Canada?",
    a: "Many temporary residents—such as visitors, students, or workers—can apply to extend their status before expiry if they meet eligibility conditions.",
    category: "General",
  },
  {
    q: "How long does a Canadian visa application typically take?",
    a: "Processing varies by visa type. Visitor visas may take a few weeks, study and work permits several weeks to a few months, and permanent residency through Express Entry can take around six months in many cases.",
    category: "General",
  },
  {
    q: "Do I need an immigration consultant or can I apply myself?",
    a: "You can apply independently, but immigration rules are complex. A licensed consultant reduces the risk of errors, strengthens your application, and manages communication with immigration authorities.",
    category: "General",
  },
  {
    q: "What is Express Entry and who qualifies?",
    a: "Express Entry is Canada’s main system for skilled worker immigration, covering programs like Federal Skilled Worker, Canadian Experience Class, and Skilled Trades. Eligibility depends on work experience, education, and language scores.",
    category: "Express Entry",
  },
  {
    q: "What is a CRS score and how can it be improved?",
    a: "The CRS score ranks candidates in the Express Entry pool based on factors like age, education, language ability, and experience. Improvements can come from better language scores, provincial nominations, or valid job offers.",
    category: "Express Entry",
  },
  {
    q: "Can my spouse work in Canada while I study or work?",
    a: "In many cases, spouses are eligible for an open work permit, allowing them to work for any employer while you hold a valid study or work permit.",
    category: "Family",
  },
  {
    q: "What documents are required for spousal sponsorship?",
    a: "Required documents typically include proof of relationship, sponsor’s status in Canada, financial evidence, identity documents, police certificates, and medical results.",
    category: "Family",
  },
  {
    q: "What is an LMIA and when is it needed?",
    a: "An LMIA confirms that no Canadian worker is available for a job position and is required for many employer-specific work permits, though some categories are exempt.",
    category: "Work",
  },
  {
    q: "How does the Super Visa for parents and grandparents work?",
    a: "The Super Visa allows extended stays for parents and grandparents of Canadian residents, often up to several years per visit, provided requirements like insurance and income thresholds are met.",
    category: "Family",
  },
  {
    q: "Can I apply for refugee protection inside Canada?",
    a: "Yes. Individuals fearing persecution can file a claim within Canada or at a port of entry, and their case will be reviewed by the appropriate tribunal.",
    category: "Protection",
  },
  {
    q: "What are the service fees for Sunbloom Immigration?",
    a: "Fees depend on the application type and complexity. A clear quote is provided after consultation, with government fees paid separately.",
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
