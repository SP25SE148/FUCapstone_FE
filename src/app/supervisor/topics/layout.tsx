"use client"

import React from "react";

import { Tabs } from "@/components/layout/app-tabs";

const items = [
    { label: "Topics", href: "/supervisor/topics", },
    { label: "Register Topic", href: "/supervisor/topics/register-topic", },
    { label: "My Request", href: "/supervisor/topics/my-request", },
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