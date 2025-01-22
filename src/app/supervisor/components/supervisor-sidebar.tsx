"use client"

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SupervisorSidebar({
    items,
}: {
    items: {
        url: string;
        title: string;
        icon: LucideIcon;
    }[];
}) {
    const pathname = usePathname();

    return (
        <div className="w-64 h-auto p-2 bg-background border-2 rounded-lg shadow-lg flex flex-col gap-2">
            {items?.map((item, index) => (
                <Button
                    asChild
                    key={index}
                    variant={"ghost"}
                    className={cn(
                        "w-full h-12 justify-start",
                        pathname === (item.url) && "bg-primary text-white hover:bg-primary hover:text-white"
                    )}
                >
                    <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Link>
                </Button>
            ))}
        </div>
    );
};