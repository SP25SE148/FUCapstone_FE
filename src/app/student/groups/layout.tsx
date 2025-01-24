"use client";

import { Tabs } from "@/components/layout/app-tabs";
import React from "react";

import { Toaster } from "sonner";

const items = [
  { label: "My Group", href: "/student/groups" },
  { label: "My Request", href: "/student/groups/my-request" },
  { label: "My Topic", href: "/student/groups/my-topic" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Tabs items={items} />
      <div className="w-full min-h-[705px] bg-background border-2 rounded-lg shadow-lg flex justify-center overflow-y-auto">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
