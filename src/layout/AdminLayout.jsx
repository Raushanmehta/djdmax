import AppHeader from "@/admin/components/AppHeader";
import AppSidebar from "@/admin/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";


const AdminLayout = ()=>  {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 bg-[#f6f6f6]">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout