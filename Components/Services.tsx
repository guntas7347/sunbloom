"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ServicePackage, DEFAULT_SERVICES } from "@/lib/firebase/services";
import { ChevronDown, ArrowRight } from "lucide-react";

type Service = {
  icon: string;
  title: string;
  desc: string;
  details: string[];
  tag: string;
  tagColor: string;
  imageUrl?: string;
};


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
        transition:
          "height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);

  // Curated fallback default images based on title
  const defaultImages: Record<string, string> = {
    "Express Entry 2.0": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
    "PNP Specialized": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "Visitor Visa & Travel": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "Work & Study Permits": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    "Start-up & Corporate": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    "Family Sponsorship": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
  };

  const cardImage = service.imageUrl || defaultImages[service.title] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className={`cursor-pointer bg-surface-container-high rounded-xl border border-outline-variant/20 hover:-translate-y-2 transition-all duration-300 select-none overflow-hidden ${
        index === 0 ? "border-t-4 border-t-maple-red" : ""
      } ${open ? "shadow-xl ring-1 ring-maple-red/20" : "hover:shadow-lg"}`}
    >
      {/* Featured Card Image */}
      <div className="relative w-full h-44 overflow-hidden bg-muted">
        <img
          src={cardImage}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Subtle dark gradient overlay over image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card Content Container */}
      <div className="p-6">
        {/* Card Header */}
        <div className="flex items-start gap-4">
          <div
            className={`p-2.5 rounded-lg text-maple-red bg-primary-container/30 shrink-0`}
          >
            <ServiceIcon name={service.icon} size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-base font-bold text-on-surface leading-snug">
                {service.title}
              </h3>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${service.tagColor}`}
              >
                {service.tag}
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed mt-2 line-clamp-3">
              {service.desc}
            </p>
          </div>
          <span
            className={`material-symbols-outlined text-secondary transition-transform duration-300 mt-1 shrink-0 ${
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
                className="flex items-start gap-2.5 text-xs text-secondary"
              >
                <ArrowRight size={13} className="text-maple-red mt-0.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
            <a
              href="#appointment"
              onClick={(e) => e.stopPropagation()}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-maple-red hover:underline"
            >
              Book a consultation <ArrowRight size={12} />
            </a>
          </div>
        </ExpandPanel>
      </div>
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
          imageUrl: s.imageUrl,
        }))
      : (DEFAULT_SERVICES as Service[]);

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold font-headline-md text-on-surface">
            Comprehensive Immigration Pathways
          </h2>
          <p className="text-body-md text-secondary max-w-2xl mx-auto leading-relaxed">
            From individual skilled workers to corporate relocations, our
            expertise spans across every major Canadian immigration category.
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
