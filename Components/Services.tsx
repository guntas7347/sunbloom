"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ServicePackage } from "@/lib/firebase/services";
import { ChevronDown, ArrowRight } from "lucide-react";

type Service = {
  icon: string;
  title: string;
  desc: string;
  details: string[];
  tag: string;
  tagColor: string;
};

const DEFAULT_SERVICES: Service[] = [
  {
    icon: "Zap",
    title: "Express Entry 2.0",
    desc: "Optimized for STEM, Healthcare, and Skilled Trades with category-based selection strategies.",
    tag: "Fast-Track",
    tagColor: "bg-primary-container/30 text-on-primary-container",
    details: [
      "Federal Skilled Worker, CEC & FST streams",
      "CRS score assessment & improvement strategy",
      "ITA to PR submission in under 6 months",
      "Category-based draws targeting priority sectors",
    ],
  },
  {
    icon: "Map",
    title: "PNP Specialized",
    desc: "Provincial Nomination programs tailored to specific labor market needs in Ontario, BC, and Alberta.",
    tag: "Provincial",
    tagColor: "bg-secondary-container/50 text-on-secondary-container",
    details: [
      "Provincial streams aligned with local economic priorities",
      "Additional 600 CRS points upon nomination",
      "Base PNP streams for direct direct-to-province applications",
    ],
  },
  {
    icon: "Plane",
    title: "Visitor Visa & Travel",
    desc: "Explore Canada for tourism, family visits, or short business trips.",
    tag: "Temporary",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    details: [
      "Single or multiple-entry visa options",
      "Maximum stay of up to 6 months per visit",
      "PRTD application support for permanent residents",
    ],
  },
  {
    icon: "GraduationCap",
    title: "Work & Study Permits",
    desc: "Strategic planning for students and temporary workers aiming for long-term residency status.",
    tag: "Permits",
    tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    details: [
      "Study Permit at DLIs and PGWP pathway planning",
      "SOWP for spouses of workers or students",
      "LMIA compliance and closed/open work permits",
    ],
  },
  {
    icon: "Home",
    title: "Start-up & Corporate",
    desc: "Comprehensive support for entrepreneurs and multinational companies expanding to Canada.",
    tag: "Business",
    tagColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    details: [
      "Start-Up Visa for innovative tech founders",
      "Intra-Company Transferee (ICT) work permits",
      "LMIA support for corporate staff relocation",
    ],
  },
  {
    icon: "Heart",
    title: "Family Sponsorship",
    desc: "Reuniting families through Spousal, Parent, and Grandparent sponsorship applications.",
    tag: "Family",
    tagColor: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    details: [
      "Spousal and common-law partner sponsorship",
      "Super Visa applications for parents and grandparents",
      "Adoption and dependent children class filings",
    ],
  },
];

function ServiceIcon({ name, size = 22 }: { name: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Layers size={size} />;
  return <IconComponent size={size} />;
}

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
        transition: "height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className={`cursor-pointer bg-surface-container-high p-8 rounded-xl border border-outline-variant/20 hover:-translate-y-2 transition-all duration-300 select-none ${
        index === 0 ? "border-t-4 border-t-maple-red" : ""
      } ${open ? "shadow-xl ring-1 ring-maple-red/20" : "hover:shadow-lg"}`}
    >
      {/* Card Header */}
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg text-maple-red bg-primary-container/30`}>
          <ServiceIcon name={service.icon} size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-lg font-bold text-on-surface">
              {service.title}
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${service.tagColor}`}
            >
              {service.tag}
            </span>
          </div>
          <p className="text-sm text-secondary leading-relaxed mt-2">
            {service.desc}
          </p>
        </div>
        <span
          className={`material-symbols-outlined text-secondary transition-transform duration-300 mt-1 ${
            open ? "rotate-180 text-maple-red" : ""
          }`}
        >
          keyboard_arrow_down
        </span>
      </div>

      {/* Expandable details */}
      <ExpandPanel open={open}>
        <div className="pt-4 mt-4 border-t border-dashed border-outline-variant/20 space-y-2 text-left">
          {service.details.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-sm text-secondary"
            >
              <ArrowRight size={14} className="text-maple-red mt-1 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
          <a
            href="#appointment"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-maple-red hover:underline"
          >
            Book a consultation <ArrowRight size={13} />
          </a>
        </div>
      </ExpandPanel>
    </div>
  );
}

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

interface ServicesProps {
  services?: ServicePackage[];
}

const Services = ({ services }: ServicesProps) => {
  const displayServices: Service[] =
    services && services.length > 0
      ? services.map((s) => ({
          icon: s.icon,
          title: s.title,
          desc: s.desc,
          tag: s.tag,
          tagColor: s.tagColor,
          details: s.details,
        }))
      : DEFAULT_SERVICES;

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold font-headline-md text-on-surface">
            Comprehensive Immigration Pathways
          </h2>
          <p className="text-body-md text-secondary max-w-2xl mx-auto leading-relaxed">
            From individual skilled workers to corporate relocations, our expertise spans across every major Canadian immigration category.
          </p>
        </div>

        {/* Dynamic Bento Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayServices.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <ServiceCard service={service} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
