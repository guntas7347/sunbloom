"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-surface-container-lowest text-center">
      <motion.div
        className="max-w-[1440px] mx-auto gradient-maple rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background leaf silhouette outline decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-96 h-96 fill-white" viewBox="0 0 100 100">
            <path d="M50 0L60 35H95L65 55L75 90L50 70L25 90L35 55L5 35H40L50 0Z"></path>
          </svg>
        </div>

        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold font-display-lg leading-tight">
            Ready to bloom in Canada?
          </h2>
          <p className="text-sm lg:text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
            Take our 5-minute assessment and get a customized immigration roadmap from our authorized consultants.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#appointment"
              className="bg-white text-maple-red px-8 py-3.5 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform shadow-md"
            >
              Get Free Assessment
            </a>
            <a
              href="#appointment"
              className="bg-surface-container-lowest/20 backdrop-blur-sm text-white px-8 py-3.5 rounded-lg font-bold border border-white/20 hover:bg-white/10 transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
