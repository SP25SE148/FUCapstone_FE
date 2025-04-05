"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentGroupProvider } from "@/contexts/student/student-group-context";
import { StudentDefenseProvider } from "@/contexts/student/student-defense-context";

const items = [
  { label: "Defenses", href: "/student/defenses" },
  { label: "Results", href: "/student/defenses/results" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentGroupProvider>
      <StudentDefenseProvider>
        <div className="flex flex-col gap-2">
          <Tabs items={items} />
          {children}
        </div>
      </StudentDefenseProvider>
    </StudentGroupProvider>
  );
}
