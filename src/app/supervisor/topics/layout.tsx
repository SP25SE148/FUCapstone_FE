"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
<<<<<<< HEAD
import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";
=======
import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

const items = [
  { label: "Topics", href: "/supervisor/topics" },
  { label: "Register Topic", href: "/supervisor/topics/register-topic" },
  { label: "My Request", href: "/supervisor/topics/my-request" },
];

<<<<<<< HEAD
export default function Layout({ children }: { children: React.ReactNode }) {
=======
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
  return (
    <SupervisorTopicProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </SupervisorTopicProvider>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
