import React from "react";

import { SupervisorTopicLookupProvider } from "@/contexts/supervisor/supervisor-topic-lookup-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SupervisorTopicLookupProvider>
            {children}
        </SupervisorTopicLookupProvider>
    )
}
