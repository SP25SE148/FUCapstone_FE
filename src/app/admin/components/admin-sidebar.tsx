import Link from "next/link"
import { LayoutDashboard, UserRoundCog, UserPen, Users, Newspaper } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, },
    { title: "Managers", url: "/admin/managers", icon: UserRoundCog, },
    { title: "Supervisors", url: "/admin/supervisors", icon: UserPen, },
    { title: "Students", url: "/admin/students", icon: Users, },
    { title: "Announcements", url: "/admin/announcements", icon: Newspaper, },
]

export function AdminSidebar() {
    return (
        <Sidebar
            className="mt-[68px] h-[calc(100vh-68px)]"
            variant="floating"
            collapsible="icon"
        >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
