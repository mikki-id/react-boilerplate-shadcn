import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/shared/sidebar/admin-sidebar";
import AdminTopbar from "@/components/shared/topbar/admin-topbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

/**
 * Admin layout — sidebar + topbar + outlet.
 * Uses the official shadcn SidebarProvider for responsive behavior.
 */
const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminTopbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
