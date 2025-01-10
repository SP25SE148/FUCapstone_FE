"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme/mode-toggle";
import { Zap } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Don't display Header on the login page
  if (pathname === "/") return null;

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-white dark:bg-darkbackground border-b border-gray-200 dark:border-white dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="text-primary dark:text-primary-foreground font-bold text-xl">
            FUC
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200">
            <Zap className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <ModeToggle />
          <Link
            href="/logout"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-200"
          >
            Log Out
          </Link>
        </div>
      </div>
    </header>
  );
}
