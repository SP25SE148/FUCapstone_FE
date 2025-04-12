"use client";

import React from "react";

import { StudentProfileProvider } from "@/contexts/student/student-profile-context";

import Info from "./components/info";
import StudentTaskbar from "@/app/student/components/student-taskbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <StudentProfileProvider>
      <div className="p-2 min-h-screen bg-muted">
        <StudentTaskbar />
        <div className="ml-[68px]">
          {children}
        </div>
        <Info />
      </div>
    </StudentProfileProvider>
  );
}
