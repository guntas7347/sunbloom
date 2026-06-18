"use client";

import React from "react";
import { motion } from "framer-motion";

const Guide = () => {
  return (
    <section className="py-20 bg-surface" id="strategy">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl font-bold font-headline-md text-on-surface mb-2">
              Strategic Focus 2026: Decentralized Growth
            </h2>
            <p className="text-body-md text-secondary leading-relaxed">
              Aligning with Canada's latest IRCC mandates focusing on regional economic development and cultural preservation.
            </p>
          </div>
          <a
            href="#"
            className="text-maple-red font-bold flex items-center gap-2 cursor-pointer hover:underline text-sm"
          >
            Explore Strategy Docs 
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Rural Stream */}
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-surface-container-low min-h-[380px] flex flex-col justify-end p-8 border border-outline-variant/20 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Background image zoom effect */}
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 opacity-15 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1505051508008-923feaf90180?auto=format&fit=crop&q=80&w=1000')`,
                }}
              />
            </div>
            
            <div className="relative z-10 space-y-4 text-left">
              <div className="w-12 h-12 bg-maple-red rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[24px]">location_city</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">Rural & Northern Streams</h3>
              <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
                Targeted pathways for 11 participating communities, focusing on permanent residency through local job offers.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2 text-xs font-bold text-maple-red">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> 
                  Faster Processing
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-maple-red">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> 
                  Direct PR Pathways
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Francophone Mobility */}
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-primary-container/10 min-h-[380px] flex flex-col justify-end p-8 border border-maple-red/25 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Background image zoom effect */}
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 opacity-10 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1549416805-474c1070e62a?auto=format&fit=crop&q=80&w=1000')`,
                }}
              />
            </div>

            <div className="relative z-10 space-y-4 text-left">
              <div className="w-12 h-12 bg-surface-container-lowest rounded-lg flex items-center justify-center text-maple-red border border-maple-red/10 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">language</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">Francophone Mobility 2.0</h3>
              <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
                Special exemptions for French-speaking candidates outside of Quebec to bolster minority communities nationwide.
              </p>
              <div className="pt-2">
                <a
                  href="#appointment"
                  className="inline-block px-6 py-2.5 bg-maple-red text-white rounded-full text-xs font-semibold hover:bg-maple-red/80 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Guide;
