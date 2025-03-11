import React from "react";
import { SupervisorGroupProvider } from "@/contexts/supervisor/supervisor-group-context";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SupervisorGroupProvider>
            {children}
        </SupervisorGroupProvider>
    );
}   