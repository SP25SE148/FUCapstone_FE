import React from "react";
import { SupervisorTopicRequestProvider } from "@/contexts/supervisor/supervisor-topic-request-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SupervisorTopicRequestProvider>
            {children}
        </SupervisorTopicRequestProvider>
    );
}
