"use client";

import React from "react";
import { motion } from "framer-motion";

const POLICY_POSTS = [
  {
    day: "24",
    month: "Oct",
    title: "New Healthcare category draw thresholds released",
    desc: "Discover how the latest CRS scores affect medical practitioners applying this quarter.",
  },
  {
    day: "19",
    month: "Oct",
    title: "Rural stream expansion: 3 new communities added",
    desc: "New opportunities in Manitoba and Saskatchewan for agricultural specialists.",
  },
];

export default function PolicyFeed() {
  return (
    <section className="py-20 bg-background text-left">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Title row */}
        <div className="flex items-center gap-4 mb-10">
          <span className="w-12 h-[2px] bg-maple-red shrink-0"></span>
          <h2 className="text-2xl font-bold font-headline-md uppercase tracking-tighter text-maple-red">
            IRCC Policy Feed
          </h2>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POLICY_POSTS.map((post, idx) => (
            <motion.div
              key={post.title}
              className="flex gap-6 p-6 hover:bg-surface-container-high transition-all rounded-xl border border-transparent hover:border-outline-variant/20 group cursor-pointer"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Date Block */}
              <div className="flex-shrink-0 text-center border-r border-outline-variant/30 pr-6 min-w-[70px]">
                <p className="text-3xl font-bold text-on-surface leading-none">
                  {post.day}
                </p>
                <p className="text-xs font-bold text-secondary uppercase mt-2 tracking-wider">
                  {post.month}
                </p>
              </div>

              {/* Text Block */}
              <div>
                <h4 className="font-bold text-on-surface text-base group-hover:text-maple-red transition-colors leading-snug">
                  {post.title}
                </h4>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  {post.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
