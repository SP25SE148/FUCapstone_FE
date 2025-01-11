import { SuperAdminSidebar } from "@/app/superadmin/component/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-full">
        <SuperAdminSidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

