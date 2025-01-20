"use client"

import React from "react";

import StudentTaskbar from "@/app/student/components/student-taskbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-muted">
      {children}
      <StudentTaskbar />
    </main>
  );
}