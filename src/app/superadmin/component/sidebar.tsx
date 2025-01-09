"use client";

import Link from "next/link";
import {
  Building2,
  GraduationCap,
  LayoutDashboard,
  Library,
  UserCog,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Building2, label: "Campus", href: "/superadmin/campus/" },
  { icon: LayoutDashboard, label: "Semester", href: "/superadmin/semester" },
  { icon: GraduationCap, label: "Major", href: "/superadmin/major" },
  { icon: Library, label: "Capstone", href: "/superadmin/capstone" },
  { icon: UserCog, label: "Admin Account", href: "/superadmin/admin" },
];

export function SuperAdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-purple-500"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-white">
            F
          </div>
          <span className="text-xl font-bold">FUC</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 flex flex-col m-auto pt-14">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem className="pb-8" key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
