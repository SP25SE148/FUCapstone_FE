import {
  LayoutDashboard,
  Newspaper,
  UserPen,
  UserRoundCog,
  Users,
} from "lucide-react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    { title: "Dashboard", url: "/superadmin", icon: LayoutDashboard },
    { title: "Campuses", url: "/superadmin/campuses", icon: UserRoundCog },
    { title: "Semesters", url: "/superadmin/semesters", icon: UserPen },
    { title: "Majors", url: "/superadmin/majorgroups", icon: Users },
    { title: "Capstones", url: "/superadmin/capstones", icon: Newspaper },
    { title: "Admins", url: "/superadmin/admins", icon: Newspaper },
  ];

  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
