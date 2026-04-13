"use client";

import React, { useRef } from "react";
import { Phone, MapPin, Mail, Clock, ExternalLink } from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    value: "289-885-4848",
    href: "tel:+12898854848",
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sunbloomimmigration.ca",
    href: "mailto:info@sunbloomimmigration.ca",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "25415 Terrault Rd, Sturgeon County, AB T8T 0C6, Canada",
    href: "https://maps.google.com/?q=Sturgeon+County+AB",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 9:00 AM – 4:00 PM (MST)",
    href: null,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

export default function Contact() {
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="contact" className="py-28 bg-white dark:bg-background-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header */}
          <div className="mb-14" style={{ animation: "fadeSlideUp 0.5s both" }}>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full mb-5">
              <Phone size={12} /> Get in Touch
            </span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight">
              We're Here to{" "}
              <span className="relative inline-block">
                <span className="text-primary">Help</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/25 rounded-full" />
              </span>
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-lg">
              Reach out through any channel below. Our team responds within one
              business day.
            </p>
          </div>

          {/* contact cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {CONTACT_ITEMS.map(
              ({ icon: Icon, label, value, href, color }, i) => (
                <div
                  key={label}
                  className="group flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  style={{ animation: `fadeSlideUp 0.5s ${i * 80}ms both` }}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-primary transition-colors break-words flex items-center gap-1.5 group/link"
                      >
                        {value}
                        <ExternalLink
                          size={11}
                          className="opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0"
                        />
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* map */}
          <div
            className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl"
            style={{ animation: "fadeSlideUp 0.5s 360ms both" }}
          >
            <iframe
              src="https://www.google.com/maps?q=Sturgeon+County,+AB,+Canada&output=embed"
              width="100%"
              height="340"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunbloom Immigration — Sturgeon County, AB"
            />
          </div>
        </div>
      </section>
    </>
  );
}
