"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentTopicProvider } from "@/contexts/student/student-topic-context";

const items = [
  { label: "Topics", href: "/student/topics" },
  { label: "Topic Request", href: "/student/topics/topic-request" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentTopicProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </StudentTopicProvider>
  );
}
