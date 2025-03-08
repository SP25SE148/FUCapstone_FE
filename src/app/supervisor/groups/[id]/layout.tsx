import React from "react";
import { Tabs } from "@/components/layout/app-tabs";

const items = [
    { label: "Group Info", href: "/supervisor/groups/1" },
    { label: "Project Progress", href: "/supervisor/groups/1/project-progress" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <Tabs items={items} />
            {children}
        </div>
    );
}