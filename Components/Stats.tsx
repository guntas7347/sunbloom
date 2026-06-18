"use client";

import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "98%", label: "Selection 2.0 Success" },
  { value: "15k+", label: "Families Settled" },
  { value: "24h", label: "Response Guarantee" },
  { value: "End-to-End", label: "Settlement Support" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-maple-red text-white text-center">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, idx) => (
          <motion.div
            key={s.label}
            className="space-y-1"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="text-4xl lg:text-5xl font-bold">{s.value}</div>
            <p className="text-xs uppercase tracking-widest opacity-80 font-semibold pt-1">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
