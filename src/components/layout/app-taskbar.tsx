"use client";

import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

export function Taskbar({
  items,
}: {
  items: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    label: string;
    href: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex justify-center w-full">
      <nav
        className="flex items-center justify-center 
                   rounded-2xl py-1 shadow-lg 
                   border-2 border-primary 
                   min-w-[50%] max-w-[80%] 
                   bg-background"
      >
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center px-3 py-2 mx-2 rounded-xl transition-colors",
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-[#6C47FF]/10"
              )}
            >
              <item.icon className="h-5 w-5 transition-transform hover:scale-125" />
              <span className="text-[10px] font-normal ">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
