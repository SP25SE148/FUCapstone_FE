"use client"

import React from "react";
import { useParams } from "next/navigation";

import { Tabs } from "@/components/layout/app-tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const groupId = params?.id;

    const items = [
        { label: "Group Info", href: `/supervisor/groups/${groupId}` },
        { label: "Project Progress", href: `/supervisor/groups/${groupId}/project-progress` },
        { label: "Group Tasks", href: `/supervisor/groups/${groupId}/tasks` },
        { label: "My Evaluation", href: `/supervisor/groups/${groupId}/my-evaluation` },
    ];

    return (
        <div className="flex flex-col gap-2">
            <Tabs items={items} />
            {children}
        </div>
    );
}