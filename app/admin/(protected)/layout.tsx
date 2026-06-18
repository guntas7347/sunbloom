import AdminNavbar from "@/Components/admin/AdminNavbar";
import AuthGate from "@/Components/admin/AuthGate";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <AdminNavbar />
      {children}
    </AuthGate>
  );
}
