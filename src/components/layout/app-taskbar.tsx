"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

export function Taskbar({
  items,
}: {
  items: {
    icon: LucideIcon;
    label: string;
    href: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 w-full flex justify-center">
      <nav
        className="flex items-center justify-center 
                   rounded-2xl py-1 shadow-lg 
                   border-2 border-primary 
                   min-w-[50%] max-w-[80%] 
                   bg-background"
      >
        {items.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <TooltipProvider
              key={index}
              delayDuration={200}
            >
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center p-2 mx-2 rounded-lg",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-primary/10"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs font-normal ">{item.label}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>
    </div>
  );
}
