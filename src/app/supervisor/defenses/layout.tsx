"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { SupervisorDefenseProvider } from "@/contexts/supervisor/supervisor-defense-context";

const items = [{ label: "Defenses", href: "/supervisor/defenses" }];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SupervisorDefenseProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </SupervisorDefenseProvider>
  );
}
