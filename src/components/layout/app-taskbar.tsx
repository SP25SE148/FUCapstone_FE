"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useSignalR } from "@/contexts/signalR-context";
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
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { unreadedNoti, resetUnreadedNoti } = useSignalR();

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
              <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
            <Link
              onClick={resetUnreadedNoti}
              href={`/${user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Supervisor" ? "supervisor" : "student"}/notifications`}
              className={cn(
                "relative flex flex-col items-center p-2 mx-2 rounded-md text-white",
                pathname.includes(`/${user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Supervisor" ? "supervisor" : "student"}/notifications`)
                  ? "bg-white text-primary shadow-md"
                  : "hover:bg-white/20"
              )}
            >
              <Bell className="h-6 w-6" />
              {unreadedNoti > 0 && <span className="absolute -top-2 -right-2 size-6 flex items-center justify-center text-xs rounded-lg bg-rose-600 text-background">{unreadedNoti > 99 ? "99+" : unreadedNoti}</span>}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span className="text-xs font-normal">Notifications</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
