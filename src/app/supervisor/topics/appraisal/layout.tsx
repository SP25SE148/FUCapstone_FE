"use client";

import React from "react";
import { SupervisorTopicAppraisalProvider } from "@/contexts/supervisor/supervisor-topic-appraisal-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SupervisorTopicAppraisalProvider>
      {children}
    </SupervisorTopicAppraisalProvider>
  );
}
