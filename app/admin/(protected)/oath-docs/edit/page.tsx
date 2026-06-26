"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getOathDocById,
  createOathDoc,
  updateOathDoc,
  deleteOathDoc,
} from "@/lib/firebase/oath";
import {
  ArrowLeft,
  Save,
  Trash2,
  Loader2,
  FileText,
  Tag,
  AlignLeft,
} from "lucide-react";

const PREDEFINED_CATEGORIES = [
  "Affidavits & Declarations",
  "Government & Immigration",
  "Real Estate & Legal",
  "Family & Estates",
];

export default function EditOathDocPage() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug"); // id

  const isEdit = !!slug;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(PREDEFINED_CATEGORIES[0]);

  useEffect(() => {
    if (!isEdit) return;

    getOathDocById(slug!).then((data) => {
      if (!data) return;

      setName(data.name || "");
      setDesc(data.desc || "");
      setCat(data.cat || PREDEFINED_CATEGORIES[0]);
      setLoading(false);
    });
  }, [slug, isEdit]);

  async function save() {
    if (!name || !desc) {
      alert("Name and Description are required.");
      return;
    }

    setSaving(true);

    const payload = { name, desc, cat };

    if (isEdit) {
      await updateOathDoc(slug!, payload);
    } else {
      await createOathDoc(payload);
    }

    setSaving(false);
    router.push("/admin/oath-docs");
  }

  async function remove() {
    if (!isEdit) return;
    if (!confirm("Are you sure you want to delete this document type?")) return;
    
    setSaving(true);
    await deleteOathDoc(slug!);
    setSaving(false);
    router.push("/admin/oath-docs");
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center gap-2 text-gray-500">
        <Loader2 className="animate-spin" /> Loading document data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* --- Top Action Bar --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Edit Document" : "New Document"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEdit
                ? "Update dynamic document details and category."
                : "Add a new commissionable document to the public list."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && (
            <button
              onClick={remove}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* --- Content Card --- */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-8">
        {/* Document Name */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FileText size={18} className="text-indigo-600" />
            Document Name
          </label>
          <input
            className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:font-normal placeholder:text-gray-400"
            placeholder="e.g. Affidavit of execution for Cohabitation Agreements"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Tag size={18} className="text-indigo-600" />
            Category Group
          </label>
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 font-medium bg-white"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            {PREDEFINED_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-550">
            Select the corresponding section under which this document should be displayed.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <AlignLeft size={18} className="text-indigo-600" />
            Short Description / Notes
          </label>
          <textarea
            className="w-full min-h-[120px] p-4 rounded-lg border border-gray-300 text-gray-700 leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y"
            placeholder="Provide a brief description of what this document is used for..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
