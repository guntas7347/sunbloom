import { getDashboardStats } from "@/lib/firebase/dashboard";
import { Activity, FileText, Layers, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to Sunbloom Img. CMS.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          title="Total Quotes"
          value={stats.totalQuotes}
          icon={FileText}
        />
        <StatCard
          title="New Quotes (7 days)"
          value={stats.newQuotes7d}
          icon={Activity}
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices}
          icon={Layers}
        />
        <StatCard
          title="Published Posts"
          value={stats.publishedPosts}
          icon={Users}
        />
      </div>

      {/* Empty area */}
      <div className="border border-dashed border-gray-300 rounded-xl bg-gray-50 h-96 flex flex-col items-center justify-center text-gray-400">
        <Activity size={48} className="mb-4 text-gray-300" />
        <p>No recent activity found.</p>
        <p className="text-sm">Select a menu item to manage content.</p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: any;
}) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon size={18} className="text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
