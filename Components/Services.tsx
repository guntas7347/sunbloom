"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Plane,
  Users,
  GraduationCap,
  Briefcase,
  Home,
  Award,
  FileText,
  Zap,
  Map,
  Heart,
  Gavel,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

type Service = {
  icon: React.ElementType;
  title: string;
  desc: string;
  details: string[];
  tag: string;
  tagColor: string;
};

const SERVICES: Service[] = [
  {
    icon: Plane,
    title: "Visitor Visa",
    desc: "Explore Canada for tourism, family visits, or short business trips.",
    tag: "Temporary",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    details: [
      "Single or multiple-entry visa options",
      "Maximum stay of up to 6 months per visit",
      "Covers tourism, family reunions & business meetings",
      "Biometric requirements handled end-to-end",
      "Urgent / priority processing available",
    ],
  },
  {
    icon: Users,
    title: "Super Visa",
    desc: "Long-term stay options for parents and grandparents of citizens/PRs.",
    tag: "Family",
    tagColor:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    details: [
      "Valid for up to 10 years with multi-entry",
      "Each stay up to 5 years without renewal",
      "Requires private medical insurance proof",
      "Income threshold documentation support",
      "Faster approval than standard visitor visa",
    ],
  },
  {
    icon: GraduationCap,
    title: "Study Permit",
    desc: "Obtain authorization to study at designated learning institutions (DLI).",
    tag: "Education",
    tagColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    details: [
      "Applies to colleges, universities & trade schools",
      "Co-op & internship work authorization included",
      "Off-campus work permit guidance (up to 20 hrs/wk)",
      "Extension assistance before expiry",
      "Pathway planning to PGWP and PR",
    ],
  },
  {
    icon: Briefcase,
    title: "Work Permit",
    desc: "Closed or open work permits for foreign workers in Canada.",
    tag: "Employment",
    tagColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    details: [
      "Employer-specific (closed) & open permit options",
      "LMIA-based and LMIA-exempt pathways",
      "IEC Working Holiday program assistance",
      "Intra-company transfer applications",
      "Permit renewal & bridging permits",
    ],
  },
  {
    icon: Home,
    title: "Permanent Residency",
    desc: "Transition to living permanently in Canada through various pathways.",
    tag: "PR",
    tagColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    details: [
      "Express Entry, PNP & Atlantic Immigration routes",
      "CRS score optimization strategy",
      "Document checklist & submission support",
      "PR card application after landing",
      "Citizenship eligibility planning",
    ],
  },
  {
    icon: Award,
    title: "Citizenship",
    desc: "The final step in your journey to become a Canadian citizen.",
    tag: "Citizenship",
    tagColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    details: [
      "Physical presence calculation & verification",
      "Language proficiency test guidance",
      "Citizenship test preparation resources",
      "Dual citizenship eligibility assessment",
      "Oath ceremony process explained",
    ],
  },
  {
    icon: FileText,
    title: "PRTD",
    desc: "Travel documents for permanent residents without valid PR cards.",
    tag: "Travel",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    details: [
      "Urgent & emergency PRTD applications",
      "Eligibility verification & document review",
      "Overseas application support",
      "Return-to-Canada travel assistance",
      "PR card renewal upon return",
    ],
  },
  {
    icon: Zap,
    title: "Express Entry",
    desc: "Fast-tracked economic immigration for skilled workers.",
    tag: "Fast-Track",
    tagColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    details: [
      "Federal Skilled Worker, CEC & FST streams",
      "CRS score assessment & improvement strategy",
      "Profile creation & job bank optimization",
      "ITA to PR submission in under 6 months",
      "Provincial nomination to boost CRS by 600 pts",
    ],
  },
  {
    icon: Map,
    title: "PNP",
    desc: "Provincial Nominee Programs tailored to local economic needs.",
    tag: "Provincial",
    tagColor:
      "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    details: [
      "All 11 provincial & territorial programs covered",
      "Aligned to your occupation & region of choice",
      "Enhanced PNP stream (tied to Express Entry)",
      "Base PNP stream for direct applications",
      "Job offer secured pathways assistance",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Visa",
    desc: "Invest, start a business, or expand your operations in Canada.",
    tag: "Business",
    tagColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    details: [
      "Start-Up Visa for innovative entrepreneurs",
      "Self-employed persons program",
      "Intra-company transfer for executives",
      "Business visitor entry guidance",
      "Investment threshold & net worth documentation",
    ],
  },
  {
    icon: Heart,
    title: "Spousal Sponsorship",
    desc: "Unite with your loved ones through family class sponsorship.",
    tag: "Family",
    tagColor:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    details: [
      "Spouse, common-law & conjugal partner streams",
      "Inland & outland application options",
      "Open Work Permit during processing",
      "Relationship genuineness documentation",
      "Dependent children included in application",
    ],
  },
  {
    icon: GraduationCap,
    title: "PGWP",
    desc: "Post-Graduation Work Permit for international students.",
    tag: "Education",
    tagColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    details: [
      "Valid for up to 3 years based on program length",
      "Applied within 180 days of graduation",
      "Eligible for open work permit (work anywhere)",
      "Counts toward Canadian work experience for CEC",
      "Pathway to Express Entry & PR",
    ],
  },
  {
    icon: Users,
    title: "SOWP",
    desc: "Spousal Open Work Permit for partners of students/workers.",
    tag: "Family",
    tagColor:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    details: [
      "Open permit — work for any employer in Canada",
      "Available for spouses of study / work permit holders",
      "Concurrent processing with principal applicant",
      "Extends family income during stay",
      "Bridge to sponsored PR applications",
    ],
  },
  {
    icon: FileText,
    title: "LMIA Process",
    desc: "Assistance for employers applying for Labour Market Impact Assessment.",
    tag: "Employment",
    tagColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    details: [
      "High-wage & low-wage LMIA streams",
      "Recruitment advertising compliance guidance",
      "Application preparation & employer letters",
      "Global Talent Stream (2-week processing)",
      "LMIA exemption codes identified where applicable",
    ],
  },
  {
    icon: Gavel,
    title: "Refugee Services",
    desc: "Professional support for asylum and refugee applications.",
    tag: "Protection",
    tagColor:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    details: [
      "Inland asylum & refugee board hearings",
      "Refugee Protection Division (RPD) submissions",
      "Pre-Removal Risk Assessment (PRRA) support",
      "Humanitarian & compassionate (H&C) grounds",
      "Safe third country agreement guidance",
    ],
  },
];

