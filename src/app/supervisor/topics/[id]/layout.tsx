import React from "react";

import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SupervisorTopicProvider>
            {children}
        </SupervisorTopicProvider>
    )
}
