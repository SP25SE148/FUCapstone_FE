import { AdminSidebar } from "./components/admin-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="p-4">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
