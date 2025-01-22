"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  title: string;
  url: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 h-auto bg-background border-2 rounded-lg shadow-lg flex items-start justify-center">
      <div className="flex flex-1 flex-col space-y-1 p-4">
        {items.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-muted-foreground hover:bg-purple-50 hover:text-purple-600"
              )}
            >
              <item.icon className={cn("h-4 w-4")} />
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
