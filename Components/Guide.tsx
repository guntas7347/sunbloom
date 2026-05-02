"use client";

import React, { useEffect, useState } from "react";
import {
  Phone,
  ClipboardCheck,
  Paperclip,
  Send,
  ArrowRight,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ─── Step data ─────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    icon: Phone,
    title: "Consultation",
    tagline: "Your journey begins with a conversation",
    description:
      "We start by getting to know you — your background, goals, and circumstances. In a confidential one-on-one session, our licensed consultant listens carefully to understand exactly where you are and where you want to go.",
    details: [
      "Free 30-minute initial consultation",
      "Review of current immigration status",
      "Understanding your short and long-term goals",
      "Discussing suitable Canadian immigration pathways",
      "Answering your questions with clarity and honesty",
    ],
    duration: "30 – 60 minutes",
    outcome: "Clarity on your options and a clear picture of next steps",
    color: "#c41f3e",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Eligibility Assessment",
    tagline: "Finding the best pathway for your profile",
    description:
      "Our consultants carefully evaluate your education, work history, language scores, and personal circumstances. We assess all applicable immigration streams and present you with a personalised roadmap that maximises your chances of success.",
    details: [
      "Comprehensive profile review",
      "CRS score calculation for Express Entry",
      "Provincial Nominee Program (PNP) options",
      "Study and work permit pathways",
      "Spousal and family sponsorship review",
    ],
    duration: "2 – 5 business days",
    outcome: "A written eligibility report with our recommended pathway",
    color: "#c41f3e",
  },
  {
    number: "03",
    icon: Paperclip,
    title: "Documentation & Application",
    tagline: "Precision at every step of preparation",
    description:
      "We provide a tailored checklist of required documents and guide you through gathering each one. Our team prepares, reviews, and compiles your complete application to meet all IRCC requirements before submission.",
    details: [
      "Personalised document checklist",
      "Guidance on obtaining police certificates, medicals, and references",
      "Detailed review of every form and document",
      "Translation and notarisation coordination if required",
      "Submission to IRCC on your behalf",
    ],
    duration: "2 – 6 weeks (varies by application)",
    outcome: "A complete, error-free application submitted to IRCC",
    color: "#c41f3e",
  },
  {
    number: "04",
    icon: Send,
    title: "Approval & Next Steps",
    tagline: "Crossing the finish line — and beyond",
    description:
      "Once your application is submitted, we stay by your side. We track progress, respond to any additional requests from IRCC, and prepare you for what comes next — whether that is a visa interview, landing in Canada, or the path to citizenship.",
    details: [
      "Real-time application status monitoring",
      "Responding to IRCC requests and additional queries",
      "Pre-arrival information and settlement guidance",
      "Port of entry documentation review",
      "Post-arrival support and next steps planning",
    ],
    duration: "Varies by program (2 weeks – 12 months)",
    outcome: "Visa / permit approval and a smooth transition to Canada",
    color: "#c41f3e",
  },
];

