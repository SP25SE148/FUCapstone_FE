import {
  BookOpen,
  CircleUserIcon,
  GraduationCap,
  LayoutDashboard,
  PencilRuler,
  School,
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
    { title: "Campuses", url: "/superadmin/campuses", icon: School },
    { title: "Semesters", url: "/superadmin/semesters", icon: BookOpen },
    { title: "Majors", url: "/superadmin/majorgroups", icon: PencilRuler },
    { title: "Capstones", url: "/superadmin/capstones", icon: GraduationCap },
    { title: "Admins", url: "/superadmin/admins", icon: CircleUserIcon },
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
