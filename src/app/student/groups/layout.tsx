"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentGroupProvider } from "@/contexts/student/student-group-managment";

const items = [
  { label: "My Group", href: "/student/groups" },
  { label: "My Request", href: "/student/groups/my-request" },
  { label: "My Topic", href: "/student/groups/my-topic" },
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
