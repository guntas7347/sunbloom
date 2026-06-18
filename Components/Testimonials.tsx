"use client";

import React from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    initials: "JD",
    name: "Jean-Pierre D.",
    role: "IT Project Manager",
    text: "The precision with which Sunbloom handled our Francophone mobility application was world-class. We moved from Paris to Ottawa in record time.",
  },
  {
    initials: "AK",
    name: "Ananya K.",
    role: "Registered Nurse",
    text: "Sunbloom helped me navigate the Rural stream. Today, I'm a permanent resident living in a beautiful community in Northern Ontario.",
    highlight: true,
  },
  {
    initials: "MR",
    name: "Mark R.",
    role: "CEO, NexaTech Solutions",
    text: "Corporate relocation is stressful, but Sunbloom made it seamless. Our entire tech team was processed through the STEM stream without a hitch.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-surface text-left" id="testimonials">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold font-headline-md text-on-surface">
            Voices of Success
          </h2>
          <div className="flex gap-2">
            <button className="p-2 border border-outline rounded-full hover:bg-surface-container-high transition-colors text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="p-2 border border-outline rounded-full hover:bg-surface-container-high transition-colors text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              className={`bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 italic text-secondary flex flex-col justify-between ${
                t.highlight ? "border-b-4 border-b-maple-red" : ""
              }`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div>
                {/* Stars */}
                <div className="flex text-maple-red mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed">"{t.text}"</p>
              </div>

              {/* Author profile */}
              <div className="mt-6 not-italic flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-container/30 rounded-full flex items-center justify-center font-bold text-maple-red text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{t.name}</p>
                  <p className="text-[10px] text-secondary font-semibold uppercase">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
