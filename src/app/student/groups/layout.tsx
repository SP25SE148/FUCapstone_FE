"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentGroupProvider } from "@/contexts/student/student-group-context";

const items = [
  { label: "My Group", href: "/student/groups" },
  { label: "List Group", href: "/student/groups/list-group" },
  { label: "My Request", href: "/student/groups/my-request" },
  { label: "My Topic", href: "/student/groups/my-topic" },
  { label: "Defense Decision", href: "/student/groups/defense-decision" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentGroupProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </StudentGroupProvider>
  );
}
