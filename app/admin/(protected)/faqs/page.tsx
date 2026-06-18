"use client";

import { FAQItem, getAllFaqs } from "@/lib/firebase/faq";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  HelpCircle,
  Edit2,
  MessageCircle,
  Search,
  AlignLeft,
} from "lucide-react";

function formatCategory(cat: string): string {
  if (!cat) return "General";
  return cat
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function FaqTablePage() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getAllFaqs();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-1">
            Manage the Q&A section for your customers.
          </p>
        </div>

        <Link
          href="/admin/faqs/edit"
          className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={18} />
          Create FAQ
        </Link>
      </div>

      {/* --- Content Card --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Loading State */}
        {loading && items.length === 0 && (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full mb-3" />
            <p>Loading questions...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <MessageCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No FAQs found</h3>
            <p className="text-gray-500 mt-1 mb-6">
              Add common questions to help your users.
            </p>
            <Link
              href="/admin/faqs/edit"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create First FAQ &rarr;
            </Link>
          </div>
        )}

        {/* Table */}
        {items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4 w-1/4">Question</th>
                  <th className="px-6 py-4 w-1/6">Category</th>
                  <th className="px-6 py-4 w-5/12">Answer Preview</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Question */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 min-w-[20px] text-indigo-600">
                          <HelpCircle size={18} />
                        </div>
                        <span className="font-semibold text-gray-900 leading-snug">
                          {f.question}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {formatCategory(f.category)}
                      </span>
                    </td>

                    {/* Answer (Truncated) */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-2 text-gray-500">
                        <AlignLeft
                          size={16}
                          className="mt-1 text-gray-300 min-w-[16px]"
                        />
                        <p className="text-sm line-clamp-2 leading-relaxed">
                          {f.answer}
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right align-top">
                      <Link
                        href={`/admin/faqs/edit?slug=${f.id}`}
                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit FAQ"
                      >
                        <Edit2 size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
