"use client";

import React from "react";
import StudentTaskbar from "@/app/student/components/student-taskbar";
<<<<<<< HEAD
import { StudentProfileProvider } from "@/contexts/student/student-profile-context";
=======
import { StudentProfileProvider } from "@/contexts/student/student-profile-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

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
      </div>
    </StudentProfileProvider>
  );
}