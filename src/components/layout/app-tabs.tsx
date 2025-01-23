"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Tabs({
    items,
}: {
    items: {
        label: string;
        href: string;
    }[];
}) {
    const pathname = usePathname();

    return (
        <nav
            className="sticky top-2 z-50 flex items-center h-[40px] rounded-lg shadow-lg bg-primary"
        >
            {items.map((item, index) => {
                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={cn(
                            "p-1 mx-2 rounded-md text-white text-sm font-bold",
                            pathname === item.href
                                ? "bg-white text-primary shadow-md"
                                : "hover:bg-white/20"
                        )}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