/* ─── Sub-components ─────────────────────────────────────────────────────────── */
function StepSidebarItem({
  step,
  index,
  active,
  onClick,
  isLast,
}: {
  step: (typeof STEPS)[0];
  index: number;
  active: boolean;
  onClick: () => void;
  isLast: boolean;
}) {
  const Icon = step.icon;
  return (
    <div className="relative flex gap-4">
      {/* connector line */}
      {!isLast && (
        <div
          className={`absolute left-[22px] top-[52px] w-0.5 h-[calc(100%+8px)] transition-colors duration-500 ${
            active ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
          }`}
        />
      )}

      {/* circle + icon */}
      <button
        onClick={onClick}
        className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          active
            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary/50 hover:text-primary"
        }`}
      >
        <Icon size={18} />
      </button>

      {/* text */}
      <button
        onClick={onClick}
        className="flex flex-col items-start pb-8 text-left group"
      >
        <span
          className={`text-xs font-black tracking-widest uppercase transition-colors duration-200 ${
            active ? "text-primary" : "text-slate-400 dark:text-slate-500"
          }`}
        >
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`text-sm font-bold leading-snug mt-0.5 transition-colors duration-200 ${
            active
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
          }`}
        >
          {step.title}
        </span>
      </button>
    </div>
  );
}

function DetailPanel({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const Icon = step.icon;
  return (
    <div
      key={step.title}
      className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-100/80 dark:shadow-black/30 overflow-hidden"
      style={{ animation: "guideSlideIn 0.4s cubic-bezier(0.4,0,0.2,1) both" }}
    >
      {/* colour bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary/60 to-primary/10" />

      <div className="p-8 md:p-10">
        {/* header */}
        <div className="flex items-start gap-5 mb-7">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-center justify-center">
            <Icon size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-black text-primary tracking-widest uppercase mb-1">
              Step {String(index + 1).padStart(2, "0")} of {STEPS.length}
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {step.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 italic">
              {step.tagline}
            </p>
          </div>
        </div>

        {/* description */}
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-7 text-[15px]">
          {step.description}
        </p>

        {/* detail bullets */}
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            What we do
          </p>
          <ul className="space-y-2.5">
            {step.details.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <CheckCircle
                  size={15}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* meta strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={12} className="text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Typical duration
              </p>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {step.duration}
            </p>
          </div>
          <div className="rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 p-4">
            <div className="flex items-center gap-2 mb-1">
              <ArrowRight size={12} className="text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">
                Outcome
              </p>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {step.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────────── */
export default function Guide() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i++;

      if (i <= 3) {
        setActive(i);
      } else {
        setActive(0);
        clearInterval(interval);
      }
    }, 1200); // adjust timing

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <style>{`
        @keyframes guideSlideIn {
          from { opacity: 0; transform: translateX(18px) scale(0.99); }
          to   { opacity: 1; transform: translateX(0)     scale(1);    }
        }
        @keyframes guideFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="guide"
        className="py-28 bg-gradient-to-b from-background-alt/40 to-white dark:from-slate-900 dark:to-background-dark"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Section header ──────────────────────────────────────────────── */}
          <div
            className="max-w-2xl mb-16"
            style={{ animation: "guideFadeUp 0.5s both" }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full mb-5">
              <Send size={11} />
              Our Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              How We{" "}
              <span className="relative inline-block">
                <span className="text-primary">Guide Your</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/25 rounded-full" />
              </span>{" "}
              Immigration Journey
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              At Sunbloom Immigration, we follow a structured, transparent
              approach that makes the complex simple. Our team carefully reviews
              each case and walks with you through every step — from the first
              conversation to landing in Canada.
            </p>
          </div>

          {/* ── Two-column interactive layout ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">
            {/* Left sidebar — step navigator */}
            <div
              className="lg:sticky lg:top-24 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-md shadow-slate-100/60 dark:shadow-black/20"
              style={{ animation: "guideFadeUp 0.5s 80ms both" }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
                Select a step
              </p>
              <div className="flex flex-col">
                {STEPS.map((step, i) => (
                  <StepSidebarItem
                    key={step.title}
                    step={step}
                    index={i}
                    active={active === i}
                    onClick={() => setActive(i)}
                    isLast={i === STEPS.length - 1}
                  />
                ))}
              </div>

              {/* quick nav arrows */}
              <div className="flex gap-2 mt-2">
                <button
                  disabled={active === 0}
                  onClick={() => setActive((a) => a - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={13} className="rotate-180" /> Prev
                </button>
                <button
                  disabled={active === STEPS.length - 1}
                  onClick={() => setActive((a) => a + 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-primary/8 dark:bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* Right — detail panel */}
            <div style={{ animation: "guideFadeUp 0.5s 120ms both" }}>
              <DetailPanel key={active} step={STEPS[active]} index={active} />

              {/* step dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${
                      active === i
                        ? "w-6 h-2.5 bg-primary"
                        : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom timeline strip (decorative overview) ──────────────────── */}
          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ animation: "guideFadeUp 0.5s 200ms both" }}
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              return (
                <button
                  key={step.title}
                  onClick={() => setActive(i)}
                  className={`group relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-[1.02]"
                      : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 ${
                      isActive
                        ? "bg-white/20"
                        : "bg-primary/10 dark:bg-primary/15"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-white" : "text-primary"}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-black tracking-widest uppercase mb-1 ${
                      isActive
                        ? "text-white/70"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm font-bold leading-snug ${
                      isActive
                        ? "text-white"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {step.title}
                  </span>

                  {/* connector arrow — hidden on last */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isActive
                            ? "border-primary bg-primary text-white"
                            : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-400"
                        }`}
                      >
                        <ChevronRight size={10} />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────────── */}
          <div
            className="mt-12 rounded-3xl p-8 md:p-10 bg-primary/5 dark:bg-primary/10 border border-primary/15 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ animation: "guideFadeUp 0.5s 280ms both" }}
          >
            <div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                Ready to start your Canadian journey?
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Book a free consultation — no commitment, just honest guidance.
              </p>
            </div>
            <a
              href="#appointment"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Book Free Consultation
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
