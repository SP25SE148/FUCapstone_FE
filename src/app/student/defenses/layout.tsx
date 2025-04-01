"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentDefenseProvider } from "@/contexts/student/student-defense-context";

const items = [{ label: "Defenses", href: "/student/defenses" }];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentDefenseProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </StudentDefenseProvider>
  );
}
