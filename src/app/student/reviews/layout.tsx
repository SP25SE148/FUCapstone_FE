"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";

const items = [
  { label: "Reviews", href: "/student/reviews" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Tabs items={items} />
      {children}
    </div>
  );
}
