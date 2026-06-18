"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuillEditor from "@/Components/QuillEditor";
import { upsertPost, getPostBySlug } from "@/lib/firebase/posts";
import ImageUploader from "@/Components/ImageUploader";
import {
  Loader2,
  Save,
  ArrowLeft,
  Globe,
  FileText,
  ImageIcon,
  Layout,
} from "lucide-react";
import Link from "next/link";

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useSearchParams();
  const slugParam = params.get("slug");

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Validation & Helpers
  function isValidSlug(slug: string) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }

  function slugify(s: string) {
    return s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    if (!slugParam) return;

    (async () => {
      setLoadingPost(true);
      const post = await getPostBySlug(slugParam);
      if (!post) {
        setLoadingPost(false);
        return;
      }

      setSlug(post.slug);
      setTitle(post.title);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setPublished(post.published);
      setImageUrl(post.imageUrl || "");

      setLoadingPost(false);
    })();
  }, [slugParam]);

  async function save() {
    if (!slug || !title) {
      alert("Missing slug or title");
      return;
    }

    if (!isValidSlug(slug)) {
      alert("Slug must be lowercase, numbers, and hyphens only");
      return;
    }

    if (!imageUrl) {
      alert("You must upload an image");
      return;
    }

    setSaving(true);

    await upsertPost({
      slug,
      title,
      excerpt,
      content,
      published,
      imageUrl,
    });

    setSaving(false);
    router.push("/admin/blog");
  }

  if (loadingPost) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4 text-gray-500">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* --- Top Action Bar --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            title="Go Back"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {slugParam ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-sm text-gray-500">
              {slugParam ? `Editing: ${slug}` : "Create a new blog entry"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md border border-gray-200">
            <span
              className={`w-2 h-2 rounded-full ${published ? "bg-green-500" : "bg-yellow-500"}`}
            />
            <span className="text-sm font-medium text-gray-700">
              {published ? "Published" : "Draft"}
            </span>
          </div>

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
        {/* --- LEFT COLUMN: Main Content --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Post Title
            </label>
            <input
              type="text"
              required
              placeholder="Enter a captivating title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugParam) setSlug(slugify(e.target.value));
              }}
              className="w-full text-xl font-bold px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:font-normal"
            />
          </div>

          {/* Editor Container */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2 text-gray-500 text-sm font-medium">
              <FileText size={16} />
              <span>Content Editor</span>
            </div>
            <div className="flex-1 p-1">
              <QuillEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Settings & Metadata --- */}
        <div className="space-y-6">
          {/* Publishing Status Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold border-b border-gray-100 pb-3">
              <Globe size={18} />
              Publishing
            </div>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Publish to live site
              </span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
            </label>
            <p className="text-xs text-gray-500">
              {published
                ? "This post is currently visible to the public."
                : "This post is hidden and saved as a draft."}
            </p>
          </div>

          {/* SEO & URL Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold border-b border-gray-100 pb-3">
              <Layout size={18} />
              Settings
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50 text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="url-slug-here"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                disabled={!!slugParam} // Disable if editing existing
              />
              <p className="text-xs text-gray-400 mt-1">
                {!!slugParam
                  ? "Slug cannot be changed after creation."
                  : "Auto-generated from title."}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Excerpt (Short Description)
              </label>
              <textarea
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px] resize-none"
                placeholder="A short summary for SEO and preview cards..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold border-b border-gray-100 pb-3">
              <ImageIcon size={18} />
              Featured Image
            </div>

            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <ImageUploader value={imageUrl} onChange={setImageUrl} />
            </div>
            <p className="text-xs text-gray-400 text-center">
              Recommended size: 1200x630px
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
