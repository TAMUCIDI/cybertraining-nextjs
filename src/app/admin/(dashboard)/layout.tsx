import AdminAuthGuard from "../_components/AdminAuthGuard";
import AdminShell from "../_components/AdminShell";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
}
