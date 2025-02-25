"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

export function Taskbar({
  items,
}: {
  items: {
    href: string;
    label: string;
    icon: LucideIcon;
  }[];
}) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const signOutHandler = () => {
    logout();
  };

  return (
    <nav
      className="fixed top-2 bottom-2 flex flex-col items-center justify-center gap-4 rounded-lg shadow-lg border-2 border-primary bg-primary"
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
                      ? "bg-white text-primary shadow-md"
                      : "hover:bg-white/20"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span className="text-xs font-normal ">{item.label}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
      <TooltipProvider
        delayDuration={200}
      >
        <Tooltip>
          <TooltipTrigger>
            <div
              className="flex flex-col items-center p-2 mx-2 rounded-md text-white hover:bg-white/20"
              onClick={signOutHandler}
            >
              <LogOut className="h-6 w-6" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span className="text-xs font-normal ">Log out</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
}
