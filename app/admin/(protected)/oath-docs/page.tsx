"use client";

import { OathDoc, getAllOathDocs } from "@/lib/firebase/oath";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  FileText,
  Edit2,
  List,
  Search,
  Tag,
} from "lucide-react";

export default function OathDocsTablePage() {
  const [items, setItems] = useState<OathDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");

  async function load() {
    setLoading(true);
    const data = await getAllOathDocs();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.cat.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Commissionable Documents
          </h1>
          <p className="text-gray-500 mt-1">
            Manage the list of authorized documents displayed on the public Oaths page.
          </p>
        </div>

        <Link
          href="/admin/oath-docs/edit"
          className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={18} />
          Add Document
        </Link>
      </div>

      {/* --- Search/Filter bar --- */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Filter documents by name or category..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>

      {/* --- Content Card --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Loading State */}
        {loading && items.length === 0 && (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full mb-3" />
            <p>Loading documents list...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <FileText size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
            <p className="text-gray-500 mt-1 mb-6">
              Add common documents that a Commissioner of Oaths can sign.
            </p>
            <Link
              href="/admin/oath-docs/edit"
              className="text-indigo-600 font-medium hover:underline"
            >
              Add First Document &rarr;
            </Link>
          </div>
        )}

        {/* Table */}
        {filteredItems.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4 w-1/3">Document Name</th>
                  <th className="px-6 py-4 w-1/4">Category</th>
                  <th className="px-6 py-4 w-1/3">Description</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((docItem) => (
                  <tr
                    key={docItem.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 min-w-[20px] text-indigo-600">
                          <FileText size={18} />
                        </div>
                        <span className="font-semibold text-gray-900 leading-snug">
                          {docItem.name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {docItem.cat}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-2 text-gray-500">
                        <List
                          size={16}
                          className="mt-1 text-gray-300 min-w-[16px]"
                        />
                        <p className="text-sm line-clamp-2 leading-relaxed">
                          {docItem.desc}
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right align-top">
                      <Link
                        href={`/admin/oath-docs/edit?slug=${docItem.id}`}
                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit Document"
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
