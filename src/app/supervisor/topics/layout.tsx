"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";

const items = [
  { label: "My Topics", href: "/supervisor/topics" },
  { label: "Lookup Topics", href: "/supervisor/topics/look-up" },
  { label: "Register Topic", href: "/supervisor/topics/register-topic" },
  { label: "Topic Appraisal", href: "/supervisor/topics/appraisal" },
  { label: "My Request", href: "/supervisor/topics/my-request" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Tabs items={items} />
      {children}
    </div>
  );
}
