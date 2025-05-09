"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { SupervisorReviewProvider } from "@/contexts/supervisor/supervisor-review-context";

const items = [
  { label: "Reviews", href: "/supervisor/reviews" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SupervisorReviewProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </SupervisorReviewProvider>
  );
}