/* Animated expand panel using a ref-measured height */
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
          "height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className={`cursor-pointer bg-white dark:bg-slate-800 rounded-xl border transition-all duration-300 select-none
        ${
          open
            ? "border-primary/50 shadow-xl shadow-primary/10 ring-1 ring-primary/20"
            : "border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-lg"
        }`}
    >
      {/* card header */}
      <div className="p-6 flex items-start gap-4">
        <div
          className={`p-2.5 rounded-lg transition-colors duration-300 ${open ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}
        >
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {service.title}
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${service.tagColor}`}
            >
              {service.tag}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
            {service.desc}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-300 mt-0.5 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </div>

      {/* expandable details */}
      <ExpandPanel open={open}>
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-4 space-y-2">
            {service.details.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <ArrowRight
                  size={14}
                  className="text-primary mt-0.5 shrink-0"
                />
                <span>{item}</span>
              </div>
            ))}
            <a
              href="#appointment"
              onClick={(e) => e.stopPropagation()}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              Book a consultation <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </ExpandPanel>
    </div>
  );
}

const Services = () => {
  return (
    <section
      id="services"
      className="py-32 bg-background-alt/50 dark:bg-background-dark/50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Our Professional Services
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Click any service to learn more — comprehensive support for all your
            Canadian immigration needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
