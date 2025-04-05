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
        { label: "My Evaluation", href: `/supervisor/groups/${groupId}/my-evaluation` },
        { label: "Review Results", href: `/supervisor/groups/${groupId}/review-results` },
        { label: "My Decision", href: `/supervisor/groups/${groupId}/my-decision` },
        { label: "Defense Results", href: `/supervisor/groups/${groupId}/defense-results` },
    ];

    return (
        <div className="flex flex-col gap-2">
            <Tabs items={items} />
            {children}
        </div>
    );
}