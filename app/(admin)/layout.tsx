import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashSidebar } from "@/components/admin/DashSidebar"
import { AdminGuard } from "@/components/auth/AdminGuard"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/admin/Breadcrumbs"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashSidebar />
          
          <SidebarInset className="flex flex-col h-screen overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-100 bg-white px-6 sticky top-0 z-10">
              <SidebarTrigger className="text-[#b3668a] hover:bg-[#b3668a] transition-colors cursor-pointer" />
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex-1 p-6"> 
                <Breadcrumbs />
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 bg-[#FCFAFA]">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AdminGuard>
  )
}