"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getServiceById,
  updateService,
  deleteService,
  createService,
  slugify,
} from "@/lib/firebase/services";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Loader2,
  CheckCircle2,
  Type,
  Layers,
  Sparkles,
  Tag,
  ImageIcon,
  FileText,
  Globe,
  ExternalLink,
} from "lucide-react";
import ImageUploader from "@/Components/ImageUploader";
import QuillEditor from "@/Components/QuillEditor";
import Link from "next/link";

const PREDEFINED_ICONS = [
  "Plane",
  "Users",
  "GraduationCap",
  "Briefcase",
  "Home",
  "Award",
  "FileText",
  "Zap",
  "Map",
  "Heart",
  "Gavel",
  "Shield",
];

const PREDEFINED_COLORS = [
  { name: "Sky (Blue)", value: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" },
  { name: "Pink (Red/Family)", value: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300" },
  { name: "Violet (Purple)", value: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" },
  { name: "Amber (Yellow/Employment)", value: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  { name: "Emerald (Green)", value: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  { name: "Red", value: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  { name: "Yellow", value: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
  { name: "Teal", value: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  { name: "Orange", value: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  { name: "Rose (Red/Protection)", value: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
];

function ServiceIcon({ name, size = 18 }: { name: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
}

export default function EditServicePage() {
  const params = useSearchParams();
  const router = useRouter();
  const idParam = params.get("slug"); // doc id

  const isEdit = !!idParam;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    desc: "",
    tag: "",
    tagColor: PREDEFINED_COLORS[0].value,
    icon: PREDEFINED_ICONS[0],
    details: "",
    content: "",
    imageUrl: "",
    active: true,
  });

  useEffect(() => {
    if (!isEdit) return;

    getServiceById(idParam!).then((data) => {
      if (!data) {
        setLoading(false);
        return;
      }

      setForm({
        title: data.title || "",
        slug: data.slug || slugify(data.title || ""),
        desc: data.desc || "",
        tag: data.tag || "",
        tagColor: data.tagColor || PREDEFINED_COLORS[0].value,
        icon: data.icon || PREDEFINED_ICONS[0],
        details: data.details ? data.details.join("\n") : "",
        content: data.content || "",
        imageUrl: data.imageUrl || "",
        active: data.active !== undefined ? data.active : true,
      });

      setLoading(false);
    });
  }, [idParam, isEdit]);

  async function save() {
    if (!form.title.trim()) {
      alert("A service title is required.");
      return;
    }

    const currentSlug = (form.slug.trim() ? form.slug : form.title).trim();
    const finalSlug = slugify(currentSlug);

    if (!finalSlug) {
      alert("A valid URL slug is required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title.trim(),
      slug: finalSlug,
      desc: form.desc.trim(),
      tag: form.tag.trim(),
      tagColor: form.tagColor,
      icon: form.icon,
      details: form.details
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      content: form.content,
      imageUrl: form.imageUrl,
      active: form.active,
    };

    try {
      if (isEdit) {
        await updateService(idParam!, payload);
      } else {
        await createService(payload as any);
      }
      setSaving(false);
      router.push("/admin/services");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save service. Please try again.");
      setSaving(false);
    }
  }

  async function remove() {
    if (!isEdit) return;
    if (
      !confirm(
        "Are you sure you want to delete this service? This cannot be undone."
      )
    )
      return;
    await deleteService(idParam!);
    router.push("/admin/services");
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center gap-2 text-gray-500">
        <Loader2 className="animate-spin" /> Loading service data...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
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
              {isEdit ? "Edit Service" : "New Service"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEdit
                ? `Editing: ${form.title || "Untitled"}`
                : "Create a new immigration service and dedicated landing page."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && form.slug && (
            <Link
              href={`/services/${form.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              title="View live page"
            >
              <Globe size={16} className="text-gray-500" />
              <span>View Live</span>
              <ExternalLink size={13} className="text-gray-400" />
            </Link>
          )}

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
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: Main Info & Page Content --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Type size={18} className="text-indigo-600" />
              Service Information & URL
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-semibold"
                  placeholder="e.g. Express Entry 2.0"
                  value={form.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      title: newTitle,
                      slug: isEdit ? prev.slug : slugify(newTitle),
                    }));
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug (Live Route: /services/<span className="text-indigo-600 font-mono">{form.slug || "your-slug"}</span>)
                </label>
                <input
                  className="w-full px-4 py-2 font-mono text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 bg-gray-50"
                  placeholder="e.g. express-entry"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: slugify(e.target.value) })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used for dedicated dynamic page URL: <code className="text-indigo-600">/services/{form.slug || "slug"}</code> and <code className="text-indigo-600">/service/{form.slug || "slug"}</code>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description (Card Overview)
                </label>
                <textarea
                  className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y leading-relaxed text-gray-700"
                  placeholder="e.g. Optimized for STEM, Healthcare, and Skilled Trades with category-based selection strategies."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Dedicated Page Rich Content Editor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <FileText size={18} className="text-indigo-600" />
                <span>Dedicated Page Long-Form Content</span>
              </div>
              <span className="text-xs text-gray-500">
                Supports headings, lists, quotes & links
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">
                This comprehensive guide appears on the dedicated dynamic page (<code>/services/{form.slug || "slug"}</code>). Use headings, bullet lists, and paragraphs to explain eligibility, process steps, and requirements.
              </p>
              <QuillEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Write detailed eligibility requirements, steps, documents, and program overview..."
              />
            </div>
          </div>

          {/* Details / Features Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Layers size={18} className="text-indigo-600" />
              Key Highlights / Bullet Points
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features / Bullet Points (One per line)
              </label>
              <textarea
                className="w-full h-44 p-4 rounded-lg border border-gray-300 font-mono text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y"
                placeholder={
                  "Federal Skilled Worker, CEC & FST streams\nCRS score assessment & improvement strategy\nITA to PR submission support"
                }
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: These appear as checkmarks and bullet highlights on both the homepage card and the dedicated service page sidebar.
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Settings --- */}
        <div className="space-y-6">
          {/* Visibility / Status Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-indigo-600" />
              Publishing & Status
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  Active Status
                </span>
                <span className="text-xs text-gray-500">
                  Show on homepage and public routes
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-indigo-600" />
              Banner & Featured Image
            </h3>
            <ImageUploader
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
            />
            <p className="text-xs text-gray-400 text-center">
              Displayed on service cards and page banner header
            </p>
          </div>

          {/* Icon Selection Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />
              Icon Selection
            </h3>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Predefined Lucide Icons
              </label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {PREDEFINED_ICONS.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setForm({ ...form, icon: iconName })}
                    className={`p-2 border rounded-lg flex items-center justify-center transition-all ${
                      form.icon === iconName
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-sm ring-1 ring-indigo-500"
                        : "border-gray-200 hover:bg-gray-50 text-gray-500"
                    }`}
                    title={iconName}
                  >
                    <ServiceIcon name={iconName} size={20} />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Custom Lucide Icon Name
                </label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Activity, Globe, Compass"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Tag & Color Selection Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Tag size={18} className="text-indigo-600" />
              Tag & Badge Style
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Text / Label
              </label>
              <input
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Fast-Track, Permanent, Business"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Color Scheme
              </label>
              <select
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={
                  PREDEFINED_COLORS.some((c) => c.value === form.tagColor)
                    ? form.tagColor
                    : "custom"
                }
                onChange={(e) => {
                  if (e.target.value !== "custom") {
                    setForm({ ...form, tagColor: e.target.value });
                  }
                }}
              >
                {PREDEFINED_COLORS.map((col) => (
                  <option key={col.value} value={col.value}>
                    {col.name}
                  </option>
                ))}
                <option value="custom">Custom Tailwind Classes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Custom Tailwind Color Classes
              </label>
              <input
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 font-mono text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="bg-indigo-100 text-indigo-700"
                value={form.tagColor}
                onChange={(e) => setForm({ ...form, tagColor: e.target.value })}
              />
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Preview:</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  form.tagColor || "bg-gray-100 text-gray-800"
                }`}
              >
                {form.tag || "Badge Preview"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
