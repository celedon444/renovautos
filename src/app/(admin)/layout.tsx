import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminNavBottom from "@/components/layout/AdminNavBottom";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";

export const metadata = {
  title: { default: "Panel Taller", template: "%s | Renovautos" },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-surface text-steel-100 flex">
      {/* Sidebar Desktop */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 pb-24 md:p-6 md:pb-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminNavBottom />
    </div>
  );
}
