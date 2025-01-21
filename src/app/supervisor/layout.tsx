"use client"

import React from "react";

import SupervisorTaskbar from "./components/supervisor-taskbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-4 min-h-screen max-h-screen flex flex-col gap-4 bg-muted">
            <div className="flex-1 flex">
                {children}
            </div>
            <SupervisorTaskbar />
        </div>
    );
}   