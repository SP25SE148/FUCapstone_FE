import { SuperAdminSidebar } from "@/app/superadmin/component/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex w-full min-h-full">
            <SuperAdminSidebar />
            <main className="flex-1 bg-gray-50">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

