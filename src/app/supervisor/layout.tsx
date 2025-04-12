"use client"

import React from "react";

import Info from "./components/info";
import SupervisorTaskbar from "./components/supervisor-taskbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-2 min-h-screen bg-muted">
            <SupervisorTaskbar />
            <div className="ml-[68px]">
                {children}
            </div>
            <Info />
        </div>
    );
}   