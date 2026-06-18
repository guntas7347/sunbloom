"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getServicesPage, ServicePackage } from "@/lib/firebase/services";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  Plus,
  CheckCircle2,
  XCircle,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function ServiceIcon({ name, size = 18 }: { name: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Layers size={size} />;
  return <IconComponent size={size} />;
}

export default function ServicesTablePage() {
  const params = useSearchParams();
  const router = useRouter();

  const [services, setServices] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const page = Number(params.get("page") || "1");

  async function load() {
    setLoading(true);
    let cursor: any = null;
    let result: any = null;

    // Reload logic (preserved from your original code)
    for (let i = 1; i <= page; i++) {
      result = await getServicesPage(20, cursor);
      cursor = result.lastDoc;
    }

    setServices(result.items);
    setHasMore(result.hasMore);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [page]);

  function goTo(p: number) {
    router.push(`/admin/services?page=${p}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Services
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your service offerings and packages.
          </p>
        </div>

        <Link
          href="/admin/services/edit"
          className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={18} />
          Add Service
        </Link>
      </div>

      {/* --- Content Card --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        {/* Loading State */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p>Loading services...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Icons.Layers size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No services found
            </h3>
            <p className="text-gray-500 mt-1 mb-6">
              Create your first service package to get started.
            </p>
            <Link
              href="/admin/services/edit"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create Service &rarr;
            </Link>
          </div>
        )}

        {/* Table */}
        {!loading && services.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4 w-1/4">Service Title</th>
                  <th className="px-6 py-4 w-1/6">Tag</th>
                  <th className="px-6 py-4 w-5/12">Description</th>
                  <th className="px-6 py-4 w-1/12 text-center">Details</th>
                  <th className="px-6 py-4 w-1/12">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <ServiceIcon name={s.icon} />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {s.title}
                        </span>
                      </div>
                    </td>

                    {/* Tag */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.tagColor || 'bg-gray-100 text-gray-800'}`}>
                        {s.tag || 'None'}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {s.desc}
                      </p>
                    </td>

                    {/* Details Count */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                        {s.details?.length || 0} items
                      </span>
                    </td>

                    {/* Active Status */}
                    <td className="px-6 py-4">
                      {s.active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          <XCircle size={12} /> Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/services/edit?slug=${s.id}`}
                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit Service"
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

      {/* --- Pagination --- */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={page <= 1 || loading}
          onClick={() => goTo(page - 1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900">{page}</span>
        </span>

        <button
          disabled={!hasMore || loading}
          onClick={() => goTo(page + 1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
