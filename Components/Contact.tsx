"use client";

import React from "react";
import { Phone, MapPin, Mail, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone Support",
    value: "289-885-4848",
    href: "tel:+12898854848",
    color: "bg-primary-container/30 text-maple-red",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "consult@sunbloomimmigration.com",
    href: "mailto:consult@sunbloomimmigration.com",
    color: "bg-primary-container/30 text-maple-red",
  },
  {
    icon: MapPin,
    label: "Registered Office Address",
    value: "3612 40th Avenue NW, Edmonton, AB T6L6M8 Canada",
    href: "https://www.google.com/maps/search/?api=1&query=3612%2040th%20Avenue%20NW%2C%20Edmonton%2C%20AB%20T6L%206M8",
    color: "bg-primary-container/30 text-maple-red",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 9:00 AM – 4:00 PM (MST)",
    href: null,
    color: "bg-primary-container/30 text-maple-red",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background text-left">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Contact Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="inline-flex items-center gap-2 bg-primary-container/30 text-on-primary-container text-xs font-bold px-4 py-2 rounded-full mb-5 border border-primary-container/50">
                <span className="material-symbols-outlined text-[14px]">
                  call
                </span>
                Get In Touch
              </span>
              <h2 className="text-3xl font-bold font-headline-md text-on-surface leading-tight">
                We're Here to <span className="text-maple-red">Help.</span>
              </h2>
              <p className="mt-3 text-secondary text-sm leading-relaxed max-w-md">
                Reach out through any channel below. Our team responds to all
                inquiries within one business day.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 bg-surface-container rounded-xl border border-outline-variant/15 hover:border-maple-red/30 transition-all duration-350 shadow-sm"
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-on-surface hover:text-maple-red transition-colors break-words inline-flex items-center gap-1"
                      >
                        {item.value}
                        <ExternalLink size={10} className="shrink-0" />
                      </a>
                    ) : (
                      <p className="text-xs font-bold text-on-surface">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Map Frame */}
          <motion.div
            className="rounded-2xl overflow-hidden border border-outline-variant/15 shadow-xl h-[360px] md:h-[420px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <iframe
              src="https://www.google.com/maps?q=3612%2040th%20Avenue%20NW%2C%20Edmonton%2C%20AB%20T6L%206M8%2C%20Canada&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunbloom Immigration — Sturgeon County, AB Office Location Map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
