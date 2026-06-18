"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface-container-lowest"
      id="home"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left content block */}
        <motion.div
          className="z-10 space-y-6 text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/30 text-on-primary-container rounded-full text-xs font-semibold tracking-wide border border-primary-container/50">
            <span className="material-symbols-outlined text-[16px]">
              verified
            </span>
            AUTHORIZED CICC/RCIC CONSULTANTS
          </div>

          <h1 className="font-display-lg text-4xl lg:text-6xl font-extrabold text-on-surface max-w-xl leading-tight">
            Your Journey to Canada Starts with a{" "}
            <span className="text-maple-red">Sun Bloom.</span>
          </h1>

          <p className="font-body-lg text-lg text-secondary max-w-lg leading-relaxed">
            Expert immigration services with precise sectoral alignment. Trust
            Sunbloom for holistic settlement and a seamless transition to your
            new life in Canada.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#appointment"
              className="gradient-maple text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 group hover:shadow-lg transition-all"
            >
              Start Your Application
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            <a
              href="#services"
              className="border-2 border-maple-red text-maple-red px-8 py-4 rounded-lg font-bold hover:bg-maple-red/10 transition-colors"
            >
              Our Services
            </a>
          </div>
        </motion.div>

        {/* Right portrait layout */}
        <motion.div
          className="relative lg:h-[600px] w-full rounded-2xl overflow-hidden card-shadow border border-outline-variant/10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            alt="Founder Portrait"
            className="w-full h-full object-cover"
            src="/rajveer-degree.jpeg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

          <div className="absolute bottom-8 left-8 bg-surface-container-high/90 backdrop-blur p-6 rounded-xl shadow-lg border-l-4 border-maple-red max-w-xs">
            <p className="text-on-surface font-bold italic text-sm">
              "We don't just process papers; we cultivate futures in the Great
              White North."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Maple Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-maple-red/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default Hero;
