"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getOathFaqById,
  createOathFaq,
  updateOathFaq,
  deleteOathFaq,
} from "@/lib/firebase/oath";
import {
  ArrowLeft,
  Save,
  Trash2,
  Loader2,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

export default function EditOathFaqPage() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug"); // id

  const isEdit = !!slug;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    getOathFaqById(slug!).then((data) => {
      if (!data) return;

      setQ(data.q || "");
      setA(data.a || "");
      setLoading(false);
    });
  }, [slug, isEdit]);

  async function save() {
    if (!q || !a) {
      alert("Both a Question and an Answer are required.");
      return;
    }

    setSaving(true);

    const payload = { q, a };

    if (isEdit) {
      await updateOathFaq(slug!, payload);
    } else {
      await createOathFaq(payload);
    }

    setSaving(false);
    router.push("/admin/oath-faqs");
  }

  async function remove() {
    if (!isEdit) return;
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    setSaving(true);
    await deleteOathFaq(slug!);
    setSaving(false);
    router.push("/admin/oath-faqs");
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center gap-2 text-gray-500">
        <Loader2 className="animate-spin" /> Loading FAQ data...
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
              {isEdit ? "Edit Oaths FAQ" : "New Oaths FAQ"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEdit
                ? "Update this question and answer for the Oaths page."
                : "Add a frequently asked question to the Edmonton Oaths page."}
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
        {/* Question Input */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <HelpCircle size={18} className="text-indigo-600" />
            Question
          </label>
          <input
            className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:font-normal placeholder:text-gray-400"
            placeholder="e.g. Can you commission immigration forms?"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {/* Answer Textarea */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <MessageCircle size={18} className="text-indigo-600" />
            Answer
          </label>
          <textarea
            className="w-full min-h-[220px] p-4 rounded-lg border border-gray-300 text-gray-700 leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y"
            placeholder="Provide a detailed and clear explanation..."
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
          <p className="text-xs text-gray-400 text-right">
            {a.length} characters
          </p>
        </div>
      </div>
    </div>
  );
}
