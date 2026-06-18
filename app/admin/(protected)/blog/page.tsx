"use client";

import { useEffect, useState } from "react";
import {
  getAllPosts,
  deletePost,
  setFeaturedExclusive,
} from "@/lib/firebase/posts";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured?: boolean;
  createdAt?: any;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function load() {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data as any);
    setLoading(false);
  }

  async function remove(slug: string) {
    if (
      !confirm(
        "Are you sure you want to delete this post? This cannot be undone.",
      )
    )
      return;
    await deletePost(slug);
    await load();
  }

  async function toggleFeatured(slug: string, isCurrent: boolean) {
    if (isCurrent) return; // Already featured
    setLoading(true); // Show loading state
    await setFeaturedExclusive(slug);
    await load(); // Reload data smoothly without page refresh
  }

  useEffect(() => {
    load();
  }, []);

  const formatDate = (ms: number | null | undefined) => {
    if (!ms) return "-";

    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Blog Posts
          </h1>
          <p className="text-gray-500 mt-1">
            Manage, edit, and publish your articles.
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/blog/edit")}
          className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={18} />
          Create New Post
        </button>
      </div>

      {/* --- Content Area --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Loading State */}
        {loading && posts.length === 0 && (
          <div className="p-10 text-center text-gray-500">Loading posts...</div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No posts found
            </h3>
            <p className="text-gray-500 mt-1 mb-6">
              Get started by creating your first blog post.
            </p>
            <button
              onClick={() => router.push("/admin/blog/edit")}
              className="text-indigo-600 font-medium hover:underline"
            >
              Create Post &rarr;
            </button>
          </div>
        )}

        {/* Table */}
        {posts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Article Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Title & Slug */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex flex-col">
                        <span
                          className="font-semibold text-gray-900 line-clamp-1"
                          title={p.title}
                        >
                          {p.title}
                        </span>
                        <span className="text-xs text-gray-400 font-mono mt-0.5 line-clamp-1">
                          /{p.slug}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      {p.published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          <Eye size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} className="text-gray-400" />
                        {formatDate(p.createdAt)}
                      </div>
                    </td>

                    {/* Featured Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeatured(p.slug, !!p.featured)}
                        disabled={p.featured}
                        title={
                          p.featured ? "Currently Featured" : "Set as Featured"
                        }
                        className={`
                          relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                          ${p.featured ? "bg-indigo-600 cursor-default" : "bg-gray-200 cursor-pointer hover:bg-gray-300"}
                        `}
                      >
                        <span
                          className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm
                            ${p.featured ? "translate-x-6" : "translate-x-1"}
                          `}
                        />
                        {/* Star icon hint for context (optional, visually hidden but nice for code readers) */}
                        <Star
                          size={10}
                          className={`absolute left-1.5 text-white ${p.featured ? "opacity-100" : "opacity-0"}`}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/blog/edit?slug=${p.slug}`)
                          }
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => remove(p.slug)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
