"use client"

import React from "react";
// import { FilePlus, FileText, } from "lucide-react";

// import SupervisorSidebar from "../components/supervisor-sidebar";
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Tabs } from "@/components/layout/app-tabs";

const items = [
    { label: "Topics", href: "/supervisor/topics", },
    { label: "Register new topic", href: "/supervisor/topics/register-new-topic", },
];

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <Tabs items={items} />
            {children}
        </div>
    );
} 