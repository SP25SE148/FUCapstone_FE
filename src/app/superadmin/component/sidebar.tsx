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
  // SidebarFooter,
  // SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  // SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Building2, label: "Campus", href: "/superadmin/campus/" },
  { icon: LayoutDashboard, label: "Semester", href: "/superadmin/semester" },
  { icon: GraduationCap, label: "Major", href: "/superadmin/majorgroup" },
  { icon: Library, label: "Capstone", href: "/superadmin/capstone" },
  { icon: UserCog, label: "Admin Account", href: "/superadmin/admin" },
];

export function SuperAdminSidebar() {
  return (
    <Sidebar className="mt-[68px] flex justify-center">
      <SidebarContent className="px-10 pt-14 dark:bg-darkbackground">
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
    </Sidebar>
  );
}
