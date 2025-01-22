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
    <nav
      className="h-[48px] flex items-center justify-center rounded-lg shadow-lg border-2 border-primary bg-primary"
    >
      {items.map((item, index) => {
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
                    "flex flex-col items-center p-2 mx-2 rounded-md text-white",
                    pathname.includes(item.href)
                      ? "bg-background text-primary shadow-md"
                      : "hover:bg-background/20"
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
  );
}
