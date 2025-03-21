"use client";

import React from "react";
import StudentTaskbar from "@/app/student/components/student-taskbar";
import { StudentProfileProvider } from "@/contexts/student/student-profile-context";
import withAuth from "@/components/layout/withAuth";

function RootLayout({
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
      </div>
    </StudentProfileProvider>
  );
}
export default withAuth(RootLayout)