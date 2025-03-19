"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentTaskProvider } from "@/contexts/student/student-task-context";

const items = [
  { label: "Project Progress", href: "/student/workspace" },
  { label: "Tasks", href: "/student/workspace/tasks" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentTaskProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </StudentTaskProvider>
  );
}
