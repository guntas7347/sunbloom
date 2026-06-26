"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getServiceById,
  updateService,
  deleteService,
  createService,
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
} from "lucide-react";
import ImageUploader from "@/Components/ImageUploader";

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
  const slug = params.get("slug"); // id

  const isEdit = !!slug;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    tag: "",
    tagColor: PREDEFINED_COLORS[0].value,
    icon: PREDEFINED_ICONS[0],
    details: "",
    imageUrl: "",
    active: true,
  });

  useEffect(() => {
    if (!isEdit) return;

    getServiceById(slug!).then((data) => {
      if (!data) return;

      setForm({
        title: data.title || "",
        desc: data.desc || "",
        tag: data.tag || "",
        tagColor: data.tagColor || PREDEFINED_COLORS[0].value,
        icon: data.icon || PREDEFINED_ICONS[0],
        details: data.details ? data.details.join("\n") : "",
        imageUrl: data.imageUrl || "",
        active: data.active !== undefined ? data.active : true,
      });

      setLoading(false);
    });
  }, [slug, isEdit]);

  async function save() {
    if (!form.title) {
      alert("A title is required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title,
      desc: form.desc,
      tag: form.tag,
      tagColor: form.tagColor,
      icon: form.icon,
      details: form.details.split("\n").filter(Boolean),
      imageUrl: form.imageUrl,
      active: form.active,
    };

    if (isEdit) {
      await updateService(slug!, payload);
    } else {
      await createService(payload as any);
    }

    setSaving(false);
    router.push("/admin/services");
  }

  async function remove() {
    if (!isEdit) return;
    if (
      !confirm(
        "Are you sure you want to delete this service? This cannot be undone.",
      )
    )
      return;
    await deleteService(slug!);
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
                ? "Update service details, icon, and description."
                : "Create a new immigration service."}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: Main Info --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Type size={18} className="text-indigo-600" />
              Service Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-semibold"
                  placeholder="e.g. Visitor Visa"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y leading-relaxed text-gray-700"
                  placeholder="e.g. Explore Canada for tourism, family visits, or short business trips."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Details / Features Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Layers size={18} className="text-indigo-600" />
              Service Details / Features List
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features / Bullet Points (One per line)
              </label>
              <textarea
                className="w-full h-64 p-4 rounded-lg border border-gray-300 font-mono text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder={
                  "Single or multiple-entry visa options\nMaximum stay of up to 6 months per visit\nBiometric requirements handled end-to-end"
                }
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />
              <p className="text-xs text-gray-550 mt-2">
                Tip: Each line will be displayed as an arrow bullet point on the website.
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Settings --- */}
        <div className="space-y-6">
          {/* Icon Selection Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />
              Icon Options
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Predefined Icon
              </label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {PREDEFINED_ICONS.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setForm({ ...form, icon: iconName })}
                    className={`p-2 border rounded-lg flex items-center justify-center transition-all ${
                      form.icon === iconName
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-sm"
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
                  Or Custom Lucide Icon Name
                </label>
                <input
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="e.g. Activity, Shield, Anchor"
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
              Tag Settings
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag Text / Label
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. Temporary, Family, PR"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Predefined Color Scheme
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={PREDEFINED_COLORS.some((c) => c.value === form.tagColor) ? form.tagColor : "custom"}
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
                <option value="custom">Custom Color Classes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Custom Tailwind Color Classes
              </label>
              <input
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="bg-indigo-100 text-indigo-750"
                value={form.tagColor}
                onChange={(e) => setForm({ ...form, tagColor: e.target.value })}
              />
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Preview Tag:</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${form.tagColor || "bg-gray-100 text-gray-800"}`}>
                {form.tag || "Preview"}
              </span>
            </div>
          </div>

          {/* Visibility / Status Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-indigo-600" />
              Settings
            </h3>

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Active (Show on main site)
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
              Featured Image
            </h3>
            <ImageUploader
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
            />
            <p className="text-xs text-gray-400 text-center">
              Recommended: high resolution banner (max. 800x400px)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
