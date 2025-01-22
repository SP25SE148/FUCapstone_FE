"use client";

import React from "react";

import { Album, MailOpen, Users } from "lucide-react";
import { Sidebar } from "@/app/student/components/student-sidebar";
import { Toaster } from "sonner";

const items = [
  { title: "My Group", url: "/student/groups/my-group", icon: Users },
  { title: "My Request", url: "/student/groups/my-request", icon: MailOpen },
  { title: "My Topic", url: "/student/groups/my-topic", icon: Album },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full gap-4">
      <Sidebar items={items} />
      <div className="flex-1 bg-background border-2 rounded-lg shadow-lg flex items-center justify-center overflow-y-auto">
        {children}
      </div>
      <Toaster />

    </div>
  );
}
