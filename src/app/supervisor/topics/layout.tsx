"use client"

import React from "react";

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