"use client";

import React, { useState } from "react";
import { Search, FileText, CheckCircle2 } from "lucide-react";
import type { OathDoc } from "@/lib/firebase/oath";

const DOCUMENT_CATEGORIES = [
  "All",
  "Affidavits & Declarations",
  "Government & Immigration",
  "Real Estate & Legal",
  "Family & Estates",
];

interface OathDocFinderProps {
  initialDocs: OathDoc[];
}

export default function OathDocFinder({ initialDocs }: OathDocFinderProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = initialDocs.filter((doc) => {
    const matchesCat =
      selectedCategory === "All" || doc.cat === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-6 md:p-8 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="text-maple-red" size={22} />
          Authorized Documents List
        </h3>
        <p className="text-sm text-secondary">
          Search or select a category below to confirm if we can commission your documents.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
          size={18}
        />
        <input
          type="text"
          placeholder="Search document name (e.g. invitation, common-law, dower...)"
          className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-maple-red/30 focus:border-maple-red outline-none transition-all text-sm text-on-surface dark:text-white dark:bg-[#0f172a]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category selector */}
      <div className="flex gap-2 flex-wrap">
        {DOCUMENT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? "gradient-maple text-white shadow-sm"
                : "bg-surface border border-outline-variant/30 text-secondary hover:bg-surface-container-highest dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc, idx) => (
            <div
              key={doc.id || idx}
              className="bg-surface p-5 rounded-xl border border-outline-variant/15 flex flex-col justify-between hover:shadow-md transition-shadow dark:bg-[#0b1329]/50"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-maple-red bg-primary-container/20 px-2 py-0.5 rounded-full inline-block">
                  {doc.cat}
                </span>
                <h4 className="font-bold text-sm leading-snug">
                  {doc.name}
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  {doc.desc}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-semibold uppercase tracking-wider">
                <CheckCircle2 size={12} /> Commissionable
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-10 text-secondary">
            No matching documents found. Please call/text to verify.
          </div>
        )}
      </div>
    </div>
  );
}
