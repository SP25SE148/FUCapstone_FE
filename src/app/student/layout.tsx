"use client";

import React from "react";

import StudentTaskbar from "@/app/student/components/student-taskbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 min-h-screen bg-muted">
      <StudentTaskbar />
      <div className="ml-[68px]">{children}</div>
    </div>
  );
}
