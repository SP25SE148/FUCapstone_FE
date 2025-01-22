"use client"

import React from "react";
import { FilePlus, FileText, } from "lucide-react";

import SupervisorSidebar from "../components/supervisor-sidebar";

const items = [
    { title: "Topics", url: "/supervisor/topics", icon: FileText, },
    { title: "Register new topic", url: "/supervisor/topics/register-new-topic", icon: FilePlus, },
];

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full gap-4">
            <SupervisorSidebar items={items} />
            <div className="flex-1 bg-background border-2 rounded-lg shadow-lg flex items-center justify-center">
                {children}
            </div>
        </div>
    );
} 