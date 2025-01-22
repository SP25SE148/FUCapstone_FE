"use client";

import React from "react";

import StudentTaskbar from "@/app/student/components/student-taskbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 min-h-screen max-h-screen flex flex-col gap-4 bg-muted">
      <div className="flex-1 flex overflow-auto">{children}</div>
      <StudentTaskbar />
    </div>
  );
}
