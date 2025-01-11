import { LayoutDashboard, UserRoundCog, UserPen, Users, Newspaper } from "lucide-react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const items = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, },
    { title: "Managers", url: "/admin/managers", icon: UserRoundCog, },
    { title: "Supervisors", url: "/admin/supervisors", icon: UserPen, },
    { title: "Students", url: "/admin/students", icon: Users, },
    { title: "Announcements", url: "/admin/announcements", icon: Newspaper, },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar items={items} />
            <main className="p-4">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
