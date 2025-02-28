"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
<<<<<<< HEAD
import { StudentGroupProvider } from "@/contexts/student/student-group-context";
=======
import { StudentGroupProvider } from "@/contexts/student/student-group-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

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
